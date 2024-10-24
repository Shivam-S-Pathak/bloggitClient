import React from "react";
import { Container, Box, Skeleton, useMediaQuery } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
const SkeletonBlog = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Skeleton variant="text" width="50rem" height={100} sx={{ mb: 2 , textAlign:"center"}}/>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          flexWrap: "wrap",
          gap: 2,
          height:"6rem"
        }}
      >
        <Skeleton variant="rounded" width={120} height={50} />
        <Skeleton variant="rounded" width={150} height={50} />
        <Skeleton variant="rounded" width={100} height={50} />
      </Box>

      {/* <Skeleton 
          variant="rectangular" 
          width="100%" 
          height={isMobile ? 200 : 400} 
          sx={{ borderRadius: 2, mb: 3 }}
        /> */}

      <Skeleton variant="text" width="100%" sx={{ mb: 1 }} height={50} />
      <Skeleton variant="text" width="100%" sx={{ mb: 1 }} height={50}/>
      <Skeleton variant="text" width="100%" sx={{ mb: 1 }} height={50}/>
      <Skeleton variant="text" width="90%" sx={{ mb: 1 }} height={50}/>
      <Skeleton variant="text" width="95%" sx={{ mb: 1 }} height={50}/>
      <Skeleton variant="text" width="100%" sx={{ mb: 1 }} height={50}/>
      <Skeleton variant="text" width="85%" sx={{ mb: 1 }} height={50}/>
      <Skeleton variant="text" width="100%" sx={{ mb: 1 }} height={50}/>
      <Skeleton variant="text" width="100%" sx={{ mb: 1 }} height={50}/>
      <Skeleton variant="text" width="92%" sx={{ mb: 1 }} height={50} />

      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 4 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Box>
          <Skeleton variant="text" width={120} />
          <Skeleton variant="text" width={80} />
        </Box>
      </Box>
    </Container>
  );
};

export default SkeletonBlog;
