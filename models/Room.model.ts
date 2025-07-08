import { Schema, model, models } from "mongoose";

export interface IRoom {
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
}

const roomSchema = new Schema<IRoom>(
  {
    title: {
      type: String,
      required: [true, "Room title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    images: {
      type: [String], // store image URLs or S3 paths
      default: [],
    },
    capacity: {
      type: Number,
      required: true,
    },
    size: {
      type: Number, // in square feet or meters
      required: true,
    },
    beds: {
      type: String, // e.g., "1 King Bed", "2 Queen Beds"
      required: true,
    },
    services: {
      type: [String], // e.g., ["WiFi", "AC", "Mini Bar"]
      default: [],
    },
    roomNumber: {
      type: String,
      required: [true, "Room number is required"],
      unique: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Room = models?.Room || model<IRoom>("Room", roomSchema);
export default Room;
