import { z } from "zod";
import {
  createIssueSchema,
  editIssueSchema,
  readIssueSchema,
} from "./validationSchema";

export type Createissue = z.infer<typeof createIssueSchema>;
export type ReadIssue = z.infer<typeof readIssueSchema>;
export type EditIssue = z.infer<typeof editIssueSchema>;
