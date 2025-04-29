import axios from 'axios';

const AxiosClient = axios.create({
  baseURL: 'http://localhost:4242/api/auth',
});

export default AxiosClient;