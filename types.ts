export interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  provider: "google" | "credentials";
  createdAt: Date;
}

export interface Room {
  id: string
  _id: string
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
  image: string
  available: boolean
}