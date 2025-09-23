
export type AuthResponse = {
  token: string
  user_display_name: string
  user_email: string
  user_nicename: string
}

export type ValidationResponse={
  code: string
      data: {
        status: number
      }
}

export type WPUser = {
  id: number
  name: string
  email: string
  slug: string
  url: string
  description: string
  link: string
}