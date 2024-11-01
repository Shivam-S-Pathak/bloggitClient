import axios from "axios";
import { API_MESSAGES, SERVICE_URLS, API_URL } from "../constants/config.js";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 50000,
  headers: {
    "content-type": "application/json",
  },
});
axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return processResponse(response);
  },
  function (error) {
    return Promise.reject(processError(error));
  }
);

const processResponse = (response) => {
  if (response?.status === 200) {
    return { isSuccess: true, data: response.data };
  } else {
    return {
      isFailure: true,
      status: response.status,
      msg: response?.msg,
      code: response?.code,
    };
  }
};

const processError = (error) => {
  if (error.response) {
    // Request was sent and received a response other than 200
    console.log("ERROR IN RESPONSE", JSON.stringify(error.response.data));
    return {
      isError: true,
      msg: API_MESSAGES.responseFailure,
      code: error.response.status,
      details: error.response.data,
    };
  } else if (error.request) {
    // Request sent but no response received
    console.log("ERROR IN REQUEST", JSON.stringify(error));
    return {
      isError: true,
      msg: API_MESSAGES.requestFailure,
      code: "",
    };
  } else {
    // Some issue with the request or network
    console.log("ERROR IN NETWORK", JSON.stringify(error));
    return {
      isError: true,
      msg: API_MESSAGES.networkError,
      code: "",
    };
  }
};

// API object
const API = {};

// for (const [key, value] of Object.entries(SERVICE_URLS)) {
//   API[key] = (body) =>
//     axiosInstance({
//       method: value.method,
//       url: value.url,
//       data: body,
//       responseType: value.responseType,
//     });
// }

for (const [key, value] of Object.entries(SERVICE_URLS)) {
  API[key] = (paramsOrBody) => {
    const config = {
      method: value.method,
      url:
        typeof value.url === "function"
          ? value.url(paramsOrBody.id || paramsOrBody)
          : value.url,
      responseType: value.responseType,
    };

    if (value.method === "GET") {
      config.params = paramsOrBody;
    } else if (value.method !== "DELETE") {
      config.data = paramsOrBody;
    }
    return axiosInstance(config);
  };
}

export { API };
