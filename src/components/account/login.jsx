import { TextField, Button, Box, Typography } from "@mui/material";
import styles from "./login.module.css";
import { useState, useContext } from "react";
import { API } from "../../source/api.js";
import React from "react";

import { DataContext } from "../../context/DataProvider.jsx";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ClipLoader from "react-spinners/ClipLoader";

const signUpVals = {
  username: "",
  email: "",
  password: "",
};

const Login = ({ setIsAuthenticated }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [signUp, setSignUp] = useState(signUpVals);
  const [error, setError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const { setAccount } = useContext(DataContext);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const onChangeHandle = (e) => {
    setSignUp({ ...signUp, [e.target.name]: e.target.value });
  };

  const signupSubmitHandler = async (e) => {
    e.preventDefault();

    if (!signUp.username || !signUp.email || !signUp.password) {
      setError("*All fields are required.");
      return;
    }

    setError("");
    setSuccess("");

    try {
      let response = await API.signupUser(signUp);

      if (response.isSuccess) {
        setError("");
        setSignUp(signUpVals);
        setSuccess(
          "*Account created successfully😃😃!!! Get inside your account👇👇"
        );
        setIsClicked(false);
      } else {
        setError("*Something went wrong, please try again later.");
        setSuccess("");
      }
    } catch (err) {
      setError("*An error occurred during signup. Please try again.");
      setSuccess("");
    }
  };
  const loginIntialVals = {
    username: "",
    password: "",
  };
  const [login, setLogin] = useState(loginIntialVals);

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const [loading, setLoading] = useState(false);

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    setLoginError("");
    if (!login.username || !login.password) {
      setLoginError("*All fields are required.");
      return;
    }
    setLoading(true);
    try {
      let response = await API.loginUser(login);
      if (response.isSuccess) {
        setError("");
        localStorage.setItem(
          "accessToken",
          `Bearer ${response.data.accessToken}`
        );
        localStorage.setItem(
          "refreshToken",
          `Bearer ${response.data.refreshToken}`
        );
        console.log("Access Token Stored:", accessToken); // Debug log
        console.log(
          "Access Token in localStorage:",
          localStorage.getItem("accessToken")
        ); // Debug log
        console.log("After Login:", localStorage.getItem("accessToken"));

        setAccount({
          username: response.data.name,
          email: response.data.email,
        });
        localStorage.setItem("user", JSON.stringify(response.data));
        setIsAuthenticated(true);
        navigate("/home");
        setLoading(false);
      }
    } catch (error) {
      if (error?.code === 401) {
        setLoginError("*Invalid username or password.");
      } else if (error?.code === 400) {
        setLoginError("*Wrong username or password.");
      } else {
        setLoginError("*something went wrong, please try angain later.");
      }
      setLoading(false);
    }
  };

  return (
    <>
      {/* Login Form */}
      <Link to="/">
        <Button
          className={styles.backBtn}
          variant="outlined"
          sx={{
            color: "rgba(154, 8, 217)",
            borderColor: "rgba(154, 8, 217)",
            "&:hover": {
              backgroundColor: "rgba(154, 8, 217)",
              color: "white",
            },
            "&:focus": {
              outline: "none",
            },
          }}
        >
          <ArrowBackOutlinedIcon
            sx={{
              marginRight: "0.2rem",
            }}
          />
          Back
        </Button>
      </Link>

      <Box className={`${styles.box} ${isClicked ? styles.hide : ""}`}>
        <p className={styles.loginHeader}>Login Here</p>
        <form className={styles.from} onSubmit={loginSubmitHandler}>
          {success && (
            <Typography className={styles.successMsg}>{success}</Typography>
          )}
          <TextField
            label="Username"
            variant="filled"
            autoComplete="off"
            name="username"
            onChange={(e) => onValueChange(e)}
            value={login.username}
          />
          <TextField
            label="Password"
            variant="filled"
            type="password"
            autoComplete="off"
            name="password"
            onChange={(e) => onValueChange(e)}
            value={login.password}
          />
          {loginError && (
            <Typography className={styles.errorMsg}>{loginError}</Typography>
          )}
          {loading ? (
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: "rgb(155, 8, 217)",
                "&:focus": {
                  outline: "none",
                },
              }}
              disabled
            >
              <ClipLoader color="rgb(155, 8, 217)" size="1.5rem" />
            </Button>
          ) : (
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: "rgb(155, 8, 217)",
                "&:focus": {
                  outline: "none",
                },
              }}
            >
              submit
            </Button>
          )}
        </form>
        <Typography className={styles.text} variant="h5" component="h2">
          OR
        </Typography>
        <Button
          onClick={handleClick}
          variant="outlined"
          sx={{
            borderColor: "rgb(155, 8, 217)",
            color: "rgb(155, 8, 217)",
          }}
        >
          Don't have an account? Register first
        </Button>
      </Box>

      {/* Sign Up Form */}

      <Box className={`${styles.box1} ${isClicked ? styles.show : ""}`}>
        <p className={styles.loginHeader}>Sign up Here</p>
        <form onSubmit={signupSubmitHandler} className={styles.from}>
          <TextField
            label="Full name/Username"
            variant="filled"
            onChange={onChangeHandle}
            autoComplete="off"
            name="username"
            value={signUp.username}
          />
          <TextField
            label="Email"
            variant="filled"
            type="email"
            onChange={onChangeHandle}
            autoComplete="off"
            name="email"
            value={signUp.email}
          />
          <TextField
            label="Password"
            variant="filled"
            type="password"
            onChange={onChangeHandle}
            autoComplete="off"
            name="password"
            value={signUp.password}
          />
          {error && (
            <Typography className={styles.errorMsg}>{error}</Typography>
          )}

          <Button
            type="submit"
            className={styles.submit}
            variant="contained"
            sx={{
              backgroundColor: "rgb(155, 8, 217)",
            }}
          >
            Create account
          </Button>
        </form>
        <Typography className={styles.text} variant="h5" component="h2">
          OR
        </Typography>
        <Button
          onClick={handleClick}
          variant="outlined"
          sx={{
            color: "rgb(155, 8, 217)",
            borderColor: "rgb(155, 8, 217)",
          }}
        >
          Already have an account
        </Button>
      </Box>
    </>
  );
};

export default Login;
