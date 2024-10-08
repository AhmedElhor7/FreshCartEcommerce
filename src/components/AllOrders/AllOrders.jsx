import React, { useContext, useEffect, useState } from "react";
import Style from "./AllOrders.module.css";
import { userContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function AllOrders() {



  const { userId } = useContext(userContext);
  const { getUserOrders, cartDataUpdate, cartData, setCartItemsNo } =
    useContext(CartContext);
  const [loader, setLoader] = useState(false);
  const [loaderForRemove, setLoaderForRemove] = useState(false);

  const [ordersCuurnetProductId, setOrdersCuurnetProductId] = useState();

  const [userOrders, setUserOrders] = useState();

  async function callGetUserOrder(userId) {
    let response = await getUserOrders(userId);

    if (response.statusText === "OK") {
      setUserOrders(response.data);
    }
  }

  useEffect(() => {
    callGetUserOrder(userId);
  }, [cartDataUpdate]);

  // console.log(userOrders);
  if (cartData.data.numOfCartItems === 0) {
    setCartItemsNo(0);
  }
  // console.log(cartData);
  

  return (
    <>
      <Helmet>
        <title>All Orders</title>
      </Helmet>
        <h2 className="text-4xl font-bold text-green-600 flex items-center justify-center pb-8 pt-16">
          All Orders
        </h2>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400 text-center">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 text-lg">
                  Counters
                </th>
                <th scope="col" className="px-6 py-3 text-lg">
                  Details
                </th>
                <th scope="col" className="px-6 py-3 text-lg">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3 text-lg">
                  City
                </th>
                <th scope="col" className="px-6 py-3 text-lg">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-lg">
                  Payment Method
                </th>
                <th scope="col" className="px-6 py-3 text-lg">
                  Quntity
                </th>
                <th scope="col" className="px-6 py-3 text-lg">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="font-medium text-gray-900">
              {userOrders?.map((order, index) => (
                <tr
                  key={order.id}
                  className={`border-b dark:border-gray-700 ${
                    index % 2 === 0
                      ? "bg-white dark:bg-gray-800"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {order.shippingAddress.details}
                  </th>
                  <td className="px-6 py-4">{order.shippingAddress.phone}</td>
                  <td className="px-6 py-4">{order.shippingAddress.city}</td>
                  <td className="px-6 py-4">{order.createdAt.slice(0, 10)}</td>
                  <td className="px-6 py-4">{order.paymentMethodType}</td>
                  <Link to={`/detailsOrders/${userId}/${order.id}`}>
                    <td
                      title={`You have ${order.cartItems.length} items in your cart. Click To Show.`}
                      className="px-6 py-4 mt-2 btn btn-primary cursor-pointer"
                    >
                      {order.cartItems.length}
                    </td>
                  </Link>
                  <td className="px-6 py-4">{order.totalOrderPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </>
  );
}
