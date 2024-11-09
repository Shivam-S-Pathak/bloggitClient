import React, { useContext, useEffect, useState } from "react";
import styles from "./JournalHome.module.css";
import JournalCards from "./JournalCards.jsx";
import { DataContext } from "../../context/DataProvider.jsx";
import { Button, Container, Typography, Box } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

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

  return (
    <Container minHeight="100vh">
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
       
        >
          <Typography sx={{color:"#00916E" , mb:2 , textAlign:"left"}}>*Note: All journals which you create are only visible to you</Typography>
          <JournalCards selectedCategories={selectedCategories} />
        </Box>
      </div>
    </Container>
  );
};

export default JournalHome;
