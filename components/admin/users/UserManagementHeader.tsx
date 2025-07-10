import { Users } from "lucide-react";

interface UserManagementHeaderProps {
  totalUsers: number;
}

export const UserManagementHeader = ({ totalUsers }: UserManagementHeaderProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Users className="h-6 w-6" />
        <h1 className="text-3xl font-bold">Users Management</h1>
      </div>
      <p className="text-muted-foreground">
        Manage user accounts, roles, and permissions across your platform.
      </p>
      <p className="text-sm text-muted-foreground">
        Total users: <span className="font-medium">{totalUsers}</span>
      </p>
    </div>
  );
};