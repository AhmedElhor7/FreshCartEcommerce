import React, { useContext, useEffect, useState } from 'react';
import Style from './Checkout.module.css';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { CartContext } from '../../Context/CartContext';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import CalldeleteAllCart from '../Cart/Cart.jsx'
import { Helmet } from 'react-helmet';
export default function Checkout() {
 const egyptianCities = [
   "Cairo",
   "Alexandria",
   "Giza",
   "Shubra El-Kheima",
   "Port Said",
   "Suez",
   "Mansoura",
   "El-Mahalla El-Kubra",
   "Tanta",
   "Asyut",
   "Fayoum",
   "Zagazig",
   "Ismailia",
   "Kafr El Sheikh",
   "Assuan",
   "Damanhur",
   "Luxor",
   "Qena",
   "Beni Suef",
   "Sohag",
   "Hurghada",
   "Shibin El Kom",
   "Banha",
   "Arish",
   "Mallawi",
   "10th of Ramadan City",
   "6th of October City",
   "Obour City",
   "Sadat City",
   "New Cairo",
   "Sharm El-Sheikh",
   "El Minya",
   "Damietta",
   "Qalyub",
   "Qus",
   "Rosetta",
   "New Valley",
   "Matrouh",
   "North Sinai",
   "South Sinai",
 ];

 const { createOrderForPay, cartDataCreateCashOrder, cartErrorCreateCashOrder } =
   useContext(CartContext);
   const { cartId } = useParams();
   const [loaderForPayment, setLoaderForPayment] = useState(false);
   const [paymentOnline, setPaymentOnline] = useState(false);
   const navigate = useNavigate();

   async function handelPayment() {
    try {
      let url = `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`;
      setLoaderForPayment(true);
      
      // Check if payment is online and adjust the URL accordingly
      if (paymentOnline) {
        // Encode the URL to ensure compatibility with the payment API
        const returnUrl = encodeURIComponent("https://ahmedelhor7.github.io/FreshCartEcommerce#");
        url = `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${returnUrl}`;
      }
      
      // Await the API response
      let response = await createOrderForPay(url, Formik.values);
  
      // Safely check if the response contains the necessary data
      if (response?.data?.status === "success") {
        localStorage.removeItem('productIds'); // Remove the product IDs from localStorage

        // console.log(response?.data.session?.url);

        // Handle online payment
        if (paymentOnline && response?.data?.session?.url) {
          window.location.href = response?.data?.session?.url; 
        } else {
          navigate("/allorders");
        }

        // Show success toast
        toast.success("Order created successfully", {
          duration: 5000,
          position: window.innerWidth < 768 ? "top-center" : "right-top",
          style: { height: "5rem" },
        });
      } else {
        // Show error toast with the message from the response
        toast.error(response?.response?.data?.message || "Order creation failed", {
          duration: 5000,
          position: window.innerWidth < 768 ? "top-center" : "right-top",
          style: { height: "5rem" },
        });
      }
    } catch (error) {
      // Log and show an error message in case of exceptions
      console.error("Error creating order:", error);
      toast.error("An error occurred while creating the order");
    } finally {
      // Set loader to false after completion
      setLoaderForPayment(false);
    }
  }

  const validateYup = Yup.object().shape({
    details: Yup.string()
      .min(3, "details Atleast 3 Char")
      .max(50, "details Max 50 Char")
      .required("details Is Required"),
    phone: Yup.string()
      .trim() // Ensures no extra whitespace
      .matches(/^01[1250]\d{8}$/, "Must Add Egyptian Number")
      .required("Phone Is Required"),
      city: Yup.string().required("city Is Required"),
  });

      const Formik = useFormik({
        initialValues: {
          details: "",
          phone: "",
          city: "",
        },
        validationSchema: validateYup,
        onSubmit: handelPayment,
      });



  return (
    <>
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      <div className="container mx-auto py-6">
        <h2 className="text-4xl font-bold text-green-600 pb-6 pt-8 2xl:mt-28  text-center">
          Checkout
        </h2>
        <form onSubmit={Formik.handleSubmit}>
          {/* Show Alert If Touch Input And Not Write Any Value Or Not Target Reg Exprtion  */}
          <div className="relative z-0 w-2/4 mx-auto pb-4 group">
            <input
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              value={Formik.values.details}
              type="text"
              name="details"
              id="userDetails"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="userDetails"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              details
            </label>
          </div>

          {Formik.errors.details && Formik.touched.details ? (
            <div
              className="mx-auto w-2/4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {Formik.errors.details}
            </div>
          ) : null}

          <div className="relative z-0 w-2/4 mx-auto pb-4 group">
            <input
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              value={Formik.values.phone}
              type="tel"
              name="phone"
              id="userPhone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="userPhone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone
            </label>
          </div>

          {Formik.errors.phone && Formik.touched.phone ? (
            <div
              className="mx-auto w-2/4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {Formik.errors.phone}
            </div>
          ) : null}

          <div className="relative z-0 w-2/4 mx-auto pb-4 group">
            <input
              list="egyptianCitiesList" // Link to datalist ID
              name="city"
              id="userCity"
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              value={Formik.values.city}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=""
            />
            <datalist id="egyptianCitiesList">
              {egyptianCities.map((city) => (
                <option key={city} value={city} />
              ))}
            </datalist>
            <label
              htmlFor="userCity"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              city
            </label>
          </div>

          {Formik.errors.city && Formik.touched.city ? (
            <div
              className="mx-auto w-2/4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {Formik.errors.city}
            </div>
          ) : null}

          <div className="flex justify-center items-center py-6 text-2xl font-bold">
            <div className="checkbox-wrapper-19">
              <input
                type="checkbox"
                id="onlinePayment"
                onChange={() => setPaymentOnline(!paymentOnline)}
              />
              <label htmlFor="onlinePayment" className="check-box"></label>
              <span className="ps-2">Online Payment</span>
            </div>
          </div>
          <div className="flex justify-center items-center">
            {loaderForPayment ? (
              <i className="fas fa-spinner fa-spin text-3xl text-green-500"></i>
            ) : (
              <button
                onClick={CalldeleteAllCart}
                type="submit"
                className=" text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm sm:w-1/3 w-2/4 px-10 py-3 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                {paymentOnline ? (
                  <span>Cash Online</span>
                ) : (
                  <span>Cash On Delviry</span>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
