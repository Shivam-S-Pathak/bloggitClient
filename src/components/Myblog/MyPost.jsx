import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Avatar,
  Button,
  Modal,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link, useParams, useNavigate } from "react-router-dom";
import { API } from "../../source/api.js";
import PostSkeleton from "../Home/PostSkeleton.jsx";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FavoriteIcon from "@mui/icons-material/Favorite";

const MyPost = ({ selectedCategories }) => {
  const { username } = useParams();
  const [open, setOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null); // State to hold the post ID to delete
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [isMore, setIsMore] = useState(false);
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

  const handleDelete = async () => {
    if (postToDelete) {
      let response = await API.deleteBlog(postToDelete);
      if (response.isSuccess) {
        setPost((prevPosts) =>
          prevPosts.filter((post) => post._id !== postToDelete)
        );
        handleClose();
      }
    }
  };

  const handleOpen = (postId) => {
    setPostToDelete(postId); // Set the post to delete
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (loading) {
    return <PostSkeleton />;
  }

  return (
    <Box sx={{ width: "100%" }}>
      {filteredBlogs.length > 0 ? (
        <Grid container spacing={3}>
          {filteredBlogs.map((post) => (
            <Grid item xs={12} key={post._id}>
              <Link
                to={`/home/details/${post._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" }, // Stack vertically on mobile, horizontally on desktop
                    transition: "transform 0.3s ease-in-out",
                    position: "relative",
                    borderBottom: "2px solid #e0e0e0",
                    boxShadow: "none",
                    borderRadius: "0",
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      width: "100%",
                      p: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Avatar
                        sx={{
                          color: "white",
                          width: 28,
                          height: 28,
                          fontSize: "0.8rem",
                          bgcolor: "rgb(155, 8, 217)",
                          mr: 1,
                        }}
                      >
                        {getInitials(post.editor)}
                      </Avatar>
                      <Typography
                        variant="body3"
                        sx={{
                          textDecoration: "underline",
                        }}
                      >
                        {post.editor}
                      </Typography>
                    </Box>

                    {/* Image positioned above the title on mobile */}
                    {post.coverImage && (
                      <Box
                        component="img"
                        src={post.coverImage}
                        alt={post.title}
                        sx={{
                          width: "100%", // Image takes full width on mobile
                          height: "auto", // Adjust height based on aspect ratio
                          objectFit: "cover",
                          borderRadius: "8px",
                          alignSelf: "center",
                          m: 2,
                          display: { xs: "block", sm: "none" }, // Show on mobile only
                        }}
                      />
                    )}

                    {/* Title */}
                    <Typography
                      variant="h5"
                      textAlign="left"
                      sx={{
                        fontWeight: "900",
                        fontSize: "1.6rem",
                        color: "#333",
                        lineHeight: 1.4,
                        mb: 1,
                        mt: 1,
                      }}
                    >
                      {post.title}
                      <Chip
                        label={post.Category}
                        size="small"
                        sx={{
                          border: "solid 1px rgb(164, 158, 167)",
                          bgcolor: "transparent",
                          color: "rgb(164, 158, 167)",
                          ml: 2,
                          fontWeight: 100,
                          fontSize: "0.7rem",
                        }}
                      />
                    </Typography>

                    {/* Description */}
                    <Typography
                      variant="body2"
                      textAlign="left"
                      sx={{
                        color: "#555",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        mb: 2,
                        fontSize: "1rem",
                      }}
                    >
                      {post.discription}
                    </Typography>

                    {/* Bottom Row: Category and Date */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <AccessTimeIcon sx={{ fontSize: 14, mr: 0.5 }} />
                        <Typography variant="caption">
                          {new Date(post.date).toDateString()}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <FavoriteIcon
                          sx={{
                            fontSize: 14,
                            color: "#e91e63",
                            m: "0 0 0 1rem",
                          }}
                        />
                        <Typography
                          variant="caption"
                          sx={{ fontStyle: "italic", color: "#e91e63" }}
                        >
                          {post.likedBy.length}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>

                  {/* Image on the Right for Desktop */}
                  {post.coverImage && (
                    <Box
                      component="img"
                      src={post.coverImage}
                      alt={post.title}
                      sx={{
                        width: "180px", // Set width for desktop view
                        height: "auto", // Adjust height based on aspect ratio
                        objectFit: "cover",
                        borderRadius: "8px",
                        alignSelf: "center",
                        m: 2,
                        display: { xs: "none", sm: "block" }, // Show on desktop only
                      }}
                    />
                  )}
                </Card>
              </Link>

              {/* Edit and Delete Buttons */}
              <Box sx={{ display: "flex", p: 1, justifyContent: "right" }}>
                {isMore ? (
                  <Box>
                    <Link to={`/update/${post._id}`}>
                      <Button
                        variant="outlined"
                        sx={{
                          bgcolor: "transparent",
                          color: "black",
                          fontSize: "0.6rem",
                          border: "none",
                        }}
                      >
                        <EditNoteIcon sx={{ margin: "0 0.2rem 0 0" }} /> Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outlined"
                      sx={{
                        bgcolor: "transparent",
                        color: "black",
                        fontSize: "0.6rem",
                        border: "none",
                      }}
                      onClick={() => handleOpen(post._id)}
                    >
                      <DeleteOutlineIcon
                        sx={{ margin: "0 0.2rem 0 0", fontSize: "1rem" }}
                      />{" "}
                      Delete
                    </Button>
                  </Box>
                ) : (
                  ""
                )}

                <MoreVertIcon
                  sx={{ color: "black", cursor: "pointer" }}
                  onClick={() => setIsMore(!isMore)}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography sx={{ color: "black", textAlign: "center", mt: 4 }}>
          There is nothing to show for the selected categories.
        </Typography>
      )}

      {/* Modal for confirmation */}
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
            Do you want to delete this journal?
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
    </Box>
  );
};

export default MyPost;
