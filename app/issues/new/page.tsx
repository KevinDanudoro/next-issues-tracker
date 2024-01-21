"use client";

import { Button, TextField } from "@radix-ui/themes";
import React from "react";
import type { FC } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root>
        <TextField.Input placeholder="Title" />
      </TextField.Root>
      <SimpleMDE placeholder="Description" />
      <Button>Submit new issue</Button>
    </div>
  );
};

export default page;
