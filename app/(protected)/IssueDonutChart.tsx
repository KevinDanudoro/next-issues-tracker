"use client";

import React from "react";
import type { FC } from "react";
import { DonutChart } from "@tremor/react";
import { z } from "zod";
import { issuesSumarizeSchema } from "@/schema/validationSchema";

interface IssueDonutChartProps extends React.HTMLAttributes<HTMLDivElement> {
  issues: z.infer<typeof issuesSumarizeSchema>;
}

const valueFormatter = (number: number) =>
  `${Intl.NumberFormat("us").format(number).toString()} ${
    number > 1 ? "Issues" : "Issue"
  }`;

const IssueDonutChart: FC<IssueDonutChartProps> = ({
  className,
  issues,
  ...props
}) => {
  const totalIssues = issues.sumarize.map((issue) => ({
    name: issue.name.toLowerCase().replaceAll("_", " "),
    "Total issues": issue._count._all,
  }));
  return (
    <DonutChart
      data={totalIssues}
      category="Total issues"
      index="name"
      valueFormatter={valueFormatter}
      colors={["red-400", "yellow-400", "green-400"]}
      className={className}
      showAnimation={true}
      {...props}
    />
  );
};

export default IssueDonutChart;
