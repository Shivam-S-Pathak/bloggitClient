import React, { useEffect, useState } from "react";
// import { DataContext } from "../../context/DataProvider.jsx";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Button,
  Modal,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { Link, useParams, useNavigate, resolvePath } from "react-router-dom";
import { API } from "../../source/api.js";
import PostSkeleton from "../Home/PostSkeleton.jsx";

const MyPost = ({ selectedCategories }) => {
  const { username } = useParams();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
    <Box sx={{ width: "100%" }}>
      {filteredBlogs.length > 0 ? (
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
                      sx={{
                        cursor: "pointer",
                        color: "black",
                        wordWrap: "break-word",
                        overflowWrap: "break-word",
                      }}
                    >
                      {post.title}
                    </Typography>

                    <Typography variant="body2" color="black">
                      {post.discription}
                    </Typography>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mt={2}
                    >
                      <Box>
                        <Typography variant="body3">
                          <Chip
                            label={`${"Author : "}${post.editor}`}
                            variant="filled"
                            sx={{ margin: "0.5rem" }}
                          />
                          <Chip
                            label={`${new Date(post.date).toDateString()}`}
                          />
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
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 400,
                      height: 110,
                      bgcolor: "rgb(155, 8, 217)",
                      boxShadow: 24,
                      p: 4,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      gap: 6,
                    }}
                  >
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                      color="white"
                    >
                      Do you want to delete this blog?
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 6,
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(post._id)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={handleClose}
                        sx={{ color: "white", border: "1px solid white" }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                </Modal>
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
                    <Button
                      variant="contained"
                      sx={{ bgcolor: "rgb(155, 8, 217)" }}
                    >
                      <EditNoteIcon sx={{ margin: "0 0.2rem 0 0" }} /> Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outlined"
                    sx={{
                      color: "#B3001B",
                      // color: "white",
                      margin: "0 0.5rem 0 0",
                      borderColor: "#B3001B",
                      "&:hover": {
                        bgcolor: "#B3001B",
                        color: "white",
                        borderColor: "#B3001B",
                      },
                    }}
                    onClick={handleOpen}
                  >
                    <DeleteOutlineIcon sx={{ margin: "0 0.2rem 0 0" }} /> Delete
                  </Button>
                </Box>
              </Card>
            ))}
          </Box>
        </Grid>
      ) : (
        <Typography sx={{ color: "black" }}>
          {" "}
          There is nothing to show for the selected categories.
        </Typography>
      )}
    </Box>
  );
};

export default MyPost;
