"use client";

import React, { useMemo } from "react";
import type { FC } from "react";
import Card from "./Card";
import CardBadge from "./CardBadge";
import { SumarizedUserSchema } from "@/schema/inferedSchema";
import { useGetUserSumarize } from "@/hooks/user";

interface UserSumarizeProps {
  initialUsersSumarize: SumarizedUserSchema;
}

const UserSumarize: FC<UserSumarizeProps> = ({ initialUsersSumarize }) => {
  const { data: userSumarize } = useGetUserSumarize(initialUsersSumarize);

  const totalUsers = useMemo(() => {
    return userSumarize?.sumarize
      .map((sum) => sum._count._all)
      .reduce((prev, cur) => prev + cur);
  }, [userSumarize]);

  return (
    <>
      {userSumarize?.sumarize.map((sumarize) => (
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
    </>
  );
};

export default UserSumarize;
