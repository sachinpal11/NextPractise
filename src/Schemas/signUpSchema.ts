import { z } from 'zod'

export const usernameValidation = z.string().min(2, "Username atleast have 2 Characters").max(20, "Username not more than 20 Characters").regex(/^[a-zA-Z0-9_]+$/, "Username must not contain any special Characters")


export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "password must be at least 6 Characters" })
})