"use client"

import { memo, useState } from "react"
import { MapPin, Phone, Globe, Star, Heart, Share2, ExternalLink } from "lucide-react"


import { BASE_URL } from "../../config"

const UmkmCard = memo(({ umkm }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const rating = umkm.rating || 4.5
  const totalReviews = umkm.totalReviews || Math.floor(Math.random() * 100) + 10

  const getCategoryColor = (category) => {
    const colors = {
      Kuliner: "from-orange-500 to-red-500",
      Fashion: "from-purple-500 to-pink-500",
      Kerajinan: "from-blue-500 to-cyan-500",
      Jasa: "from-green-500 to-emerald-500",
      Teknologi: "from-indigo-500 to-purple-500",
      Kecantikan: "from-yellow-500 to-amber-500",
      Olahraga: "from-pink-500 to-fuchsia-500",
      Rekreasi: "from-blue-500 to-cyan-500",
      Pertanian: "from-green-500 to-emerald-500",
      Kesehatan: "from-blue-500 to-cyan-500",
      default: "from-blue-500 to-cyan-500",
    }
    return colors[category] || colors.default
  }

  const getCategoryIcon = (category) => {
    const icons = {
      makanan: "🍽️",
      Fashion: "👗",
      Kerajinan: "🎨",
      Jasa: "⚙️",
      Teknologi: "💻",
      default: "🏪",
    }
    return icons[category] || icons.default
  }

  return (
    <div
      className="group relative h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full bg-white/70 backdrop-blur-xl rounded-3xl border border-black/20 overflow-hidden transition-all duration-700 hover:transform hover:-translate-y-3 hover:rotate-1 hover:shadow-2xl hover:shadow-black/10 hover:border-white/40">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(umkm.umkm_category)} opacity-0 group-hover:opacity-5 transition-opacity duration-700`}
        />

        <div className="relative overflow-hidden ">
          <div className="aspect-[4/3] bg-white border ">
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="animate-spin rounded-full h-10 w-10 border-3 border-gray-200 border-t-blue-500"></div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse"></div>
                </div>
              </div>
            )}

            <img
              src={
                imageError
                  ? "/placeholder.svg?height=300&width=400&text=No Image"
                  : `${BASE_URL}/public/storage/umkm_images/${umkm.umkm_image}`
              }
              alt={umkm.umkm_name}
              className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true)
                setImageLoaded(true)
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

            <div
              className={`absolute top-4 right-4 flex flex-col gap-2 transform transition-all duration-500 ${
                isHovered ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
              }`}
            >
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-sm shadow-lg backdrop-blur-sm transition-all duration-300 ${
                    isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                }`}
                >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                </button>

                <button
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-gray-600 hover:text-blue-500 shadow-lg backdrop-blur-sm transition-all duration-300"
                >
                <Share2 className="w-4 h-4" />
                </button>

            </div>

            <div className="absolute top-4 left-4">
             <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white shadow-md bg-gradient-to-r ${getCategoryColor(umkm.umkm_category)} transition-all duration-300`}>
                <span className="mr-1">{getCategoryIcon(umkm.umkm_category)}</span>
                {umkm.umkm_category}
                </span>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 group-hover:bg-clip-text transition-all duration-500">
                {umkm.umkm_name}
              </h3>

              <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-full border border-amber-100">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="text-xs font-medium text-amber-700">{rating}</span>
                <span className="text-xs text-amber-600">({totalReviews})</span>
              </div>
            </div>

            <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
              {umkm.umkm_description.replace(/^"|"$/g, '')}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-50 border border-red-100">
                <MapPin className="w-4 h-4 text-red-500" />
              </div>
              <span className="flex-1 truncate">{umkm.umkm_address}</span>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 border border-blue-100">
                <Phone className="w-4 h-4 text-blue-500" />
              </div>
              <span className="flex-1 truncate">{umkm.umkm_phone_number}</span>
            </div>

            {umkm.umkm_social_media && (
              <div className="flex items-center gap-3 text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-50 border border-purple-100">
                  <Globe className="w-4 h-4 text-purple-500" />
                </div>
                <span className="flex-1 truncate">{umkm.umkm_social_media.replace(/^"|"$/g, '')}</span>
              </div>
            )}
          </div>

          <div className="pt-2">
           
          </div>
        </div>

        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div
            className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${getCategoryColor(umkm.umkm_category)} opacity-20 blur-xl`}
          />
        </div>

        <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-b from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>

      <div
        className={`absolute -inset-2 bg-gradient-to-r ${getCategoryColor(umkm.umkm_category)} rounded-3xl opacity-0 group-hover:opacity-10 transition-all duration-700 blur-xl -z-10`}
      />
    </div>
  )
})

UmkmCard.displayName = "UmkmCard"

export default UmkmCard
