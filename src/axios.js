import axios from 'axios';
import { getNewToken, isTokenExpired } from './auth';

const api = axios.create({
    baseURL: 'https://localhost:7296/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(async config => {
    let token = localStorage.getItem('token');

    if (token && isTokenExpired()) {
        token = await getNewToken();  

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
    } else if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
}, error => {
    return Promise.reject(error);
});



export default api;
