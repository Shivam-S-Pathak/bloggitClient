import { createContext, useState, useEffect } from "react";
import { API } from "../source/api.js";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [account, setAccount] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    return (
      storedUser || {
        username: "",
        email: "",
      }
    );
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
          } else {
            // Attempt to refresh token if not successful
            const refreshToken = localStorage.getItem("refreshToken");
            if (refreshToken) {
              const refreshResponse = await API.refreshToken(refreshToken);
              if (refreshResponse.isSuccess) {
                localStorage.setItem(
                  "accessToken",
                  `Bearer ${refreshResponse.data.accessToken}`
                );
                // Retry fetching user data
                const retryResponse = await API.getUserData(
                  localStorage.getItem("accessToken")
                );
                if (retryResponse.isSuccess) {
                  setAccount({
                    username: retryResponse.data.username,
                    email: retryResponse.data.email,
                  });
                }
              } else {
                // Handle failure to refresh token
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
              }
            } else {
              localStorage.removeItem("accessToken");
            }
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
