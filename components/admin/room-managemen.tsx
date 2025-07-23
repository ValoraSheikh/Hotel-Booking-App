"use client";

import { useState } from "react";
import Header from "./rooms/Header";
import ActionBar from "./rooms/ActionBar";
import EmptyStateCard from "./rooms/EmptyStateCard";
import Pagination from "./rooms/Pagination";
import RoomTable from "./rooms/RoomTable";
import useRooms from "@/hooks/useRooms";

export default function RoomManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const { rooms } = useRooms();
  const filteredRooms = rooms.filter(
    (room) =>
      room.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.id.toString().includes(searchTerm)
  );
  const totalPages = Math.ceil(filteredRooms.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedRooms = filteredRooms.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 space-y-6">
        <Header />
        <ActionBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isAddDialogOpen={isAddDialogOpen}
          setIsAddDialogOpen={setIsAddDialogOpen}
        />
        {filteredRooms.length === 0 ? (
          <EmptyStateCard
            searchTerm={searchTerm}
            isAddDialogOpen={isAddDialogOpen}
            setIsAddDialogOpen={setIsAddDialogOpen}
          />
        ) : (
          <>
            <RoomTable rooms={paginatedRooms} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              rowsPerPage={rowsPerPage}
              setCurrentPage={setCurrentPage}
              setRowsPerPage={setRowsPerPage}
            />
          </>
        )}
      </div>
    </div>
  );
}