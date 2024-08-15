import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: "https://amazone-clone-api-h3d1.onrender.com",
});

export { axiosInstance };