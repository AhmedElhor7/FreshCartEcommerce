import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { userContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  const { userLogin, setUserLogin } = useContext(userContext);
  const { cartItemsNo } = useContext(CartContext);

  // State to handle the toggling of the mobile navbar
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Function to toggle the navbar when the burger icon is clicked
  function burgerNav() {
    setIsNavOpen(!isNavOpen); // Toggle between true and false
  }

  function logOut() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
  }

  return (
    <>
<nav className="bg-gray-200 py-3 lg:fixed top-0 left-0 right-0 z-50 mb-80 lg:mb-0">
  <div className="container mx-auto flex justify-between items-center py-3">
    {/* Logo Section */}
    <Link to={'/'}>
      <i className="fa-solid fa-cart-shopping green-color text-4xl"></i>
      <span className="text-xl text-slate-900 font-bold pe-4 ps-2">FreshCart</span>
    </Link>

    {/* Burger Icon for mobile view */}
    {! userLogin ? null :    <i 
      onClick={burgerNav}
      className={`fa-solid ${isNavOpen ? 'fa-xmark' : 'fa-bars'} cursor-pointer text-3xl mx-2 lg:hidden`}
    ></i> }


    {/* Navigation Links (Visible in desktop and toggle in mobile) */}
    <div
      className={`lg:flex lg:items-center lg:static absolute top-16 left-0 right-0 bg-gray-200 lg:bg-transparent transition-all duration-500 ease-in-out transform ${
        isNavOpen ? 'translate-y-0 opacity-100 block' : '-translate-y-full opacity-0 hidden'
      }`}
    >
      <ul className="flex flex-col lg:flex-row items-center">
        {/* Conditionally render navigation items if the user is logged in */}
        {userLogin && (
          <>
            <li className="mx-3 text-3xl text-slate-900 font-light">
              <NavLink to={""}>Home</NavLink>
            </li>
            <li className="mx-3 text-3xl text-slate-900 font-light">
              <NavLink to={"cart"}>Cart</NavLink>
            </li>
            <li className="mx-3 text-3xl text-slate-900 font-light">
              <NavLink to={"products"}>Products</NavLink>
            </li>
            <li className="mx-3 text-3xl text-slate-900 font-light">
              <NavLink to={"brands"}>Brands</NavLink>
            </li>
            <li className="mx-3 text-3xl text-slate-900 font-light">
              <NavLink to={"categories"}>Categories</NavLink>
            </li>
            <li className="mx-3 text-3xl text-slate-900 font-light">
              <NavLink to={"wishlist"}>WishList</NavLink>
            </li>
            <li className="mx-6 text-3xl text-slate-900 font-light">
              <NavLink to={"allorders"}>Orders</NavLink>
            </li>
            <li className="mx-3 me-8 text-3xl text-slate-900 font-light">
              <Link to={"cart"}>
                <div className="relative inline-block mt-4">
                  <i className="fa-solid fa-cart-arrow-down text-4xl"></i>
                  <span className="absolute top-0 right-0 bg-red-600 text-white font-semibold rounded-full text-lg px-3  -me-8 -mt-4">
                    {cartItemsNo}
                  </span>
                </div>
              </Link>
            </li>
          </>
        )}

        {/* Login / Register or Logout based on userLogin state */}
        {userLogin ? (
          <li className="mx-3 text-3xl text-slate-900 font-light">
            <NavLink onClick={logOut} to={"/login"}>
              Logout
            </NavLink>
          </li>
        ) : (
          <>
            <li className="mx-3 text-3xl text-slate-900 font-light">
              <NavLink to={"login"}>Login</NavLink>
            </li>
            <li className="mx-3 text-3xl text-slate-900 font-light">
              <NavLink to={"register"}>Register</NavLink>
            </li>
          </>
        )}

        {/* Social Media Icons */}
        <li className="flex items-center mx-2 py-4 cursor-pointer">
          <i className="fa-brands fa-facebook mx-1 text-3xl hover:text-blue-500"></i>
          <i className="fa-brands fa-x-twitter mx-1 text-3xl hover:text-blue-500"></i>
          <i className="fa-brands fa-instagram mx-1 text-3xl hover:text-blue-500"></i>
          <i className="fa-brands fa-youtube mx-1 text-3xl hover:text-blue-500"></i>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </>
  );
}
