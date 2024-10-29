import React, { useContext, useEffect, useState } from "react";
import styles from "../Home/Home.module.css";
import MyPost from "./MyPost.jsx";
import { DataContext } from "../../context/DataProvider.jsx";
import {
  Button,
  Container,
  Card,
  CardContent,
  Typography,
  Chip,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Add as AddIcon } from "@mui/icons-material";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import { API } from "../../source/api.js";

const categories = ["Technology", "Travel", "Food", "Health", "Entertainment"];

const MyBlogs = () => {
  const { account } = useContext(DataContext);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 750) {
        setIsMobileView(true);
      } else {
        setIsMobileView(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, marginTop: "3rem" }}>
      <div
        className={styles.blogContainer}
        style={{
          display: "flex",
          flexDirection: isMobileView ? "column" : "row",
        }}
      >
        <div className={styles.allBtnContainer}>
          <Box className={styles.buttonContainer} mb={2}>
            <Link to="/createblog">
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#AFE3C0",
                  color: "black",
                  width: "11.5rem",
                  padding: "0.7rem 0 0.7rem 0",
                }}
                startIcon={<AddIcon />}
              >
                Create Blog
              </Button>
            </Link>
          </Box>
          {/* <div className={styles.filterContainer}> */}
          <Grid item xs={12} md={3}>
            <Accordion
              sx={{
                bgcolor: "#91C4F2",
                borderRadius: "8px",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="category-content"
                id="category-header"
                sx={{
                  minHeight: "48px",
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ color: "black" }}>
                  Filter
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{
                    color: "black",
                    textAlign: "left",
                    textDecoration: "underline",
                  }}
                >
                  Categories
                </Typography>
                <List sx={{ color: "black" }}>
                  {categories.map((category) => (
                    <ListItem
                      key={category}
                      dense
                      button
                      onClick={() => handleCategoryToggle(category)}
                    >
                      <Checkbox
                        edge="start"
                        checked={selectedCategories.includes(category)}
                        tabIndex={-1}
                        disableRipple
                      />
                      <ListItemText primary={category} />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          </Grid>
          {/* </div> */}
        </div>

        <Box
          className={styles.contentContainer}
          width={{
            xs: "25rem",
            sm: "20rem",
            md: "40rem",
            lg: "55rem",
            xl: "55rem",
          }}
        >
          <MyPost selectedCategories={selectedCategories} />
        </Box>
      </div>
    </Container>
  );
};

export default MyBlogs;
