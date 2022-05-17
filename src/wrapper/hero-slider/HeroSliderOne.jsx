import React from "react";
import { Autoplay, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import HeroSliderOneSingle from "../../component/hero-slider/HeroSliderOneSingle";
const HeroSliderOne = (props) => {
  return (
    <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect={"fade"}
       
        
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><HeroSliderOneSingle author="Tuấn Hoàng" title="Photosharing Website" srcImage="heroslideimage1.jpg"/></SwiperSlide>
        <SwiperSlide><HeroSliderOneSingle author="Tuấn Hoàng" title="Photosharing Website" srcImage="heroslideimage2.jpg"/></SwiperSlide>
      
        
      </Swiper>
  );
};



export default HeroSliderOne;
