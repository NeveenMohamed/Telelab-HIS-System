import axios from "axios";

const api = axios.create({
  baseURL: "https://test/api",
});

export default api;