"use client";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '@/helper/localStorage';

interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    error: string | null;
    user: { name: string } | null;
}

// Define the initial state
const initialState: AuthState = {
    isAuthenticated: false,
    token: null,
    error: null,
    user: null,
};

// Check localStorage for authentication data
if (typeof window !== 'undefined'){
const storedData:any = getLocalStorage<{ token: string; data: any }>("data");
if (storedData) {
    try {
        const parsedData = JSON.parse(storedData);
        initialState.isAuthenticated = true;
        initialState.token = parsedData.token;
        initialState.user = parsedData.data;
    } catch (error) {
        console.error("Failed to parse stored authentication data:", error);
    }
}
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<{ token: string; user: { name: string } }>) => {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.error = null;
            // Save user data to localStorage
            // window.localStorage.setItem('data', JSON.stringify(action.payload));
            setLocalStorage('data', JSON.stringify(action.payload));
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.isAuthenticated = false;
            state.token = null;
            state.user = null;
            state.error = action.payload;
            // Optionally clear user data from localStorage
            // window.localStorage.removeItem('data');
            removeLocalStorage('data');
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            state.user = null;
            state.error = null;
            // Remove user data from localStorage
            // window.localStorage.removeItem('data');
            removeLocalStorage('data');
        },
    },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
