"use client";

import React from "react";
import type { FC } from "react";
import { BarChart } from "@tremor/react";

interface IssueBarChartProps extends React.HTMLAttributes<HTMLDivElement> {}

const dataFormatter = (number: number) =>
  Intl.NumberFormat("us").format(number).toString();

const chartdata = [
  { name: "OPEN", "Total issue status": 2488 },
  { name: "IN PROGRESS", "Total issue status": 1445 },
  { name: "CLOSED", "Total issue status": 743 },
];

const IssueBarChart: FC<IssueBarChartProps> = ({ className, ...props }) => {
  return (
    <BarChart
      data={chartdata}
      className={className}
      index="name"
      categories={["Total issue status"]}
      colors={["blue"]}
      valueFormatter={dataFormatter}
      yAxisWidth={48}
      onValueChange={(v) => console.log(v)}
      showAnimation={true}
      {...props}
    />
  );
};

export default IssueBarChart;
