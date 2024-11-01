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
import SignUp from "./components/account/signup.jsx";
import Home from "./components/Home/Home.jsx";
import NavBar from "./components/header/NavBar.jsx";
import LandPage from "./components/landingPage/LandPage.jsx";
import Contact from "./components/contactPage/Contact.jsx";
import About from "./components/AboutPage/About.jsx";
import CreateBlog from "./components/blog/CreateBlog.jsx";
import ShowBlogs from "./components/blog/ShowBlogs.jsx";
import MyBlogs from "./components/Myblog/MyBlogs.jsx";
import EditBlog from "./components/blog/EditBlog.jsx";
import { useState, useEffect } from "react";

const PrivateRoute = ({ isAuthenticated, setIsAuthenticated }) => {
  return isAuthenticated ? (
    <>
      <NavBar
        setIsAuthenticated={setIsAuthenticated}
        isAuthenticated={isAuthenticated}
      />
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/" />
  );
};

function App() {
  const aT = sessionStorage.getItem("user");
  const [isAuthenticated, setIsAuthenticated] = useState(aT ? true : false);

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
              path="/signup"
              element={<SignUp setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path=""
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
              <Route path="/createblog" element={<CreateBlog />} />
            </Route>
            <Route
              path="/home"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
              }
            >
              <Route path="/home" element={<Home />} />
            </Route>
            <Route
              path="/about"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
              }
            >
              <Route path="/about" element={<About />} />
            </Route>
            <Route
              path="/contact"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
              }
            >
              <Route path="/contact" element={<Contact />} />
            </Route>
            <Route
              path="/createblog"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
              }
            >
              <Route path="/createblog" element={<CreateBlog />} />
            </Route>

            <Route
              path="/home/details/:id"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
              }
            >
              <Route path="/home/details/:id" element={<ShowBlogs />} />
            </Route>

            <Route
              path="/myblogs/:username"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
              }
            >
              <Route path="/myblogs/:username" element={<MyBlogs />} />
            </Route>

            <Route
              path="/update/:id"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
              }
            >
              <Route path="/update/:id" element={<EditBlog />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </>
  );
}

export default App;
