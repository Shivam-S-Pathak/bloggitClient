import "./App.css";
import DataProvider from "./context/DataProvider.jsx";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

//components
import Login from "./components/account/login";
import Home from "./components/Home/Home.jsx";
import NavBar from "./components/header/NavBar.jsx";
import LandPage from "./components/landingPage/LandPage.jsx";
import Contact from "./components/contactPage/Contact.jsx";
import About from "./components/AboutPage/About.jsx";
import { useState, useEffect } from "react";

const PrivateRoute = ({ isAuthenticated, setIsAuthenticated }) => {
  const user = localStorage.getItem("user");
  return isAuthenticated || user ? (
    <>
      <NavBar setIsAuthenticated={setIsAuthenticated} />
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/" />
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("user")
  );
  useEffect(() => {
    const handleWindowClose = (event) => {
      if (!event.persisted) {
        localStorage.removeItem("user"); // Remove user only when window is actually closing
      }
    };

    window.addEventListener("unload", handleWindowClose); // `unload` event for page close

    return () => {
      window.removeEventListener("unload", handleWindowClose);
    };
  }, []); 

  return (
    <>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandPage />} />
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
              }
            >
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </>
  );
}

export default App;
