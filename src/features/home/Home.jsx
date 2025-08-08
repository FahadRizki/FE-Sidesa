import { useEffect } from 'react'
import BannerSlider from './components/BannerSlider'
import VillageStats from './components/VillageStats'
import FeedbackLazy from './components/lazy-loads/FeedbackLazy'
import UmkmLazy from './components/lazy-loads/UmkmLazy'
import NewsLazy from './components/lazy-loads/NewsLazy'
import ProfilePreview from './components/ProfilePreview'
import ApbdesPreview from './components/ApbdesPreview'
import AOS from 'aos'
export default function Home() {

  useEffect(() => {
    AOS.refresh();
  }, []);

  useEffect(() => {
  AOS.init({
    duration: 1000,
    once: false, // ini penting! Agar AOS bisa animate lagi saat scroll
  });
}, []);

  return (
    <section>
        <div className='overflow-hidden'>
           <BannerSlider />
           <VillageStats />
            <NewsLazy />
            <UmkmLazy />
            <ApbdesPreview />
            <ProfilePreview />
            <FeedbackLazy />
        </div>
    </section>
  )
}
