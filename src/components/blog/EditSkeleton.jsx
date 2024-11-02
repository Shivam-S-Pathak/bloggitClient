import React from "react";
import { Skeleton, Box, Typography, Container } from "@mui/material";

const EditSkeleton = () => {
  return (
    <Container sx={{ mt: 7, mb: 4, width: "100vw" }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        align="center"
        color="black"
        sx={{ mb: 4, color: "rgb(155, 8, 217)", borderRadius: "1rem 0 1rem 0" }}
      >
        <Skeleton variant="text" width="60%" />
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <Skeleton variant="rectangular" width="30%" height={56} />
        <Skeleton variant="rectangular" width="70%" height={56} />
      </Box>

      {/* Image Upload Placeholder */}
      {/* <Skeleton variant="rectangular" width="100%" height={200} sx={{ mb: 4 }} /> */}

      <Skeleton variant="rectangular" width="100%" height={56} sx={{ mb: 4 }} />
      <Skeleton variant="rectangular" width="100%" height={56} sx={{ mb: 4 }} />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={300}
        sx={{ mb: 4 }}
      />

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Skeleton variant="rectangular" width="200px" height={56} />
      </Box>
    </Container>
  );
};

export default EditSkeleton;
