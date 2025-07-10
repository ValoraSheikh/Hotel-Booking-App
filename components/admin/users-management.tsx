"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { useUsers } from "@/hooks/useUsers";
import { usePagination } from "@/hooks/usePagination";
import { useUserActions } from "@/hooks/useUserActions";
import { UserManagementHeader } from "./users/UserManagementHeader";
import { UserFilters } from "./users/UserFilters";
import { UsersTable } from "./users/UsersTable";
import { ViewUserModal } from "./users/ViewUserModal";
import { EditRoleModal } from "./users/EditRoleModal";
import { DeleteUserModal } from "./users/DeleteUserModal";

export default function UsersPage() {
  const { users, setUsers } = useUsers();
  const {
    searchTerm,
    setSearchTerm,
    providerFilter,
    setProviderFilter,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    handleRowsPerPageChange,
    filteredUsers,
    paginatedUsers,
    totalPages,
  } = usePagination(users);
  const {
    selectedUser,
    viewModalOpen,
    setViewModalOpen,
    editRoleModalOpen,
    setEditRoleModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    newRole,
    setNewRole,
    handleView,
    handleEditRole,
    handleSaveRoleChange,
    handleConfirmDelete,
    setSelectedUser
  } = useUserActions(setUsers);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <TooltipProvider>
      <div className="container mx-auto p-6 space-y-6">
        <UserManagementHeader totalUsers={filteredUsers.length} />
        <UserFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          providerFilter={providerFilter}
          setProviderFilter={setProviderFilter}
          setCurrentPage={setCurrentPage}
        />
        <UsersTable
          paginatedUsers={paginatedUsers}
          totalPages={totalPages}
          filteredUsers={filteredUsers}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          rowsPerPage={rowsPerPage}
          handleRowsPerPageChange={handleRowsPerPageChange}
          formatDate={formatDate}
          truncateText={truncateText}
          handleView={handleView}
          handleEditRole={handleEditRole}
          setSelectedUser={setSelectedUser}
          setDeleteModalOpen={setDeleteModalOpen}
        />
        <ViewUserModal
          open={viewModalOpen}
          setOpen={setViewModalOpen}
          selectedUser={selectedUser}
          formatDate={formatDate}
        />
        <EditRoleModal
          open={editRoleModalOpen}
          setOpen={setEditRoleModalOpen}
          selectedUser={selectedUser}
          newRole={newRole}
          setNewRole={setNewRole}
          handleSaveRoleChange={handleSaveRoleChange}
        />
        <DeleteUserModal
          open={deleteModalOpen}
          setOpen={setDeleteModalOpen}
          selectedUser={selectedUser}
          handleConfirmDelete={handleConfirmDelete}
        />
      </div>
    </TooltipProvider>
  );
}