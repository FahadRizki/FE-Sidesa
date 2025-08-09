import { useState, useEffect, useMemo } from 'react';
import { getBanners } from '../contentService';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { BASE_URL } from '../../../config';
import Aos from 'aos';
import 'aos/dist/aos.css';

export default function BannerSlider() {
  const [banners, setBanners] = useState([]);
  const [isClient, setIsClient] = useState(false); // Avoid hydration mismatch
     
  useEffect(() => {
    setIsClient(true);
    getBanners()
      .then(({ data }) => {
        setBanners(data.data || []);
        setTimeout(() => {
          Aos.refresh();
        }, 200); // beri jeda kecil agar DOM selesai render
      })
      .catch((err) => console.error(err));
  }, []);
   
  const hasBanners = banners && banners.length > 0;
   
  const renderSlides = useMemo(() => {
    return banners.map((item, index) => (
      <SwiperSlide key={item.id || index}>
        <div data-aos="zoom-in" className='relative w-full h-full'>
          <img
            src={`${BASE_URL}/public/storage/content_images/${item.image}`}
            alt={item.title || `Banner ${index + 1}`}
            width="1920"
            height="1080"
            className="w-full h-full object-cover"
            decoding="async"
            loading="eager" // Faster render for LCP
          />
          {/* Overlay gradient untuk readability text */}
          <div className="absolute inset-0 bg-black/20"></div>
          
          {/* Text content dengan positioning yang lebih baik */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4 sm:px-6 md:px-8 lg:px-12 max-w-4xl mx-auto">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-3 md:mb-4 lg:mb-6 leading-tight drop-shadow-2xl">
                {item.title}
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-light md:font-normal leading-relaxed drop-shadow-lg opacity-90">
                {item.content}
              </p>
            </div>
          </div>
        </div>
      </SwiperSlide>
    ));
  }, [banners]);
   
  if (!isClient || !hasBanners) return null;
   
  return (
    <div className="relative group w-full h-screen overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={banners.length > 1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation={{
          nextEl: '.next-btn',
          prevEl: '.prev-btn',
        }}
        pagination={{ 
          clickable: true,
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active'
        }}
        className="w-full h-full"
      >
        {renderSlides}
      </Swiper>
       
      {/* Navigation Arrows - Improved styling */}
      <button 
        className="prev-btn absolute top-1/2 -translate-y-1/2 left-4 sm:left-6 md:left-8 z-10 
                   opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out
                   bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white 
                   rounded-full p-2 sm:p-3 md:p-4 
                   w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
                   flex items-center justify-center
                   hover:scale-110 border border-white/20"
        aria-label="Previous slide"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        className="next-btn absolute top-1/2 -translate-y-1/2 right-4 sm:right-6 md:right-8 z-10 
                   opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out
                   bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white 
                   rounded-full p-2 sm:p-3 md:p-4 
                   w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
                   flex items-center justify-center
                   hover:scale-110 border border-white/20"
        aria-label="Next slide"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Custom Pagination Styling */}
      <style jsx>{`
        .swiper-pagination {
          bottom: 2rem !important;
        }
        
        .swiper-pagination-bullet {
          width: 12px !important;
          height: 12px !important;
          background: rgba(255, 255, 255, 0.5) !important;
          opacity: 1 !important;
          margin: 0 6px !important;
          transition: all 0.3s ease !important;
        }
        
        .swiper-pagination-bullet-active {
          background: white !important;
          transform: scale(1.2) !important;
        }
        
        @media (max-width: 640px) {
          .swiper-pagination {
            bottom: 1rem !important;
          }
          
          .swiper-pagination-bullet {
            width: 8px !important;
            height: 8px !important;
            margin: 0 4px !important;
          }
        }
      `}</style>
    </div>
  );
}