import { createAppSlice } from "../../../common/utils"
import { setAppStatusAC } from "../../../app/app-slice"
import { handleServerNetworkError } from "../../../common/utils/handleServerNetworkError"
import { authApi } from "../api/authApi"


export const authSlice = createAppSlice({
  name: "auth",
  initialState: {
    user: null as UserData | null,
    token: localStorage.getItem("wp_jwt_token"),
  } as AuthState,

  selectors: {
    selectUser: (state) => state.user,
    selectToken: (state) => state.token,
  },

  reducers: (create) => {
    return {
      // ✅ LOGIN
      login: create.asyncThunk(
        async (payload: { username: string; password: string; rememberMe: boolean }, { dispatch, rejectWithValue }) => {
          try {
            dispatch(setAppStatusAC({ status: "loading" }))
            const response = await authApi.login(payload)
            if (response.data.token) {
              if (payload.rememberMe) {
                localStorage.setItem("wp_jwt_token", response.data.token)
              } else {
                sessionStorage.setItem("wp_jwt_token", response.data.token)
              }

              dispatch(setAppStatusAC({ status: "succeeded" }))
              return {
                token: response.data.token,
                user: {
                  displayName: response.data.user_display_name,
                  email: response.data.user_email,
                  username: response.data.user_nicename,
                },
              }
            } else {
              throw new Error("No token received")
            }
          } catch (error: any) {

            handleServerNetworkError(error, dispatch)
            return rejectWithValue(error.response?.data?.message || "Login failed")
          }
        },
        {
          fulfilled: (state, action) => {
            state.isLoggedIn = true
            state.token = action.payload.token
            state.user = action.payload.user
          },
          rejected: (state, action) => {
            state.isLoggedIn = false
            state.token = null
            state.user = null
            localStorage.removeItem("wp_jwt_token")
            sessionStorage.removeItem("wp_jwt_token")
          },
        },
      ),

      // ✅ LOGOUT
      logout: create.asyncThunk(
        async (_, { dispatch, rejectWithValue, getState }) => {
          try {
            const state = getState() as { auth: AuthState }
            const token = state.auth.token

            // Optional: Call logout endpoint if available
            if (token) {
              try {
                await authApi.logout?.(token)
              } catch (error) {
                // Ignore logout API errors - we still want to clear local state
                console.log("Logout API call failed, but clearing local state anyway")
              }
            }

            // Clear local storage regardless of API call success
            localStorage.removeItem("wp_jwt_token")
            sessionStorage.removeItem("wp_jwt_token")

            dispatch(setAppStatusAC({ status: "succeeded" }))
            return
          } catch (error: any) {
            handleServerNetworkError(error, dispatch)
            // Even if there's an error, we still want to clear local storage
            localStorage.removeItem("wp_jwt_token")
            sessionStorage.removeItem("wp_jwt_token")
            return rejectWithValue(error.response?.data?.message || "Logout failed")
          }
        },
        {
          pending: (state) => {
            state.isLoggedIn = false // Immediately set as not logged in
          },
          fulfilled: (state) => {
            state.isLoggedIn = false
            state.token = null
            state.user = null
          },
          rejected: (state) => {
            state.isLoggedIn = false
            state.token = null
            state.user = null
          },
        },
      ),

      // ✅ MANUAL LOGOUT (sync action for immediate logout)
      manualLogout: create.reducer((state) => {
        state.isLoggedIn = false
        state.token = null
        state.user = null
        localStorage.removeItem("wp_jwt_token")
        sessionStorage.removeItem("wp_jwt_token")
      }),
    }
  },
})

export const authReducer = authSlice.reducer
export const { login, logout, manualLogout } = authSlice.actions
export const { selectUser, selectToken } = authSlice.selectors

export type AuthState = {
  isLoggedIn: boolean
  user: UserData | null
  token: string | null
}

export type UserData = {
  displayName: string
  email: string
  username: string
}
