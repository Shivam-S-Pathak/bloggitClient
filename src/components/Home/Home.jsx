import React, { useContext, useEffect, useState } from "react";
import styles from "./Home.module.css";
import Post from "./Post.jsx";
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

const blogs = [
  {
    id: 1,
    title: "The Future of Artificial Intelligence",
    description:
      "Exploring the potential impacts of AI on various industries and our daily lives. From self-driving cars to advanced medical diagnostics, AI is set to revolutionize the way we live and work.",
    category: "Technology",
    author: "Shivam",
    timestamp: "2 days ago",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Hidden Gems of Southeast Asia",
    description:
      "Discover the lesser-known wonders of Southeast Asia. From secluded beaches in Thailand to ancient temples in Cambodia, this blog post takes you on a journey through the region's best-kept secrets.",
    category: "Travel",
    author: "Ujjwal",
    timestamp: "1 week ago",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "Farm-to-Table: A Culinary Revolution",
    description:
      "Explore the growing trend of farm-to-table dining and its impact on local communities and sustainable agriculture. Learn how to incorporate fresh, locally-sourced ingredients into your own cooking.",
    category: "Food",
    author: "Nilay",
    timestamp: "3 days ago",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Mindfulness and Mental Health",
    description:
      "Discover the powerful connection between mindfulness practices and improved mental health. This comprehensive guide offers practical tips for incorporating mindfulness into your daily routine.",
    category: "Health",
    author: "Ayush",
    timestamp: "5 hours ago",
    readTime: "8 min read",
  },
  {
    id: 5,
    title: "The Rise of Quantum Computing",
    description:
      "Delve into the world of quantum computing and its potential to revolutionize industries from cryptography to drug discovery. Learn about the latest advancements and what they mean for the future of technology.",
    category: "Technology",
    author: "Akhilesh",
    timestamp: "1 day ago",
    readTime: "10 min read",
  },
  {
    id: 6,
    title: "The Golden Age of Television",
    description:
      "Explore how streaming services and high-quality productions have ushered in a new golden age of television. From epic fantasies to gritty crime dramas, discover the shows that are redefining the medium.",
    category: "Entertainment",
    author: "Pratiksha",
    timestamp: "4 days ago",
    readTime: "6 min read",
  },
];

const categories = ["Technology", "Travel", "Food", "Health", "Entertainment"];

const Home = () => {
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
                sx={{ bgcolor: "#AFE3C0", color: "black", width: "11.5rem" }}
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
                bgcolor: "#AFE3C0",
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

        <div className={styles.contentContainer}>
          <Post selectedCategories={selectedCategories}/>
        </div>
      </div>
    </Container>
  );
};

export default Home;
