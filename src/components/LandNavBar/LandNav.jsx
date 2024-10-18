import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import RateReviewIcon from "@mui/icons-material/RateReview";
const LandNav = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ backgroundColor: "rgb(155, 8, 217)" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
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
            <RateReviewIcon
              sx={{ fontSize: "2rem", padding: "0 0.5rem 0 0" }}
            />
            BloggIT
          </Typography>
          {/* <Link to="/login"> */}
          <Button
            sx={{ my: 2, color: "white", display: "block" }}
            href="/login"
          >
            Login
          </Button>
          {/* </Link> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default LandNav;
