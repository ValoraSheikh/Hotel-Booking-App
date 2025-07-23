import { useState, useEffect } from "react";
import { Room } from "@/types";

const useRoomDetail = (id: string) => {
  const [roomDetail, setRoomDetail] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/rooms/${id}`)
      .then((res) => {
        if (!res.ok)
          throw new Error(`Failed to fetch room detail with id ${id}`);

        return res.json();
      })
      .then((room) => {
        console.log("Logging room", room);

        setRoomDetail(room);
      })
      .catch((err) => {
        console.error("Error fetching rooms:", err);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return { roomDetail, isLoading, error };
};

export default useRoomDetail;
