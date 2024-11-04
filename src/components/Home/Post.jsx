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

  // Filter the blogs based on selected categories
  const filteredBlogs =
    selectedCategories.length > 0
      ? post.filter((blog) => selectedCategories.includes(blog.Category))
      : post;

  if (loading) {
    return <PostSkeleton />;
  }

  return (
    <Box sx={{width:"100%"}}>
      {filteredBlogs.length > 0 ? (
        <Grid item xs={12} md={9}>
          <Box>
            {filteredBlogs.map((post) => (
              <Link to={`details/${post._id}`} key={post._id}>
                <Card
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
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ cursor: "pointer" , textAlign:"center"}}
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
                        <Typography variant="body3" sx={{fontFamily:""}}>
                        <Chip label={`${"Author : "}${post.editor}`} variant="filled" sx={{margin:"0.5rem"}}/> 
                        <Chip label={`${new Date(post.date).toDateString()}`} />
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
        <Typography sx={{ color: "black", textAlign: "center", mt: 4 }}>
          There is nothing to show for the selected categories.
        </Typography>
      )}
    </Box>
  );
};

export default Post;
