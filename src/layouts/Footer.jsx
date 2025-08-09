"use client"

import { Link } from "react-router-dom"
import LogoDesa from "../assets/img/logo desa.png"
import { Facebook, Instagram, Twitter } from "lucide-react"


const Footer = () => {
  return (
    <footer className="relative text-white bg-[#0f172a] pt-12 pb-6 px-6 md:px-16 overflow-hidden">
      {/* Background Blur Layer */}
      <div className="absolute inset-0 bg-white opacity-5 z-0" />

      {/* Main Content */}
      <div className="relative z-10">
        

        {/* Divider */}
        <div className="border-t border-gray-700 mb-8" />

        {/* Info Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-300">
          {/* Logo & Social */}
          <div className="flex flex-col items-start gap-3">
            <img src={LogoDesa} alt="Logo Desa" className="h-10" />
            <p className="max-w-sm">Sistem Informasi dan Layanan Administrasi Desa Batununggal</p>
            <div className="flex gap-3 mt-2 text-white">
              <Facebook className="w-5 h-5 hover:text-blue-500 cursor-pointer" />
              <Twitter className="w-5 h-5 hover:text-blue-400 cursor-pointer" />
              <Instagram className="w-5 h-5 hover:text-pink-400 cursor-pointer" />
            </div>
          </div>

          {/* Navigasi */}
          <div className="flex flex-col gap-2">
            <h4 className="text-white font-semibold mb-2">Navigasi</h4>
            <Link to="/" className="hover:underline">Beranda</Link>
            <Link to="/umkm" className="hover:underline">UMKM</Link>
            <Link to="/apbdes" className="hover:underline">APBDes</Link>
            <Link to="/news" className="hover:underline">Berita</Link>
            <Link to="/profile-desa" className="hover:underline">Profil Desa</Link>
            {/* <Link to="/layanan" className="hover:underline">Layanan Surat</Link> */}
          </div>

          {/* Kontak */}
          <div className="flex flex-col gap-2">
            <h4 className="text-white font-semibold mb-2">Kontak</h4>
            <p>Jl. Raya Batununggal No. 1</p>
            <p>Telp: (022) 123456</p>
            <p>Email: info@batununggal.desa.id</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-10 text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Desa Batununggal. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
