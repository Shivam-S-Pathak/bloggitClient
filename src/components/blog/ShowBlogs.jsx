import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Chip,
  Avatar,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { AccessTime, Person } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { API } from "../../source/api.js";

//components
import SkeletonBlog from "./skeletonBlog.jsx";
import Comment from "../comments/Comment.jsx";

const ShowBlogs = () => {
  const theme = useTheme();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getPostById({ id });
      if (response.isSuccess) {
        setPost(response.data);
      }

      setLoading(false);
    };
    fetchData();
  }, [id]);
  if (loading) {
    return <SkeletonBlog />;
  }
  return (
    <>
      <Box sx={{ minHeight: "100vh"}}>
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              color: "black",
              margin: "4rem 0 1rem 0",
              fontWeight: "bolder",
              textAlign: "center",
            }}
          >
            {post.title}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Chip
              icon={<AccessTime />}
              label={new Date(post.date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
              variant="outlined"
            />
            <Chip icon={<Person />} label={post.username} variant="outlined" />
            <Chip
              label={post.Category}
              sx={{ bgcolor: "rgb(155, 8, 217)", color: "white" }}
            />
          </Box>

          {/* <Box
        component="img"
        sx={{
          width: "100%",
          height: isMobile ? "200px" : "400px",
          objectFit: "cover",
          borderRadius: 2,
          mb: 3,
        }}
        src={post.coverImage}
        alt={post.title}
      /> */}

          <Divider sx={{ mb: 3 }} />

          <Typography
            variant="body1"
            sx={{
              whiteSpace: "pre-wrap",
              lineHeight: 1.8,
              color: "black",
              textAlign: "left",
            }}
          >
            {post.body}
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              color: "black",
              fontWeight: "bolder",
            }}
          >
            <Avatar>{post.editor?.charAt(0).toUpperCase()}</Avatar>

            <Box>
              <Typography variant="subtitle1">{post.editor}</Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="left"
              >
                Author
              </Typography>
            </Box>
          </Box>
          <Comment id={post._id} />
        </Container>
      </Box>
    </>
  );
};

export default ShowBlogs;
