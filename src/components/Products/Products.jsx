import React, { useEffect, useState } from 'react';
import Style from './Products.module.css';
import { Helmet } from 'react-helmet';
import RecentProducts from "../RecentProducts/RecentProducts";

export default function Products() {

  
  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <h2 className="text-4xl font-bold text-green-600 flex items-center justify-center pb-6 pt-16">
        Products
      </h2>
      <RecentProducts></RecentProducts>
    </>
  );
}
