import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import type { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div>
      <Button>
        <Link href="/issues/new">New issue</Link>
      </Button>
    </div>
  );
};

export default page;
