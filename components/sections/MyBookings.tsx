"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { CalendarDays, MapPin, Users, Phone } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Loading from "@/app/(app)/bookings/Loading";

// Interfaces based on IBooking and expected room population
interface Room {
  _id: string;
  title: string;
  images: string;
  location: string;
}

interface Booking {
  _id: string;
  user: string;
  phoneNo: number;
  room: Room;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  guests: number;
  status: "booked" | "cancelled" | "completed";
  createdAt: string;
  updatedAt: string;
}

// Status configuration with lowercase keys
const statusConfig = {
  booked: {
    color: "bg-green-100 text-green-800 border-green-200",
    label: "Booked",
  },
  completed: {
    color: "bg-blue-100 text-blue-800 border-blue-200",
    label: "Completed",
  },
  cancelled: {
    color: "bg-red-100 text-red-800 border-red-200",
    label: "Cancelled",
  },
};

// Format date function
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// BookingCard component
function BookingCard({
  booking,
  onCancel,
}: {
  booking: Booking;
  onCancel: (bookingId: string) => void;
}) {
  const canCancel =
    booking.status === "booked" && new Date(booking.checkIn) > new Date();

  const handleCancelBooking = async (bookingId: string) => {
    try {
      const data = {
        id: bookingId,
        status: "cancelled",
      };

      const response = await fetch(`/api/admin/booking/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to cancel booking");
      }

      console.log(`Booking ${bookingId} cancelled successfully`);

      // Trigger the parent component's state update
      onCancel(bookingId);
    } catch (error) {
      console.error("Cancel booking error:", error);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="md:flex">
        <div className="md:w-1/3">
          <Image
            src={booking.room.images[0] || "/placeholder.svg"}
            alt={booking.room.title}
            width={300}
            height={200}
            className="w-full h-48 md:h-full object-cover"
          />
        </div>
        <div className="md:w-2/3 flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {booking.room.title}
                </h3>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  {booking.room.location}
                </div>
              </div>
              <Badge
                variant="outline"
                className={statusConfig[booking.status].color}
              >
                {statusConfig[booking.status].label}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="flex-1 pb-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center text-gray-600">
                <CalendarDays className="w-4 h-4 mr-2" />
                <div>
                  <div className="font-medium">Check-in</div>
                  <div>{formatDate(booking.checkIn)}</div>
                </div>
              </div>

              <div className="flex items-center text-gray-600">
                <CalendarDays className="w-4 h-4 mr-2" />
                <div>
                  <div className="font-medium">Check-out</div>
                  <div>{formatDate(booking.checkOut)}</div>
                </div>
              </div>

              <div className="flex items-center text-gray-600">
                <Users className="w-4 h-4 mr-2" />
                <div>
                  <div className="font-medium">Guests</div>
                  <div>
                    {booking.guests} {booking.guests === 1 ? "guest" : "guests"}
                  </div>
                </div>
              </div>

              {booking.phoneNo && (
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  <div>
                    <div className="font-medium">Contact</div>
                    <div>{booking.phoneNo}</div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Amount</span>
                <span className="text-lg font-bold text-gray-900">
                  ₹{booking.totalPrice.toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="pt-0">
            <div className="flex gap-2 w-full">
              <Link href={`/rooms/${booking.room._id}`} className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">
                  View Details
                </Button>
              </Link>
              {canCancel && (
                <Button
                  variant="destructive"
                  className="flex-1 cursor-pointer"
                  onClick={() => handleCancelBooking(booking._id)}
                >
                  Cancel Booking
                </Button>
              )}
            </div>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}

// EmptyState component
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <CalendarDays className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No bookings yet
      </h3>
      <p className="text-gray-600 text-center mb-6 max-w-md">
        You haven’t booked any rooms. Start your journey by exploring our hotel
        rooms.
      </p>
      <Button asChild>
        <Link href="/rooms">Browse Rooms</Link>
      </Button>
    </div>
  );
}

// Main MyBookings component
export default function MyBookings() {
  const { status } = useSession();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  // Fetch bookings when the component mounts and user is authenticated
  useEffect(() => {
    if (status === "authenticated") {
      fetchBookings();
    }
  }, [status]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/bookings");

      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await response.json();
      setBookings(data.bookings);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = (bookingId: string) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking._id === bookingId
          ? { ...booking, status: "cancelled" as const }
          : booking
      )
    );
  };

  // Handle different session states
  if (status === "loading") {
    return <Loading />;
  }

  if (status === "unauthenticated") {
    return <div>Please log in to view your bookings.</div>;
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Filter bookings based on active tab
  const filterBookings = (tab: string) => {
    if (tab === "all") return bookings;
    if (tab === "upcoming")
      return bookings.filter(
        (b) => b.status === "booked" && new Date(b.checkIn) > new Date()
      );
    if (tab === "completed")
      return bookings.filter((b) => b.status === "completed");
    if (tab === "cancelled")
      return bookings.filter((b) => b.status === "cancelled");
    return bookings;
  };

  const filteredBookings = filterBookings(activeTab);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">
            Manage and view all your hotel reservations
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {filteredBookings.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="space-y-6">
                {filteredBookings.map((booking) => (
                  <BookingCard
                    key={booking._id}
                    booking={booking}
                    onCancel={handleCancel}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
