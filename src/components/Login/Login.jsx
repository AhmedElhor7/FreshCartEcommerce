/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useEffect, useState } from "react";
import Style from "./Login.module.css";
import { Formik, useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../Context/UserContext";
import { Helmet } from "react-helmet";

export default function Login() {

  const { userLogin, setUserLogin } = useContext(userContext);


  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handelLogin(formikValues) {
    setIsLoading(true);

    console.log(formikValues);
    const { data } = axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", formikValues)
      .then((response) => {
        // console.log(response);

        // console.log(data);

        localStorage.setItem("userToken", response.data.token);
        setUserLogin(response.data.token);
        // console.log(userLogin);
        
        setIsLoading(false);
        navigate('/')
      })
      .catch((error) => {
        // console.log(error);

        setErrorMessage(error.response.data.message);

        // console.log(data);

        setIsLoading(false);
      });

    // console.log(data);
  }

    const validateYup = Yup.object().shape({
      email: Yup.string()
        .email("Email Is Not Valid")
        .required("Email Is Required"),
      password: Yup.string()
        .matches(
          /^[A-Z][a-z0-9]{5,10}$/,
          "Password Must Begin Upper Char And Between 5 To 10 Char"
        )
        .required("Password Is Required"),
    });

  const Formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validateYup,
    onSubmit: handelLogin,
  });


useEffect(() => {
  setUserLogin(null);


}, [userLogin])


  return (
    <>
      <Helmet>
                <title>Login</title>
            </Helmet>
      <div className="py-14 max-w-xl mx-auto ">
        <h2 className="text-3xl font-bold mb-6 pt-5 green-color">Login Now</h2>
        {errorMessage ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {errorMessage}
          </div>
        ) : (
          ""
        )}

        <form onSubmit={Formik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              value={Formik.values.email}
              type="email"
              name="email"
              id="userEmail"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="userEmail"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>
          {Formik.errors.email && Formik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {Formik.errors.email}
            </div>
          ) : null}
          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              value={Formik.values.password}
              type="password"
              name="password"
              id="userPassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="userPassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>
          {Formik.errors.password && Formik.touched.password ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {Formik.errors.password}
            </div>
          ) : null}
          <button
            type="submit"
            className="btn btn-primary text-white  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
          </button>
          <div>
            <p>
              Don't have an account?
              <span className="text-xl px-2 cursor-pointer green-color">
                <Link to={"/Register"}>Register Now</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
