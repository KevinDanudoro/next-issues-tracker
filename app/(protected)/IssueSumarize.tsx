"use client";

import React from "react";
import type { FC } from "react";
import Card from "./Card";
import CardBadge from "./CardBadge";
import { useGetIssuesSumarize } from "@/hooks/issue";
import { SumarizedIssue } from "@/schema/inferedSchema";

interface IssueSumarizeProps {
  initialIssues: SumarizedIssue;
}

const IssueSumarize: FC<IssueSumarizeProps> = ({ initialIssues }) => {
  const { data: issues } = useGetIssuesSumarize(initialIssues);

  return (
    <>
      {issues?.sumarize &&
        issues.sumarize.map((issue) => (
          <Card
            key={issue.name}
            className="col-span-4 row-span-2 flex flex-col gap-y-2 md:flex-row md:gap-x-4 md:px-4 lg:gap-x-6"
          >
            <CardBadge
              color={
                issue.name === "OPEN"
                  ? "red"
                  : issue.name === "IN_PROGRESS"
                  ? "yellow"
                  : issue.name === "CLOSED"
                  ? "green"
                  : undefined
              }
              className="min-w-16 min-h-16 text-lg lg:min-w-24 lg:min-h-24 lg:text-3xl lg:font-bold"
            >
              {issue._count._all}
            </CardBadge>
            <p className="capitalize text-sm w-fit text-center md:text-left lg:text-base">
              <span className="font-semibold text-base md:text-lg block lg:text-lg">
                Issues{" "}
              </span>
              {issue._count._all > 1 ? "are " : "is "}
              {issue.name.toLowerCase().replaceAll("_", " ")}
            </p>
          </Card>
        ))}
    </>
  );
};

export default IssueSumarize;
