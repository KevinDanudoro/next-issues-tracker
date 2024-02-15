import React from "react";
import type { FC } from "react";
import Card from "./Card";
import CardBadge from "./CardBadge";
import axiosServer from "@/lib/axios-server";
import { userSumarizeShema } from "@/schema/validationSchema";
import UserLineChart from "./UserLineChart";

interface UserDashboardProps {}

const UserDashboard: FC<UserDashboardProps> = async ({}) => {
  const users = await axiosServer.get("/users/sumarize");
  const validUsers = userSumarizeShema.safeParse(users.data);
  if (!validUsers.success)
    throw new Error("User data from server is not valid");

  return (
    <>
      <h1 className="col-span-full text-2xl font-semibold">User Dashboard</h1>
      {validUsers.data.sumarize.map((sumarize) => (
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

      <Card className="col-span-full row-span-4 block md:col-span-6">
        <div className="px-6 border-b-2 border-gray-400 pt-4 pb-2">
          <h2 className="font-medium text-base">Registered User</h2>
        </div>
        <UserLineChart className="h-60 block px-4" />
      </Card>
    </>
  );
};

export default UserDashboard;
