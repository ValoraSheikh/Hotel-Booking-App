'use client';

import RoomCard from "@/components/sections/RoomCard";
import { useEffect, useState } from "react";

interface Room{
  _id: string
  name: string;
  isAvailable: boolean;
}

const RoomsPage = () => {
  const [rooms, setRooms] = useState<Room[]>([]); // Initialize rooms as an empty array
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track errors

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('/api/rooms');
        if (!response.ok) {
          throw new Error('Failed to fetch rooms');
        }
        const data = await response.json();

        // Validate the response: check success and if rooms is an array
        if (data.success && Array.isArray(data.rooms)) {
          setRooms(data.rooms); // Set rooms to the array
          console.log(data.rooms);
          
        } else {
          setError('Invalid response from server.');
        }
      } catch (error) {
        console.error('Error fetching rooms:', error);
        setError('Failed to load rooms. Please try again later.');
      } finally {
        setIsLoading(false); // Done loading, whether success or error
      }
    };
    fetchRooms();
  }, []);

  // Render logic
  if (isLoading) {
    return <div className="text-center py-10">Loading rooms...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <>
      <h1 className="text-center text-5xl playfair-display mt-6">Our Rooms</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-10 lg:px-32 fix-ipad py-10">
        {Array.isArray(rooms) && rooms.length > 0 ? (
          rooms.map((room) => <RoomCard key={room._id} room={room} />)
        ) : (
          <div className="text-center py-10">No rooms available.</div>
        )}
      </div>
    </>
  );
};

export default RoomsPage;