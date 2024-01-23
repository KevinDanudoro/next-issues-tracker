import { z } from "zod";

export const createIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required"),
});

export const userSchema = z.object({
  email: z.string().min(1, "Email is required").email("Not valid email format"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, "Password must be at least 8 character"),
  role: z.enum(["USER", "ADMIN"]),
});
