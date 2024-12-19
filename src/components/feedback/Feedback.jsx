import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { API } from "../../source/api.js";
import { DataContext } from "../../context/DataProvider.jsx";
const FeedbackModal = ({ open, setOpen }) => {
  const [feedback, setFeedback] = useState("");

  const [loading, setLoading] = useState(false);
  const { account } = useContext(DataContext);

  const handleClose = () => setOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!feedback) {
      alert("Please provide your feedback.");
      return;
    }

    const formData = new FormData();
    formData.append("feedback", feedback);
    formData.append("email", account.email);

    try {
      setLoading(true);
      const response = await API.sendFeedback(formData);
      console.log("this is from the feedback ", response);
      setLoading(false);

      if (response.isSuccess) {
        alert("Feedback submitted successfully!");
        setFeedback("");
        handleClose();
      } else {
        alert("Failed to submit feedback. Please try again.");
        setFeedback("");
        handleClose();
      }
    } catch (error) {
      alert(
        "An error occurred while submitting feedback. Please check your connection and try again."
      );
      console.error("Feedback submission error:", error);
    } finally {
    }
  };

  return (
    <div>
      {/* <Button variant="contained" color="primary" onClick={handleOpen}>
        Send Feedback
      </Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="feedback-modal-title"
        aria-describedby="feedback-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography
            id="feedback-modal-title"
            variant="h6"
            component="h2"
            sx={{ color: "black", fontWeight: "600" }}
          >
            We Value Your Feedback
          </Typography>
          <Typography
            id="feedback-modal-description"
            sx={{ mt: 2, mb: 2, fontSize: "0.9rem", color: "text.secondary" }}
          >
            Let us know what you think about our website!
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Your Feedback"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              sx={{ mb: 2 }}
              required
            />

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="contained"
                type="submit"
                disabled={loading}
                sx={{ bgcolor: "rgb(155, 8, 217)" }}
              >
                {loading ? (
                  <CircularProgress
                    size={24}
                    sx={{ color: "rgb(155, 8, 217)" }}
                  />
                ) : (
                  "Submit"
                )}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default FeedbackModal;
