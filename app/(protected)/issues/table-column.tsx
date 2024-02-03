import { ReadIssue } from "@/schema/inferedSchema";
import { Button, Checkbox, IconButton } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import {
  FaEdit,
  FaEye,
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaTrash,
} from "react-icons/fa";
import StatusChip from "./StatusChip";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DeleteDialog from "./DeleteDialog";

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
    enableSorting: true,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="text-xs">
        <StatusChip status={row.getValue("status")} />
      </div>
    ),
    enableColumnFilter: true,
    filterFn: (row, columnId, value, meta) => {
      if (value === undefined) return false;
      if (value === row.getValue(columnId)) return true;
      return false;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          color="gray"
        >
          Created At
          {column.getIsSorted() === "desc" ? (
            <FaSortAlphaUp className="ml-2 h-4 w-4" />
          ) : (
            <FaSortAlphaDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">
        {new Date(row.getValue("createdAt")).toDateString()}
      </div>
    ),
    enableHiding: true,
    sortingFn: (rowA, rowB, columnId) => {
      const dateA = new Date(rowA.getValue(columnId));
      const dateB = new Date(rowB.getValue(columnId));
      return dateA.getTime() < dateB.getTime() ? 1 : -1;
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const path = usePathname();
      return (
        <div className="space-x-4">
          <Link href={`${path}/detail/${row.id}`}>
            <IconButton variant="soft">
              <FaEye />
            </IconButton>
          </Link>

          <Link href={`${path}/edit/${row.id}`}>
            <IconButton variant="soft">
              <FaEdit />
            </IconButton>
          </Link>

          <DeleteDialog
            trigger={
              <IconButton color="red">
                <FaTrash />
              </IconButton>
            }
            deletedContent={row.getValue("title")}
          />
        </div>
      );
    },
  },
];
