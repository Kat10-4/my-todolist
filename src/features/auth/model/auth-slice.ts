// slices/authSlice.ts

import { createAppSlice } from "../../../common/utils"

interface AuthState {
  user: null | {
    id: number
    username: string
    email: string
    displayName: string
  }
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('wp_jwt_token'),
  isAuthenticated: !!localStorage.getItem('wp_jwt_token'),
  isLoading: false,
  error: null,
}

export const authSlice = createAppSlice({
  name: 'auth',
  initialState,
  reducers: (create) => ({
    // Login async thunk
    login: create.asyncThunk(
      async (credentials: { username: string; password: string }) => {
        const response = await jwtAuth.login(credentials)
        return response
      },
      {
        pending: (state) => {
          state.isLoading = true
          state.error = null
        },
        fulfilled: (state, action) => {
          state.isLoading = false
          state.isAuthenticated = true
          state.token = action.payload.token
          state.user = action.payload.user
          
          // Store token in localStorage
          localStorage.setItem('wp_jwt_token', action.payload.token)
        },
        rejected: (state, action) => {
          state.isLoading = false
          state.error = action.error.message || 'Login failed'
          state.isAuthenticated = false
          state.token = null
          state.user = null
        },
      }
    ),

    // Register async thunk
    register: create.asyncThunk(
      async (userData: {
        username: string
        email: string
        password: string
        displayName?: string
      }) => {
        const response = await jwtAuthAPI.register(userData)
        return response
      },
      {
        pending: (state) => {
          state.isLoading = true
          state.error = null
        },
        fulfilled: (state, action) => {
          state.isLoading = false
          // Registration might automatically log the user in
          if (action.payload.token) {
            state.isAuthenticated = true
            state.token = action.payload.token
            state.user = action.payload.user
            localStorage.setItem('wp_jwt_token', action.payload.token)
          }
        },
        rejected: (state, action) => {
          state.isLoading = false
          state.error = action.error.message || 'Registration failed'
        },
      }
    ),

    // Validate token async thunk
    validateToken: create.asyncThunk(
      async (token: string) => {
        const response = await jwtAuthAPI.validateToken(token)
        return response
      },
      {
        pending: (state) => {
          state.isLoading = true
        },
        fulfilled: (state, action) => {
          state.isLoading = false
          state.isAuthenticated = true
          state.user = action.payload.user
        },
        rejected: (state, action) => {
          state.isLoading = false
          state.isAuthenticated = false
          state.token = null
          state.user = null
          localStorage.removeItem('wp_jwt_token')
        },
      }
    ),

    // Logout sync action
    logout: create.reducer((state) => {
      state.isAuthenticated = false
      state.token = null
      state.user = null
      localStorage.removeItem('wp_jwt_token')
    }),

    // Clear error action
    clearError: create.reducer((state) => {
      state.error = null
    }),
  }),
  selectors: {
    selectUser: (auth) => auth.user,
    selectToken: (auth) => auth.token,
    selectIsAuthenticated: (auth) => auth.isAuthenticated,
    selectIsLoading: (auth) => auth.isLoading,
    selectError: (auth) => auth.error,
  },
})

export const authReducer = authSlice.reducer

export const {
  login,
  register,
  validateToken,
  logout,
  clearError,
} = authSlice.actions

export const {
  selectUser,
  selectToken,
  selectIsAuthenticated,
  selectIsLoading,
  selectError,
} = authSlice.selectors