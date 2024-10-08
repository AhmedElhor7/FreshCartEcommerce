import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { userContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
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
      <nav className="2xl:fixed 2xl:w-full 2xl:top-0 2xl:left-0 2xl:right-0 2xl:z-50 bg-green-100 border-gray-200 dark:bg-gray-900 mt-6 pb-6 py-4">
        <div className="  flex flex-wrap items-center justify-between mx-auto p-4">
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
            className={`flex items-center w-full 2xl:block 2xl:w-auto ${
              isOpen ? "block" : "hidden"
            }`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col 2xl:flex-row 2xl:items-center 2xl:space-x-8 rtl:space-x-reverse">
              {userLogin && (
                <>
                  <li className="text-3xl text-slate-900 font-light py-1">
                    <NavLink to={""}>Home</NavLink>
                  </li>
                  <li className="text-3xl text-slate-900 font-light py-1">
                    <NavLink to={"cart"}>Cart</NavLink>
                  </li>
                  <li className="text-3xl text-slate-900 font-light py-1">
                    <NavLink to={"products"}>Products</NavLink>
                  </li>
                  <li className="text-3xl text-slate-900 font-light py-1">
                    <NavLink to={"brands"}>Brands</NavLink>
                  </li>
                  <li className="text-3xl text-slate-900 font-light py-1">
                    <NavLink to={"categories"}>Categories</NavLink>
                  </li>
                  <li className="text-3xl text-slate-900 font-light py-1">
                    <NavLink to={"wishlist"}>WishList</NavLink>
                  </li>
                  <li className="text-3xl text-slate-900 font-light py-1">
                    <NavLink to={"allorders"}>Orders</NavLink>
                  </li>
                  <li className="text-3xl text-slate-900 font-light py-1">
                    <NavLink to={"datasummarychart"}>Chart</NavLink>
                  </li>
                  <li className="relative text-3xl text-slate-900 font-light pt-3 pe-2">
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
                <li className="text-3xl text-slate-900 font-light py-1">
                  <NavLink onClick={logOut} to={"/login"}>
                    Logout
                  </NavLink>
                </li>
              ) : (
                <>
                  <li className="text-3xl text-slate-900 font-light py-1">
                    <NavLink to={"login"}>Login</NavLink>
                  </li>
                  <li className="text-3xl text-slate-900 font-light py-1">
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
