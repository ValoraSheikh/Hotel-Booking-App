
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

export interface Booking {
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
  paymentStatus: string;
  merchantOrderId: string;
  createdAt: Date;
  updatedAt: Date;
}
