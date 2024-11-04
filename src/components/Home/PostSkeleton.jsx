import React from "react";
import { Card, CardContent, Typography, Box, Skeleton } from "@mui/material";
import Grid from "@mui/material/Grid2";

const PostSkeleton = () => {
  return (
    <Grid item xs={12} md={9}>
      <Box>
        {[1, 2, 3, 4].map((_, index) => (
          <Card
            key={index}
            sx={{
              mb: 5,
              borderRadius: "1rem",
              bgcolor: "rgb(255, 255, 255)",
              boxShadow: "0px 2px 5px 0px #415A77",
              // width: {
              //   xs: "25rem",
              //   sm: "20rem",
              //   md: "40rem",
              //   lg: "55rem",
              //   xl: "55rem",
              // },
              margin: "0 0 2rem 0",
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                <Skeleton width="60%" />
              </Typography>
              <Typography variant="body2">
                <Skeleton width="80%" />
                <Skeleton width="90%" />
              </Typography>
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Box>
                  <Typography variant="body3" sx={{ fontWeight: "bold" }}>
                    <Skeleton width="40%" />
                  </Typography>
                  <Typography variant="caption">
                    <Skeleton width="30%" />
                  </Typography>
                </Box>
                <Skeleton variant="rectangular" width={60} height={25} />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Grid>
  );
};

export default PostSkeleton;
