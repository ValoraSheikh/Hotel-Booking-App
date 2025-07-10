import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { User } from "@/types";

interface UserRowProps {
  user: User;
  formatDate: (date: Date) => string;
  truncateText: (text: string, maxLength: number) => string;
  handleView: (user: User) => void;
  handleEditRole: (user: User) => void;
  setSelectedUser: (user: User | null) => void;
  setDeleteModalOpen: (open: boolean) => void;
}

export const UserRow = ({
  user,
  formatDate,
  truncateText,
  handleView,
  handleEditRole,
  setSelectedUser,
  setDeleteModalOpen,
}: UserRowProps) => {
  return (
    <TableRow key={user._id}>
      <TableCell className="font-medium">
        <Tooltip>
          <TooltipTrigger>
            <span className="block max-w-[150px] truncate">{truncateText(user.name, 20)}</span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{user.name}</p>
          </TooltipContent>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Tooltip>
          <TooltipTrigger>
            <span className="block max-w-[200px] truncate">{truncateText(user.email, 25)}</span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{user.email}</p>
          </TooltipContent>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Badge
          variant={user.provider === "google" ? "default" : "secondary"}
          className={
            user.provider === "google"
              ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
          }
        >
          {user.provider === "google" ? "Google" : "Credentials"}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge
          variant={user.role === "admin" ? "destructive" : "default"}
          className={
            user.role === "admin"
              ? "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-300"
              : "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300"
          }
        >
          {user.role === "admin" ? "Admin" : "User"}
        </Badge>
      </TableCell>
      <TableCell>{formatDate(user.createdAt)}</TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleView(user)}>
              <Eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEditRole(user)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Role
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setSelectedUser(user);
                setDeleteModalOpen(true);
              }}
              className="text-red-600 focus:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};