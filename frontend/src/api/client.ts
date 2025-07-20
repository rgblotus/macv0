// client.ts
import axios from 'axios';

const apiClient = axios.create({
    //baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api',
    baseURL: 'http://localhost:8000/api',
    withCredentials: true, // Crucial for cookies
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
});

// Add request interceptor to handle CSRF tokens
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('csrf_token') || '';
    if (token && ['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase() || '')) {
        config.headers['X-CSRFToken'] = token;
    }
    return config;
});

apiClient.interceptors.response.use(response => {
    // Store new CSRF token from response cookies
    const csrfCookie = document.cookie.split('; ')
        .find(cookie => cookie.startsWith('csrftoken='));

    if (csrfCookie) {
        const token = csrfCookie.split('=')[1];
        localStorage.setItem('csrf_token', token);
    }
    return response;
});

export default apiClient;