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

// Rehydrate the store with token, userId, userName, and profilePhoto from localStorage
const token = localStorage.getItem('token');
const userEmail = localStorage.getItem('userEmail');
const userName = localStorage.getItem('userName');
const userId = localStorage.getItem('userId');
const profilePhoto = localStorage.getItem('profilePhoto');

if (token && userEmail && userId && userName && profilePhoto) {
  // Use the imported login action directly
  store.dispatch(login({ userEmail, userId, userName, token, profilePhoto }));
}

// Define types for useSelector and useDispatch for type safety in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
