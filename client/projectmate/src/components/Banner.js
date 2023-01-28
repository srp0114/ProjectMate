import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Mousewheel,Autoplay,Navigation } from 'swiper';
import "swiper/css"; //basic
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../style.css"

SwiperCore.use([Navigation, Pagination,Autoplay]);

const Banner=()=> {
  const banner1 = "/banners/projectmate_banner1.png"
    return (
      <div className='banner-container'>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        navigation
        pagination={{ clickable: true }}
        speed={700}
        loop={true}
        autoplay={{ delay: 1300 }}
        >
        <SwiperSlide className='banner-content'><div className="test-text"><img className='banner-img' src={banner1} width="100%" height="500"/></div></SwiperSlide>
        <SwiperSlide className='banner-content'>슬라이드2</SwiperSlide>
        <SwiperSlide className='banner-content'>슬라이드3</SwiperSlide>
      </Swiper>
      </div>
    );
  }
  
  export default Banner;