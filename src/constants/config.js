// API messages

import { AddComment } from "@mui/icons-material";

// export const API_URL = "https://bloggit-server.vercel.app";
export const API_URL = "http://localhost:9000";
export const API_MESSAGES = {
  loading: {
    title: "loading...",
    message: "Data is being loaded , please wait....",
  },
  success: {
    title: "Success",
    message: "Data loaded successfully",
  },
  responseFailure: {
    title: "Error",
    message: "An error occures while fetching from the server",
  },
  requestFailure: {
    title: "Error",
    message: "An error occured while ",
  },
  networkError: {
    title: "Error",
    message: "Unable to connect, please try again later",
  },
};

// API service call

export const SERVICE_URLS = {
  loginUser: { method: "POST", url: `${API_URL}/login` },
  signupUser: { method: "POST", url: `${API_URL}/signup` },
  createBlog: {
    method: "POST",
    url: `${API_URL}/createblog`,
    responseType: "json",
  },
  getAllBlogs: { method: "GET", url: "/posts", params: true },
  getPostById: { url: (id) => `${API_URL}/post/${id}`, method: "GET" },
  getMyBlogs: {
    url: (username) => `myblogs/${username}`,
    method: "GET",
    query: true,
  },
  deleteBlog: {
    url: (id) => `/delete/${id}`,
    method: "DELETE",
  },
  updateBlog: { url: (id) => `${API_URL}/update/${id}`, method: "PUT" },
  writeJournal: {
    url: `${API_URL}/createJournal`,
    method: "POST",
    responseType: "json",
  },
  getMyJournals: {
    url: (username) => `/myJournal/${username}`,
    method: "GET",
    query: true,
  },
  getJournalById: { url: (id) => `${API_URL}/journal/${id}`, method: "GET" },
  updateJournal: {
    url: (id) => `${API_URL}/updateJournal/${id}`,
    method: "PUT",
  },
  deleteJournal: {
    url: (id) => `/deleteJournal/${id}`,
    method: "DELETE",
  },
  addComments: {
    url: `${API_URL}/newComment`,
    method: "POST",
    responseType: "json",
  },
  getAllComments: {
    url: (id) => `getComment/${id}`,
    method: "GET",
    query: true,
  },
  deleteComment: { url: (id) => `deleteComment/${id}`, method: "DELETE" },
};
