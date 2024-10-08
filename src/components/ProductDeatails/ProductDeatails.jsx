import React, { useContext, useEffect, useState } from 'react';
import Style from './ProductDeatails.module.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Products from '../Products/Products';
import Slider from "react-slick";
import { useQuery } from '@tanstack/react-query';
import { data } from "autoprefixer";
import { RingLoader } from "react-spinners";
import { scrollToTop } from '../Utils/scrollUtils';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { WishListContext } from '../../Context/WishListContext';

// Initialize product IDs from local storage
const getProductIdsFromLocalStorage = () => {
  const storedIds = localStorage.getItem('productIds');
  return storedIds ? JSON.parse(storedIds) : [];
};


export default function ProductDeatails() {

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true, 
  autoplaySpeed: 3000, 
};


  const { id, category } = useParams();

  const { addProductToCart , cartItemsNo , setCartItemsNo } = useContext(CartContext);
  const { wishList, addProductToWishList, removeProductFromWishList } =
    useContext(WishListContext);
  const [cuurnetProductId, setCuurnetProductId] = useState();
  const [productIdAlreadyAddedToCart, setProductIdAlreadyAddedToCart] =
  useState(getProductIdsFromLocalStorage());
  const [loading, setLoading] = useState(false);

  // Function to check if product is in the wishlist
  const isProductInWishlist = (productId) => wishList.includes(productId);

  async function callFnAddProductToCart(productId) {
    setLoading(true);
    try {

      if (productIdAlreadyAddedToCart.includes(productId)) {
        toast.error(`Product is already added to the cart. If you need to increase the quantity, please go to the Cart`);
        setLoading(false);
        return; // Exit the function to prevent further processing
      }

      setCuurnetProductId(productId);
      let response = await addProductToCart(productId);
      // console.log(response);

      if (response.data.status === "success") {
        // Update the state with the new product ID
        setProductIdAlreadyAddedToCart((prevIds) => [...prevIds, productId]);
        // Get Last Value Of Number Cart Items
        setCartItemsNo(response.data.numOfCartItems);
        setLoading(false);
        toast.success(response.data.message, {
          duration: 5000,
          position: window.innerWidth < 768 ? "top-center" : "right-top",
          style: { height: "5rem" },
        });
      } else {
        setLoading(false);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Failed to add product:", error);
      toast("Failed to add product.");
    }
  }

  useEffect(() => {
    scrollToTop();
    localStorage.setItem('productIds', JSON.stringify(productIdAlreadyAddedToCart));
  }, [productIdAlreadyAddedToCart]);

  function getProductDeatails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const { data, error, isError, isFetched, isLoading } = useQuery({
    queryKey: ["ProductDeatails", id],
    queryFn: () => getProductDeatails(id),
  });

  // console.log(data);

  function getRelatedCategory() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  const queryInfo = useQuery({
    queryKey: ["RelatedCategory"],
    queryFn: async () => {
      const response = await getRelatedCategory(); // Await the API call
      const allProduct = response.data.data; // Assuming response contains `data.data`
      // Filter the products based on category
      const relatedProduct = allProduct.filter(
        (Product) => Product.category.name === category
      );
      return relatedProduct; // Return the filtered products
    },
  });

    if (isLoading) {
      return (
        <div className="w-full  h-screen flex justify-center items-center">
          <RingLoader color="green" size={150} />
        </div>
      );
    }



    async function callAddProductToWishList(productId) {
      if (isProductInWishlist(productId)) {
        // If product is already in wishlist, remove it
        let response = await removeProductFromWishList(productId);
        if (response.data.status === "success") {
          toast.success(response.data.message, {
            duration: 5000,
            position: window.innerWidth < 768 ? "top-center" : "right-top",
            style: { height: "5rem" },
          });
        } else {
          toast.error(response.data.message || "Failed to remove from wishlist");
        }
      } else {
        // If product is not in wishlist, add it
        let response = await addProductToWishList(productId);
        if (response.data.status === "success") {
          toast.success(response.data.message, {
            duration: 5000,
            position: window.innerWidth < 768 ? "top-center" : "right-top",
            style: { height: "5rem" },
          });
        } else {
          toast.error(response.data.message || "Failed to add to wishlist");
        }
      }
    }

  // console.log(queryInfo.data); // Access the filtered products using queryInfo.data

  return (
    <>
      <Helmet>
        <title>Product Deatails</title>
      </Helmet>
      <div className="container mx-auto pt-5">
        <div className="row">
          <div className="w-full md:w-1/2 lg:w-1/4">
            <div className="md:pe-4 w-full">
              <Slider {...settings}>
                {data?.data.data.images.map((src) => (
                  <img
                    onClick={scrollToTop}
                    loading="lazy"
                    src={src}
                    alt={data?.data.data.title}
                    className="w-full"
                  />
                ))}
              </Slider>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-3/4 text-center md:text-start">
            <div>
              <h1 className="text-2xl leading-loose font-bold py-6">
                {data?.data.data.title}
              </h1>
              <h2 className=" text-green-500 font-normal uppercase text-2xl py-2">
                {data?.data.data?.category.name}
              </h2>
              <p>{data?.data.data?.description}</p>
              <div className="flex justify-between items-center pt-6">
                <span className="font-medium line-through text-gray-500 text-xl">
                  {data?.data.data?.price + 50} EGP
                </span>
                <span className="text-red-500 font-extrabold text-2xl">
                  {data?.data.data?.price} EGP
                </span>
                <span className="text-2xl">
                  {" "}
                  <i className="fa-solid fa-star text-yellow-200"></i>{" "}
                  <span>{data?.data.data?.ratingsAverage}</span>
                </span>
              </div>
              <div className="flex justify-between items-center pt-6">
                <button
                  onClick={() => callFnAddProductToCart(data?.data.data?.id)}
                  className="btn btn-primary w-4/5"
                >
                  <i className="fa-solid fa-cart-plus me-2"></i>
                  {loading ? "Adding..." : "Add to Cart"}
                </button>
                <button
                      key={data?.data.data?.id}
                      onClick={() => callAddProductToWishList(data?.data.data?.id)}
                      className="cursor-pointer"
                    >
                      <i
                        className={`fa-solid fa-heart text-3xl ${
                          isProductInWishlist(data?.data.data?.id)
                            ? "text-red-500"
                            : "text-gray-500"
                        }`}
                      ></i>
                    </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {queryInfo.data?.map((product) => (
            <div
              onClick={scrollToTop}
              key={product.id}
              className="xl:w-1/4 md:w-1/2 p-4"
            >
              <Link
                to={`/productsdetails/${product.id}/${product.category.name}`}
              >
                <div className="product hover:shadow-2xl hover:shadow-green-500 px-4">
                  <div>
                    <img
                      loading="lazy"
                      src={product.imageCover}
                      alt={product.title}
                      className="w-full"
                    />
                  </div>
                  <p className="font-normal text-green-500 uppercase py-2">
                    {product.category.name}
                  </p>
                  <h3 className="font-extrabold uppercase">
                    {product.title.split(" ", 2).join(" ")}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="font-medium line-through text-gray-500 text-xl">
                      {product.price + 50} EGP
                    </span>
                    <span className="text-red-500 font-extrabold">
                      {product.price} EGP
                    </span>
                    <span className="text-xl">
                      {" "}
                      <i className="fa-solid fa-star text-yellow-200"></i>{" "}
                      <span>{product.ratingsAverage}</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-4">
                    <button
                      onClick={() => callFnAddProductToCart(product.id)}
                      className="btn btn-primary"
                    >
                      <i className="fa-solid fa-cart-plus me-2"></i>
                      {loading ? "Adding..." : "Add to Cart"}
                    </button>
                    <button
                      key={product.id}
                      onClick={() => callAddProductToWishList(product.id)}
                      className="cursor-pointer"
                    >
                      <i
                        className={`fa-solid fa-heart text-3xl ${
                          isProductInWishlist(product.id)
                            ? "text-red-500"
                            : "text-gray-500"
                        }`}
                      ></i>
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
