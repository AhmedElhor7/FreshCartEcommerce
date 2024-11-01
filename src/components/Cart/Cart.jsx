import React, { useContext, useEffect, useState } from "react";
import Style from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { removeProductIdFromLocalStorage } from "../Utils/scrollUtils";
import { RingLoader } from "react-spinners";

// Initialize product IDs from local storage
const getProductIdsFromLocalStorage = () => {
  const storedIds = localStorage.getItem('productIds');
  return storedIds ? JSON.parse(storedIds) : [];
};



export default function Cart() {
  const {
    getLoggedUserCart,
    data,
    updateCartItemCount,
    deleteItemFromCart,
    deleteAllCart,
    setCartItemsNo,
  } = useContext(CartContext);
  const [loader, setLoader] = useState(false);
  const [loaderForRemove, setLoaderForRemove] = useState(false);
  const [loaderForRemoveAllCart, setLoaderForRemoveAllCart] = useState(false);
  const [loadingCart, setLoadingCart] = useState(true); // Added loading state

  const [cartCuurnetProductId, setCartCuurnetProductId] = useState();

  const [cart, setCart] = useState();
  const [productIdAlreadyAddedToCart, setProductIdAlreadyAddedToCart] =
    useState(getProductIdsFromLocalStorage());

  useEffect(() => {
    callLoggedUserCart();
  }, []);

  async function callLoggedUserCart() {
    setLoadingCart(true);

    try {
      let cartDataLoggedUser = await getLoggedUserCart();
      if (cartDataLoggedUser.data.status === "success") {
        setCart(cartDataLoggedUser.data.data);
      }
    } finally {
      setLoadingCart(false);
    }
  }

  // Render conditionally based on loadingCart state
  if (loadingCart) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <RingLoader color="green" size={150} />
      </div>
    );
  }

  async function CallUpdateCartItemCount(productId, count) {
    setCartCuurnetProductId(productId);
    // console.log(cartCuurnetProductId  , productId );
    setLoader(true);
    let responseOfUpdateCartItemCount = await updateCartItemCount(
      productId,
      count
    );
    if (responseOfUpdateCartItemCount?.data?.status === "success") {
      console.log(responseOfUpdateCartItemCount.data.data);

      setCart(responseOfUpdateCartItemCount.data.data);
      setCartItemsNo(responseOfUpdateCartItemCount.data.numOfCartItems);
      // Remove the product ID from the state and localStorage
      setProductIdAlreadyAddedToCart((prevIds) => {
        const updatedIds = prevIds.filter((id) => id !== productId);
        localStorage.setItem("productIds", JSON.stringify(updatedIds)); // Update localStorage
        return updatedIds;
      });
      toast.success("Quantity updated successfully", {
        duration: 5000,
        position: window.innerWidth < 768 ? "top-center" : "right-top",
        style: { height: "5rem" },
      });
      setLoader(false);
    } else {
      toast.error("Faild Update Quantity");
      setLoader(false);
    }
  }

  async function CalldeleteItemFromCart(productId) {
    setCartCuurnetProductId(productId);
    console.log(cartCuurnetProductId, productId);
    setLoaderForRemove(true);
    let responseOfDeleteItemFromCart = await deleteItemFromCart(productId);

    if (responseOfDeleteItemFromCart?.data?.status === "success") {
      setCart(responseOfDeleteItemFromCart.data.data);
      removeProductIdFromLocalStorage(productId);
      setCartItemsNo(responseOfDeleteItemFromCart.data.numOfCartItems);
      // Remove the product ID from the state and localStorage
      setProductIdAlreadyAddedToCart((prevIds) => {
        const updatedIds = prevIds.filter((id) => id !== productId);
        localStorage.setItem("productIds", JSON.stringify(updatedIds)); // Update localStorage
        return updatedIds;
      });
      toast.success("Item Deleted successfully", {
        duration: 5000,
        position: window.innerWidth < 768 ? "top-center" : "right-top",
        style: { height: "5rem" },
      });
      setLoaderForRemove(false);
    } else {
      toast.error("Faild Delete Item");
      setLoaderForRemove(false);
    }
  }

  async function CalldeleteAllCart() {
    setLoaderForRemoveAllCart(true);
    let responseOfDeleteAllCart = await deleteAllCart();
    if (responseOfDeleteAllCart?.statusText === "OK") {
      setCart(responseOfDeleteAllCart.data.data);
      localStorage.removeItem("productIds");
      setCartItemsNo(0);
      // Clear productIdAlreadyAddedToCart in state and localStorage
      setProductIdAlreadyAddedToCart([]);
      localStorage.removeItem("productIds"); // Remove the product IDs from localStorage
      toast.success("All Cart Deleted successfully", {
        duration: 5000,
        position: window.innerWidth < 768 ? "top-center" : "right-top",
        style: { height: "5rem" },
      });
      setLoaderForRemoveAllCart(false);
      callLoggedUserCart();
    } else {
      toast.error("Faild Delete All Cart");
      setLoaderForRemoveAllCart(false);
    }
  }

  if (cart?.products?.length === 0) {
    setCartItemsNo(0);
  }

  // console.log(cart);

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <h2 className="text-4xl font-bold text-green-600 flex items-center justify-center pb-2 2xl:mt-28 ">
        Shopping Cart
      </h2>
      {cart?.products?.length === 0 ? (
        <div
          id="alert-border-3"
          className="flex items-center p-6 mt-5   mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800"
          role="alert"
        >
          <svg
            className="flex-shrink-0 w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <div className="ms-3 text-xl font-bold">
            Your cart is empty. Please add some products to proceed.{""}
            <a
              href="#"
              className="font-bold ps-6 underline hover:no-underline text-lg text-green-600"
            >
              <Link to={"/"}>Go To Home To Add Products</Link>
            </a>
          </div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
            data-dismiss-target="#alert-border-3"
            aria-label="Close"
          ></button>
        </div>
      ) : (
        <div className="relative overflow-auto shadow-md sm:rounded-lg container mx-auto w-full lg:w-9/12 text-center pt-10">
          <h3 className="pb-2 flex items-center justify-center pt-2">
            <span className="text-3xl">
              {" "}
              Total Cart Price : {cart?.totalCartPrice} EGP
            </span>
          </h3>
          <h4 className="pb-8 flex items-center justify-center pt-4">
            <span className="text-3xl">
              {" "}
              Total Cart Items : {cart?.products.length}
            </span>
          </h4>
          <table className="text-sm w-full text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cart?.products?.map((product, index) => (
                <tr
                  key={product._id}
                  className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ${
                    index % 2 === 0
                      ? "bg-white dark:bg-gray-800"
                      : "bg-gray-300 dark:bg-gray-700"
                  }`}
                >
                  <td className="p-4">
                    <img
                      src={product.product.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt={product.product.title}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.totalCartPrice}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {cartCuurnetProductId === product.product.id && loader ? (
                        <i className="fas fa-spinner fa-spin text-3xl text-green-500"></i>
                      ) : (
                        <>
                          {" "}
                          <button
                            onClick={() =>
                              CallUpdateCartItemCount(
                                product.product.id,
                                product.count - 1
                              )
                            }
                            className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 1h16"
                              />
                            </svg>
                          </button>
                          <div>
                            <span className="font-bold text-xl">
                              {product.count}
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              CallUpdateCartItemCount(
                                product.product.id,
                                product.count + 1
                              )
                            }
                            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                    {product.price} EGP
                  </td>
                  <td className="px-6 py-4">
                    {loaderForRemove &&
                    cartCuurnetProductId === product.product.id ? (
                      <i className="fas fa-spinner fa-spin text-3xl text-green-500"></i>
                    ) : (
                      <>
                        <span
                          onClick={() =>
                            CalldeleteItemFromCart(product.product.id)
                          }
                          className="cursor-pointer font-bold text-red-600 dark:text-red-500 hover:underline"
                        >
                          Remove
                        </span>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {cart?.products.length > 0 ? (
        <div>
          <Link to={`/checkout/${cart._id}`}>
            <div className="flex justify-center items-center pt-12">
              <button className="btn btn-primary w-9/12">
                <span className="text-xl font-semibold"> CheckOut </span>
              </button>
            </div>
          </Link>

          <div className="flex justify-center items-center py-10">
            <button
              onClick={CalldeleteAllCart}
              className="btn btn-red sm:w-2/3 md:w-2/4"
              disabled={loaderForRemoveAllCart}
            >
              {loaderForRemoveAllCart ? (
                <i className="fas fa-spinner fa-spin text-3xl text-green-500"></i>
              ) : (
                <span className="font-semibold text-lg">Clear All Cart</span>
              )}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
