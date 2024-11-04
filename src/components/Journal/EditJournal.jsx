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
  IconButton,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  CloudUpload as CloudUploadIcon,
  Close as CloseIcon,
  Category,
  LanOutlined,
} from "@mui/icons-material";
import { API } from "../../source/api.js";
import { DataContext } from "../../context/DataProvider.jsx";
import EditSkeleton from "../blog/EditSkeleton.jsx";

const Input = styled("input")({
  display: "none",
});

const ImagePreview = styled("img")({
  width: "100%",
  height: "200px",
  objectFit: "cover",
  borderRadius: "8px",
  marginTop: "16px",
});

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

const EditJournal = () => {
  const [updating, setUpdating] = useState(false);
  const [loading, setLoading] = useState(false);
  const { account } = useContext(DataContext);
  const [post, setPost] = useState({});
  const [mood, setMood] = useState("");
  const [tag, setTag] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [date, setDate] = useState("");
  const [username, setUsername] = useState("");
  const { id } = useParams();

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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let response = await API.getJournalById({ id });
      if (response.isSuccess) {
        const data = response.data;
        setPost(data);
        setMood(data.mood || "");
        setTag(data.tag || "");
        setTitle(data.title || "");
        setBody(data.body || "");
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    setUpdating(true);
    const updatedPost = {
      mood,
      tag,
      title,
      body,
      username,
    };

    let response = await API.updateJournal({ id, ...updatedPost });
    if (response.isSuccess) {
      setUpdating(false);
      navigate(`/myJournal/${username}`);
    } else {
      console.log("here is some problem");
      setUpdating(false);
    }
  };

  if (loading) {
    return <EditSkeleton />;
  }
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
        Update Your Journal
      </Typography>
      <form onSubmit={handleUpdateSubmit}>
        <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
          <FormControl fullWidth>
            <InputLabel id="category-label">Mood</InputLabel>
            <Select
              labelId="category-label"
              value={mood}
              onChange={handleMoodChange}
              label="Category"
            >
              {moods.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="category-label">Tags</InputLabel>
            <Select
              labelId="category-label"
              value={tag}
              onChange={handleTagChange}
              label="Category"
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
          sx={{ flexGrow: 1, mb: 4 }}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          fullWidth
          label="Start writing your blog..."
          variant="outlined"
          multiline
          minRows={15}
          value={body}
          onChange={handleBodyChange}
          sx={{ mb: 4 }}
          InputLabelProps={{ shrink: true }}
        />

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {updating ? (
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ minWidth: "200px", color: "rgb(155, 8, 217)" }}
              disabled
            >
              Updating...
            </Button>
          ) : (
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ minWidth: "200px", bgcolor: "rgb(155, 8, 217)" }}
            >
              Update Blog
            </Button>
          )}
        </Box>
      </form>
    </Container>
  );
};

export default EditJournal;
