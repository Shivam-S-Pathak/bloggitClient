import React, { useState, useEffect } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import { API } from "../../source/api.js";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const ChangePassword = ({ setOtpValidate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isEmail, setEmail] = useState("");
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setIsVisible(!isVisible);
  };
  const handleClose = () => {
    // setIsSuccess("");
    setIsError("");
  };
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const [newPass, setNewPass] = useState("");
  const [rePass, setRePass] = useState("");
  const [isError, setIsError] = useState("");
  const onNewPassChange = (e) => {
    setNewPass(e.target.value);
  };
  const onRePassChange = (e) => {
    setRePass(e.target.value);
  };

  const handleSubmit = async () => {
    if (newPass !== rePass) {
      setIsError("Both password does not match");
    } else {
      const formData = new FormData();
      formData.append("email", isEmail);
      formData.append("pass", newPass);

      let response = await API.setNewPass(formData);
      if (response.isSuccess) {
        navigate("/login");
        alert("your password changed successfully , login to your account");
        setOtpValidate(false);  
        localStorage.clear();
      }
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
          Change password
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{ mb: 3, color: "black", textWrap: "wrap" }}
        >
          Enter a new and secure password here
        </Typography>
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
        <TextField
          label="New Password"
          type={isVisible ? "text" : "password"}
          variant="filled"
          autoComplete="off"
          name="password"
          onChange={(e) => onNewPassChange(e)}
          value={newPass}
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
        <TextField
          label="Re-enter password"
          type={isVisible ? "text" : "password"}
          variant="filled"
          autoComplete="off"
          name="passwordCheck"
          onChange={(e) => onRePassChange(e)}
          value={rePass}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "rgb(155, 8, 217)",
            "&:focus": {
              outline: "none",
            },
          }}
          onClick={handleSubmit}
        >
          submit
        </Button>
      </Box>
    </Box>
  );
};

export default ChangePassword;
