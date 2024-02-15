import { z } from "zod";
import {
  createIssueSchema,
  editIssueSchema,
  issuesSumarizeSchema,
  readIssueSchema,
  createUserSchema,
  readUserSchema,
  growthUserSchema,
} from "./validationSchema";

export type Createissue = z.infer<typeof createIssueSchema>;
export type ReadIssue = z.infer<typeof readIssueSchema>;
export type EditIssue = z.infer<typeof editIssueSchema>;
export type SumarizedIssue = z.infer<typeof issuesSumarizeSchema>;

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type ReadUserSchema = z.infer<typeof readUserSchema>;
export type GrowthUserSchema = z.infer<typeof growthUserSchema>;
