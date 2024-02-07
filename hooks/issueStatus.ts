import { ReadIssue } from "@/schema/inferedSchema";
import { readIssueSchema } from "@/schema/validationSchema";
import { useEffect, useState } from "react";
import { z } from "zod";

export const useIssueStatus = (issueData: ReadIssue[]) => {
  const [issueStatus, setIssueStatus] = useState<
    z.infer<typeof readIssueSchema.shape.status>[]
  >([]);

  useEffect(() => {
    if (issueData?.length) {
      const status = issueData.map((d) => d.status);
      setIssueStatus(Array.from(new Set(status)));
    }
  }, [issueData]);

  return issueStatus;
};
