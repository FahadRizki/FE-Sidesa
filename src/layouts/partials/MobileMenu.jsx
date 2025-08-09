// layouts/partials/MobileMenu.jsx
import { Link } from "react-router-dom";
import { 
  User, 
  Newspaper, 
  Store, 
  MessageSquare, 
  FileText, 
  MessageCircle,
  Home,
  Bell,
  X,
  LogOut,
  DollarSign
} from "lucide-react";

const Badge = ({ count, className = "" }) =>
  count > 0 ? (
    <span className={`inline-flex items-center justify-center min-w-[18px] h-4 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 animate-pulse ${className}`}>
      {count > 99 ? '99+' : count}
    </span>
  ) : null;

export default function MobileMenu({ user, totalNotif, notifCount, onClose, onLogout }) {
  const menuItems = [
    { to: "/", label: "Beranda", icon: Home, public: true },
    { to: "/profile-desa", label: "Profil Desa", icon: User, public: true },
    { to: "/news", label: "Berita", icon: Newspaper, public: true },
    { to: "/umkm", label: "UMKM", icon: Store, public: true },
    { to: "/apbdes", label: "APBDes", icon: DollarSign, public: true },
  ];

  const userMenuItems = [
    { to: "/complaint-form", label: "Aduan", icon: MessageSquare },
    { to: "/letter", label: "Surat", icon: FileText },
    { to: "/feedback", label: "Kritik & Saran", icon: MessageCircle },
  ];

  const statusMenuItems = [
    { 
      to: "/status-umkm", 
      label: "Status UMKM", 
      icon: Store, 
      badge: notifCount?.umkm || 0,
      color: "text-blue-500"
    },
    { 
      to: "/letter-status", 
      label: "Status Surat", 
      icon: FileText, 
      badge: notifCount?.surat || 0,
      color: "text-green-500"
    },
    { 
      to: "/complaint-status", 
      label: "Status Aduan", 
      icon: MessageSquare, 
      badge: notifCount?.aduan || 0,
      color: "text-orange-500"
    }
  ];

  return (
    <div className="h-full flex flex-col bg-slate-900/95 backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm truncate max-w-[150px]">
                  {user.name}
                </p>
                <p className="text-slate-400 text-xs">
                  {user.email}
                </p>
              </div>
            </>
          ) : (
            <div>
              <p className="text-white font-semibold">Menu</p>
              <p className="text-slate-400 text-xs">Portal Digital Desa</p>
            </div>
          )}
          
          {/* Notification Badge */}
          {totalNotif > 0 && (
            <div className="ml-auto flex items-center gap-1 bg-red-500/20 px-2 py-1 rounded-full border border-red-500/30">
              <Bell className="w-3 h-3 text-red-400" />
              <span className="text-red-400 text-xs font-medium">
                {totalNotif > 99 ? '99+' : totalNotif}
              </span>
            </div>
          )}
        </div>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors duration-200"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Menu Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Public Menu Items */}
        <nav className="space-y-2">
          <p className="text-slate-400 text-xs uppercase tracking-wider font-medium mb-4">
            Menu Utama
          </p>
          
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                to={item.to}
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all duration-200 group"
              >
                <div className="p-2 bg-slate-800/50 rounded-lg group-hover:bg-slate-700 transition-colors duration-200">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Menu Items */}
        {user && (
          <>
            <nav className="space-y-2 mt-8">
              <p className="text-slate-400 text-xs uppercase tracking-wider font-medium mb-4">
                Layanan Pengguna
              </p>
              
              {userMenuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={index}
                    to={item.to}
                    onClick={onClose}
                    className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all duration-200 group"
                  >
                    <div className="p-2 bg-slate-800/50 rounded-lg group-hover:bg-slate-700 transition-colors duration-200">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Status Menu */}
            <nav className="space-y-2 mt-8">
              <p className="text-slate-400 text-xs uppercase tracking-wider font-medium mb-4">
                Status Pengajuan
              </p>
              
              {statusMenuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={index}
                    to={item.to}
                    onClick={onClose}
                    className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all duration-200 group"
                  >
                    <div className="p-2 bg-slate-800/50 rounded-lg group-hover:bg-slate-700 transition-colors duration-200">
                      <Icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <span className="font-medium flex-1">{item.label}</span>
                    {item.badge > 0 && (
                      <Badge count={item.badge} />
                    )}
                  </Link>
                );
              })}
            </nav>
          </>
        )}

        {/* Auth Section */}
        {!user && (
          <div className="mt-8 space-y-3">
            <p className="text-slate-400 text-xs uppercase tracking-wider font-medium mb-4">
              Akun
            </p>
            
            <Link
              to="/login"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[0.98] shadow-lg"
            >
              <User className="w-4 h-4" />
              Masuk
            </Link>
            
            <Link
              to="/register"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full border border-slate-600 hover:bg-slate-800 text-slate-300 hover:text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200"
            >
              Daftar
            </Link>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-slate-700/50">
        {user && (
          <>
            {/* Profile Settings */}
            {/* <Link
              to="/profile"
              onClick={onClose}
              className="flex items-center gap-3 w-full px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all duration-200 group mb-2"
            >
              <div className="p-2 bg-slate-800/50 rounded-lg group-hover:bg-slate-700 transition-colors duration-200">
                <Settings className="w-4 h-4" />
              </div>
              <span className="font-medium">Pengaturan Akun</span>
            </Link> */}

            {/* Logout */}
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-200 group mb-4"
            >
              <div className="p-2 bg-red-500/10 rounded-lg group-hover:bg-red-500/20 transition-colors duration-200">
                <LogOut className="w-4 h-4" />
              </div>
              <span className="font-medium">Keluar</span>
            </button>
          </>
        )}
        
        <div className="pt-4 border-t border-slate-700/30">
          <p className="text-slate-500 text-xs text-center">
            © 2024 Desa Batununggal
          </p>
          <p className="text-slate-500 text-xs text-center mt-1">
            Portal Digital Desa
          </p>
        </div>
      </div>
    </div>
  );
}