import { Button, Dialog, Flex } from "@radix-ui/themes";
import React from "react";
import type { FC, PropsWithChildren } from "react";

interface DeleteDialogProps extends PropsWithChildren {
  onSubmitButtonClick: () => void;
  message?: string;
}

const DeleteDialog: FC<DeleteDialogProps> = ({
  children,
  message,
  onSubmitButtonClick,
}) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Delete Issue</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          {message}
        </Dialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={onSubmitButtonClick}>Yes</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DeleteDialog;
