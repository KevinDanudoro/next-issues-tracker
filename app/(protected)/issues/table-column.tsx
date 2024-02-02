import { ReadIssue } from "@/schema/inferedSchema";
import { Button, Checkbox } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import StatusChip from "./StatusChip";

export const issueColumn: ColumnDef<ReadIssue>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <div className="h-full">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          color="gray"
        >
          Title
          {column.getIsSorted() === "desc" ? (
            <FaSortAlphaUp className="ml-2 h-4 w-4" />
          ) : (
            <FaSortAlphaDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
    enableHiding: false,
    enableSorting: true,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("description")}</div>
    ),
    enableHiding: true,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="text-xs">
        <StatusChip status={row.getValue("status")} />
      </div>
    ),
    enableHiding: true,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <div className="capitalize">
        {new Date(row.getValue("createdAt")).toDateString()}
      </div>
    ),
    enableHiding: true,
  },
];
