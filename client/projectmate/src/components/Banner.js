import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Mousewheel,Autoplay,Navigation } from 'swiper';
import "swiper/css"; //basic
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./css/Home.css"

SwiperCore.use([Navigation, Pagination,Autoplay]);

const Banner=()=> {
  const banner1 = "/banners/projectmate_banner1.png"
  const banner2 = "/banners/banner.svg";

    return (
      <div className='banner-container'>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        navigation
        pagination={{ clickable: true }}
        speed={2500}
        loop={true}
        autoplay={{ delay: 1300 }}
        >
        <SwiperSlide className='banner-content'><div className="test-text"><img className='banner-img' src={banner1} width="85%" height="500"/></div></SwiperSlide>
        <SwiperSlide className='banner-content'><div className="test-text"><img className='banner-img' src={banner2} width="100%" height="500" /></div></SwiperSlide>
      </Swiper>
      </div>
    );
  }
  
  export default Banner;