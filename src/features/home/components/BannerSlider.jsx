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
          width="1280"
          height="680"
          className="w-full h-full object-cover"
          decoding="async"
          loading="eager" // Faster render for LCP
        />
        <div className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white px-4">
          <h3 className="text-md md:text-3xl xl:text-5xl font-bold drop-shadow-lg">
            {item.title}
          </h3>
          <p className="text-[10px] font-extralight md:text-sm md:font-normal xl:text-lg drop-shadow">
            {item.content}
          </p>
        </div>
       </div>
      </SwiperSlide>
    ));
  }, [banners]);

  if (!isClient || !hasBanners) return null;

  return (
    <div className="relative group w-full h-[400px] md:h-[825px] overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={banners.length > 1}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        navigation={{
          nextEl: '.next-btn',
          prevEl: '.prev-btn',
        }}
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {renderSlides}
      </Swiper>

      {/* Arrow button */}
      <button className="prev-btn absolute top-1/2 -translate-y-1/2 left-4 z-10 opacity-0 group-hover:opacity-100 transition duration-300 bg-black/50 text-white rounded-full p-2">
        ❮
      </button>
      <button className="next-btn absolute top-1/2 -translate-y-1/2 right-4 z-10 opacity-0 group-hover:opacity-100 transition duration-300 bg-black/50 text-white rounded-full p-2">
        ❯
      </button>
    </div>
  );
}
