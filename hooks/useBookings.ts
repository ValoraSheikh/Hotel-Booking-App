import { useEffect, useState } from "react";

interface Booking {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  phoneNo: string;
  room: {
    title: string;
    price: number;
  };
  guests: number;
  checkIn: string; // ISO date string
  checkOut: string; // ISO date string
  totalPrice: number;
  status: string;
}

const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/admin/booking");

        // Check for HTML response
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          throw new Error(
            `Unexpected response type: ${contentType}. Response: ${text.slice(
              0,
              100
            )}`
          );
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || `Request failed with status ${response.status}`
          );
        }

        setBookings(data.bookings);
        setError(null);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load bookings. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return { bookings, isLoading, error, setBookings };
};

export default useBookings;
