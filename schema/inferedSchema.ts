import { z } from "zod";
import {
  createIssueSchema,
  editIssueSchema,
  issuesSumarizeSchema,
  readIssueSchema,
} from "./validationSchema";

export type Createissue = z.infer<typeof createIssueSchema>;
export type ReadIssue = z.infer<typeof readIssueSchema>;
export type EditIssue = z.infer<typeof editIssueSchema>;
export type SumarizedIssue = z.infer<typeof issuesSumarizeSchema>;
