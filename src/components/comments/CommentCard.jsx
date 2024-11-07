import React, { useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import {
  Box,
  CardContent,
  Typography,
  Avatar,
  Stack,
  Button,
} from "@mui/material";
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
    <Box
      sx={{ mt: 4, mb: 4, display: "flex", flexDirection: "column", gap: 3 }}
    >
      {newComment.map((comment, index) => (
        <Box
          key={index}
          sx={{
            borderRadius: 2,
            border: "1px solid #ddd",
            padding: 3,
          }}
        >
          <CardContent sx={{ padding: 0 }}>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{
                flexWrap: { xs: "wrap", sm: "nowrap" },
                rowGap: { xs: 2, sm: 0 },
              }}
            >
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="baseline"
                  sx={{ mb: 1 }}
                >
                  <Box sx={{display:"flex" , flexDirection:"row" , gap:1 , alignItems:"center"}}>
                    <Avatar
                      sx={{ bgcolor: "rgb(155, 8, 217)", fontSize: "1.2rem" , fontWeight:"bold" }}
                    >
                      {comment.username
                        ? comment.username[0].toUpperCase()
                        : "U"}
                    </Avatar>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "1.05rem",
                        color: "black",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {comment.username || "Anonymous"}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      color: "GrayText",
                      fontSize: "0.9rem",
                    }}
                  >
                    {new Date(comment.date).toISOString().split("T")[0]}
                  </Typography>
                </Stack>

                <Typography
                  sx={{
                    textAlign: "left",
                    fontSize: "1rem",
                    color: "black",
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    whiteSpace: "pre-wrap",
                    lineHeight: 1.6,
                  }}
                >
                  {comment.comment}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
          <Box sx={{ textAlign: "right" }}>
            {comment.username === account.username && (
              <Button
                variant="contained"
                onClick={() => handleDelete(comment._id)}
                sx={{
                  height: "1.8rem",
                  textTransform: "capitalize",
                  bgcolor: "red",
                  fontSize: "0.8rem",
                  ml: { xs: 0, sm: "auto" },
                }}
              >
                Delete
              </Button>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default CommentCards;
