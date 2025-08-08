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
  const hasFetchedNotif = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-slate-950 shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-1 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={Logo} className="h-10 md:h-14" alt="Logo" />
          <span className="text-white text-lg md:text-xl font-semibold">
            Desa Batununggal
          </span>
        </Link>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />

        <div className="flex items-center gap-4">
          <NavLinkList user={user} />
          {user ? (
            <UserMenu
              user={user}
              notifCount={notifCount}
              totalNotif={totalNotif}
              onLogout={() => {
              logout();
              toast.success("Berhasil logout!");
              setTimeout(() => navigate("/login"), 1000); // redirect setelah 1 detik
            }}
            />
          ) : (
            <Link
              to="/login"
              className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm"
            >
              Login
            </Link>
          )}

          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>
      {menuOpen && <MobileMenu user={user} totalNotif={totalNotif} onClose={() => setMenuOpen(false)} />}
    </header>
  );
}
