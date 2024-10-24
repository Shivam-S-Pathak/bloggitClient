import React, { useEffect, useState } from "react";
import { DataContext } from "../../context/DataProvider.jsx";
import { Card, CardContent, Typography, Chip, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

import { Link } from "react-router-dom";
import { API } from "../../source/api.js";
import PostSkeleton from "./PostSkeleton.jsx";

const Post = ({ selectedCategories }) => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getAllBlogs();
      if (response.isSuccess) {
        setPost(response.data);
      }
      setLoading(false);
    };

    fetchData();
  }, []);
  const filteredBlogs =
    selectedCategories.length > 0
      ? post.filter((blog) => selectedCategories.includes(blog.Category))
      : post;

  if (loading) {
    return <PostSkeleton />;
  }
  return (
    <div>
      {post && post.length > 0 ? (
        <Grid item xs={12} md={9}>
          <Box>
            {filteredBlogs.map((post) => (
              <Link to={`details/${post._id}`}>
                <Card
                  key={post._id}
                  sx={{
                    mb: 5,
                    borderRadius: "1rem",
                    bgcolor: "#FEFDFF",
                    boxShadow: "0px 2px 5px 0px #415A77",
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
                    <Typography
                      gutterBotto
                      variant="h5"
                      component="div"
                      sx={{ cursor: "pointer" }}
                    >
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
                        <Typography variant="body3" sx={{ fontWeight: "bold" }}>
                          Author:- {post.author}
                        </Typography>
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
              </Link>
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
