"use client";

import React from "react";
import type { FC } from "react";
import { DonutChart, Legend } from "@tremor/react";
import { z } from "zod";
import { issuesSumarizeSchema } from "@/schema/validationSchema";

interface IssueDonutChartProps extends React.HTMLAttributes<HTMLDivElement> {
  issues: z.infer<typeof issuesSumarizeSchema>;
}

const dataFormatter = (number: number) =>
  Intl.NumberFormat("us").format(number).toString();

const IssueDonutChart: FC<IssueDonutChartProps> = ({
  className,
  issues,
  ...props
}) => {
  const totalIssues = issues.sumarize.map((issue) => ({
    name: issue.name,
    "Total issues": issue._count._all,
  }));
  return (
    <>
      <DonutChart
        data={totalIssues}
        category="Total issues"
        index="name"
        valueFormatter={dataFormatter}
        colors={["blue", "cyan", "indigo"]}
        className={className}
        {...props}
      />
      <Legend
        categories={totalIssues.map((issue) =>
          issue.name.toLowerCase().replaceAll("_", " ")
        )}
        colors={["blue", "cyan", "indigo", "violet", "fuchsia"]}
        className="max-w-sm capitalize"
      />
    </>
  );
};

export default IssueDonutChart;
