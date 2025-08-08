// layouts/partials/NavLinkList.jsx
import { Link } from "react-router-dom";

export default function NavLinkList({ user }) {
  return (
    <ul className="hidden md:flex gap-4 text-white text-sm font-medium">
      <li><Link to="/profile-desa">Profile</Link></li>
      <li><Link to="/news">Berita</Link></li>
      <li><Link to="/umkm">UMKM</Link></li>
      <li><Link to="/apbdes">APBDes</Link></li>
      {user && (
        <>
          <li><Link to="/complaint-form">Aduan</Link></li>
          <li><Link to="/letter">Surat</Link></li>
          <li><Link to="/feedback">Kritik & Saran</Link></li>
        </>
      )}
    </ul>
  );
}
