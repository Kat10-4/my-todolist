import { z } from "zod/v4"

export const loginSchema = z.object({
  login: z.string().min(1, "Login is required"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean(),
})

export type LoginInputs = z.infer<typeof loginSchema>// extract the inferred type