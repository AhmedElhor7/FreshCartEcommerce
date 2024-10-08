import axios from "axios";
import { createContext } from "react";


export const BrandContext = createContext();


export default function BrandContextProvider (props) {



    
    function getAllBrands() {
      return axios
        .get("https://ecommerce.routemisr.com/api/v1/brands")
        .then((response) => response)
        .catch((error) => error);
    }



     return (
       <BrandContext.Provider
         value={{
           getAllBrands,
         }}
       >
         {props.children}
       </BrandContext.Provider>
     );
}