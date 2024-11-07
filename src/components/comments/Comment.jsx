import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Fade,
  Paper,
} from "@mui/material";
import { DataContext } from "../../context/DataProvider.jsx";
import { API } from "../../source/api.js";

import CommentCards from "./CommentCard.jsx";
import { useNavigate } from "react-router-dom";

const initialComments = {
  id: "",
  username: "",
  comment: "",
  date: new Date(),
};

const Comment = ({ id }) => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState([]);
  const [toggleState, setToggleState] = useState(false);
  const { account } = useContext(DataContext);
  const navigate = useNavigate();
  useEffect(() => {
    const getComments = async () => {
      try {
        let response = await API.getAllComments({ id });
        if (response.isSuccess) {
          setNewComment(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  }, [id, toggleState]);

  const handleCommentChange = (e) => {
    setComments({
      ...comments,
      id: id,
      username: account.username,
      comment: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(comments);
    let response = await API.addComments(comments);
    if (response.isSuccess) {
      setComments(initialComments);
      // navigate(`/home/details/${id}`)
    }
    setToggleState(!toggleState);
  };
  return (
    <>
      <Box sx={{ mt: 6, mb: 4 ,borderRadius: 2, border: "1px solid lightgrey" , p:3}}>
        <Typography
          variant="h5"
          gutterBottom
          color="black"
          textAlign="left"
          fontWeight="bolder"
        >
          Comment section
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{ p: 3, mb: 3, borderRadius: 2, border: "1px solid lightgrey" }}
          >
            <TextField
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              placeholder="Add a comment..."
              value={comments.comment}
              onChange={handleCommentChange}
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: "flex" }}>
              {comments.comment === "" ? (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  border="none"
                  sx={{ textTransform: "capitalize" }}
                  disabled
                >
                  Post Comment
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  border="none"
                  sx={{
                    textTransform: "capitalize",
                    bgcolor: "rgb(155, 8, 217)",
                  }}
                >
                  Post Comment
                </Button>
              )}
            </Box>
          </Box>
        </form>
        <CommentCards newComment={newComment} setToggleState={setToggleState}  toggleState={toggleState}   />
      </Box>
    </>
  );
};

export default Comment;
