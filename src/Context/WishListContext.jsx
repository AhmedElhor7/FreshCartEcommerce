import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const WishListContext = createContext();

  // Utility to manage wishlist in localStorage
  const getWishListFromLocalStorage = () => {
    const storedWishList = localStorage.getItem("wishList");
    return storedWishList ? JSON.parse(storedWishList) : [];
  };

  const setWishListInLocalStorage = (wishList) => {
    localStorage.setItem("wishList", JSON.stringify(wishList));
  };

export default function WishListContextProvider(props) {
  let headers = {};

  if (localStorage.getItem("userToken")) {
    headers.token = localStorage.getItem("userToken");
  }



    const [wishList, setWishList] = useState(getWishListFromLocalStorage());

    // Whenever wishList changes, update localStorage
    useEffect(() => {
      setWishListInLocalStorage(wishList);
    }, [wishList]);

 async function addProductToWishList(productId) {
   try {
     const response = await axios.post(
       `https://ecommerce.routemisr.com/api/v1/wishlist`,
       { productId },
       { headers }
     );
     if (response.data.status === "success") {
       setWishList((prevWishList) => [...prevWishList, productId]);
     }
     return response;
   } catch (error) {
     return error.response;
   }
 }

 async function removeProductFromWishList(productId) {
   try {
     const response = await axios.delete(
       `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
       { headers }
     );
     if (response.data.status === "success") {
       setWishList((prevWishList) =>
         prevWishList.filter((id) => id !== productId)
       );
     }
     return response;
   } catch (error) {
     return error.response;
   }
 }

async function getLoggedUserWishlist() {
  try {
    const response = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      { headers }
    );
    return response; // Return the API response after it's received
  } catch (error) {
    return error.response; // Return the error response if the request fails
  }
}


  return (
    <WishListContext.Provider
      value={{
        wishList,
        setWishList,
        getWishListFromLocalStorage,
        setWishListInLocalStorage,
        addProductToWishList,
        removeProductFromWishList,
        getLoggedUserWishlist,
      }}
    >
      {props.children}
    </WishListContext.Provider>
  );
}
