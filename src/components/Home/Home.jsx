import React, { useEffect, useState } from 'react';
import Style from './Home.module.css';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import MainSlider from '../MainSlider/MainSlider';
import { Helmet } from 'react-helmet';
import RecentProducts from '../RecentProducts/RecentProducts';


export default function Home() {

    

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <MainSlider />
      <CategoriesSlider />
      <RecentProducts />
    </>
  );
}
