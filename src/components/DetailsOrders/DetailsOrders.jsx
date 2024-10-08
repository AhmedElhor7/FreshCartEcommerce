import React, { useContext, useEffect, useState } from "react";
import Style from "./DetailsOrders.module.css";
import { useParams } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";

export default function DetailsOrders() {
  const { getUserOrders } = useContext(CartContext);

  const [userOrdersDetails, setUserOrdersDetails] = useState();

  const { itemsId, userId } = useParams();
  console.log(itemsId);

  async function callGetUserOrder(userId) {
    let response = await getUserOrders(userId);

    if (response.status == 200) {
      setUserOrdersDetails(response.data);
    } 
  }

  useEffect(() => {
    callGetUserOrder(userId);
  }, [userId]);

  console.log(userOrdersDetails);

  return (
    <>
        <Helmet>
                <title>Deatials Orders</title>
            </Helmet>
      <div className="container mx-auto py-10">
        <h2 className="text-4xl font-bold text-green-600 flex items-center justify-center pb-8 pt-4">
          All Orders Details
        </h2>

        <h3 className="text-4xl font-bold  flex items-center justify-center pb-8 pt-4">
          Total Price :{" "}
          {
            userOrdersDetails?.find((totalPrice) => totalPrice.id == itemsId)
              .totalOrderPrice
          }
        </h3>
        <h4 className="text-3xl font-bold  flex items-center justify-center pb-8 pt-4">
          Total Number Of Items :{" "}
          {
            userOrdersDetails?.find((totalPrice) => totalPrice.id == itemsId)
              .cartItems.length
          }
        </h4>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm  rtl:text-right text-gray-500 dark:text-gray-400 text-center">
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
                  rate
                </th>
                <th scope="col" className="px-6 py-3 text-lg">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-lg">
                  Payment Method
                </th>
                <th scope="col" className="px-6 py-3 text-lg">
                  isDelivered
                </th>
                <th scope="col" className="px-6 py-3 text-lg">
                  isPaid
                </th>
                <th scope="col" className="px-6 py-3 text-lg">
                  Tax Price
                </th>
                <th scope="col" className="px-6 py-3 text-lg">
                  Shipping Price
                </th>
              </tr>
            </thead>
            <tbody className="font-medium text-gray-900">
              {userOrdersDetails
                ?.filter((order) => order.id == itemsId) // Filter orders by itemsId
                .map(
                  (
                    filteredOrder,
                    index // Map over the filtered order
                  ) =>
                    filteredOrder.cartItems.map(
                      (
                        item,
                        itemIndex // Map over cartItems within the filtered order
                      ) => (
                        <tr
                          key={item.id}
                          className={
                            itemIndex % 2 === 0
                              ? "bg-white dark:bg-gray-800"
                              : "bg-gray-200  dark:bg-gray-700"
                          }
                        >
                          <th scope="row" className="px-6 py-4">
                            {itemIndex + 1}
                          </th>
                          <th scope="row" className="px-6 py-4">
                            <img
                              className="h-48 w-96"
                              src={item.product.imageCover}
                              alt={item.product.title}
                            />
                          </th>
                          <td className="px-6 py-4  ">{item.product.title}</td>

                          <td className="px-6 py-4">{item.price}</td>
                          <td className="px-6 py-4">
                            {item.product.ratingsAverage}
                          </td>
                          <td className="px-6 py-4">
                            {filteredOrder.updatedAt.slice(0, 10)}
                          </td>
                          <td className="px-6 py-4">
                            {filteredOrder.paymentMethodType}
                          </td>
                          <td className="px-6 py-4">
                            {filteredOrder.isDelivered
                              ? "Delivered"
                              : "Not Delivered"}
                          </td>
                          <td className="px-6 py-4">
                            {filteredOrder.isPaid ? "Paid" : "Not Paid"}
                          </td>

                          <td className="px-6 py-4">
                            {filteredOrder.taxPrice}
                          </td>
                          <td className="px-6 py-4">
                            {filteredOrder.shippingPrice}
                          </td>
                        </tr>
                      )
                    )
                )}
              {userOrdersDetails?.every((order) => order.id != itemsId) && ( // Check if no orders matched
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center">
                    Not Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
