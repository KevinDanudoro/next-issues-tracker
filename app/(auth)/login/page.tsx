import Link from "next/link";
import React from "react";
import type { FC } from "react";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  return (
    <div>
      Sign In Page
      <button>
        <Link href="/signup">To sign up</Link>
      </button>
    </div>
  );
};

export default Page;
