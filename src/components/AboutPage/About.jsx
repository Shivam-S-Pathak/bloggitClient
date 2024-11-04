import React from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import { Book, Lightbulb, People, Favorite } from "@mui/icons-material";
import Styles from "./About.module.css";
const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(20),
  height: theme.spacing(20),
  margin: "auto",
  marginBottom: theme.spacing(2),
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: "50%",
  padding: theme.spacing(2),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
}));

const About = () => {
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{ mt: 4, mb: 4, color: "black", mt: "3rem" }}
      >
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            About Bloggit
          </Typography>
          <Typography variant="h5" color="text.secondary">
            Exploring ideas, sharing knowledge, and inspiring minds
          </Typography>
        </Box>

        <Grid
          container
          spacing={4}
          mb={6}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="body1">
              We are passionate about delivering high-quality, insightful
              content that informs, educates, and inspires our readers. Our goal
              is to create a community of lifelong learners and thinkers who
              engage with ideas that matter.
            </Typography>
            <Typography variant="body1">
              Through our diverse range of topics and expert contributors, we
              aim to broaden horizons, challenge perspectives, and foster
              intellectual growth.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent sx={{ bgcolor: "rgb(155, 8, 217)" }}>
                <Typography
                  variant="h6"
                  align="center"
                  gutterBottom
                  sx={{ color: "white" }}
                >
                  Established in 2024
                </Typography>
                <Typography
                  variant="body2"
                  align="center"
                  sx={{ color: "white" }}
                >
                  Serving curious minds across the globe
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <hr />

        <Typography variant="h4" gutterBottom>
          What Sets Us Apart
        </Typography>
        <Grid
          container
          spacing={4}
          mb={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {[
            {
              icon: <Book />,
              title: "In-depth Analysis",
              description:
                "We dive deep into topics, providing comprehensive insights and thorough research.",
            },
            {
              icon: <Lightbulb />,
              title: "Fresh Perspectives",
              description:
                "Our diverse team of writers brings unique viewpoints to every article.",
            },
            {
              icon: <People />,
              title: "Community Engagement",
              description:
                "We foster discussions and encourage reader participation in our comment sections.",
            },
            {
              icon: <Favorite />,
              title: "Passion for Learning",
              description:
                "Our enthusiasm for knowledge drives us to continually explore new subjects.",
            },
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
                justifyContent="center"
              >
                <FeatureIcon mb={2} sx={{ bgcolor: "rgb(155, 8, 217)" }}>
                  {feature.icon}
                </FeatureIcon>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <hr />
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Our Core Values
          </Typography>
          <List>
            {[
              {
                text: "Integrity in our research and reporting",
                icon: <Lightbulb />,
              },
              {
                text: "Respect for diverse opinions and perspectives",
                icon: <People />,
              },
              {
                text: "Commitment to continuous learning and improvement",
                icon: <Book />,
              },
              {
                text: "Passion for sharing knowledge and inspiring others",
                icon: <Favorite />,
              },
            ].map((value, index) => (
              <ListItem key={index}>
                <ListItemIcon sx={{ color: "rgb(155, 8, 217)" }}>
                  {value.icon}
                </ListItemIcon>
                <ListItemText primary={value.text} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Container>
      
    </>
  );
};
export default About;
