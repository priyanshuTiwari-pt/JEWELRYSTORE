import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // backend server
  withCredentials: true, // if you use cookies/auth
});

export default axiosInstance;