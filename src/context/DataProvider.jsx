import { createContext, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem("user")) || {
    username: "",
    email: "",
  };
  const [account, setAccount] = useState(storedUser);

  return (
    <DataContext.Provider value={{ account, setAccount }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
