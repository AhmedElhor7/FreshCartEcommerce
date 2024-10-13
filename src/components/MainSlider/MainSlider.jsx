import React, { useEffect, useState } from 'react';
import Style from './MainSlider.module.css';
import slider1 from '../../assets/imges/slider-image-1-Dh9d2U6G.jpeg';
import slider2 from "../../assets/imges/slider-image-2-Xt88XJy9.jpeg";
import slider3 from "../../assets/imges/slider-image-3-BtMvVf4V.jpeg";
import Slider from "react-slick";


export default function MainSlider() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true, 
      arrows: false,
    };

  return (
    <>
      <div className="w-5/6 md:w-full container mx-auto pt-0 2xl:pt-28">
        <Slider {...settings}>
          <img
            loading="lazy"
            src={slider1}
            alt="Fresh Vegetables"
            className="w-full sm:h-[15rem] md:h-[35rem]"
          />
          <img
            loading="lazy"
            src={slider2}
            alt="Chocolate"
            className="w-full sm:h-[15rem] md:h-[35rem]"
          />
          <img
            loading="lazy"
            src={slider3}
            alt="cookies"
            className="w-full sm:h-[15rem] md:h-[35rem]"
          />
        </Slider>
      </div>
    </>
  );
}
