"use client";

import React from "react";
import type { FC } from "react";
import { DonutChart, Legend } from "@tremor/react";
import { useGetIssuesSumarize } from "@/hooks/issue";
import { SumarizedIssue } from "@/schema/inferedSchema";

interface IssueDonutChartProps extends React.HTMLAttributes<HTMLDivElement> {
  initialIssues: SumarizedIssue;
}

const valueFormatter = (number: number) =>
  `${Intl.NumberFormat("us").format(number).toString()} ${
    number > 1 ? "Issues" : "Issue"
  }`;

const IssueDonutChart: FC<IssueDonutChartProps> = ({
  className,
  initialIssues,
  ...props
}) => {
  const { data: issues } = useGetIssuesSumarize(initialIssues);

  const totalIssues = issues?.sumarize.map((issue) => ({
    name: issue.name.toLowerCase().replaceAll("_", " "),
    "Total issues": issue._count._all,
  }));

  return (
    <div className={className}>
      <DonutChart
        data={totalIssues ?? []}
        category="Total issues"
        index="name"
        valueFormatter={valueFormatter}
        colors={["red-400", "yellow-400", "green-400"]}
        showAnimation={true}
        className="h-full"
        {...props}
      />
      <Legend
        className="max-w-xs capitalize"
        categories={totalIssues?.map((issue) => `${issue.name} issue`) ?? [""]}
        colors={["red-400", "yellow-400", "green-400"]}
      />
    </div>
  );
};

export default IssueDonutChart;
