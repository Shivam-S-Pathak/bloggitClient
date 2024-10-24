import React from "react";
import { Container, Box, Skeleton, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";

const PostSkeleton = () => {
  const [isMobileView, setIsMobileView] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 750) {
        setIsMobileView(true);
      } else {
        setIsMobileView(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Container
      sx={{
        width: isMobileView ? "100vw" : "58rem",
        margin: "-3rem 0 0 0 ",
      }}
    >
      <Skeleton
        variant="text"
        width="100%"
        height={300}
        sx={{ margin: "-4rem 0 -4rem 0", borderRadius: "1rem" }}
      />
      <Skeleton
        variant="text"
        width="100%"
        height={300}
        sx={{ margin: "-4rem 0 -4rem 0", borderRadius: "1rem" }}
      />
      <Skeleton
        variant="text"
        width="100%"
        height={300}
        sx={{ margin: "-4rem 0 -4rem 0", borderRadius: "1rem" }}
      />
      <Skeleton
        variant="text"
        width="100%"
        height={300}
        sx={{ margin: "-4rem 0 -4rem 0", borderRadius: "1rem" }}
      />
      <Skeleton
        variant="text"
        width="100%"
        height={300}
        sx={{ margin: "-4rem 0 -4rem 0", borderRadius: "1rem" }}
      />
      <Skeleton
        variant="text"
        width="100%"
        height={300}
        sx={{ margin: "-4rem 0 -4rem 0", borderRadius: "1rem" }}
      />
      <Skeleton
        variant="text"
        width="100%"
        height={300}
        sx={{ margin: "-4rem 0 -4rem 0", borderRadius: "1rem" }}
      />
    </Container>
  );
};

export default PostSkeleton;
