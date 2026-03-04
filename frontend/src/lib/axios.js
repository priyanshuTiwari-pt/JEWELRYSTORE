import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://jewelrystore-2ovd.onrender.com/", // backend server
  withCredentials: true, // if you use cookies/auth
});

export default axiosInstance;
