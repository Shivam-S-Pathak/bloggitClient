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

const Login = ({ setIsAuthenticated }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [signUp, setSignUp] = useState(signUpVals);
  const [error, setError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [success, setSuccess] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const { setAccount } = useContext(DataContext);

  const handleTogglePasswordVisibility = () => {
    setIsVisible(!isVisible);
  };

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

        setAccount({
          username: response.data.name,
          email: response.data.email,
        });
        sessionStorage.setItem("user", JSON.stringify(response.data));
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          flexDirection: "column",
        }}
      >
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
          <Typography
            component="h1"
            variant="h4"
            fontWeight="bold"
            gutterBottom
            className={styles.loginHeader}
          >
            Welcome Back
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{ mb: 3, color: "black" }}
          >
            Log in to access your personalized blog experience
          </Typography>

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
              sx={{ mb: "1rem" }}
            />
            <TextField
              label="Password"
              variant="filled"
              type={isVisible ? "text" : "password"}
              autoComplete="off"
              name="password"
              onChange={(e) => onValueChange(e)}
              value={login.password}
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
                <ClipLoader color="rgb(155, 8, 217)" size="1.5rem" />{" "}
                <Typography
                  color="rgb(155, 8, 217)"
                  margin="0 0 0 1rem"
                  sx={{ textTransform: "capitalize" }}
                >
                  Authenticating...
                </Typography>
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
          <Link to="/signup">
            <Button
              variant="outlined"
              sx={{
                borderColor: "rgb(155, 8, 217)",
                color: "rgb(155, 8, 217)",
              }}
            >
              Don't have an account? Register first
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default Login;
