import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Chip,
  Avatar,
  Divider,
  useMediaQuery,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { AccessTime, Person } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { API } from "../../source/api.js";
import { DataContext } from "../../context/DataProvider.jsx";

//components
import SkeletonBlog from "./skeletonBlog.jsx";
import Comment from "../comments/Comment.jsx";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const ShowBlogs = () => {
  const theme = useTheme();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  const { account } = useContext(DataContext);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const { id } = useParams();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getPostById({ id });
      if (response.isSuccess) {
        setPost(response.data);
        const likedUsers = response.data.likedBy;

        setIsLiked(likedUsers.includes(account.username));
        setLikeCount(likedUsers.length);
      }

      setLoading(false);
    };
    fetchData();
  }, [id, account.username]);

  const handleLike = async () => {
    setIsLiked(!isLiked);
    setLikeCount((prevCount) => prevCount + (isLiked ? -1 : 1));
    if (isLiked) {
      await API.unlikePost({ id, username: account.username });
    } else {
      await API.likePost({ id, username: account.username });
    }
  };

  const handleCommentClick = () => {
    setIsCommentOpen(!isCommentOpen);
  };
  if (loading) {
    return <SkeletonBlog />;
  }
  return (
    <>
      <Box sx={{ minHeight: "100vh" }}>
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
              wordWrap: "break-word",
              overflowWrap: "break-word",
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
          {coverImage ? (
            <Box
              component="img"
              sx={{
                height: isMobile ? "200px" : "400px",
                objectFit: "cover",
                borderRadius: 2,
                mb: 3,
              }}
              src={post.coverImage}
              alt={post.title}
            />
          ) : (
            " "
          )}

          <Divider sx={{ mb: 3 }} />

          <Typography
            variant="body1"
            sx={{
              whiteSpace: "pre-wrap",
              lineHeight: 1.8,
              color: "black",
              textAlign: "left",
              wordWrap: "break-word",
              overflowWrap: "break-word",
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
            <Box sx={{ width: "100%" }}>
              <Typography variant="subtitle1" textAlign="left">
                {post.editor}{" "}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="left"
              >
                Author
              </Typography>
            </Box>
            <Box
              sx={{
                color: "black",
                display: "flex",
                justifyContent: "flex-end",

                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  mr: 5,
                  fontWeight: 400,
                  color: "black",
                  cursor: "pointer",
                }}
                onClick={handleCommentClick}
              >
                <InsertCommentOutlinedIcon
                  sx={{
                    color: "rgb(155, 8, 217)",
                    fontSize: "2rem",
                    mr: 1,
                  }}
                />
                {commentCount}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  mr: 5,
                  fontWeight: 400,
                  color: "black",
                  cursor: "pointer",
                }}
                onClick={handleLike}
              >
                {isLiked ? (
                  <FavoriteIcon
                    sx={{
                      color: "red",
                      fontSize: "2rem",
                      mr: 1,
                    }}
                  />
                ) : (
                  <FavoriteBorderIcon
                    sx={{
                      color: "red",
                      fontSize: "2rem",
                      mr: 1,
                    }}
                  />
                )}
                {likeCount}
              </Box>
            </Box>
          </Box>

          <Comment
            id={post._id}
            isCommentOpen={isCommentOpen}
            setIsCommentOpen={setIsCommentOpen}
            setCommentCount={setCommentCount}
          />
        </Container>
      </Box>
    </>
  );
};

export default ShowBlogs;
