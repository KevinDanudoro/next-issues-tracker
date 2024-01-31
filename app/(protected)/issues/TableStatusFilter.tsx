import { readIssueSchema } from "@/schema/validationSchema";
import {
  Button,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "@radix-ui/themes";
import React, { useState } from "react";
import type { FC } from "react";
import { FaCheck } from "react-icons/fa";
import { z } from "zod";

interface TableStatusFilterProps {
  className: React.HTMLAttributes<HTMLDivElement>["className"];
}

type IssueStatus = z.infer<typeof readIssueSchema.shape.status> | "ALL";
const issueStatus: IssueStatus[] = ["ALL", "OPEN", "IN_PROGRESS", "CLOSED"];

const TableStatusFilter: FC<TableStatusFilterProps> = ({ className }) => {
  const [filterStatus, setFilterStatus] = useState<IssueStatus>("ALL");

  return (
    <div className={className}>
      <DropdownMenuRoot>
        <DropdownMenuTrigger>
          <Button
            variant="soft"
            className="capitalize overflow-ellipsis whitespace-nowrap overflow-hidden min-w-5 w-36 md:w-48"
          >
            <div className="flex justify-between w-full">
              <p>Filter Status: </p>
              <p>{filterStatus.replaceAll("_", " ").toLowerCase()}</p>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          {issueStatus.map((status) => (
            <DropdownMenuItem
              key={status}
              className="space-x-6"
              onClick={() => setFilterStatus(status)}
            >
              <p className="capitalize">
                {status.replaceAll("_", " ").toLowerCase()}
              </p>
              {status === filterStatus && <FaCheck />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenuRoot>
    </div>
  );
};

export default TableStatusFilter;
