"use client";

import { useState, useEffect, use } from "react";
import {
  Star,
  Users,
  Maximize,
  Bed,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Wifi,
  Bath,
  Wind,
  Car,
  Tv,
  Coffee,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import RoomDetailComponent from "@/components/sections/room-detail";
import { IRoom } from "@/models/Room.model";

const amenities = {
  basics: [
    { icon: Wifi, name: "Free Wi-Fi" },
    { icon: Bath, name: "Ensuite Bathroom" },
    { icon: Wind, name: "Hair Dryer" },
    { icon: Car, name: "Free Parking" },
  ],
  entertainment: [
    { icon: Tv, name: "Smart TV" },
    { icon: Wifi, name: "Netflix" },
    { icon: Tv, name: "YouTube" },
  ],
  comfort: [
    { icon: Wind, name: "Air Conditioning" },
    { icon: Coffee, name: "Mini Fridge" },
    { icon: Bath, name: "Premium Towels" },
    { icon: Bed, name: "Premium Bedding" },
  ],
  safety: [
    { icon: Shield, name: "Smoke Detector" },
    { icon: Shield, name: "Safe Box" },
    { icon: Shield, name: "24/7 Security" },
  ],
};

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function HotelRoomDetails(props: PageProps) {
  const params = use(props.params);
  const { id } = params; // ✅ This is correct


  const [room, setRoom] = useState<IRoom>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [checkIn, setCheckIn] = useState("2024-01-15");
  const [checkOut, setCheckOut] = useState("2024-01-18");
  const [guests, setGuests] = useState(2);

  // Fetch room data when ID is available
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/rooms/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch room data");
        }
        const data = await response.json();
        setRoom(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRoom();
    }
  }, [id]);

  // Reset image index when room data changes
  useEffect(() => {
    if (room) {
      setCurrentImageIndex(0);
    }
  }, [room]);

  // Handle loading, error, and no-data states
  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }
  if (error) {
    return <div className="text-center py-10 text-red-600">Error: {error}</div>;
  }
  if (!room) {
    return <div className="text-center py-10">Room not found</div>;
  }

  // Image navigation functions
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + room.images.length) % room.images.length
    );
  };

  // Calculate number of nights
  const calculateNights = () => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();
  const totalBeforeTax = room.price * nights;
  const taxes = Math.round(totalBeforeTax * 0.12);
  const totalPrice = totalBeforeTax + taxes;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="text-sm text-gray-600">
            <span>Home</span> / <span>Rooms</span> /{" "}
            <span className="text-gray-900 font-medium">{room.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Image Carousel */}
              <div className="relative h-64 sm:h-80 lg:h-96">
                <Image
                  height={500}
                  width={500}
                  src={room.images[currentImageIndex] || "/placeholder.svg"}
                  alt={room.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {room.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Room Info */}
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <h1 className="text-3xl font-bold text-gray-900 font-serif mb-2 sm:mb-0">
                    {room.title}
                  </h1>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900">
                      ${room.price}
                      <span className="text-lg font-normal text-gray-600">
                        /night
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(room.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-gray-600">
                      {room?.rating?.toFixed(1) ?? "N/A"}
                      rating
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Room Overview */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 font-serif mb-4">
                  Room Overview
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {room.description}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Maximize className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                    <div className="font-semibold text-gray-900">
                      {room.size} m²
                    </div>
                    <div className="text-sm text-gray-600">Room Size</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Users className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                    <div className="font-semibold text-gray-900">
                      Max {room.capacity}
                    </div>
                    <div className="text-sm text-gray-600">Guests</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Bed className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                    <div className="font-semibold text-gray-900">
                      {room.beds}
                    </div>
                    <div className="text-sm text-gray-600">Bed Type</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {room.services.map((service, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 font-serif mb-6">
                  Amenities
                </h2>

                {Object.entries(amenities).map(([category, items]) => (
                  <div key={category} className="mb-6 last:mb-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 capitalize">
                      {category}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {items.map((amenity, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <amenity.icon className="w-5 h-5 text-gray-600" />
                          <span className="text-sm text-gray-700">
                            {amenity.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <Card className="shadow-xl">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-gray-900">
                      ${room.price}
                      <span className="text-lg font-normal text-gray-600">
                        /night
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Best price guaranteed
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Check-in
                        </label>
                        <input
                          type="date"
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Check-out
                        </label>
                        <input
                          type="date"
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Guests
                      </label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {[...Array(room.capacity)].map((_, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1} Guest{i + 1 > 1 ? "s" : ""}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>
                          ${room.price} × {nights} nights
                        </span>
                        <span>${totalBeforeTax}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Taxes & fees</span>
                        <span>${taxes}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t pt-2">
                        <span>Total</span>
                        <span>${totalPrice}</span>
                      </div>
                    </div>

                    {room.isAvailable ? (
                      <Button className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700">
                        <Link href={`/rooms/${room._id}/booking`}>
                          Book Now
                        </Link>
                      </Button>
                    ) : (
                      <Button
                        disabled
                        className="w-full h-12 text-lg font-semibold bg-gray-400"
                      >
                        Not Available
                      </Button>
                    )}

                    <p className="text-xs text-gray-600 text-center">
                      Free cancellation until 24 hours before check-in
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <RoomDetailComponent roomId={room._id} />
        </div>
      </div>
    </div>
  );
}
