import React, { useContext } from "react";
import styles from "./Home.module.css";
import { DataContext } from "../../context/DataProvider.jsx";

const Home = () => {
  const { account } = useContext(DataContext);
  return (
    <div className={styles.homefont}>
      <h1>Welcome to Home Page</h1>
      {account.username ? (
        <p>Hello, {account.username}!</p>
      ) : (
        <p>
          Thanks for logging in! This website is currently under development, so there isn't much to show right now. Please feel free to log out, and we'll notify you once everything is ready. Thanks again for visiting us!
        </p>
      )}
    </div>
  );
};

export default Home;
