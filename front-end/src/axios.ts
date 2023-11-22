import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'http://localhost:5008/v1/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'custom value' },
});

export default axios;
