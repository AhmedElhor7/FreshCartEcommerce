import React, { useContext, useEffect, useState } from "react";
import Style from "./RecentProducts.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { RingLoader } from "react-spinners";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishListContext } from "../../Context/WishListContext";




export default function RecentProducts() {

// Initialize product IDs from local storage
const getProductIdsFromLocalStorage = () => {
  const storedIds = localStorage.getItem('productIds');
  return storedIds ? JSON.parse(storedIds) : [];
};

  const [searchQuery, setSearchQuery] = useState("");


  // Function to handle voice recognition
  const handleVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;

      recognition.onstart = () => {
        console.log("Voice recognition started. Speak now.");
      };

      recognition.onspeechend = () => {
        recognition.stop();
        console.log("Voice recognition ended.");
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log("Voice input: ", transcript);
        setSearchQuery(transcript);
      };

      recognition.onerror = (event) => {
        console.error("Voice recognition error:", event.error);
      };

      recognition.start();
    } else {
      toast.error("Your browser does not support speech recognition.");
    }
  };

  const { addProductToCart, cartData, cartItemsNo, setCartItemsNo } =
    useContext(CartContext);

  const { wishList, addProductToWishList, removeProductFromWishList } =
    useContext(WishListContext);

  const [cuurnetProductId, setCuurnetProductId] = useState();
  const [loading, setLoading] = useState(false);

  const [productIdAlreadyAddedToCart, setProductIdAlreadyAddedToCart] =
  useState(getProductIdsFromLocalStorage());

    // Function to check if product is in the wishlist
    const isProductInWishlist = (productId) => wishList.includes(productId);

// Handle adding product to cart
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
    console.log(response);

    if (response.data.status === "success") {
      // Update the state with the new product ID
      setProductIdAlreadyAddedToCart((prevIds) => [...prevIds, productId]);
      setCartItemsNo(cartData.data.data.products.length + 1);
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
    toast.error("Failed to add product.");
  }
}

useEffect(() => {
  localStorage.setItem('productIds', JSON.stringify(productIdAlreadyAddedToCart));
}, [productIdAlreadyAddedToCart]);

  function getRecentProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, error, isError, isFetched, isLoading } = useQuery({
    queryKey: ["RecentProducts"],
    queryFn: getRecentProducts,
  });

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <RingLoader color="green" size={150} />
      </div>
    );
  }

  const filteredData = searchQuery
    ? data?.data.data.filter((product) =>
        product.category.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : data?.data.data;

  // console.log(filteredData);



  // Function to handle adding/removing product to/from wishlist
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

  return (
    <>
      <section>
        <div className="container mx-auto py-2">
          <div className="flex items-center w-9/12 mx-auto">
            <label htmlFor="voiceSearch" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-6 h-6 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 21 21"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="voiceSearch"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Categories With Your Voice"
                required
              />
              <button
                title="You Can Search Categories With Your Voice"
                type="button"
                className="absolute inset-y-0 end-0 flex items-center pe-3"
                onClick={handleVoiceSearch}
              >
                <svg
                  className="w-6 h-6 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" // Increased size here
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="row">
            {filteredData.map((product) => (
              <div key={product.id} className="xl:w-1/4 md:w-1/2 p-4">
                <div className="product hover:shadow-2xl hover:shadow-green-500 px-4">
                  <Link
                    to={`/productsdetails/${product.id}/${product.category.name}`}
                  >
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
                  </Link>
                  <div className="flex justify-between items-center py-4">
                    <button
                      onClick={() => callFnAddProductToCart(product.id)}
                      disabled={loading && product.id === cuurnetProductId}
                      className="flex justify-center items-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      <i className="fa-solid fa-cart-plus me-2"></i>
                      {loading && product.id === cuurnetProductId
                        ? "Adding..."
                        : "Add to Cart"}
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
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
