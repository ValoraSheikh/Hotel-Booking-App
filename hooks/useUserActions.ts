import { useState } from "react";
import { User } from "../types";

export const useUserActions = (setUsers: React.Dispatch<React.SetStateAction<User[]>>) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editRoleModalOpen, setEditRoleModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [newRole, setNewRole] = useState<"admin" | "user">("user");

  const handleView = (user: User) => {
    setSelectedUser(user);
    setViewModalOpen(true);
  };

  const handleEditRole = (user: User) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setEditRoleModalOpen(true);
  };

  const handleSaveRoleChange = async () => {
    if (!selectedUser) return;
    try {
      const response = await fetch(`/api/admin/users/${selectedUser._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });
      if (!response.ok) {
        throw new Error("Failed to update role");
      }
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u._id === selectedUser._id ? { ...u, role: newRole } : u))
      );
      setEditRoleModalOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedUser) return;
    try {
      const response = await fetch(`/api/admin/users/${selectedUser._id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      setUsers((prevUsers) => prevUsers.filter((u) => u._id !== selectedUser._id));
      setDeleteModalOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return {
    selectedUser,
    setSelectedUser, // Add this to the returned object
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
  };
};