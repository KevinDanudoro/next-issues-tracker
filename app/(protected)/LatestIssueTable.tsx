import { getAuthCookies } from "@/lib/cookies";
import { readIssueSchema } from "@/schema/validationSchema";
import { Table } from "@radix-ui/themes";
import axios from "axios";
import React from "react";
import type { FC } from "react";
import StatusChip from "./issues/StatusChip";

interface LatestIssueTableProps extends React.HTMLAttributes<HTMLDivElement> {}

const LatestIssueTable: FC<LatestIssueTableProps> = async ({
  className,
  ...props
}) => {
  const issues = await axios.get("/issues", {
    baseURL: "http://localhost:3000/api",
    params: { latest: 1 },
    headers: {
      Cookie: getAuthCookies(),
    },
  });

  const validIssues = readIssueSchema.array().safeParse(issues.data);
  if (!validIssues.success) throw validIssues.error.message;

  return (
    <Table.Root className={className} {...props}>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {validIssues.data.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.RowHeaderCell>{issue.title}</Table.RowHeaderCell>
            <Table.Cell>
              <StatusChip status={issue.status} className="text-xs" />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default LatestIssueTable;
