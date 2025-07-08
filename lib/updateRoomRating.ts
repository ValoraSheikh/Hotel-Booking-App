import Review from "@/models/Review.model";
import Room from "@/models/Room.model";

export async function updateRoomAverageRating(roomId: string) {
  const reviews = await Review.find({ room: roomId });

  const avgRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) /
      (reviews.length || 1);

  // Update the room with new average rating
  await Room.findByIdAndUpdate(roomId, {
    rating: Number(avgRating.toFixed(1)), // e.g. 4.3
  });
}
