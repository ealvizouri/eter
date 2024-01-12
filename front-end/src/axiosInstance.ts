import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5008/v1', 
});

export default axiosInstance;
