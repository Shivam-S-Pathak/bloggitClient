import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const NAmodal = ({ open, handleClose, selectedSetting }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="account-modal-title"
      aria-describedby="account-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "1px solid #ccc",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          textAlign: "center",
          color: "black",
        }}
      >
        <Typography id="account-modal-title" variant="h6" sx={{ mb: 2 }}>
          {selectedSetting} Section Under Development
        </Typography>
        <Typography id="account-modal-description" sx={{ mb: 3 }}>
          The {selectedSetting} page is currently under construction. We're
          working hard to bring this feature to you soon! Please check back
          later.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClose}
          sx={{
            backgroundColor: "#8e24aa",
            "&:hover": { backgroundColor: "#6a1b9a" },
          }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default NAmodal;
