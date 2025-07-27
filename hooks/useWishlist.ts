import { useEffect, useState } from "react";

interface Wishlist {
  _id: number;
  user: string;
  rooms: string[];
  title: string;
  description: string;
  price: number;
  images: string[];
  capacity: number;
  size: number;
  beds: string;
  services: string[];
  featured?: boolean;
  roomNumber: string;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
  rating: number;
  location: string;
}

const useWishlist = () => {
  const [wishlist, setWishlist] = useState<Wishlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/wishlist");
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

        setWishlist(data.wishlist || []);
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

    fetchWishlist();
  }, []);

  return { wishlist, isLoading, error, setWishlist };
};

export default useWishlist;
