import { useState, useEffect } from "react";
import { Room } from "@/types";

const useRooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/rooms")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch rooms");
        return res.json();
      })
      .then((data) => {
        const list = Array.isArray(data) ? data : data.rooms;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mapped = list.map((room: any) => ({
          id: room._id,
          title: room.title,
          price: room.price,
          beds: room.beds,
          capacity: room.capacity,
          available: room.isAvailable,
          rating: 4.5,
          image: room.images && room.images.length > 0 ? room.images[0] : "/placeholder.svg?height=80&width=120",
        }));
        setRooms(mapped);
      })
      .catch((err) => {
        console.error("Error fetching rooms:", err);
        setRooms([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { rooms, setRooms, isLoading };
};

export default useRooms;