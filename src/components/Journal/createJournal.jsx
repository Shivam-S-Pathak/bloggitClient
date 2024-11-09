import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API } from "../../source/api.js";
import { DataContext } from "../../context/DataProvider.jsx";

const moods = [
  "Happy 😊",
  "Excited 🤩",
  "Joyful 😄",
  "Grateful 🙏",
  "Relaxed 😌",
  "Calm 🧘",
  "Motivated 💪",
  "Inspired 🌟",
  "Optimistic 🌈",
  "Content 🙂",
  "Confident 😎",
  "Loved 💖",
  "Energetic ⚡",
  "Hopeful 🤞",
  "Satisfied 😌",
  "Sad 😢",
  "Lonely 🥺",
  "Disappointed 😞",
  "Heartbroken 💔",
  "Down 😔",
  "Anxious 😰",
  "Stressed 😫",
  "Worried 😟",
  "Overwhelmed 😩",
  "Tired 😴",
  "Burnt Out 😵",
  "Uncertain 🤔",
  "Confused 😕",
  "Nervous 😬",
  "Fearful 😨",
  "Angry 😠",
  "Frustrated 😤",
  "Irritated 😒",
  "Annoyed 😑",
  "Bored 😐",
  "Impatient ⏳",
  "Jealous 😒",
  "Resentful 😡",
  "Restless 😣",
  "Defeated 😞",
  "Discouraged 😔",
  "Embarrassed 😳",
  "Insecure 😟",
  "Regretful 😔",
  "Guilty 😖",
];
const journalTags = [
  "Personal 🌱",
  "Goals 🎯",
  "Work 💼",
  "Health 🏋️‍♀️",
  "Fitness 🏃",
  "Gratitude 🙏",
  "Reflection 🪞",
  "Relationships 💑",
  "Achievements 🏆",
  "Hobbies 🎨",
  "Travel 🌍",
  "Challenges 💪",
  "Mental Health 🧘",
  "Learning 📚",
  "Dreams 💭",
  "Quotes 💬",
  "Motivation 🚀",
  "Self-Care 🛀",
  "Creativity 🎶",
  "Productivity 📈",
];
const CreateJournal = () => {
  const { account } = useContext(DataContext);
  const [mood, setMood] = useState("");
  const [tag, setTag] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [date, setDate] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const currentDate = new Date().toDateString();
    setDate(currentDate);

    if (account && account.username) {
      setUsername(account.username);
    }
  }, [account]);

  const handleMoodChange = (event) => {
    setMood(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };
  const handleTagChange = (event) => {
    setTag(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("mood", mood);
    formData.append("tag", tag);
    formData.append("title", title);
    formData.append("body", body);
    formData.append("date", date);
    formData.append("username", username);

    try {
      let response = await API.writeJournal(formData);
      if (response.isSuccess) {
        navigate(`/myJournal/${account.username}`);
      } else {
        console.log("here is some problem");
      }
    } catch (error) {
      console.error("Error in API call:", error);
    }
  };
  return (
    <Container sx={{ mt: 4, mb: 4, minHeight: "100vh" }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        align="center"
        color="black"
        sx={{ mb: 4, color: "rgb(155, 8, 217)", borderRadius: "1rem 0 1rem 0" }}
      >
        Write your story
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
          <FormControl fullWidth>
            <InputLabel id="mood-label">Choose your mood</InputLabel>
            <Select
              labelId="mood-label"
              value={mood}
              onChange={handleMoodChange}
              label="Choose your mood"
            >
              {moods.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="Tag-label">Tags</InputLabel>
            <Select
              labelId="tag-label"
              value={tag}
              onChange={handleTagChange}
              label="Tags"
            >
              {journalTags.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <TextField
          fullWidth
          label="Title"
          variant="outlined"
          value={title}
          onChange={handleTitleChange}
          sx={{ flexGrow: 1, mb: 5 }}
        />

        <TextField
          fullWidth
          label="So how are you doing..."
          variant="outlined"
          multiline
          minRows={15}
          value={body}
          onChange={handleBodyChange}
          sx={{ mb: 4 }}
        />

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ minWidth: "200px", bgcolor: "rgb(155, 8, 217)" }}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default CreateJournal;
