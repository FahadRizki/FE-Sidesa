// layouts/partials/UserMenu.jsx - Desktop Only
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Bell, 
  FileText, 
  Store, 
  MessageSquare, 
  LogOut, 
  ChevronDown,
  Settings,
  User
} from "lucide-react";

const Badge = ({ count, className = "" }) =>
  count > 0 ? (
    <span className={`inline-flex items-center justify-center min-w-[20px] h-5 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 animate-pulse ${className}`}>
      {count > 99 ? '99+' : count}
    </span>
  ) : null;

export default function UserMenu({ user, notifCount, totalNotif, onLogout }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuItems = [
    {
      to: "/status-umkm",
      label: "Status UMKM",
      icon: Store,
      badge: notifCount.umkm,
      color: "text-blue-500"
    },
    {
      to: "/letter-status", 
      label: "Status Surat",
      icon: FileText,
      badge: notifCount.surat,
      color: "text-green-500"
    },
    {
      to: "/complaint-status",
      label: "Status Aduan", 
      icon: MessageSquare,
      badge: notifCount.aduan,
      color: "text-orange-500"
    }
  ];

  return (
    // Hidden pada mobile, hanya tampil di desktop
    <div className="relative hidden lg:block">
      {/* Desktop Avatar Button */}
      <button
        ref={buttonRef}
        className="flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full pl-1 pr-4 py-1 border border-white/20 transition-all duration-200 hover:scale-105"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <div className="relative">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3b82f6&color=ffffff&size=36`}
            alt={user.name}
            className="w-9 h-9 rounded-full ring-2 ring-white/30"
          />
          {totalNotif > 0 && (
            <div className="absolute -top-1 -right-1">
              <Badge count={totalNotif} className="!min-w-[18px] !h-4 !text-[10px]" />
            </div>
          )}
        </div>
        
        <div className="text-white">
          <div className="text-sm font-medium truncate max-w-[120px] text-left">
            {user.name}
          </div>
          {totalNotif > 0 && (
            <div className="text-xs text-blue-200 -mt-0.5">
              {totalNotif} notifikasi
            </div>
          )}
        </div>
        
        <ChevronDown className={`w-4 h-4 text-white/70 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Desktop Dropdown Menu */}
      {open && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-3 w-80 z-50 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200/50 animate-in slide-in-from-top-2 duration-200"
        >
          {/* Header */}
          <div className="p-4 border-b border-slate-200/50 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3b82f6&color=ffffff&size=48`}
                alt={user.name}
                className="w-12 h-12 rounded-full ring-2 ring-blue-200"
              />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-slate-900 truncate">
                  {user.name}
                </div>
                <div className="text-sm text-slate-600 truncate">
                  {user.email}
                </div>
              </div>
              {totalNotif > 0 && (
                <div className="flex items-center gap-1 bg-red-50 px-2 py-1 rounded-full border border-red-200">
                  <Bell className="w-3 h-3 text-red-500" />
                  <Badge count={totalNotif} className="!bg-red-500" />
                </div>
              )}
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={index}
                  to={item.to}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-slate-50 transition-all duration-200 group"
                  onClick={() => setOpen(false)}
                >
                  <div className={`p-2 bg-slate-100 rounded-lg group-hover:bg-slate-200 transition-colors duration-200`}>
                    <Icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-slate-900 group-hover:text-slate-700">
                      {item.label}
                    </span>
                  </div>
                  {item.badge > 0 && (
                    <Badge count={item.badge} className="!bg-red-500 group-hover:scale-110 transition-transform" />
                  )}
                </Link>
              );
            })}

            <div className="my-2 border-t border-slate-200" />

            {/* Profile Settings */}
            <Link
              to="/profile"
              className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-slate-50 transition-all duration-200 group"
              onClick={() => setOpen(false)}
            >
              <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-slate-200 transition-colors duration-200">
                <Settings className="w-4 h-4 text-slate-500" />
              </div>
              <span className="font-medium text-slate-900 group-hover:text-slate-700">
                Pengaturan Akun
              </span>
            </Link>

            {/* Logout */}
            <button
              onClick={() => {
                setOpen(false);
                onLogout();
              }}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-red-50 transition-all duration-200 group"
            >
              <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors duration-200">
                <LogOut className="w-4 h-4 text-red-500" />
              </div>
              <span className="font-medium text-red-600 group-hover:text-red-700">
                Keluar
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}