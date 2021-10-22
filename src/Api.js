import axios from 'axios'
import Secret from '../Secret.json';

const api=axios.create({
	baseURL:`http://${Secret.ServerIP}:3000/`
});

export default api;
