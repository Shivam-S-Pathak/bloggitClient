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
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Logout } from "@mui/icons-material";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataContext } from "../../context/DataProvider.jsx";

const pages = ["Home", "About", "Contact"];
const settings = ["Profile", "Account", "Dashboard"];
const NavBar = ({ setIsAuthenticated, isAuthenticated }) => {
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
  }, [prevScrollPos, showNav]);

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
    setIsAuthenticated(false);
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
      position="sticky"
      sx={{
        backgroundColor: "rgb(155, 8, 217)",
        top: showNav ? 0 : "-250px",
        transition: "top 0.3s ease",
        zIndex: "1000",
      }}
    >
      <Container>
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            padding: "0",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
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
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
              }}
            >
              {" "}
              {/* this is pages box*/}
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
              <Link to={`/myblogs/${account.username}`}>
                <Button
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    textWrap: "nowrap",
                  }}
                >
                  My Blogs
                </Button>
              </Link>
              <Link to={`/myJournal/${account.username}`}>
                <Button
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    textWrap: "nowrap",
                  }}
                >
                  My Journals
                </Button>
              </Link>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
              }}
            >
              {" "}
              {/* menuicon box */}
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                sx={{ padding: "0.8rem 0 0 0" }}
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
                sx={{ display: { xs: "flex", md: "none" } }}
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
                <Link to={`/myblogs/${account.username}`} key="my Blogs">
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "black", display: "block" }}
                  >
                    My Blogs
                  </Button>
                </Link>
                <Link to={`/myJournal/${account.username}`} key="my Journals">
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "black", display: "block" }}
                  >
                    My Journals
                  </Button>
                </Link>
              </Menu>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                mt: 2,
                justifyContent: "center",
              }}
            >
              {" "}
              {/* this is mobile view bloggit box */}
              <RateReviewIcon
                sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
              />
              <Link to="/home">
                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    display: { xs: "flex", md: "none" },
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
            </Box>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              position: "relative",
              //  bgcolor:"blue",
              padding: "0.8rem 0 0.8rem 0",
              // maxWidth: "200px",
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
                textWrap: "nowrap",
                bgcolor: "transparent",
                border: "1px solid white",
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color: "white",
                    }}
                  />
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ margin: -1, padding: "0 30px 0 30px" }}
              >
                <Typography variant="h6" sx={{ color: "white" }}>
                  {account.username}
                </Typography>
              </AccordionSummary>

              <AccordionDetails sx={{ bgcolor: "white" }}>
                {/* <Link to={`/myJournal/${account.username}`}>
                  <MenuItem
                    sx={{
                      color: "black",
                      borderRadius: "0.5rem",
                    }}
                    onClick={handleAccordionToggle}
                  >
                    <Typography
                      sx={{
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      My Journals
                    </Typography>
                  </MenuItem>
                </Link> */}
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleAccordionToggle}>
                    {/* <Link
                      to={`/${setting.toLowerCase()}`}
                      style={{ textDecoration: "none" }}
                    > */}
                    <Typography sx={{ textAlign: "center", color: "black" }}>
                      {setting}
                    </Typography>
                    {/* </Link> */}
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
