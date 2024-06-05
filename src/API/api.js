import axios from 'axios';
import {logout} from "../store/userSlice";
import store from "../store/store";


const API_URL = 'https://gateway.scan-interfax.ru/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const accessToken = state.user.accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    console.debug('api.interceptors.response', 'error', error);
    console.debug('api.interceptors.response', 'error.response', error.response);

    if (error.response?.status === 401) {
      // Если в ответ на запрос прилетает 401, вызываю logout Поскольку нет refreshToken
      store.dispatch(logout());
      window.location.href = '/';
    }

    return Promise.reject(error);
  }
);


export default api;
