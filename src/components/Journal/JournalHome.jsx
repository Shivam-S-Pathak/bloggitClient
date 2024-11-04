import React, { useContext, useEffect, useState } from "react";
import styles from "./JournalHome.module.css";
import JournalCards from "./JournalCards.jsx";
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

const JournalHome = () => {
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
    <Container maxWidth="lg">
      <div
        className={styles.postContainer}
        style={{
          display: "flex",
          flexDirection: isMobileView ? "column" : "row",
        }}
      >
        <div className={styles.allBtnContainer}>
          <Box className={styles.buttonContainer} mb={2}>
            <Link to="/journal">
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#A5CCD1",
                  color: "black",
                  width: "11.5rem",
                  padding: "0.7rem 0 0.7rem 0",
                }}
                startIcon={<AddIcon />}
              >
                Write Journal
              </Button>
            </Link>
          </Box>
        </div>
        <Typography
          sx={{
            fontSize: "2rem",
            bgcolor: "#28262C",
            color: "white",
            padding: "0.1rem",
            textAlign: "center",
            // Toggle vertical or horizontal based on isMobileView
            writingMode: isMobileView ? "horizontal-tb" : "vertical-rl",
            textOrientation: isMobileView ? "initial" : "mixed",
          }}
        >
          Your Journals
        </Typography>
        <Box
          className={styles.contentContainer}
          // width={{
          //   xs: "25rem",
          //   sm: "20rem",
          //   md: "40rem",
          //   lg: "55rem",
          //   xl: "55rem",
          // }}
        >
          <JournalCards selectedCategories={selectedCategories} />
        </Box>
      </div>
    </Container>
  );
};

export default JournalHome;
