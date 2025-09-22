// features/auth/api/authApi.ts
import { instance } from "../../../common/instance"

export const authApi = {
  login(credentials: { username: string; password: string }) {
    return instance.post<{
      token: string
      user_display_name: string
      user_email: string
      user_nicename: string
    }>("/jwt-auth/v1/token", credentials)
  },
  
  validateToken(token: string) {
    return instance.post<{
      code: string
      data: {
        status: number
      }
    }>("/jwt-auth/v1/token/validate", {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },
  
  // If you need user profile data
  getMe() {
    return instance.get("/wp/v2/users/me")
  }
}