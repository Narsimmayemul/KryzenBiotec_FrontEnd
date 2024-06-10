import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://kyzen-backend-1.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.Authorization;
  }
};

export default axiosInstance;
