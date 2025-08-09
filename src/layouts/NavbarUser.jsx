// NavbarUser.jsx
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/img/logo desa.png";
import { getNotifications } from "./layoutsServices";
import NavLinkList from "./partials/NavLinkList";
import UserMenu from "./partials/UserMenu";
import MobileMenu from "./partials/MobileMenu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NavbarUser() {
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifCount, setNotifCount] = useState({ umkm: 0, surat: 0, aduan: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const hasFetchedNotif = useRef(false);

  // Enhanced scroll behavior with hide/show on scroll
  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show/hide navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false); // Hide when scrolling down
      } else {
        setIsVisible(true); // Show when scrolling up
      }
      
      setScrolled(currentScrollY > 20);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (!hasFetchedNotif.current && user && token) {
      getNotifications(token)
        .then((res) => {
          setNotifCount({
            umkm: res.data.umkm,
            surat: res.data.surat,
            aduan: res.data.aduan,
          });
          hasFetchedNotif.current = true;
        })
        .catch(() => {
          setNotifCount({ umkm: 0, surat: 0, aduan: 0 });
        });
    }
  }, [user, token]);

  const totalNotif = notifCount.umkm + notifCount.surat + notifCount.aduan;

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          scrolled 
            ? "bg-slate-900/95 backdrop-blur-md shadow-2xl border-b border-slate-700/50" 
            : "bg-transparent"
        }`}
      >
        {/* Gradient overlay for better contrast */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${
          scrolled ? 'opacity-0' : 'opacity-100'
        } bg-gradient-to-b from-black/40 via-black/20 to-transparent pointer-events-none`} />
        
        <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo Section - Enhanced */}
            <Link 
              to="/" 
              className="flex items-center gap-3 group hover:scale-105 transition-transform duration-300"
            >
              <div className="relative">
                <img 
                  src={Logo} 
                  className="h-10 md:h-12 lg:h-14 drop-shadow-lg transition-all duration-300 group-hover:drop-shadow-2xl" 
                  alt="Logo Desa Batununggal" 
                />
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-full bg-white/20 blur-lg scale-0 group-hover:scale-150 transition-transform duration-500" />
              </div>
              <div className="hidden sm:block">
                <span className="text-white text-lg md:text-xl lg:text-2xl font-bold tracking-wide drop-shadow-lg">
                  Desa Batununggal
                </span>
                <div className="text-blue-200 text-xs md:text-sm font-light -mt-1 tracking-wider opacity-90">
                  Portal Digital Desa
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <NavLinkList user={user} />
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3 md:gap-4">
              {user ? (
                <UserMenu
                  user={user}
                  notifCount={notifCount}
                  totalNotif={totalNotif}
                  onLogout={() => {
                    logout();
                    toast.success("Berhasil logout!", {
                      className: "!bg-slate-800 !text-white border border-slate-600",
                      progressClassName: "!bg-blue-500",
                    });
                    setTimeout(() => navigate("/login"), 1000);
                  }}
                />
              ) : (
                <div className="hidden sm:flex items-center gap-3">
                  <Link
                    to="/register"
                    className="text-white/90 hover:text-white px-4 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    Daftar
                  </Link>
                  <Link
                    to="/login"
                    className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
                  >
                    <span className="relative z-10">Masuk</span>
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button - Enhanced */}
              <button
                className="lg:hidden relative p-2 text-white hover:text-blue-300 transition-colors duration-200 group"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
              >
                <div className="w-6 h-6 relative">
                  <span className={`absolute block w-full h-0.5 bg-current transform transition-all duration-300 ${
                    menuOpen ? 'rotate-45 top-3' : 'top-1'
                  }`} />
                  <span className={`absolute block w-full h-0.5 bg-current transform transition-all duration-300 top-3 ${
                    menuOpen ? 'opacity-0' : 'opacity-100'
                  }`} />
                  <span className={`absolute block w-full h-0.5 bg-current transform transition-all duration-300 ${
                    menuOpen ? '-rotate-45 top-3' : 'top-5'
                  }`} />
                </div>
                {/* Notification badge for mobile */}
                {totalNotif > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                    {totalNotif > 99 ? '99+' : totalNotif}
                  </span>
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Progress bar for scroll */}
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 origin-left scale-x-0 transition-transform duration-300"
             style={{
               transform: `scaleX(${Math.min(window.scrollY / (document.body.scrollHeight - window.innerHeight), 1)})`
             }}
        />
      </header>

      {/* Mobile Menu with better animation */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
        menuOpen ? 'visible' : 'invisible'
      }`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMenuOpen(false)}
        />
        
        {/* Menu Panel */}
        <div className={`absolute top-0 right-0 w-80 max-w-[90vw] h-full bg-slate-900/95 backdrop-blur-md border-l border-slate-700/50 transform transition-transform duration-300 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <MobileMenu 
            user={user} 
            totalNotif={totalNotif}
            notifCount={notifCount}
            onClose={() => setMenuOpen(false)}
            onLogout={() => {
              logout();
              setMenuOpen(false);
              toast.success("Berhasil logout!", {
                className: "!bg-slate-800 !text-white border border-slate-600",
                progressClassName: "!bg-blue-500",
              });
              setTimeout(() => navigate("/login"), 1000);
            }}
          />
        </div>
      </div>

      {/* Enhanced Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="!mt-20"
        toastClassName="!bg-slate-800 !text-white !border !border-slate-600 !shadow-2xl"
        progressClassName="!bg-gradient-to-r !from-blue-500 !to-purple-500"
      />

      {/* Custom Styles */}
      <style jsx>{`
        @media (max-width: 640px) {
          .text-2xl { font-size: 1.25rem; }
          .text-xl { font-size: 1.125rem; }
        }
        
        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar for webkit browsers */
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(51, 65, 85, 0.1);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #7c3aed);
        }
      `}</style>
    </>
  );
}