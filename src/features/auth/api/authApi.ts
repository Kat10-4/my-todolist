// features/auth/api/authApi.ts
import { instance } from "../../../common/instance/instance"
import type { AuthResponse, ValidationResponse, WPUser } from "./authApi.types"

export const authApi = {
  // ✅ POST - Get JWT token by sending credentials
  login(credentials: { username: string; password: string }) {
    return instance.post<AuthResponse>("/jwt-auth/v1/token", credentials)
  },

  // ✅ POST - Validate existing JWT token
  validateToken(token: string) {
    return instance.post<ValidationResponse>(
      "/jwt-auth/v1/token/validate",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
  },

  // ✅ POST - Revoke token (optional logout endpoint)
  logout(token: string) {
    return instance.post(
      "/jwt-auth/v1/token/revoke",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
  },

  // ✅ GET - Get user profile (uses JWT token via interceptor)
  getMe() {
    return instance.get<WPUser>("/wp/v2/users/me")
  },
}
