import React, { useContext, useEffect, useState } from "react";
import Style from "./Brands.module.css";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { RingLoader } from "react-spinners";
import { Await } from "react-router-dom";
import { BrandContext } from "../../Context/BrandContext";


export default function Brands() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null); // State for selected brand data

  const toggleModal = (brandData) => {
    setIsModalOpen(!isModalOpen);
    setSelectedBrand(brandData); // Store the clicked brand's data
  };

  const { getAllBrands } = useContext(BrandContext);
  const [allBrands, setAllBrands] = useState();

  async function callAllBrands() {
    let response = await getAllBrands();
    if (response.statusText === "OK") {
      setAllBrands(response.data.data);
    }
  }

  useEffect(() => {
    callAllBrands();
  }, []);

  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>
      <h2 className="text-4xl font-bold text-green-600 flex items-center justify-center pb-2 pt-16">
        Brands
      </h2>
      <div className="container mx-auto py-2">
        <div className="row">
          {allBrands?.map((brand) => (
            <div key={brand._id} className="xl:w-1/4 md:w-1/2 w-full p-4">
              <div
                onClick={() => toggleModal(brand)} // Pass brand data on click
                className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-2xl hover:shadow-green-500 cursor-pointer"
              >
                <div>
                  <img
                    loading="lazy"
                    className="rounded-t-lg w-full"
                    src={brand.image}
                    alt={brand.name}
                  />
                </div>
                <div className="p-5">
                  <p className="mb-3 font-bold text-2xl text-gray-700 dark:text-gray-400">
                    {brand.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main modal */}
        {isModalOpen && selectedBrand && (
          <div
            id="showModal"
            tabIndex={-1}
            aria-hidden="true"
            className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
          >
            <div className="relative p-4 w-full max-w-2xl max-h-full">
              {/* Modal content */}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/* Modal header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {selectedBrand.name}
                  </h3>
                  <button
                    onClick={toggleModal} // Close modal when clicked
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* Modal body */}
                <div className="p-4 md:p-5 space-y-4">
                  <img
                    src={selectedBrand.image}
                    alt={selectedBrand.name}
                    className="w-full rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

