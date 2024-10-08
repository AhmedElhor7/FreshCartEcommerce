    import axios from "axios";
    import { createContext } from "react";

    export const CategoriesContext = createContext();

    export default function CategoriesContextProvider(props) {
    function getAllCategories() {
        return axios
        .get("https://ecommerce.routemisr.com/api/v1/categories")
        .then((response) => response)
        .catch((error) => error);
    }

    return (
        <CategoriesContext.Provider
        value={{
            getAllCategories,
        }}
        >
        {props.children}
        </CategoriesContext.Provider>
    );
    }
