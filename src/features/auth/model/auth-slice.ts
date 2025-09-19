import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { setAppErrorAC } from '../../../app/app-slice';

interface AuthState {
  isAuthenticated: boolean;
  user: any;
  token: string | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem('jwt_token') || null,
  isLoading: false,
};

// Async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { username: string; password: string; rememberMe: boolean }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/wp-json/jwt-auth/v1/token`,
        {
          username: credentials.username,
          password: credentials.password,
        }
      );

      if (response.data.token) {
        const jwtToken = response.data.token;
        
        if (credentials.rememberMe) {
          localStorage.setItem('jwt_token', jwtToken);
        } else {
          sessionStorage.setItem('jwt_token', jwtToken);
        }

        // Set default authorization header
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;

        return {
          token: jwtToken,
          user: response.data.user_display_name || credentials.username,
        };
      }
      
      return rejectWithValue('Invalid response from server');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      dispatch(setAppErrorAC(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem('jwt_token');
      sessionStorage.removeItem('jwt_token');
      delete axios.defaults.headers.common['Authorization'];
    },
    setCredentials: (state, action: PayloadAction<{ token: string; user: any }>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectAuthUser = (state: { auth: AuthState }) => state.auth.user;
export const selectAuthToken = (state: { auth: AuthState }) => state.auth.token;
export const selectAuthLoading = (state: { auth: AuthState }) => state.auth.isLoading;

export default authSlice.reducer;