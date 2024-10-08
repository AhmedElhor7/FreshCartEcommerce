import React, { useContext, useEffect, useState } from 'react';
import Style from './WishList.module.css';
import { Helmet } from 'react-helmet';
import { WishListContext } from '../../Context/WishListContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { removeProductIdFromLocalStorage } from '../Utils/scrollUtils';

// Initialize product IDs from local storage
const getProductIdsFromLocalStorage = () => {
  const storedIds = localStorage.getItem('productIds');
  return storedIds ? JSON.parse(storedIds) : [];
};

export default function WishList() {
  

  const { getLoggedUserWishlist, removeProductFromWishList } =
    useContext(WishListContext);

    const { addProductToCart, setCartItemsNo } = useContext(CartContext);
  
const [loaderForRemove, setLoaderForRemove] = useState(false);
const [loading, setLoading] = useState(false);
  const [wishListCuurnetProductId, setwishListCuurnetProductId] = useState();
  const [productIdAlreadyAddedToCart, setProductIdAlreadyAddedToCart] =
    useState(getProductIdsFromLocalStorage());



  const [wishList, setWishList] = useState();

  async function callgetLoggedUserWishlist() {
    let response = await getLoggedUserWishlist();
    if (response.data.status === 'success') {
      setWishList(response.data)
    }
  }

    async function callFnAddProductToCart(productId) {
      setLoading(true);
      try {
        setwishListCuurnetProductId(productId);


       if (productIdAlreadyAddedToCart.includes(productId)) {
        toast.error(`Product is already added to the cart. If you need to increase the quantity, please go to the Cart`);
        setLoading(false);
         return; // Exit the function to prevent further processing
       }


        let response = await addProductToCart(productId);
        console.log(response);

        if (response.data.status === "success") {
          // Update the state with the new product ID
          setProductIdAlreadyAddedToCart((prevIds) => [...prevIds, productId]);
          setLoading(false);
          setCartItemsNo(response.data.numOfCartItems);

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

    async function callremoveProductFromWishList(productId) {
      setwishListCuurnetProductId(productId);
        setLoaderForRemove(true);
        // If product is already in wishlist, remove it
        let response = await removeProductFromWishList(productId);
        if (response.data.status === "success") {
          removeProductIdFromLocalStorage(productId);
          setLoaderForRemove(false)
          toast.success(response.data.message, {
            duration: 5000,
            position: window.innerWidth < 768 ? "top-center" : "right-top",
            style: { height: "5rem" },
          });
        } else {
          setLoaderForRemove(false);
          toast.error(
            response.data.message || "Failed to remove from wishlist"
          );
        }
    }

    useEffect(() => {
          callgetLoggedUserWishlist();
      // Store the current product IDs in local storage whenever they change
      localStorage.setItem(
        "productIds",
        JSON.stringify(productIdAlreadyAddedToCart)
      );
    }, [productIdAlreadyAddedToCart, wishList]);

  // console.log(wishList);
  
return (
  <>
    <Helmet>
      <title>Wishlist</title>
    </Helmet>

    <h2 className="text-4xl font-bold text-green-600 flex items-center justify-center pb-2  2xl:mt-28">
      Wishlist
    </h2>
    {wishList?.count == 0 ? (
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
          Your Wishlist is empty. Please add some products to proceed.{""}
          <a
            href="#"
            className="font-bold ps-6 underline hover:no-underline text-lg text-green-600"
          >
            <Link to={"/"}>Go To Home To Add Products To Wishlist</Link>
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
      <>
        <h3 className="pb-8 flex items-center justify-center pt-4">
          <span className="text-3xl">Total Items: {wishList?.count}</span>
        </h3>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400 text-center">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 text-lg">
                  Number Of Items
                </th>
                <th scope="col" className="px-6 py-3 text-lg">
                  Image
                </th>
                <th scope="col" className="px-6 py-3 text-lg">
                  Details
                </th>
                <th scope="col" className="px-6 py-3 text-lg">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-lg">
                  Rate
                </th>
                <th scope="col" className="px-6 py-3 text-lg">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-lg">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3 text-lg">
                  title
                </th>
                <th scope="col" className="px-6 py-3 text-lg">
                  Add To Cart
                </th>
                <th scope="col" className="px-6 py-3 text-lg">
                  Remove
                </th>
              </tr>
            </thead>
            <tbody className="font-medium text-gray-900">
              {wishList?.data?.map((item, itemIndex) => (
                <tr
                  key={item._id}
                  className={
                    itemIndex % 2 === 0
                      ? "bg-white dark:bg-gray-800"
                      : "bg-gray-200 dark:bg-gray-700"
                  }
                >
                  <th scope="row" className="px-6 py-4">
                    {itemIndex + 1}
                  </th>
                  <th scope="row" className="px-6 py-4">
                    <img
                      className="h-48 w-96"
                      src={item.imageCover}
                      alt={item.title}
                    />
                  </th>
                  <td className="px-6 py-4">{item.description}</td>
                  <td className="px-6 py-4">{item.price}</td>
                  <td className="px-6 py-4">{item.ratingsAverage}</td>
                  <td className="px-6 py-4">{item.updatedAt.slice(0, 10)}</td>
                  <td className="px-6 py-4">{item.quantity}</td>
                  <td className="px-6 py-4">{item.title}</td>
                  <td className="px-6 py-4">
                    <span>
                      {loading && wishListCuurnetProductId === item._id ? (
                        <i className="fas fa-spinner fa-spin text-3xl text-green-500"></i>
                      ) : (
                        <button
                          onClick={() => callFnAddProductToCart(item._id)}
                          className="btn btn-primary"
                        >
                          Add
                        </button>
                      )}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span>
                      {loaderForRemove &&
                      wishListCuurnetProductId === item._id ? (
                        <i className="fas fa-spinner fa-spin text-3xl text-green-500"></i>
                      ) : (
                        <span
                          onClick={() =>
                            callremoveProductFromWishList(item._id)
                          }
                          className="cursor-pointer font-bold text-red-600 dark:text-red-500 hover:underline"
                        >
                          Remove
                        </span>
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    )}
  </>
);

}
