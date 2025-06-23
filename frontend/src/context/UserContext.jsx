import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";

export const userDataContext = createContext();

const UserContext = ({ children }) => {
  const [userData, setUserData] = useState(null); // ✅ changed from "" to null
  const { serverUrl } = useContext(authDataContext);

  const getCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/getcurrentuser`, {
        withCredentials: true,
      });
      setUserData(result.data);
      console.log("User Data:", result.data);
    } catch (error) {
      setUserData(null);
      console.error("Get current user error:", error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <userDataContext.Provider value={{ userData, setUserData, getCurrentUser }}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserContext;
