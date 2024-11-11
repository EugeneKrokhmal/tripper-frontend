import { configureStore } from '@reduxjs/toolkit';
import authReducer, { login } from './slices/authSlice';
import tripsReducer from './slices/tripsSlice';

// Configure the store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    trips: tripsReducer
  },
});

// Rehydrate the store with token, userId, userName, and profilePhoto from localStorage
const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const userName = localStorage.getItem('userName');
const userId = localStorage.getItem('userId');
const profilePhoto = localStorage.getItem('profilePhoto');

if (token && user && userId && userName) {
  store.dispatch(login({ user, userId, userName, token, profilePhoto }));
}

// Define types for useSelector and useDispatch for type safety in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
