import React, { useContext, useState } from "react";
import { DataContext } from "../../context/DataProvider";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { API } from "../../source/api";

const CommentCards = ({ newComment, setToggleState, toggleState }) => {
  const { account } = useContext(DataContext);

  const handleDelete = async (id) => {
    let response = await API.deleteComment(id);
    if (response.isSuccess) {
      setToggleState(!toggleState);
    }
  };
  return (
    <Box sx={{ mt: 4, mb: 4}}>
      {newComment.map((comment, index) => (
        <Box
          key={index}
          sx={{ mb: 2, borderRadius: 2, border: "1px solid lightgrey" }}
        >
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                  <Avatar sx={{ bgcolor: "rgb(155, 8, 217)" }}>
                    {comment.username ? comment.username[0].toUpperCase() : "U"}
                  </Avatar>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1.05rem",
                        color: "black",
                      }}
                    >
                      {comment.username || "Anonymous"}
                    </Typography>
                    <Typography sx={{ color: "GrayText", fontSize: "0.8rem" }}>
                      {new Date(comment.date).toISOString().split("T")[0]}
                    </Typography>
                  </Box>
                  {comment.username === account.username ? (
                    <DeleteIcon
                      sx={{ color: "red" }}
                      onClick={() => handleDelete(comment._id)}
                    />
                  ) : (
                    ""
                  )}
                </Box>

                <Typography
                  sx={{
                    textAlign: "left",
                    ml: 1,
                    fontSize: "1.1rem",
                    color: "black",
                  }}
                >
                  {comment.comment}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Box>
      ))}
    </Box>
  );
};

export default CommentCards;
