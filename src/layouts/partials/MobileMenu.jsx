// layouts/partials/MobileMenu.jsx
import { Link } from "react-router-dom";

export default function MobileMenu({ user, totalNotif, onClose }) {
  return (
    <div className="md:hidden bg-slate-950 text-white px-4 pb-4">
      <ul className="flex flex-col gap-2 text-sm">
        <li><Link to="/profile-desa" onClick={onClose}>Profile</Link></li>
        <li><Link to="/news" onClick={onClose}>Berita</Link></li>
        <li><Link to="/umkm" onClick={onClose}>UMKM</Link></li>
        {user && (
          <>
            <li><Link to="/complaint-form" onClick={onClose}>Aduan</Link></li>
            <li><Link to="/letter" onClick={onClose}>Surat</Link></li>
            <li><Link to="/feedback" onClick={onClose}>Kritik & Saran</Link></li>
          </>
        )}
      </ul>
    </div>
  );
}
