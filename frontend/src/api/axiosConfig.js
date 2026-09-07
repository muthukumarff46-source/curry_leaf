import axios from 'axios';

const apiBaseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

const api = axios.create({
    baseURL: apiBaseUrl ? `${apiBaseUrl}/api` : '/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
