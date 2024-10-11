import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { userContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import { scrollToTop } from "../Utils/scrollUtils";

export default function Navbar() {

useEffect(() => {
  scrollToTop();
  const darkMode = localStorage.getItem("darkMode");
  if (darkMode === "true") {
    document.body.classList.add("dark");
    document.body.classList.add("dark-mode-active"); // Ensure this class is added
  }
}, []);

const handleToggleDarkMode = () => {
  const isDarkMode = document.body.classList.toggle("dark");
  document.body.classList.toggle("dark-mode-active"); // Toggle custom class for dark mode
  localStorage.setItem("darkMode", isDarkMode); // Store the preference in localStorage
};

  const { userLogin, setUserLogin } = useContext(userContext);  
  const { cartItemsNo } = useContext(CartContext);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  function logOut() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
  }

  return (
    <>
      <nav
        onClick={scrollToTop}
        className="2xl:fixed 2xl:w-full 2xl:top-0 2xl:left-0 2xl:right-0 2xl:z-50 bg-green-100 border-gray-200 dark:bg-gray-900 dark:text-white mt-6 pb-6 py-4"
      >
        <div className="  flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex justify-center items-center dark:bg-gray-800">
            <button
              onClick={handleToggleDarkMode}
              className="h-12 w-12 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {/* Sun Icon (Visible in Light Mode) */}
              <svg
                className="fill-violet-700 block dark:hidden"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>

              {/* Moon Icon (Visible in Dark Mode) */}
              <svg
                className="fill-yellow-500 hidden dark:block"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Logo Section */}
          <Link
            to={"/"}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <i className="fa-solid fa-cart-shopping green-color text-4xl"></i>
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              FreshCart
            </span>
          </Link>
          {/* Burger Menu Button (Mobile) */}
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg 2xl:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          {/* Navigation Section */}
          <div
            className={`flex items-center w-full 2xl:block 2xl:w-auto dark:text-white ${
              isOpen ? "block" : "hidden"
            }`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col 2xl:flex-row 2xl:items-center 2xl:space-x-8 rtl:space-x-reverse">
              {userLogin && (
                <>
                  <li className="text-3xl text-slate-900 dark:text-white font-light py-1">
                    <NavLink to={""}>Home</NavLink>
                  </li>
                  <li className="text-3xl text-slate-900 dark:text-white font-light py-1">
                    <NavLink to={"cart"}>Cart</NavLink>
                  </li>
                  <li className="text-3xl text-slate-900 dark:text-white font-light py-1">
                    <NavLink to={"products"}>Products</NavLink>
                  </li>
                  <li className="text-3xl text-slate-900 dark:text-white font-light py-1">
                    <NavLink to={"brands"}>Brands</NavLink>
                  </li>
                  <li className="text-3xl text-slate-900 dark:text-white font-light py-1">
                    <NavLink to={"categories"}>Categories</NavLink>
                  </li>
                  <li className="text-3xl text-slate-900 dark:text-white font-light py-1">
                    <NavLink to={"wishlist"}>WishList</NavLink>
                  </li>
                  <li className="text-3xl text-slate-900 dark:text-white font-light py-1">
                    <NavLink to={"allorders"}>Orders</NavLink>
                  </li>
                  <li className="text-3xl text-slate-900 dark:text-white font-light py-1">
                    <NavLink to={"datasummarychart"}>Chart</NavLink>
                  </li>
                  <li className="relative text-3xl text-slate-900 dark:text-white font-light pt-3 pe-2">
                    <Link to={"cart"}>
                      <div className="relative inline-block">
                        <i className="fa-solid fa-cart-arrow-down text-4xl"></i>
                        <span className="absolute top-0 right-0 bg-red-600 text-white font-semibold rounded-full text-lg px-3 -me-8 -mt-4">
                          {cartItemsNo}
                        </span>
                      </div>
                    </Link>
                  </li>
                </>
              )}

              {userLogin ? (
                <li className="text-3xl text-slate-900 dark:text-white font-light py-1">
                  <NavLink onClick={logOut} to={"/login"}>
                    Logout
                  </NavLink>
                </li>
              ) : (
                <>
                  <li className="text-3xl text-slate-900 dark:text-white font-light py-1">
                    <NavLink to={"login"}>Login</NavLink>
                  </li>
                  <li className="text-3xl text-slate-900 dark:text-white font-light py-1">
                    <NavLink to={"register"}>Register</NavLink>
                  </li>
                </>
              )}

              {/* Social Media Icons */}
              <li className="flex items-center py-2">
                <i className="fa-brands fa-facebook mx-1 text-3xl hover:text-blue-500 cursor-pointer"></i>
                <i className="fa-brands fa-x-twitter mx-1 text-3xl hover:text-blue-500 cursor-pointer"></i>
                <i className="fa-brands fa-instagram mx-1 text-3xl hover:text-blue-500 cursor-pointer"></i>
                <i className="fa-brands fa-youtube mx-1 text-3xl hover:text-blue-500 cursor-pointer"></i>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
