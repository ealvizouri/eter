import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5008/v1', // ajusta la URL base según tu configuración
});

export default axiosInstance;
