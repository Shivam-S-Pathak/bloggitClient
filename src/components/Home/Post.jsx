import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Avatar,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { API } from "../../source/api.js";
import PostSkeleton from "./PostSkeleton.jsx";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FavoriteIcon from "@mui/icons-material/Favorite";

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

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const filteredBlogs =
    selectedCategories.length > 0
      ? post.filter((blog) => selectedCategories.includes(blog.Category))
      : post;

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
                to={`details/${post._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
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
                          // color: "#999",
                          textDecoration: "underline",
                        }}
                      >
                        {post.editor}
                      </Typography>
                    </Box>

                    {post.coverImage && (
                      <Box
                        component="img"
                        src={post.coverImage}
                        alt={post.title}
                        sx={{
                          width: "100%",
                          height: "auto",
                          objectFit: "cover",
                          borderRadius: "8px",
                          alignSelf: "center",
                          m: 2,
                          display: { xs: "block", sm: "none" },
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
                          border: "solid 1px rgb(164, 158, 167) ",
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

                    {/* Category and Date */}
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

                  {post.coverImage && (
                    <Box
                      component="img"
                      src={post.coverImage}
                      alt={post.title}
                      sx={{
                        width: "180px",
                        height: "130px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        alignSelf: "center",
                        m: 2,
                        display: { xs: "none", sm: "block" },
                      }}
                    />
                  )}
                </Card>
              </Link>
            </Grid>
          ))}
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
