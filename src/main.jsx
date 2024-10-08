import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartContextProvider from "./Context/CartContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BrandContextProvider from "./Context/BrandContext.jsx";
import CategoriesContextProvider from "./Context/CategoriesContext.jsx";
import WishListContextProvider from "./Context/WishListContext.jsx";

// Create an instance of QueryClient
let queryClient1 = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient1}>
      <CartContextProvider>
        <BrandContextProvider>
          <CategoriesContextProvider>
            <WishListContextProvider>
              <App />
            </WishListContextProvider>
          </CategoriesContextProvider>
        </BrandContextProvider>
      </CartContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
