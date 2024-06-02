import axios from 'axios';
import store from '../store/store';
import { updateAccessToken, logout } from '../store/userSlice';
import {useSelector, useStore} from 'react-redux';


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

    console.debug('state', state);
    console.debug('accessToken', accessToken);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     const state = store.getState();
//
//     console.debug('error', error);
//     console.debug('error.response', error.response);
//
//     if (error.response?.status === 401 && !originalRequest._retry && state.user.refreshToken) {
//       originalRequest._retry = true;
//       try {
//         const response = await axios.post('/api/token/refresh/', {
//           refresh: state.user.refreshToken,
//         });
//         const newAccessToken = response.data.access;
//         store.dispatch(updateAccessToken(newAccessToken));
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//
//         axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
//
//         return api(originalRequest);
//       } catch (refreshError) {
//         store.dispatch(logout());
//       }
//     }
//
//     return Promise.reject(error);
//   }
// );


export default api;
