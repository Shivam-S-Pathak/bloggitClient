import React, { useEffect, useState } from "react";
// import { DataContext } from "../../context/DataProvider.jsx";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { Link, useParams, useNavigate, resolvePath } from "react-router-dom";
import { API } from "../../source/api.js";
import PostSkeleton from "../Home/PostSkeleton.jsx";

const MyPost = ({ selectedCategories }) => {
  const { username } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  // const { account } = useContext(DataContext);
  // const username = account.username;
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getMyBlogs({ username });
      if (response.isSuccess) {
        setPost(response.data);
      }

      setLoading(false);
    };
    fetchData();
  }, [username]);

  const filteredBlogs =
    selectedCategories.length > 0
      ? post.filter((blog) => selectedCategories.includes(blog.Category))
      : post;

  const handleDelete = async (postId) => {
    let response = await API.deleteBlog(postId);
    if (response.isSuccess) {
      setPost((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } else {
    }
  };
  if (loading) {
    return <PostSkeleton />;
  }
  return (
    <div>
      {post && post.length > 0 ? (
        <Grid item xs={12} md={9}>
          <Box>
            {filteredBlogs.map((post) => (
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
                <Link to={`/home/details/${post._id}`}>
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
                          Author:- {post.editor}
                        </Typography>
                        <Typography variant="caption" display="block">
                          Posted on:-{" "}
                          {new Date(post.date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                        </Typography>
                      </Box>
                      <Chip
                        label={post.Category}
                        size="small"
                        sx={{ bgcolor: "rgb(155, 8, 217)", color: "white" }}
                      />
                    </Box>
                  </CardContent>
                </Link>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "right",
                    gap: "1rem",
                    padding: "0.5rem 0 0.5rem 0",
                  }}
                >
                  <Link to={`/update/${post._id}`}>
                    <Button variant="contained" sx={{ bgcolor: "#47682C" }}>
                      <EditNoteIcon sx={{ margin: "0 0.2rem 0 0" }} /> Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outlined"
                    sx={{
                      color: "red",
                      // color: "white",
                      margin: "0 0.5rem 0 0",
                      borderColor: "red",
                      "&:hover": {
                        bgcolor: "red",
                        color: "white",
                        borderColor: "red",
                      },
                    }}
                    onClick={() => handleDelete(post._id)}
                  >
                    <DeleteOutlineIcon sx={{ margin: "0 0.2rem 0 0" }} /> Delete
                  </Button>
                </Box>
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

export default MyPost;
