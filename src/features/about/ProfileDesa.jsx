import React from 'react'
import MapDesa from './components/MapDesa'
import VisiMisi from './components/VisiMisi'
import StrukturOrganisasi from './components/StrukturOrganisasi'
import SejarahDesa from './components/SejarahDesa'
import Penduduk from './components/Penduduk'
export default function ProfileDesa() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-green-300 via-green-100 to-white py-24 px-6 md:px-20 space-y-16">
      <MapDesa />
      <Penduduk />
      <VisiMisi />
      <SejarahDesa />
      <StrukturOrganisasi />
    </div>
  )
}
