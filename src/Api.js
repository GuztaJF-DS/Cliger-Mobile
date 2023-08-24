import axios from 'axios';
import Keys from '../keys.json';

const api = axios.create({
	baseURL: `http://${Keys.ServerIP}:3000/`,
});

export default api;
