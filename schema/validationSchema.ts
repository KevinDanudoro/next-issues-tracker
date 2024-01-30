import { z } from "zod";

export const createIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required"),
});

export const readIssueSchema = z.object({
  title: z.string(),
  description: z.string(),
  createdAt: z.string().datetime(),
  status: z.enum(["OPEN", "CLOSED"]),
});

export const userSchema = z.object({
  email: z.string().min(1, "Email is required").email("Not valid email format"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, "Password must be at least 8 character"),
  role: z.enum(["USER", "ADMIN"]).nullish(),
});

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Not valid email format"),
  password: z.string().min(8, "Password must be at least 8 character"),
});

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Not valid email format"),
    username: z.string().min(1, "Username is required"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 character"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Password and confirm password not same",
      path: ["confirmPassword"],
    }
  );
