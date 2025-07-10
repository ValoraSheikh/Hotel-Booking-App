import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import { User } from "@/types";
import { UserRow } from "./UserRow";

interface UsersTableProps {
  paginatedUsers: User[];
  totalPages: number;
  filteredUsers: User[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  rowsPerPage: number;
  handleRowsPerPageChange: (rows: number) => void;
  formatDate: (date: Date) => string;
  truncateText: (text: string, maxLength: number) => string;
  handleView: (user: User) => void;
  handleEditRole: (user: User) => void;
  setSelectedUser: (user: User | null) => void;
  setDeleteModalOpen: (open: boolean) => void;
}

export const UsersTable = ({
  paginatedUsers,
  totalPages,
  filteredUsers,
  currentPage,
  setCurrentPage,
  rowsPerPage,
  handleRowsPerPageChange,
  formatDate,
  truncateText,
  handleView,
  handleEditRole,
  setSelectedUser,
  setDeleteModalOpen,
}: UsersTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>A list of all users in your system with their details and actions.</CardDescription>
      </CardHeader>
      <CardContent>
        {paginatedUsers.length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No users found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedUsers.map((user) => (
                    <UserRow
                      key={user._id}
                      user={user}
                      formatDate={formatDate}
                      truncateText={truncateText}
                      handleView={handleView}
                      handleEditRole={handleEditRole}
                      setSelectedUser={setSelectedUser}
                      setDeleteModalOpen={setDeleteModalOpen}
                    />
                  ))}
                </TableBody>
              </Table>
            </div>
            {totalPages > 0 && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6 pt-4 border-t">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground whitespace-nowrap">Rows per page:</span>
                  <Select
                    value={rowsPerPage.toString()}
                    onValueChange={(value) => handleRowsPerPageChange(Number.parseInt(value))}
                  >
                    <SelectTrigger className="w-[70px] h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="30">30</SelectItem>
                      <SelectItem value="40">40</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-muted-foreground whitespace-nowrap">
                    {filteredUsers.length === 0 ? (
                      "0 of 0"
                    ) : (
                      <>
                        {(currentPage - 1) * rowsPerPage + 1}-
                        {Math.min(currentPage * rowsPerPage, filteredUsers.length)} of {filteredUsers.length}
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1 || filteredUsers.length === 0}
                      className="h-8 px-2"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span className="sr-only sm:not-sr-only sm:ml-1">Previous</span>
                    </Button>
                    <div className="flex items-center gap-1 mx-2">
                      <span className="text-sm text-muted-foreground">
                        Page {filteredUsers.length === 0 ? 0 : currentPage} of {totalPages}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages || filteredUsers.length === 0}
                      className="h-8 px-2"
                    >
                      <span className="sr-only sm:not-sr-only sm:mr-1">Next</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};