import { useEffect, useState } from "react";

interface Review {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  room: {
    _id: string;
    title: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

const useReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/admin/review");
        const data = await response.json();
        console.log("data", data);

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch review");
        }

        setReviews(data.reviews);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, []);

  return { reviews, isLoading, error, setReviews}
};

export default useReviews;
