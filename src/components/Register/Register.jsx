import React, { useContext, useEffect, useState } from "react";
import Style from "./Register.module.css";
import { Formik, useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../Context/UserContext";
import { Helmet } from "react-helmet";

export default function Register() {
  const { setUserLogin, userLogin } = useContext(userContext);

  const validateYup = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name Atleast 3 Char")
      .max(10, "Name Max 10 Char")
      .required("Name Is Required"),
    email: Yup.string()
      .email("Email Is Not Valid")
      .required("Email Is Required"),
    phone: Yup.string()
      .trim() // Ensures no extra whitespace
      .matches(/^01[1250]\d{8}$/, "Must Add Egyptian Number")
      .required("Phone Is Required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])[A-Za-z0-9.@*]{6,11}$/,
        "Password must contain at least one uppercase letter and be between 6 to 11 characters long."
      )
      .required("Password Is Required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Repassword Must Same Password")
      .required("Repassword Is Required"),
  });

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handelRegister(formikValues) {
    setIsLoading(true);

    // console.log(formikValues);
    const { data } = axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", formikValues)
      .then((response) => {
        if (response.data.message === "success") {
          // console.log(response);

          // console.log(data);
          localStorage.setItem("userToken", response.data.token);
          setUserLogin(response.data.token);

          // console.log(userLogin);

          setIsLoading(false);
          navigate("/");
          window.location.reload();
        }
      })
      .catch((error) => {
        // console.log(error);

        setErrorMessage(error.response.data.message);

        // console.log(data);

        setIsLoading(false);
      });

    // console.log(data);
  }

  const Formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema: validateYup,
    onSubmit: handelRegister,
  });

  useEffect(() => {
    setUserLogin(null);
  }, [userLogin]);

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="container mx-auto md:w-1/2">
        <h2 className="text-3xl font-bold mb-6 green-color text-center md:text-start  2xl:mt-28">
          Register Now
        </h2>
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
          <div className="relative z-0 w-3/4 md:w-full mx-auto mb-5 group">
            <input
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              value={Formik.values.name}
              type="text"
              name="name"
              id="userName"
              className="block py-2.5 px-0 w-full text-sm text-gray-900  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="userName"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Name{" "}
            </label>
          </div>
          {/* Show Alert If Touch Input And Not Write Any Value Or Not Target Reg Exprtion  */}
          {Formik.errors.name && Formik.touched.name ? (
            <div
              className="p-4 mb-4 text-sm text-red-800  w-3/4 md:w-full mx-auto rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {Formik.errors.name}
            </div>
          ) : null}
          <div className="relative z-0 w-3/4 md:w-full mx-auto mb-5 group">
            <input
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              value={Formik.values.phone}
              type="text"
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
              className="p-4 mb-4 text-sm text-red-800 w-3/4 md:w-full mx-auto rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {Formik.errors.phone}
            </div>
          ) : null}

          <div className="relative z-0 w-3/4 md:w-full mx-auto mb-5 group">
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
              className="p-4 mb-4 text-sm text-red-800 w-3/4 md:w-full mx-auto rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {Formik.errors.email}
            </div>
          ) : null}
          <div className="relative z-0 w-3/4 md:w-full mx-auto mb-5 group">
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
              className="p-4 mb-4 text-sm text-red-800 w-3/4 md:w-full mx-auto rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {Formik.errors.password}
            </div>
          ) : null}
          <div className="relative z-0 w-3/4 md:w-full mx-auto mb-5 group">
            <input
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              value={Formik.values.rePassword}
              type="password"
              name="rePassword"
              id="userRepassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="userRepassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Re Password
            </label>
          </div>
          {Formik.errors.rePassword && Formik.touched.rePassword ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 w-3/4 md:w-full mx-auto rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {Formik.errors.rePassword}
            </div>
          ) : null}
          <div className="text-center md:text-start">
            <button
              type="submit"
              className="btn btn-primary  font-medium rounded-lg text-sm w-3/4 md:w-full mx-auto  px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "Submit"
              )}
            </button>
          </div>
          <div className="text-center md:text-start py-2">
            <p>
              Have an account?
              <span className="text-xl px-2 cursor-pointer green-color">
                <Link to="/Login">Login Now</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
