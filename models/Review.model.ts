import { Schema, model, models } from "mongoose";
import { Types } from "mongoose";

export interface IReview {
  user: Types.ObjectId;
  room: Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating must be at most 5"],
    },
    comment: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, "Comment cannot be more than 100 characters"],
    },
  },
  { timestamps: true }
);

const Review = models?.Review || model<IReview>("Review", reviewSchema);
export default Review;
