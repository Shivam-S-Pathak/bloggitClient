import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import MenuItem from "@mui/material/MenuItem";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataProvider.jsx";
import { useContext, useEffect, useState } from "react";
import { Logout } from "@mui/icons-material";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const pages = ["Home", "About", "Contact"];
const settings = ["Profile", "Account", "Dashboard"];
const NavBar = ({ setIsAuthenticated, isAuthenticated }) => {
  const { account, setAccount } = useContext(DataContext);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const handleAccordionToggle = () => {
    setExpanded(!expanded);
  };
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    if (isAuthenticated) {
      const user = sessionStorage.getItem("user");

      if (user) {
        const parsedUser = JSON.parse(user);

        if (parsedUser?.name && parsedUser?.email) {
          setAccount({
            username: parsedUser.name,
            email: parsedUser.email,
          });
        }
      }
    }
  }, [isAuthenticated, setAccount]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      sx={{
        backgroundColor: "rgb(155, 8, 217)",
        transition: "height 0.3s ease",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            padding: "0",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <RateReviewIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Link to="/home">
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                BloggIT
              </Typography>
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <Link to={`/${page.toLowerCase()}`} key={page}>
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "black", display: "block" }}
                    >
                      {page}
                    </Button>
                  </Link>
                ))}
              </Menu>
            </Box>

            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              BlogIT
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Link to={`/${page.toLowerCase()}`} key={page}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                </Link>
              ))}
            </Box>
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              position: "relative",
              margin: "0.5rem 0 0.5rem 0",
              bgcolor: "aqua",
              overflow: "hidden",
              borderRadius: "1.5rem",
              width: "200px",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                borderRadius: "0",
              },
            }}
          >
            <Accordion
              expanded={expanded}
              onChange={handleAccordionToggle}
              sx={{
                borderRadius: "16px",
                overflow: "hidden",
                textWrap: "nowrap",
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color: "rgb(155, 8, 217)",
                      margin: "0",
                      padding: "0",
                    }}
                  />
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ padding: "0px 20px", margin: 0 }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "rgb(155, 8, 217)", margin: "0" }}
                >
                  {account.username}
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Link to={`/myblogs/${account.username}`}>
                  <MenuItem
                    sx={{
                      color: "black",
                      borderRadius: "0.5rem",
                    }}
                  >
                    <Typography
                      sx={{
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      My Blogs
                    </Typography>
                  </MenuItem>
                </Link>
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleAccordionToggle}>
                    <Link
                      to={`/${setting.toLowerCase()}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Typography sx={{ textAlign: "center", color: "black" }}>
                        {setting}
                      </Typography>
                    </Link>
                  </MenuItem>
                ))}

                <MenuItem
                  onClick={handleLogout}
                  sx={{
                    bgcolor: "#c918f9",
                    color: "white",
                    borderRadius: "0.5rem",
                    "&:hover": {
                      bgcolor: "#ff0000",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Logout sx={{ margin: "0 0.4rem 0 0" }} />
                    logout
                  </Typography>
                </MenuItem>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
