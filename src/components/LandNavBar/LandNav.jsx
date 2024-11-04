import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";

import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RateReviewIcon from "@mui/icons-material/RateReview";
const LandNav = () => {
  const [showNav, setShowNav] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setShowNav(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "rgb(155, 8, 217)",
        top: showNav ? 0 : "-90px",
        transition: "top 0.3s ease",
        zIndex: "1000",
      }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <Avatar
            src="./spLogo.png"
            alt="logo"
            sx={{ width: 56, height: 56 }}
          />
        </IconButton>

        <Typography
          variant="h5"
          component="div"
          sx={{
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: "0.3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <RateReviewIcon sx={{ fontSize: "2rem", padding: "0 0.5rem 0 0" }} />
          BloggIT
        </Typography>
        <Link to="/login">
          <Button sx={{ my: 2, color: "white", display: "block" }}>
            Login
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default LandNav;
