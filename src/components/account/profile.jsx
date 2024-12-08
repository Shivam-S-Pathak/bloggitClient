import React, { useContext, useEffect, useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import { ChevronRight } from "@mui/icons-material";

const ProfileDrawer = ({ open, onClose, user, email }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    setNewUsername(user);
    setNewEmail(email);
  }, [user, email]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: 300,
          height: "100vh",
          backgroundColor: "#fafafa", // Light background color for the drawer
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflowY: "auto",
        }}
      >
        {/* Profile Avatar */}
        <Box
          sx={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            backgroundColor: "#8e24aa", // Vibrant background color for avatar
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 2,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow for better visibility
          }}
        >
          <Typography variant="h4" color="white">
            {newUsername.toUpperCase()[0]}
          </Typography>
        </Box>

        {/* Username Field with Label */}
        <Box sx={{ width: "100%", marginBottom: 2 }}>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ marginBottom: 1, fontSize: "1rem" }}
          >
            Username
          </Typography>

          <Typography
            sx={{
              fontSize: "1rem",
              padding: "14px",
              border: "1px solid rgba(0, 0, 0, 0.23)",
              borderRadius: "4px",
              backgroundColor: "#fafafa",
              color: "rgba(0, 0, 0, 0.87)",
              display: "block",
            }}
          >
            {newUsername}
          </Typography>
        </Box>

        {/* Email Field with Label */}
        <Box sx={{ width: "100%", marginBottom: 3 }}>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ marginBottom: 1 }}
          >
            Email
          </Typography>
          <Typography
            sx={{
              fontSize: "1rem",
              padding: "14px",
              border: "1px solid rgba(0, 0, 0, 0.23)",
              borderRadius: "4px",
              backgroundColor: "#fafafa",
              color: "rgba(0, 0, 0, 0.87)",
              display: "block",
            }}
          >
            {newEmail}
          </Typography>
        </Box>

        {/* Blogs, Followers, and Following Section */}
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            padding: "10px 0",
            marginBottom: 3,
            borderRadius: "4px",
            backgroundColor: "#f5f5f5",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)", // Subtle shadow for better visibility
          }}
        >
          <Box sx={{ textAlign: "center", flex: 1 }}>
            <Typography variant="h6" color="primary">
              {account.blogsCount || 0}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Blogs
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center", flex: 1 }}>
            <Typography variant="h6" color="primary">
              {account.followersCount || 0}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Followers
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center", flex: 1 }}>
            <Typography variant="h6" color="primary">
              {account.followingCount || 0}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Following
            </Typography>
          </Box>
        </Box> */}

        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            left: 0,
            right: 0,
            textAlign: "center",
            fontSize: "12px",
            color: "#888",
          }}
        >
          <Divider sx={{ my: 3, mx: 3, backgroundColor: "#e0e0e0" }} />
          <Typography variant="body2">Designed by Shivam Pathak</Typography>
        </Box>

        <Button
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 20,
            right: 20,
            color: "#333",
            "&:hover": {
              color: "#8e24aa", // Hover effect for close icon
            },
          }}
        >
          <ChevronRight />
        </Button>
      </Box>
    </Drawer>
  );
};

export default ProfileDrawer;
