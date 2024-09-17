import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "https://bluorng-backend.vercel.app/v1",
// });

// local
const axiosInstance = axios.create({
  baseURL: "http://localhost:4900/v1"
});

export default axiosInstance;
