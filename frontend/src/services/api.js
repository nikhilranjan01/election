import axios from "axios";
const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://election-jd4x.onrender.com";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
