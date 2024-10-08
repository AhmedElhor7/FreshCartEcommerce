import React, { useEffect, useState } from 'react';
import Style from './CategoriesSlider.module.css';
import Slider from "react-slick";
import axios from 'axios';
import { data } from 'autoprefixer';

export default function CategoriesSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1020, // For large screens (e.g., tablets or desktops)
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 766, // For medium screens (e.g., tablets)
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 639, // For mobile screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };


  const [allCategories, setAllCategories] = useState([]);

  function getAllCategories() {

    axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    .then(({data}) => {
      // console.log(data.data);
      setAllCategories(data.data);
      
    })
    .catch((error)=> {


    })
  }
   
  useEffect(() => {
    getAllCategories();
  
  }, [])
  

  return (
    <>
      <div className="py-6 px-6 container mx-auto text-center">
        <h2 className="py-4 text-2xl text-center lg:text-left font-bold">
          Shop Popubler Categorie
        </h2>
        <Slider {...settings}>
          {allCategories?.map((Categorie) => (
            <div
              key={Categorie?._id}
              className="text-center transform transition hover:-translate-y-6 duration-300 "
            >
              <img
                className="w-full h-60 md:w-4/5 rounded-lg"
                src={Categorie.image}
                alt={Categorie?.name}
              />
              <h2 className="py-4 px-4 text-xl  md:text-left  font-bold">
                {Categorie?.name}
              </h2>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
