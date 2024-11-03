import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
} from "@mui/material";
import styles from "./login.module.css";
import { useState, useContext } from "react";
import { API } from "../../source/api.js";
import React from "react";

import { DataContext } from "../../context/DataProvider.jsx";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ClipLoader from "react-spinners/ClipLoader";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const signUpVals = {
  username: "",
  email: "",
  password: "",
};

const SignUp = ({ setIsAuthenticated }) => {
  const [signUp, setSignUp] = useState(signUpVals);
  const [error, setError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [success, setSuccess] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setIsVisible(!isVisible);
  };

  const { setAccount } = useContext(DataContext);

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
        navigate("/login");
      } else {
        setError("*Something went wrong, please try again later.");
        setSuccess("");
      }
    } catch (err) {
      setError("*An error occurred during signup. Please try again.");
      setSuccess("");
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          flexDirection: "column",
        }}
      >
        {/* Sign Up Form */}
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
        <Box className={`${styles.box1}`}>
          <Typography
            component="h1"
            variant="h4"
            fontWeight="bold"
            gutterBottom
            className={styles.loginHeader}
          >
            Welcome to BloggIT
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{ mb: 3, color: "black" }}
          >
            Create an account to share your stories with the world
          </Typography>
          <form onSubmit={signupSubmitHandler} className={styles.from}>
            <TextField
              label="Username"
              variant="filled"
              onChange={onChangeHandle}
              autoComplete="off"
              name="username"
              value={signUp.username}
              sx={{ mb: "1rem" }}
            />
            <TextField
              label="Email"
              variant="filled"
              type="email"
              onChange={onChangeHandle}
              autoComplete="off"
              name="email"
              value={signUp.email}
              sx={{ mb: "1rem" }}
            />
            <TextField
              label="Password"
              variant="filled"
              type={isVisible ? "text" : "password"}
              onChange={onChangeHandle}
              autoComplete="off"
              name="password"
              value={signUp.password}
              sx={{ mb: "2rem" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      onClick={handleTogglePasswordVisibility}
                      sx={{
                        color: "black",
                        minWidth: "auto",
                        "&:focus": {
                          outline: "none",
                        },
                      }}
                    >
                      {isVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </Button>
                  </InputAdornment>
                ),
              }}
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
          <Link to="/login">
            <Button
              variant="outlined"
              sx={{
                color: "rgb(155, 8, 217)",
                borderColor: "rgb(155, 8, 217)",
              }}
            >
              Already have an account
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default SignUp;
