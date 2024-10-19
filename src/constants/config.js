// API messages
export const API_URL = "https://bloggit-server.vercel.app";
// const API_URL = "http://localhost:9000";
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
};
