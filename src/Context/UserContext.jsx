import { createContext, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode"; // Fix the import, use `jwt-decode` directly

export const userContext = createContext(0);

export default function UserContextProvider(props) {
  const [userLogin, setUserLogin] = useState(null);
  const [userId, setUserId] = useState()

  // Set Token From Local Storage To setUserLogin In Case User Refresh Page
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setUserLogin(token);
      try {
        const decoded = jwtDecode(token); 
         setUserId(decoded.id);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []); // Dependency array empty to run only on mount
        // console.log(userId);


  return (
    <userContext.Provider value={{ userLogin, setUserLogin, userId }}>
      {props.children}
    </userContext.Provider>
  );
}
