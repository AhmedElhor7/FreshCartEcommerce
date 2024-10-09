import { lazy, Suspense, useContext, useEffect } from "react";
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import UserContectProvider from "./Context/UserContext";
import { CartContext } from "./Context/CartContext";
import { Offline } from "react-detect-offline";
import WishList from "./components/WishList/WishList.jsx";

const Home = lazy(() => import("./components/Home/Home.jsx"));
const Cart = lazy(() => import("./components/Cart/Cart"));
const ProductDeatails = lazy(() =>
  import("./components/ProductDeatails/ProductDeatails")
);
const Categories = lazy(() => import("./components/Categories/Categories"));
const Products = lazy(() => import("./components/Products/Products"));
const Brands = lazy(() => import("./components/Brands/Brands"));
const Checkout = lazy(() => import("./components/Checkout/Checkout"));
const AllOrders = lazy(() => import("./components/AllOrders/AllOrders"));
const DetailsOrders = lazy(() =>
  import("./components/DetailsOrders/DetailsOrders")
);
const Layout = lazy(() => import("./components/Layout/Layout"));
const Login = lazy(() => import("./components/Login/Login"));
const Register = lazy(() => import("./components/Register/Register"));
const Notfound = lazy(() => import("./components/Notfound/Notfound"));
const About = lazy(() => import("./components/About/About"));
const DataSummaryChart = lazy(() => import("./components/DataSummaryChart/DataSummaryChart"));

// Define routes for the app
let root = createHashRouter([
  {
    path: "",
    element: (
      <Suspense fallback={""}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Suspense fallback={""}>
              <Home />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Suspense fallback={""}>
              <Categories />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Suspense fallback={""}>
              <Brands />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Suspense fallback={""}>
              <Cart />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Suspense fallback={""}>
              <Products />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "productsdetails/:id/:category",
        element: (
          <ProtectedRoute>
            <Suspense fallback={""}>
              <ProductDeatails />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout/:cartId",
        element: (
          <ProtectedRoute>
            <Suspense fallback={""}>
              <Checkout />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <Suspense fallback={""}>
              <AllOrders />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "detailsOrders/:userId/:itemsId",
        element: (
          <ProtectedRoute>
            <Suspense fallback={""}>
              <DetailsOrders />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <Suspense fallback={""}>
              <WishList />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "about",
        element: (
          <ProtectedRoute>
            <Suspense fallback={""}>
              <About />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "datasummarychart",
        element: (
          <ProtectedRoute>
            <Suspense fallback={""}>
              <DataSummaryChart />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={""}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={""}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={""}>
            <Notfound />
          </Suspense>
        ),
      },
    ],
  },
]);

// Initialize QueryClient
const queryClient = new QueryClient();

function App() {

  const { getLoggedUserCart, setCartItemsNo } =
    useContext(CartContext);

  useEffect(() => {
    getCartOfUser();
  }, []);

  async function getCartOfUser() {
    let responseOfUserCart = await getLoggedUserCart();
    if (responseOfUserCart.data.status === "success") {
      setCartItemsNo(responseOfUserCart.data.numOfCartItems);
    } else {
      console.error("Error fetching cart items at App.jsx");
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <UserContectProvider>
        <RouterProvider router={root}></RouterProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <Offline>
          <div className="bg-red-500 z-50 text-white text-center py-3 rounded-lg shadow-lg fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-lg">
            <i className="fas fa-exclamation-circle mr-2"></i>
            You're offline right now. Check your connection.
          </div>
        </Offline>
        <Toaster />
      </UserContectProvider>
    </QueryClientProvider>
  );
}

export default App;
