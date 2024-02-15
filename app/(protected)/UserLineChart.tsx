"use client";

import { useGetUsersGrowth } from "@/hooks/user";
import { GrowthUserSchema } from "@/schema/inferedSchema";
import { LineChart } from "@tremor/react";
import React, { useMemo } from "react";

const dataFormatter = (number: number) =>
  `${Intl.NumberFormat("us").format(number).toString()} user`;

interface UserLineChartProps extends React.HTMLAttributes<HTMLDivElement> {
  initialUsers: GrowthUserSchema;
}

const UserLineChart: React.FC<UserLineChartProps> = ({
  className,
  initialUsers,
  ...props
}) => {
  const { data: usersGrowths } = useGetUsersGrowth(initialUsers);

  const chartData = useMemo(() => {
    return usersGrowths?.growths.map((data) => {
      const date = new Date(data.date).toDateString().split(" ");
      if (!data.growth) return { date: `${date[1]} ${date[3]}`, user: 0 };
      return {
        date: `${date[1]} ${date[3]}`,
        user: data.growth.length,
      };
    });
  }, [usersGrowths]);

  return (
    <LineChart
      className={className}
      data={chartData ?? []}
      index="date"
      categories={["user"]}
      colors={["indigo"]}
      valueFormatter={dataFormatter}
      minValue={0}
      allowDecimals={false}
      showAnimation={true}
      {...props}
    />
  );
};
export default UserLineChart;
