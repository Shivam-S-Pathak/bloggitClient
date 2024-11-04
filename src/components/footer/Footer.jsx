import React from "react";
import Styles from './Footer.module.css'
import { Box } from "@mui/material";
const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "rgb(155, 8, 217)",
        display: "flex",
        justifyContent: "flex-end",
        padding: "1rem",
        bottom:"0"
      }}
    >
      <div className={Styles.copyrightNote}>
        <span>&copy; All copyright reserved, managed and Developed by</span>
        <p className={Styles.nameHighlight}>Shivam Pathak</p>
      </div>
    </Box>
  );
};

export default Footer;
