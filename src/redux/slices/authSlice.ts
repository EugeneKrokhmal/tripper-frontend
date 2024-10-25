import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: string | null;
  userName: string | null;
  userId: string | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  userName: null,
  userId: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: string; userName: string; userId: string; token: string }>) => {
      state.user = action.payload.user;
      state.userName = action.payload.userName;
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.userName = null;
      state.userId = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userName');
      localStorage.removeItem('userId');
    }
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
