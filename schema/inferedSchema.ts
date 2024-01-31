import { z } from "zod";
import { readIssueSchema } from "./validationSchema";

export type ReadIssue = z.infer<typeof readIssueSchema>;
