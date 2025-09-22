// features/auth/api/authApi.types.ts

// Success response from /jwt-auth/v1/token
export type AuthResponse = {
  token: string
  user_display_name: string
  user_email: string
  user_nicename: string
}


// User data from /wp/v2/users/me
export type WPUser = {
  id: number
  name: string
  email: string
  slug: string
  url: string
  description: string
  link: string
}
