import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getProfilePhoto } from '../../api/userApi';

interface AuthState {
    userEmail: string | null;
    userName: string | null;
    userId: string | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    profilePhoto: string | null;
}

const initialState: AuthState = {
    userEmail: localStorage.getItem('user') || null,
    userName: localStorage.getItem('userName') || null,
    userId: localStorage.getItem('userId') || null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    profilePhoto: localStorage.getItem('profilePhoto') || null,
};

// Async action to fetch profile photo
export const fetchProfilePhoto = createAsyncThunk(
    'auth/fetchProfilePhoto',
    async (token: string, { rejectWithValue }) => {
        try {
            const response = await getProfilePhoto(token);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Error fetching profile photo');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        login: (state, action: PayloadAction<{ userEmail: string; userName: string; userId: string; token: string; profilePhoto: string | null }>) => {
            state.userEmail = action.payload.userEmail;
            state.userName = action.payload.userName;
            state.userId = action.payload.userId;
            state.token = action.payload.token;
            state.profilePhoto = action.payload.profilePhoto;
            state.isAuthenticated = true;

            // Save to local storage
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('userEmail', action.payload.userEmail);
            localStorage.setItem('userName', action.payload.userName);
            localStorage.setItem('userId', action.payload.userId);
            if (action.payload.profilePhoto) localStorage.setItem('profilePhoto', action.payload.profilePhoto);
        },
        logout(state) {
            Object.assign(state, initialState);
            localStorage.clear();
            state.isAuthenticated = false;
        },
        setProfilePhoto(state, action: PayloadAction<string>) {
            state.profilePhoto = action.payload;
            localStorage.setItem('profilePhoto', action.payload);
        },
        updateUser(state, action: PayloadAction<{ userName: string; userEmail: string }>) {
            state.userName = action.payload.userName;
            state.userEmail = action.payload.userEmail;
            localStorage.setItem('userName', action.payload.userName);
            localStorage.setItem('userEmail', action.payload.userEmail);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProfilePhoto.fulfilled, (state, action) => {
            state.profilePhoto = action.payload;
            localStorage.setItem('profilePhoto', action.payload);
        });
    },
});

export const { login, logout, setLoading, setProfilePhoto, updateUser } = authSlice.actions;
export default authSlice.reducer;
