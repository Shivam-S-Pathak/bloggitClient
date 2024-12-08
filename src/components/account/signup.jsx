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
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
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
  const [loginError, setLoginError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isValidate, setIsValidate] = useState(false);
  const [isOtp, setOtp] = useState("");
  const [enteredOpt, setEnteredOtp] = useState("");
  const [isError, setIsError] = useState("");
  const [isSuccess, setIsSuccess] = useState("");
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setIsVisible(!isVisible);
  };
  const onOtpChange = (e) => {
    setEnteredOtp(e.target.value);
  };

  const { setAccount } = useContext(DataContext);

  const onChangeHandle = (e) => {
    setSignUp({ ...signUp, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setIsSuccess("");
    setIsError("");
  };

  const handleSendOtp = async () => {
    const newOtp = Math.floor(1000 + Math.random() * 9000);
    setOtp(newOtp);

    const formData = new FormData();
    formData.append("email", signUp.email);
    formData.append("otp", newOtp);

    let response = await API.sendOtp(formData);
    if (response.isSuccess) {
      setIsValidate(true);
      setIsSuccess("Check your email for otp");
    }
  };

  const signupSubmitHandler = async (e) => {
    e.preventDefault();
    if (parseInt(enteredOpt) === isOtp) {
      if (!signUp.username || !signUp.email || !signUp.password) {
        setIsError("All fields are required.");
        return;
      }

      setIsError("");
      setIsSuccess("");

      try {
        let response = await API.signupUser(signUp);

        if (response.isSuccess) {
          setIsError("");
          setSignUp(signUpVals);
          setIsSuccess(
            "Account created successfully😃😃!!! Get inside your account👇👇"
          );
          navigate("/login");
        } else {
          setIsError("Something went wrong, please try again later.");
          setIsSuccess("");
        }
      } catch (err) {
        setIsError("An error occurred during signup. Please try again.");
        setIsSuccess("");
      }
    } else {
      setIsError("Entered OPT is worng");
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
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
            {isError ? (
              <Typography
                sx={{
                  color: "white",
                  bgcolor: "red",
                  borderRadius: "0.2rem",
                  p: 1.5,
                  display: "flex",
                }}
              >
                <InfoIcon sx={{ color: "white", mr: 0.3 }} />
                {isError}
                <CloseIcon
                  onClick={handleClose}
                  sx={{
                    color: "white",
                    cursor: "pointer",
                    ml: "auto",
                  }}
                />
              </Typography>
            ) : (
              ""
            )}
            {isSuccess ? (
              <Typography
                sx={{
                  color: "white",
                  bgcolor: "green",
                  borderRadius: "0.2rem",
                  p: 1.5,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <InfoIcon sx={{ color: "white", mr: 1 }} />
                {isSuccess}
                <CloseIcon
                  onClick={handleClose}
                  sx={{
                    color: "white",
                    cursor: "pointer",
                    ml: "auto",
                  }}
                />
              </Typography>
            ) : (
              ""
            )}
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
            />
            <Box sx={{ width: "100%", textAlign: "right" }}>
              {/* <Button
                onClick={handleSendOtp}
                sx={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  textTransform: "capitalize",
                }}
              >
                Send oTP
              </Button> */}
            </Box>
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
            {isValidate ? (
              <>
                <TextField
                  label="Enter OTP"
                  type="text"
                  variant="filled"
                  autoComplete="off"
                  name="otp"
                  onKeyDown={(e) => {
                    if (!/[0-9]/.test(e.key) && e.key !== "Backspace") {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => onOtpChange(e)}
                  value={enteredOpt}
                />
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
              </>
            ) : (
              <Button
                className={styles.submit}
                variant="contained"
                sx={{
                  backgroundColor: "rgb(155, 8, 217)",
                }}
                onClick={handleSendOtp}
              >
                Confirm
              </Button>
            )}
          </form>
          <hr />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <Typography
              sx={{
                color: "black",
              }}
            >
              {" "}
              Already have an account?
            </Typography>
            <Link to="/login">
              <Typography
                sx={{
                  color: "rgb(155, 8, 217)",
                  textDecoration: "underline",
                }}
              >
                Login
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SignUp;
