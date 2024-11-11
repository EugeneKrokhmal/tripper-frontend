import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: string | null;
  userName: string | null;
  userId: string | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  profilePhoto: string | null;
}

const initialState: AuthState = {
  user: null,
  userName: null,
  userId: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  profilePhoto: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    login: (state, action: PayloadAction<{ user: string; userName: string; userId: string; token: string; profilePhoto: string | null }>) => {
      state.user = action.payload.user;
      state.userName = action.payload.userName;
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      state.profilePhoto = action.payload.profilePhoto !== 'undefined' ? action.payload.profilePhoto : null;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.userName = null;
      state.userId = null;
      state.token = null;
      state.isAuthenticated = false;
      state.profilePhoto = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userName');
      localStorage.removeItem('userId');
      localStorage.removeItem('profilePhoto');
    },
    setProfilePhoto(state, action: PayloadAction<string>) {
      state.profilePhoto = action.payload;
      localStorage.setItem('profilePhoto', action.payload);
    },
  },
});

export const { login, logout, setLoading, setProfilePhoto } = authSlice.actions;
export default authSlice.reducer;
