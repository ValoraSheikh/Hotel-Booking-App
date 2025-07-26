import { model, models, Schema, Types } from "mongoose";

interface IWishlist {
  user: Types.ObjectId;
  rooms: Types.ObjectId;
}

const wishlistSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    rooms: [
      {
        type: Types.ObjectId,
        ref: "Room",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Wishlist =
  models?.Wishlist || model<IWishlist>("Wishlist", wishlistSchema);

export default Wishlist;
