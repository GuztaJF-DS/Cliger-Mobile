import axios from 'axios';
import Secret from '../secret.json';

const api = axios.create({
	baseURL: `http://${Secret.ServerIP}:3000/`,
});

export default api;
