import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  console.log("Interceptor Running");
  console.log("Token:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("Authorization:", config.headers.Authorization);
  }

  return config;
});

export default api;