import React, { useState } from "react";
import LandNav from "../LandNavBar/LandNav.jsx";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  ArrowForward,
  ChevronLeft,
  ChevronRight,
  PeopleOutline,
  BoltOutlined,
  BookOutlined,
  CheckCircleOutline,
  Mail,
} from "@mui/icons-material";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { Link } from "react-router-dom";

const LandPage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [email, setEmail] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const testimonials = [
    {
      name: "Nilay S.",
      text: "This blog has transformed my approach to technology. The insights are invaluable!",
    },
    {
      name: "Ujjwal M.",
      text: "I've found a wealth of health information here. It's my go-to resource now.",
    },
    {
      name: "Praks S.",
      text: "The lifestyle tips have genuinely improved my daily routines. Highly recommended!",
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setEmail("");
  };
  return (
    <>
      <LandNav></LandNav>
      <Box>
        {/* Welcome Message */}
        <Container maxWidth="md" sx={{ textAlign: "center", py: 8 }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ color: "black", fontWeight: 700 }}
          >
            Welcome to{" "}
            <span style={{ color: "rgb(155, 8, 217)" }}>BloggIT</span>
          </Typography>
          <Typography variant="h5" color="text.secondary">
            Discover a world of knowledge, inspiration, and growth.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Link to="/login">
              <Button
                variant="contained"
                size="large"
                sx={{
                  mr: 2,
                  backgroundColor: "rgb(155, 8, 217)",
                  textTransform: "capitalize",
                  fontFamily: "revert",
                  "&:hover": {
                    transform: "scale(1.05)",
                    color: "white",
                    transition: "all 0.1s ease-in-out",
                  },
                }}
              >
                Sign Up for Exclusive Content
              </Button>
            </Link>
            <Link to="/login">
              <Button
                variant="outlined"
                size="large"
                sx={{
                  color: "rgb(155, 8, 217)",
                  borderColor: "rgb(155, 8, 217)",
                  textTransform: "capitalize",
                  fontFamily: "revert",
                  "&:hover": {
                    transform: "scale(1.05)",
                    color: "rgb(155, 8, 217)",
                    transition: "all 0.1s ease-in-out",
                    backgroundColor: "transparent",
                  },
                }}
              >
                Log In
              </Button>
            </Link>
          </Box>
        </Container>

        {/* Key Features/Topics Section */}
        <Box sx={{ bgcolor: "background.paper", py: 8 }}>
          <Container maxWidth="lg">
            <Typography
              
              align="center"
              gutterBottom
              sx={{ color: "black" , font:"revert" , fontSize:"2.5rem" , fontWeight:"500"}}
            >
              Explore Our Topics
            </Typography>
            <Grid
              container
              spacing={4}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {[
                {
                  icon: (
                    <BoltOutlined
                      fontSize="large"
                      sx={{ color: "rgb(155, 8, 217)" }}
                    />
                  ),
                  title: "Technology",
                  description:
                    "Stay updated with the latest tech trends and innovations.",
                },
                {
                  icon: (
                    <PeopleOutline
                      fontSize="large"
                      sx={{ color: "rgb(155, 8, 217)" }}
                    />
                  ),
                  title: "Health & Wellness",
                  description:
                    "Discover tips for a healthier, more balanced lifestyle.",
                },
                {
                  icon: (
                    <BookOutlined
                      fontSize="large"
                      sx={{ color: "rgb(155, 8, 217)" }}
                    />
                  ),
                  title: "Lifestyle",
                  description:
                    "Explore ideas to enrich your daily life and personal growth.",
                },
                {
                  icon: (
                    <ReadMoreIcon
                      fontSize="large"
                      sx={{ color: "rgb(155, 8, 217)" }}
                    />
                  ),
                  title: "and many more....",
                  description:
                    "Explore ideas to enrich your daily life and personal growth.",
                },
              ].map((topic, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card elevation={2}>
                    <CardContent sx={{ textAlign: "center" }}>
                      {topic.icon}
                      <Typography
                        variant="h5"
                        component="h3"
                        sx={{ mt: 2, mb: 1 }}
                      >
                        {topic.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {topic.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Benefits of Membership Section */}
        <Container sx={{ py: 8 }}>
          <Typography
            
            align="center"
            gutterBottom
            sx={{ color: "black" , font:"revert" , fontSize:"2.5rem" , fontWeight:"500"}}
          >
            Benefits of Joining
          </Typography>
          <Grid
            container
            spacing={3}
            sx={{
              color: "black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {[
              "Access to exclusive content",
              "Personalized reading recommendations",
              "Weekly curated newsletters",
              "Join a community of like-minded readers",
              "Early access to new features",
              "Ad-free reading experience",
            ].map((benefit, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CheckCircleOutline
                    color="success"
                    sx={{ mr: 2, fontSize: 28, minWidth: "28px" }}
                  />
                  <Typography variant="body1" sx={{ lineHeight: "1.6" }}>
                    {benefit}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Testimonials Section */}
        <Box sx={{ bgcolor: "background.paper", py: 8 }}>
          <Container maxWidth="md">
            <Typography
              
              align="center"
              gutterBottom
              sx={{ color: "black" , font:"revert" , fontSize:"2.5rem" , fontWeight:"500"}}
            >
              What Our Readers Say
            </Typography>
            <Card elevation={2}>
              <CardContent sx={{ position: "relative", p: 4 }}>
                <Typography variant="body1">
                  "{testimonials[currentTestimonial].text}"
                </Typography>
                <Typography variant="subtitle1" align="right" sx={{margin:"1rem"}}>
                  - {testimonials[currentTestimonial].name}
                </Typography>
                <IconButton
                  onClick={prevTestimonial}
                  sx={{
                    position: "absolute",
                    left: 8,
                    top: "50%",
                    transform: "translateY(-50%)",
                    '&:focus':{
                      outline:"none"
                    }
                  }}
                >
                  <ChevronLeft />
                </IconButton>
                <IconButton
                  onClick={nextTestimonial}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: "50%",
                    transform: "translateY(-50%)",
                    '&:focus':{
                      outline:"none"
                    },
                  }}
                >
                  <ChevronRight />
                </IconButton>
              </CardContent>
            </Card>
          </Container>
        </Box>

        {/* Call to Action */}
        <Box
          sx={{
            color: "primary.contrastText",
            py: 8,
            bgcolor: "rgb(155, 8, 217)",
          }}
        >
          <Container maxWidth="md" sx={{ textAlign: "center" }}>
            <Typography  gutterBottom sx={{ color: "white" , font:"revert" , fontSize:"3rem" , fontWeight:"500"}}>
              Ready to Start Your Journey?
            </Typography>
            <Typography variant="h6" paragraph>
              Join our community of curious minds and lifelong learners.
            </Typography>
            <Link to="/login">
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForward sx={{ color: "rgb(155, 8, 217)" }} />}
                sx={{
                  bgcolor: "rgb(255, 255, 255)",
                  color: "rgb(155, 8, 217)",
                  fontWeight: 550,
                }}
              >
                Get Started Now
              </Button>
            </Link>
          </Container>
        </Box>

        {/* Interactive Element (Newsletter Signup) */}
        <Container maxWidth="sm" sx={{ py: 8 }}>
          <Card elevation={2}>
            <CardContent sx={{ p: 4 }}>
              <Typography sx={{ color: "black" , font:"revert" , fontSize:"2rem" , fontWeight:"500"}} align="center" gutterBottom>
                Stay Updated with Our Newsletter
              </Typography>
              <Typography variant="body1" align="center" paragraph>
                Get weekly insights, tips, and exclusive content delivered
                straight to your inbox!
              </Typography>
              <form onSubmit={handleSubmit}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    gap: 2,
                  }}
                >
                  <TextField
                    type="email"
                    label="Enter your email"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    endIcon={<Mail />}
                    sx={{ flexShrink: 0, bgcolor: "rgb(155, 8, 217)" }}
                  >
                    Subscribe
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default LandPage;
