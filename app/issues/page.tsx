import { Button } from "@radix-ui/themes";
import React from "react";
import type { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div>
      <Button>Create New Issue</Button>
    </div>
  );
};

export default page;
