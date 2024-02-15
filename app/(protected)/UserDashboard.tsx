import React from "react";
import type { FC } from "react";
import Card from "./Card";
import axiosServer from "@/lib/axios-server";
import { growthUserSchema, userSumarizeShema } from "@/schema/validationSchema";
import UserLineChart from "./UserLineChart";
import axios from "axios";
import UserSumarize from "./UserSumarize";

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

  return (
    <div className="grid grid-cols-12 grid-rows-[auto_repeat(4,4rem)] gap-4">
      <h1 className="col-span-full text-2xl font-semibold">User Dashboard</h1>
      <UserSumarize initialUsersSumarize={validUsersSumarize.data} />

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
