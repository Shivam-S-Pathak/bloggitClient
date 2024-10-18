import { createContext, useState, useEffect } from "react";
import { API } from "../source/api.js";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [account, setAccount] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    return storedUser || {
      username: "",
      email: "",
    };
  });

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const fetchUserData = async () => {
        try {
          const response = await API.getUserData(accessToken);

          if (response.isSuccess) {
            setAccount({
              username: response.data.username,
              email: response.data.email,
            });
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          localStorage.removeItem("accessToken");
        }
      };

      fetchUserData();
    }
  }, [setAccount]);

  return (
    <DataContext.Provider value={{ account, setAccount }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
