import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
  withCredentials: true, // send cookies for auth
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;