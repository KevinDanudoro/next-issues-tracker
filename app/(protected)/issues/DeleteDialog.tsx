import { Button, Dialog, Flex } from "@radix-ui/themes";
import React from "react";
import type { FC } from "react";

interface DeleteDialogProps {
  deletedContent?: string;
  trigger?: React.ReactNode;
}

const DeleteDialog: FC<DeleteDialogProps> = ({ trigger, deletedContent }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>{trigger}</Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Delete Issue</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Are you sure want to delete {'"'}
          {deletedContent}
          {'"'} issue?
        </Dialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button>Yes</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DeleteDialog;
