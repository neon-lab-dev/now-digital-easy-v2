import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    error: string | null;
    user: { name: string } | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    token: null,
    error: null,
    user: null,
};

// Check localStorage for authentication data

const storedData = window.localStorage.getItem('data');
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

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<{ token: string; user: { name: string } }>) => {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.error = null;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.isAuthenticated = false;
            state.token = null;
            state.user = null;
            state.error = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            state.user = null;
            state.error = null;
        },
    },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
