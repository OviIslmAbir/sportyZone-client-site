import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";

const Banner = () => {

    const swiperRef = useRef(null);

    useEffect(() => {
      const swiperInstance = swiperRef.current.swiper;
  
      const interval = setInterval(() => {
        if (swiperInstance && swiperInstance.slideNext) {
          swiperInstance.slideNext();
        }
      }, 3000);
  
      return () => {
        clearInterval(interval);
      };
    }, []);
    return (
        <div className='container my-4'>
            <Swiper ref={swiperRef} navigation={true} modules={[Navigation]} className="mySwiper" autoplay loop>
                <SwiperSlide><img style={{height:"550px", width:"100%"}} src="img/banner-2.jpg" /></SwiperSlide>
                <SwiperSlide><img style={{height:"550px", width:"100%"}} src="img/banner-1.jpg" /></SwiperSlide>
                <SwiperSlide><img style={{height:"550px", width:"100%"}} src="img/banner-3.jpg" /></SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;