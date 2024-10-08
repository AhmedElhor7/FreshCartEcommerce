import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useState } from "react";
import { RingLoader } from "react-spinners";

export const CartContext = createContext();

export default function CartContextProvider(props) {
  const queryClient = useQueryClient();
  const [cartItemsNo, setCartItemsNo] = useState();

  let headers = {};

  if (localStorage.getItem("userToken")) {
    headers.token = localStorage.getItem("userToken");
  }

  async function addProductToCart(productId) {
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        { headers }
      );

      // Refetch the cart data after adding the product
      queryClient.invalidateQueries(["YourCart"]);

      return response;
    } catch (error) {
      console.error("Error adding product to cart:", error);
      return error;
    }
  }

  const {
    data: cartData,
    error: cartError,
    isLoading: cartIsLoading,
  } = useQuery({
    queryKey: ["YourCart"],
    queryFn: getLoggedUserCart,
  });

  async function updateCartItemCount(productId, count) {
    try {
      const response = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers }
      );

      // Refetch the cart data after adding the product
      queryClient.invalidateQueries(["UpdateCart"]);

      setCartItemsNo(cartDataUpdate.data.numOfCartItems);

      return response;
    } catch (error) {
      console.error("Error Updating product to cart:", error);
      return error;
    }
  }

  const { data: cartDataUpdate, error: cartErrorUpdate , isLoading:cartLoadingUpdate } = useQuery({
    queryKey: ["UpdateCart"],
    queryFn: getLoggedUserCart,
  });

  async function deleteItemFromCart(productId) {
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers }
      );

      // Refetch the cart data after adding the product
      queryClient.invalidateQueries(["DeleteCart"]);

      return response;
    } catch (error) {
      console.error("Error Deleting Item From cart:", error);
      return error;
    }
  }

  const {
    data: deletecartData,
    error: deletecartError,
    isLoading: deletecartIsLoading,
  } = useQuery({
    queryKey: ["DeleteCart"],
    queryFn: getLoggedUserCart,
  });

  async function deleteAllCart() {
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { headers }
      );

      // Refetch the cart data after adding the product
      queryClient.invalidateQueries(["DeleteAllCart"]);

      return response;
    } catch (error) {
      console.error("Error Deleting All cart:", error);
      return error;
    }
  }

  const {
    data: deleteAllcartData,
    error: deleteAllcartError,
    isLoading: deleteAllcartIsLoading,
  } = useQuery({
    queryKey: ["DeleteAllCart"],
    queryFn: getLoggedUserCart,
  });

  async function createOrderForPay(url, shippingAddress) {
    try {
      const response = await axios.post(url, { shippingAddress }, { headers });

      // Refetch the cart data after adding the product
      queryClient.invalidateQueries(["CreateCashOrder"]);

      return response;
    } catch (error) {
      console.error("Error Create Cash Order :", error);
      return error;
    }
  }

  const { data: cartDataCreateCashOrder, error: cartErrorCreateCashOrder , isLoading:cartLoadingCreateCashOrder } =
    useQuery({
      queryKey: ["CreateCashOrder"],
      queryFn: getLoggedUserCart,
    });

  function getLoggedUserCart() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers,
    });
  }

  const { data, error, isError, isFetched, isLoading } = useQuery({
    queryKey: ["YourCart"],
    queryFn: getLoggedUserCart,
    refetchOnWindowFocus: false,
  });

  function getUserOrders(userId) {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
    );
  }

  const { data: userOrdersData, isLoading: userOrdersLoading } = useQuery({
    queryKey: ["UserOrders"],
    queryFn: getLoggedUserCart,
    refetchOnWindowFocus: false,
  });


    function getRecentProductsFromCartContext() {
      return axios.get("https://ecommerce.routemisr.com/api/v1/products");
    }


    

  if (isLoading || userOrdersLoading  ) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <RingLoader color="green" size={150} />
      </div>
    );
  }
  return (
    <CartContext.Provider
      value={{
        getLoggedUserCart,
        data,
        error,
        addProductToCart,
        cartData,
        updateCartItemCount,
        cartDataUpdate,
        cartErrorUpdate,
        cartIsLoading,
        deleteItemFromCart,
        deleteAllCart,
        createOrderForPay,
        cartDataCreateCashOrder,
        cartErrorCreateCashOrder,
        getUserOrders,
        userOrdersData,
        cartItemsNo,
        setCartItemsNo,
        getRecentProductsFromCartContext,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
