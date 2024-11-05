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
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  CloudUpload as CloudUploadIcon,
  Close as CloseIcon,
  Category,
} from "@mui/icons-material";
import { API } from "../../source/api.js";
import { DataContext } from "../../context/DataProvider.jsx";

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

const categories = ["Technology", "Travel", "Food", "Health", "Entertainment"];
const CreateBlog = () => {
  const { account } = useContext(DataContext);
  const [category, setCategory] = useState("");
  const [discription, setDiscription] = useState("");
  const [title, setTitle] = useState("");
  const [editor, setEditor] = useState("");
  const [body, setBody] = useState("");
  // const [coverImage, setCoverImage] = useState(null);
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

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };
  const handleDiscriptionChange = (event) => {
    setDiscription(event.target.value);
  };
  const handleEditorChange = (event) => {
    setEditor(event.target.value);
  };
  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0];
  //   setCoverImage(URL.createObjectURL(file));
  // };

  // const handleRemoveImage = () => {
  //   setCoverImage(null);
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("category", category);
    formData.append("discription", discription);
    formData.append("title", title);
    formData.append("body", body);
    // formData.append("coverImage", coverImage[0]);
    formData.append("date", date);
    formData.append("username", username);
    formData.append("editor", editor);

    try {
      let response = await API.createBlog(formData);
      if (response.isSuccess) {
        navigate(`/myblogs/${account.username}`);
      } else {
        console.log("here is some problem");
      }
    } catch (error) {
      console.error("Error in API call:", error);
    }
  };
  return (
    <Container sx={{ mt: 4, mb: 4, width: "100vw", height: "100%" }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        align="center"
        color="black"
        sx={{ mb: 4, color: "rgb(155, 8, 217)", borderRadius: "1rem 0 1rem 0" }}
      >
        Create Your Blog Post
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
          <FormControl fullWidth>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              value={category}
              onChange={handleCategoryChange}
              label="Category"
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            value={title}
            onChange={handleTitleChange}
            sx={{ flexGrow: 1 }}
          />
        </Box>

        {/* <Box sx={{ position: "relative", mb: 4 }}>
          {coverImage ? (
            <>
              <ImagePreview src={coverImage} alt="Cover" />
              <IconButton
                onClick={handleRemoveImage}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  backgroundColor: "rgba(0,0,0,0.5)",
                }}
              >
                <CloseIcon sx={{ color: "white" }} />
              </IconButton>
            </>
          ) : (
            <label htmlFor="contained-button-file">
              <Input
                id="contained-button-file"
                type="file"
                onChange={handleImageUpload}
              />
              <Button
                variant="outlined"
                component="span"
                startIcon={<CloudUploadIcon />}
                sx={{
                  width: "100%",
                  borderStyle: "dashed",
                  borderColor: "rgb(155, 8, 217)",
                  color: "rgb(155, 8, 217)",
                }}
              >
                Upload Cover Image
              </Button>
            </label>
          )}
        </Box> */}
        <TextField
          fullWidth
          label="Discription"
          variant="outlined"
          value={discription}
          onChange={handleDiscriptionChange}
          sx={{ flexGrow: 1, mb: 4 }}
        />
        <TextField
          fullWidth
          label="Author"
          variant="outlined"
          value={editor}
          onChange={handleEditorChange}
          sx={{ flexGrow: 1, mb: 4 }}
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
        />

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ minWidth: "200px", bgcolor: "rgb(155, 8, 217)" }}
          >
            Publish Blog Post
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default CreateBlog;
