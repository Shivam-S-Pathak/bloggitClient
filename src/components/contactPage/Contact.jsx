import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
  Fade,
  Grow,
  Link,
  colors,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Send } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";

import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import XIcon from "@mui/icons-material/X";

export default function Contact() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const initialFormState = {
    fullName: "",
    email: "",
    contactNumber: "",
    reason: "",
    site: "bloggIT",
  };
  const [formData, setFormData] = useState(initialFormState);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setIsSubmitting(true);

    emailjs
      .send("service_qguhlgq", "template_gzq53za", formData, {
        publicKey: "b3sJrCBk7wDHXZMPT",
      })
      .then(
        () => {
          setIsSubmitting(false);
          setSnackbar({
            open: true,
            message: "Message sent successfully!",
            severity: "success",
          });
          setFormData(initialFormState);
        },
        (error) => {
          setIsSubmitting(false);
          setSnackbar({
            open: true,
            message: "There is some problem , please try again later! ",
            severity: "error",
          });
          setFormData(initialFormState);
        }
      );
    setFormData(initialFormState);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 , minHeight:"100vh"}}>
      <Fade in={true} timeout={1000}>
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            fontWeight="bold"
            color="black"
          >
            Get in Touch
          </Typography>
          <Typography variant="h5" color="text.secondary">
            We'd love to hear from you. Drop us a line!
          </Typography>
        </Box>
      </Fade>
      <Grid container spacing={5} alignItems="stretch" sx={{ display: "flex" }}>
        <Box sx={{ width: "100%" }}>
          <Grid item xs={12} md={7}>
            <Grow in={true} timeout={1000}>
              <Card elevation={3} sx={{ height: "100%", borderRadius: 4 }}>
                <CardContent sx={{ p: 4 }}>
                  <form onSubmit={handleSubmit}>
                    <Grid
                      container
                      spacing={3}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        minWidth: isMobile ? "20rem" : "35rem",
                      }}
                    >
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Full name"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          variant="outlined"
                          autoComplete="off"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          variant="outlined"
                          autoComplete="off"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Contact number"
                          name="contactNumber"
                          type="number"
                          value={formData.contactNumber}
                          onChange={handleChange}
                          required
                          variant="outlined"
                          autoComplete="off"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Message"
                          name="reason"
                          multiline
                          rows={4}
                          value={formData.reason}
                          onChange={handleChange}
                          required
                          variant="outlined"
                          autoComplete="off"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          size="large"
                          fullWidth
                          startIcon={<Send />}
                          sx={{
                            py: 1.5,
                            textTransform: "none",
                            fontSize: "1.1rem",
                            borderRadius: 2,
                            bgcolor: "rgb(155, 8, 217)",
                          }}
                        >
                          {isSubmitting ? "Sending..." : "send Message"}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
            </Grow>
          </Grid>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Grid item xs={12} md={5}>
            <Grow in={true} timeout={1000} style={{ transitionDelay: "500ms" }}>
              <Card
                elevation={3}
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  bgcolor: "rgb(155, 8, 217)",
                  color: "primary.contrastText",
                  minWidth: isMobile ? "20rem" : "30rem",
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h4" gutterBottom fontWeight="bold">
                    Socials
                  </Typography>
                  <Box display="flex" flexDirection="column" gap={4} mt={4}>
                    <Box display="flex" alignItems="center">
                      <LinkedInIcon sx={{ fontSize: 40, mr: 2 }} />
                      <Box>
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          sx={{ textAlign: "left" }}
                        >
                          LinkedIn
                        </Typography>
                        <Typography variant="body2" color="white">
                          <a
                            href="https://www.linkedin.com/in/shivam-s-pathak/"
                            style={{ color: "white" }}
                          >
                            linkedin.com/in/shivam-s-pathak/
                          </a>
                        </Typography>
                      </Box>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <XIcon sx={{ fontSize: 40, mr: 2 }} />
                      <Box>
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          sx={{ textAlign: "left" }}
                        >
                          X (twitter)
                        </Typography>
                        <Typography variant="body2">
                          <a
                            href="https://x.com/shivam_S_pathak"
                            style={{ color: "white" }}
                          >
                            x.com/shivam_S_pathak
                          </a>
                        </Typography>
                      </Box>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <YouTubeIcon sx={{ fontSize: 40, mr: 2 }} />
                      <Box>
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          sx={{ textAlign: "left" }}
                        >
                          Youtube
                        </Typography>
                        <Typography variant="body2">
                          <a
                            href="https://www.youtube.com/@shivamspathak"
                            style={{ color: "white" }}
                          >
                            www.youtube.com/@shivamspathak
                          </a>
                        </Typography>
                      </Box>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <GitHubIcon sx={{ fontSize: 40, mr: 2 }} />
                      <Box>
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          sx={{ textAlign: "left" }}
                        >
                          GitHub
                        </Typography>
                        <Typography variant="body2">
                          <a
                            href="https://github.com/Shivam-S-Pathak"
                            style={{ color: "white" }}
                          >
                            github.com/Shivam-S-Pathak
                          </a>
                        </Typography>
                      </Box>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <EmailIcon sx={{ fontSize: 40, mr: 2 }} />
                      <Box>
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          sx={{ textAlign: "left" }}
                        >
                          Email
                        </Typography>
                        <Typography variant="body2">
                          <a
                            href="mailto:shivampathak5042@gmail.com"
                            style={{ color: "white" }}
                          >
                            shivampathak5042@gmail.com
                          </a>
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grow>
          </Grid>
        </Box>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
