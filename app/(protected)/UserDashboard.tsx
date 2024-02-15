import React from "react";
import type { FC } from "react";
import Card from "./Card";
import CardBadge from "./CardBadge";
import axiosServer from "@/lib/axios-server";
import { growthUserSchema, userSumarizeShema } from "@/schema/validationSchema";
import UserLineChart from "./UserLineChart";
import axios from "axios";

interface UserDashboardProps {}

const UserDashboard: FC<UserDashboardProps> = async ({}) => {
  const endpoints = ["/users/growth", "/users/sumarize"];
  const [usersGrowth, usersSumarize] = await axios.all(
    endpoints.map((e) => axiosServer.get(e))
  );

  const validUsersSumarize = userSumarizeShema.safeParse(usersSumarize.data);
  if (!validUsersSumarize.success)
    throw new Error("User sumarize schema from server is not valid");

  const validUsersGrowth = growthUserSchema.safeParse(usersGrowth.data);
  if (!validUsersGrowth.success)
    throw new Error("User growth schema from server is not valid");

  const totalUsers = validUsersSumarize.data.sumarize
    .map((sum) => sum._count._all)
    .reduce((prev, cur) => prev + cur);

  return (
    <div className="grid grid-cols-12 grid-rows-[auto_repeat(4,4rem)] gap-4">
      <h1 className="col-span-full text-2xl font-semibold">User Dashboard</h1>
      {validUsersSumarize.data.sumarize.map((sumarize) => (
        <Card
          key={sumarize.name}
          className="col-span-6 row-span-2 flex flex-col gap-y-2 md:flex-row md:gap-x-4 md:px-4 lg:gap-x-6 md:col-span-3 md:row-span-2 "
        >
          <CardBadge
            color={sumarize.name === "ADMIN" ? "yellow" : "green"}
            className="min-w-16 min-h-16 text-lg lg:min-w-24 lg:min-h-24 lg:text-3xl lg:font-bold"
          >
            {sumarize._count._all}
          </CardBadge>
          <p className="capitalize text-sm w-fit text-center md:text-left lg:text-base">
            <span className="font-semibold text-base md:text-lg block lg:text-lg">
              Users
            </span>
            is {sumarize.name === "ADMIN" ? "Admin" : "User"}
          </p>
        </Card>
      ))}

      <Card className="row-start-4 col-span-full row-span-2 flex flex-col gap-y-2 md:flex-row md:gap-x-4 md:px-4 lg:gap-x-6 md:col-span-6 md:row-span-2 md:col-start-1">
        <CardBadge
          color="red"
          className="min-w-16 min-h-16 text-lg lg:min-w-24 lg:min-h-24 lg:text-3xl lg:font-bold"
        >
          {totalUsers}
        </CardBadge>
        <p className="capitalize text-sm w-fit text-center md:text-left lg:text-base">
          <span className="font-semibold text-base md:text-lg block lg:text-lg">
            Total Users
          </span>
        </p>
      </Card>

      <Card className="col-span-full row-span-4 block md:col-span-6 md:row-start-2 md:col-start-7">
        <div className="px-6 border-b-2 border-gray-400 pt-4 pb-2">
          <h2 className="font-medium text-base">Users Growth</h2>
        </div>
        <UserLineChart
          className="h-60 block px-4"
          initialUsers={validUsersGrowth.data}
        />
      </Card>
    </div>
  );
};

export default UserDashboard;
