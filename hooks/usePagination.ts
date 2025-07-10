import { useState, useMemo } from "react";
import { User } from "../types";

export const usePagination = (users: User[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [providerFilter, setProviderFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesProvider = providerFilter === "all" || user.provider === providerFilter;
      return matchesSearch && matchesProvider;
    });
  }, [users, searchTerm, providerFilter]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredUsers.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredUsers, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
  };

  return {
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
  };
};