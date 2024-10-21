import React, { useEffect, useState } from "react";
import { DataContext } from "../../context/DataProvider.jsx";
import { Card, CardContent, Typography, Chip, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

import { Link } from "react-router-dom";
import { API } from "../../source/api.js";

// const posts = [
//   {
//     id: 1,
//     title: "The Future of Artificial Intelligence",
//     description:
//       "Exploring the potential impacts of AI on various industries and our daily lives. From self-driving cars to advanced medical diagnostics, AI is set to revolutionize the way we live and work.",
//     category: "Technology",
//     author: "Shivam",
//     timestamp: "2 days ago",
//     readTime: "5 min read",
//   },
//   {
//     id: 2,
//     title: "Hidden Gems of Southeast Asia",
//     description:
//       "Discover the lesser-known wonders of Southeast Asia. From secluded beaches in Thailand to ancient temples in Cambodia, this post post takes you on a journey through the region's best-kept secrets.",
//     category: "Travel",
//     author: "Ujjwal",
//     timestamp: "1 week ago",
//     readTime: "7 min read",
//   },
//   {
//     id: 3,
//     title: "Farm-to-Table: A Culinary Revolution",
//     description:
//       "Explore the growing trend of farm-to-table dining and its impact on local communities and sustainable agriculture. Learn how to incorporate fresh, locally-sourced ingredients into your own cooking.",
//     category: "Food",
//     author: "Nilay",
//     timestamp: "3 days ago",
//     readTime: "6 min read",
//   },
//   {
//     id: 4,
//     title: "Mindfulness and Mental Health",
//     description:
//       "Discover the powerful connection between mindfulness practices and improved mental health. This comprehensive guide offers practical tips for incorporating mindfulness into your daily routine.",
//     category: "Health",
//     author: "Ayush",
//     timestamp: "5 hours ago",
//     readTime: "8 min read",
//   },
//   {
//     id: 5,
//     title: "The Rise of Quantum Computing",
//     description:
//       "Delve into the world of quantum computing and its potential to revolutionize industries from cryptography to drug discovery. Learn about the latest advancements and what they mean for the future of technology.",
//     category: "Technology",
//     author: "Akhilesh",
//     timestamp: "1 day ago",
//     readTime: "10 min read",
//   },
//   {
//     id: 6,
//     title: "The Golden Age of Television",
//     description:
//       "Explore how streaming services and high-quality productions have ushered in a new golden age of television. From epic fantasies to gritty crime dramas, discover the shows that are redefining the medium.",
//     category: "Entertainment",
//     author: "Pratiksha",
//     timestamp: "4 days ago",
//     readTime: "6 min read",
//   },
// ];

const Post = ({ selectedCategories }) => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getAllBlogs();
      if (response.isSuccess) {
        setPost(response.data);
      }
    };

    fetchData();
  }, []);
  const filteredBlogs =
    selectedCategories.length > 0
      ? post.filter((blog) => selectedCategories.includes(blog.Category))
      : post;
  return (
    <div>
      {post && post.length > 0 ? (
        <Grid item xs={12} md={9}>
          <Box>
            {filteredBlogs.map((post) => (
              <Card
                key={post._id}
                sx={{
                  mb: 3,
                  borderRadius: "1rem",
                  bgcolor: "#FEFDFF",
                  boxShadow: "0px 2px 5px 0px #415A77",
                  cursor: "pointer",
                  transition:
                    "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "2px 4px 10px 2.5px #415A77",
                    color: "rgb(155, 8, 217)",
                  },
                }}
              >
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {post.title}
                  </Typography>
                  <Typography variant="body2">{post.discription}</Typography>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mt={2}
                  >
                    <Box>
                      <Typography variant="body3" sx={{fontWeight:"bold"}}>Author:- {post.author}</Typography>
                      <Typography variant="caption" display="block">
                        {post.date}
                      </Typography>
                    </Box>
                    <Chip
                      label={post.Category}
                      size="small"
                      sx={{ bgcolor: "rgb(155, 8, 217)", color: "white" }}
                    />
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Grid>
      ) : (
        <Typography sx={{ color: "black" }}>no data avialable</Typography>
      )}
    </div>
  );
};

export default Post;
