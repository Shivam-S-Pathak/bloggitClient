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
const EditBlog = () => {
  const [loading, setLoading] = useState(false);
  const { account } = useContext(DataContext);
  const [post, setPost] = useState({});
  const [category, setCategory] = useState("");
  const [discription, setDiscription] = useState("");
  const [title, setTitle] = useState("");
  const [editor, setEditor] = useState("");
  const [body, setBody] = useState("");
  // const [coverImage, setCoverImage] = useState(null);
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

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getPostById({ id });
      if (response.isSuccess) {
        const data = response.data;
        setPost(data);
        setCategory(data.Category || "");
        setDiscription(data.discription || "");
        setTitle(data.title || "");
        setEditor(data.editor || "");
        setBody(data.body || "");
      }
    };
    fetchData();
  }, [id]);
  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0];
  //   setCoverImage(URL.createObjectURL(file));
  // };

  // const handleRemoveImage = () => {
  //   setCoverImage(null);
  // };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const updatedPost = {
      category,
      discription,
      title,
      body,
      username,
      editor,
    };

    let response = await API.updateBlog({ id, ...updatedPost });
    if (response.isSuccess) {
      setLoading(false);
      navigate(`/myblogs/${username}`);
    } else {
      console.log("here is some problem");
      setLoading(false);
    }
  };
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
        Update Your Blog
      </Typography>
      <form onSubmit={handleUpdateSubmit}>
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
            InputLabelProps={{ shrink: true }}
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
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Author"
          variant="outlined"
          value={editor}
          onChange={handleEditorChange}
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
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ minWidth: "200px", bgcolor: "rgb(155, 8, 217)" }}
          >
            {loading ? "Updating..." : "Update Blog"}
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default EditBlog;
