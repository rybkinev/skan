import { createSlice } from '@reduxjs/toolkit';

// Попытка получить данные из localStorage и обработка ошибок
let accessToken, expire, login;
try {
  accessToken = localStorage.getItem('accessToken');
  expire = localStorage.getItem('expire');
  login = localStorage.getItem('login') || 'UserName';
} catch (e) {
  console.error('Ошибка загрузки данных из localStorage:', e);
  accessToken = null;
  expire = null;
  login = 'UserName';
}


const initialState = {
  accessToken: accessToken,
  expire: expire,
  login: login,
  isAuthenticated: Boolean(accessToken),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.accessToken = action.payload.accessToken;
      state.expire = action.payload.expire;
      state.login = action.payload.login;
      state.isAuthenticated = true;
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('expire', action.payload.expire);
    },
    logout(state) {
      state.accessToken = null;
      state.expire = null;
      state.login = null;
      state.isAuthenticated = false;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('expire');
      localStorage.removeItem('login');
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
