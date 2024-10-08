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

  useEffect(() => {
    setUserLogin(null); // Clear user login state on mount
  }, []);

  async function handelLogin(formikValues) {
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        formikValues
      );
      console.log(response);

      if (response.data.message === "success") {
        localStorage.setItem("userToken", response.data.token);
        setUserLogin(response.data.token); // Update the user login state
        navigate("/"); // Navigate after updating state
        window.location.reload(); 
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  const validateYup = Yup.object().shape({
    email: Yup.string()
      .email("Email Is Not Valid")
      .required("Email Is Required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])[A-Za-z0-9.@*]{6,11}$/,
        "Password must contain at least one uppercase letter and be between 6 to 11 characters long."
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

  return (
    <>
      <Helmet>
        <title>Login uuuuu</title>
      </Helmet>
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 green-color 2xl:mt-28">
          Login Now
        </h2>
        {errorMessage && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
            role="alert"
          >
            {errorMessage}
          </div>
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
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="userEmail"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600"
            >
              Email address
            </label>
          </div>
          {Formik.errors.email && Formik.touched.email && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              {Formik.errors.email}
            </div>
          )}
          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              value={Formik.values.password}
              type="password"
              name="password"
              id="userPassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="userPassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600"
            >
              Password
            </label>
          </div>
          {Formik.errors.password && Formik.touched.password && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              {Formik.errors.password}
            </div>
          )}
          <button
            type="submit"
            className="btn btn-primary text-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
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
