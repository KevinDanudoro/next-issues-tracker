import { readIssueSchema } from "@/schema/validationSchema";
import { z } from "zod";

type Issue = z.infer<typeof readIssueSchema>;

export const issueDatas: Issue[] = [
  {
    title: "Kevin",
    description: "Ini masalah kevin",
    createdAt: "2024-02-29T15:07:50.351Z",
    status: "OPEN",
  },
  {
    title: "Bimo",
    description: "Ini masalah Bimo",
    createdAt: "2023-05-21T15:05:10.331Z",
    status: "CLOSED",
  },
];
