// Libraries
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api', // API base URL
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000, // Set a reasonable timeout
});

export default axiosInstance;
