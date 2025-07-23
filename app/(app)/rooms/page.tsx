'use client';

import RoomCard from "@/components/sections/RoomCard";
import useRooms from "@/hooks/useRooms";

const RoomsPage = () => {
  const { rooms, isLoading, error } = useRooms();

  console.log("here are the rooms", rooms);
  
  if (isLoading) {
    return <div className="text-center py-10">Loading rooms...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <>
    <div className="min-h-screen">
      <h1 className="text-center text-5xl playfair-display mt-6">Our Rooms</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-10 lg:px-32 fix-ipad py-10">
        {Array.isArray(rooms) && rooms.length > 0 ? (
          rooms.map((room) => <RoomCard key={room.id} room={room} />)
        ) : (
          <div className="text-center py-10">No rooms available.</div>
        )}
      </div>
        </div>
    </>
  );
};

export default RoomsPage;