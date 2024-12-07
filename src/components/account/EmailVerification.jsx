import React, { useState } from "react";
import { API } from "../../source/api.js";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  responsiveFontSizes,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

const EmailVerification = ({ setOtpValidate }) => {
  const initialVals = {
    email: "",
    otp: "",
  };
  const [isCred, setIsCred] = useState(initialVals);
  const [isError, setIsError] = useState("");
  const [isSuccess, setIsSuccess] = useState("");
  const [OtpPanel, setOtpPanel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isValidate, setIsValidate] = useState(false); // to switvh the btn between validate and submit
  const [Isotp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleClose = () => {
    setIsSuccess("");
    setIsError("");
  };

  const onValueChange = (e) => {
    setIsCred({ ...isCred, [e.target.name]: e.target.value });
  };

  const handleValidate = async () => {
    try {
      const newOtp = Math.floor(1000 + Math.random() * 9000);
      setOtp(newOtp);

      const formData = new FormData();
      formData.append("email", isCred.email);
      formData.append("otp", newOtp);

      if (isCred.email === "") {
        setIsSuccess("");
        setIsError("Please enter an email to proceed");
      } else {
        setLoading(true);
        const response = await API.isEmailvalid(isCred);
        setLoading(false);
        if (response.status === 201) {
          setIsSuccess("");
          setOtpPanel(false);
          setIsValidate(false);
          setIsError("Entered email is not registered with us");
        } else {
          setLoading(true);
          const res = await API.sendMail(formData);
          setOtpPanel(true);
          setIsSuccess("OTP has been sent, check your email");
          setIsError("");
          setIsValidate(true);
          setLoading(false);
        }
      }
    } catch (error) {
      setIsError("An error occurred. Please try again later.");
    }
  };

  const handleSubmit = () => {
    const otp = isCred.otp;

    if (parseInt(otp) === Isotp) {
      setOtpValidate(true);
      setIsValidate(false);
      localStorage.setItem("email", isCred.email);
      navigate("/change-pass");
      setOtp("");
    } else {
      setIsSuccess("");
      setIsError("OTP entered is wrong or expired");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Link to="/login">
        <Button
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
          gap: "1rem",
          borderRadius: "2rem",
          marginTop: "2rem",
          maxWidth: "23rem",
        }}
      >
        <Typography
          gutterBottom
          sx={{
            fontSize: "2rem",
            color: "rgb(37, 37, 38)",
            fontWeight: 700,
            fontFamily: "inherit",
          }}
        >
          Email verification
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{ mb: 3, color: "black", textWrap: "wrap" }}
        >
          Enter your registred email id only , in order to get the reset code
        </Typography>
        {isSuccess ? (
          <Typography
            sx={{
              color: "white",
              bgcolor: "green",
              borderRadius: "0.2rem",
              p: 1.5,
              display: "flex",
            }}
          >
            <InfoIcon sx={{ color: "white", mr: 0.3 }} />
            {isSuccess}
            <CloseIcon
              onClick={handleClose}
              sx={{
                color: "white",
                ml: 2,
                textAlign: "right",
                cursor: "pointer",
              }}
            />
          </Typography>
        ) : (
          ""
        )}
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
                ml: 2,
                textAlign: "right",
                cursor: "pointer",
              }}
            />
          </Typography>
        ) : (
          ""
        )}

        <TextField
          label="Email"
          type="email"
          variant="filled"
          autoComplete="off"
          name="email"
          onChange={(e) => onValueChange(e)}
          value={isCred.email}
        />

        {OtpPanel ? (
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
            onChange={(e) => onValueChange(e)}
            value={isCred.otp}
          />
        ) : (
          ""
        )}
        {isValidate ? (
          <Button
            variant="contained"
            sx={{
              textTransform: "capitalize",
              backgroundColor: "rgb(155, 8, 217)",
              "&:focus": {
                outline: "none",
              },
            }}
            onClick={handleSubmit}
          >
            {loading ? "submiting..." : "submit"}
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{
              textTransform: "capitalize",
              backgroundColor: "rgb(155, 8, 217)",
              "&:focus": {
                outline: "none",
              },
            }}
            onClick={handleValidate}
          >
            {loading ? "Validating..." : "Validate"}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default EmailVerification;
