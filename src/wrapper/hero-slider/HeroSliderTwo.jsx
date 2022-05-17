import React, { Fragment } from "react";



import HeroSliderTwoSingle from "../../component/hero-slider/HeroSliderTwoSingle";
const HeroSliderTwo = ({ photoDetail }) => {
    return (
        <Fragment>
            {" "}
            <HeroSliderTwoSingle photoDetail={photoDetail} />
        </Fragment>
        // <Swiper
        //   spaceBetween={0}
        //   centeredSlides={true}
        //   // autoplay={{
        //   //   delay: 5000,
        //   //   disableOnInteraction: false,
        //   // }}
        //   effect={"fade"}
        //   navigation={true}
        //   modules={[Autoplay, Pagination, Navigation]}
        //   className="mySwiper"
        // >
        //   <SwiperSlide>

        //   </SwiperSlide>

        // </Swiper>
    );
};

export default HeroSliderTwo;
