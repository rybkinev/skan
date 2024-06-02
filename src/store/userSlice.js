import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // user: null,
  accessToken: null,
  expire: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      // state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.expire;
      state.isAuthenticated = true;
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('expire', action.payload.expire);
    },
    // updateAccessToken(state, action) {
    //   state.accessToken = action.payload;
    //   localStorage.setItem('accessToken', action.payload);
    // },
    logout(state) {
      // state.user = null;
      state.accessToken = null;
      state.expire = null;
      state.isAuthenticated = false;
      localStorage.removeItem('accessToken');
      // localStorage.removeItem('refreshToken');
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
