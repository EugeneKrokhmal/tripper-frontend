import { configureStore } from '@reduxjs/toolkit';
import authReducer, { login } from './slices/authSlice'; // Import the login action here
import tripsReducer from './slices/tripsSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    trips: tripsReducer,
  },
});

const token = localStorage.getItem('token');
const userEmail = localStorage.getItem('userEmail');
const userName = localStorage.getItem('userName');
const userId = localStorage.getItem('userId');
const profilePhoto = localStorage.getItem('profilePhoto');

if (token && userEmail && userId && userName && profilePhoto) {
  store.dispatch(login({ userEmail, userId, userName, token, profilePhoto }));
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
