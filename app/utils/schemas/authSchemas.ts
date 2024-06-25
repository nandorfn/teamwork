import { z } from "zod";

// Schema Register Server Form
export const registerSchema = z.object({
  name: z.string().min(1, "Name cannot be empty"),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });
export type TRegister = z.infer<typeof registerSchema>;

export const TRegisterServer = z.object({
  name: z.string().min(1, "Name cannot be empty"),
  email: z.string().email(),
  salt: z.string(),
  password: z.string(),
});

// Schema Register Server Form
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
export type TLogin = z.infer<typeof registerSchema>;

// Token schema
export const tokenSchema = z.object({
  username: z.string(),
  userId: z.string(),
  id: z.number(),
  iat: z.number(),
  exp: z.number(),
});
export type JwtSchema = z.infer<typeof tokenSchema>;

