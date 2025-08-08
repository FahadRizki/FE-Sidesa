// layouts/partials/UserMenu.jsx
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Badge = ({ count }) =>
  count > 0 ? (
    <span className="inline-block w-6 h-6 bg-red-600 text-white text-xs font-semibold py-1 px-2 rounded-full">
      {count}
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

  return (
    <div className="relative">
      {/* Avatar + Badge button */}
      <div
        ref={buttonRef}
        className="relative cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="absolute -top-3 -right-1 text-[10px] z-10 animate-pulse">
          <Badge count={totalNotif} />
        </div>
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
          alt="avatar"
          className="w-10 h-10 rounded-full border border-white"
        />
      </div>

      {/* Dropdown menu */}
      {open && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-2 bg-white text-sm rounded-md shadow-lg w-48 z-50"
        >
          <div className="p-3 border-b">
            <div className="font-medium">{user.name}</div>
            <div className="text-xs text-gray-600 truncate">{user.email}</div>
          </div>
          <Link
            to="/status-umkm"
            className="px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
            onClick={() => setOpen(false)}
          >
            Status UMKM <Badge count={notifCount.umkm} />
          </Link>
          <Link
            to="/letter-status"
            className="px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
            onClick={() => setOpen(false)}
          >
            Status Surat <Badge count={notifCount.surat} />
          </Link>
          <Link
            to="/complaint-status"
            className="px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
            onClick={() => setOpen(false)}
          >
            Status Aduan <Badge count={notifCount.aduan} />
          </Link>
          <button
            onClick={() => {
              setOpen(false);
              onLogout();
            }}
            className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
