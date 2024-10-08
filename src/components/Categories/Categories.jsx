import React, { useContext, useEffect, useState } from "react";
import Style from "./Categories.module.css";
import { Helmet } from "react-helmet";
import axios from "axios";
import { CategoriesContext } from "../../Context/CategoriesContext";

export default function Categories() {

      const { getAllCategories } = useContext(CategoriesContext);
      const [allCategories, setAllCategories] = useState();

      async function callGetAllCategories() {
        let response = await getAllCategories();
        // console.log(response);
        
        if (response.statusText === "OK") {
          setAllCategories(response.data.data);
        }
      }

      useEffect(() => {
        callGetAllCategories();
      }, []);

// console.log(allCategories);


  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      <h2 className="text-4xl font-bold text-green-600 flex items-center justify-center pb-2 pt-16">
        Categories
      </h2>
      <div className="container mx-auto py-2">
        <div className="row">
          {allCategories?.map((categorie) => (
            <div key={categorie._id} className="xl:w-1/4 md:w-1/2 w-full p-4">
              <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-2xl hover:shadow-green-500 cursor-pointer">
                <div>
                  <img
                    loading="lazy"
                    className="w-full h-96 md:w-4/5 rounded-lg"
                    src={categorie.image}
                    alt={categorie.name}
                  />
                </div>
                <div className="p-5">
                  <p className="mb-3 font-bold text-2xl text-gray-700 dark:text-gray-400">
                    {categorie.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
