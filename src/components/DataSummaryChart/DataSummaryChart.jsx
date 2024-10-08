import React, { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { WishListContext } from "../../Context/WishListContext";
import { userContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import { CategoriesContext } from "../../Context/CategoriesContext";
import { BrandContext } from "../../Context/BrandContext";
import axios from "axios";

// Register components for the Bar chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function DataSummaryChart() {
  const { getLoggedUserCart, getUserOrders, getRecentProductsFromCartContext } =
    useContext(CartContext);
  const { getLoggedUserWishlist } = useContext(WishListContext);
  const { userId } = useContext(userContext);
        const { getAllCategories } = useContext(CategoriesContext);
          const { getAllBrands } = useContext(BrandContext);



  const [chartData, setChartData] = useState({
    labels: [
      "Fav Items",
      "Items Added To Cart",
      "All Orders",
      "All Categories",
      "All Brands",
      "All Products",
    ],
    datasets: [
      {
        label: "Items",
        data: [0, 0, 30, 40, 50], // Initialize with zeros for dynamic updates
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Fetch wishlist and cart counts and update chart data
  async function fetchData() {
    try {
      const [
        wishlistResponse,
        cartResponse,
        ordersResponse,
        categoriesResponse,
        brandsResponse,
        ProductsResponse,
      ] = await Promise.all([
        getLoggedUserWishlist(),
        getLoggedUserCart(),
        getUserOrders(userId),
        getAllCategories(),
        getAllBrands(),
        getRecentProductsFromCartContext(),
      ]);

      if (
        wishlistResponse.data.status === "success" &&
        cartResponse.data.status === "success" &&
        ordersResponse.statusText === "OK" &&
        categoriesResponse.statusText === "OK" &&
        brandsResponse.statusText === "OK" &&
        ProductsResponse.statusText === "OK"
      ) {
        // console.log(ProductsResponse.data.results);

        // Store data in an array
        const dataValues = [
          wishlistResponse.data.count, // Wishlist count
          cartResponse.data.numOfCartItems, // Cart item count
          ordersResponse.data.length, // All Orders
          categoriesResponse.data.results, // Categories
          brandsResponse.data.results, // Brands
          ProductsResponse.data.results,// Products
        ];

        // Update the chart data
        const updatedData = {
          ...chartData,
          datasets: [
            {
              ...chartData.datasets[0],
              data: dataValues,
            },
          ],
        };

        setChartData(updatedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // async  function getRecentProducts() {
  //   let res =   await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  //   console.log(res.data.results);
    
  //   }

  useEffect(() => {
    fetchData(); // Call the fetch function on component mount
  }, []);

  return (
    <>
      <h2 className="text-4xl font-bold text-green-600 flex items-center justify-center pb-2  2xl:mt-28">
        Data Summary Chart
      </h2>
      <div className="data-summary-chart">
        <Bar data={chartData} options={options} />
      </div>
    </>
  );
}
