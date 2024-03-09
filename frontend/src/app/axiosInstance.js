import axios from 'axios'
const token = window.localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: token,
  },
});

export default axiosInstance