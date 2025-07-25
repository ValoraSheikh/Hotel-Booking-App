"use client";

import { useState, useEffect } from "react";
import { CalendarDays, Star, Users, Phone, Shield, Clock } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format, differenceInDays } from "date-fns";

type BookingFormProps = {
  roomId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  room: any;
};

export default function BookingForm({ roomId, room }: BookingFormProps) {
  const { data: session } = useSession();
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState("2");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");

  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;
  const totalPrice = nights * room.price;

  // Validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!checkIn) newErrors.checkIn = "Check-in date is required";
    if (!checkOut) newErrors.checkOut = "Check-out date is required";
    if (checkIn && checkOut && checkOut <= checkIn) {
      newErrors.checkOut = "Check-out must be after check-in date";
    }
    if (!guests) newErrors.guests = "Number of guests is required";
    if (!phoneNumber) newErrors.phoneNumber = "Phone number is required";
    if (phoneNumber && !/^\d{10}$/.test(phoneNumber.replace(/\D/g, ""))) {
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!session?.user?.id) {
      setSubmitError("Please log in to make a booking");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    if (!checkOut || !checkIn) {
      return alert("Check-out date is required.");
    }

    const bookingData = {
      phoneNo: parseInt(phoneNumber, 10),
      room: roomId,
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString(),
      guests: parseInt(guests, 10),
      totalPrice, // ensure this is calculated correctly
    };

    console.log("Booking payload:", bookingData);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Booking failed");
      }

      console.log("🎍", data.booking._id);
      const bookingId = data.booking._id;

      const merchantOrderId = Date.now();

      const paymentData = {
        merchantOrderId: merchantOrderId,
        amount: totalPrice * 100,
        redirectUrl: `http://localhost:3000/check-status?merchantOrderId=${merchantOrderId}&bookingId=${bookingId}`,
      };

      const payRes = await fetch("/api/payment/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      if (!payRes.ok) {
        throw new Error(data.error || "Payment failed");
      }

      const payData = await payRes.json();
      const { redirectUrl } = await payData;

      window.location.href = redirectUrl;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Booking POST error:", error);
      setSubmitError(error.message || "Internal Server Error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setPhoneNumber(value);
    }
  };

  // Clear errors when user starts typing
  useEffect(() => {
    if (errors.checkIn && checkIn) {
      setErrors((prev) => ({ ...prev, checkIn: "" }));
    }
  }, [checkIn, errors.checkIn]);

  useEffect(() => {
    if (errors.checkOut && checkOut) {
      setErrors((prev) => ({ ...prev, checkOut: "" }));
    }
  }, [checkOut, errors.checkOut]);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Room Overview Section */}
          <div className="space-y-6">
            <Card className="overflow-hidden border-0 shadow-sm">
              <div className="relative">
                <Image
                  src={room.images?.[0] || "/placeholder.svg"}
                  alt={room.title}
                  width={400}
                  height={300}
                  className="w-full h-64 sm:h-80 object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-white/90 text-gray-900 hover:bg-white">
                  <Shield className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                      {room.title}
                    </h1>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-gray-900">
                          {room.rating}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {room.description}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">
                      ₹{room.price.toLocaleString()}
                    </span>
                    <span className="text-gray-500">per night</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Summary - Mobile */}
            <Card className="lg:hidden border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {checkIn && checkOut && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {format(checkIn, "MMM dd")} –{" "}
                        {format(checkOut, "MMM dd")}
                      </span>
                      <span className="font-medium">{nights} nights</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Guests</span>
                      <span className="font-medium">{guests} guests</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>₹{totalPrice.toLocaleString()}</span>
                    </div>
                  </>
                )}
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <Clock className="w-4 h-4" />
                  <span>Free cancellation until 24 hours before check-in</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form Section */}
          <div className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Complete Your Booking</CardTitle>
              </CardHeader>
              <CardContent>
                <form onClick={handleSubmit} className="space-y-6">
                  {/* Date Selection */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="checkin">Check-in Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={`w-full justify-start text-left font-normal h-12 ${
                              errors.checkIn ? "border-red-500" : ""
                            }`}
                          >
                            <CalendarDays className="mr-2 h-4 w-4" />
                            {checkIn
                              ? format(checkIn, "MMM dd, yyyy")
                              : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={checkIn}
                            onSelect={setCheckIn}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      {errors.checkIn && (
                        <p className="text-sm text-red-500">{errors.checkIn}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="checkout">Check-out Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={`w-full justify-start text-left font-normal h-12 ${
                              errors.checkOut ? "border-red-500" : ""
                            }`}
                          >
                            <CalendarDays className="mr-2 h-4 w-4" />
                            {checkOut
                              ? format(checkOut, "MMM dd, yyyy")
                              : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={checkOut}
                            onSelect={setCheckOut}
                            disabled={(date) =>
                              Boolean(
                                date < new Date() ||
                                  (checkIn && date <= checkIn)
                              )
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      {errors.checkOut && (
                        <p className="text-sm text-red-500">
                          {errors.checkOut}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Guests Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="guests">Number of Guests</Label>
                    <Select value={guests} onValueChange={setGuests}>
                      <SelectTrigger
                        className={`h-12 ${
                          errors.guests ? "border-red-500" : ""
                        }`}
                      >
                        <div className="flex items-center">
                          <Users className="mr-2 h-4 w-4" />
                          <SelectValue placeholder="Select guests" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from(
                          { length: room.capacity },
                          (_, i) => i + 1
                        ).map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? "Guest" : "Guests"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.guests && (
                      <p className="text-sm text-red-500">{errors.guests}</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter 10-digit phone number"
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        className={`pl-10 h-12 ${
                          errors.phoneNumber ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    {errors.phoneNumber && (
                      <p className="text-sm text-red-500">
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>

                  {/* Total Price Display */}
                  {nights > 0 && (
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>
                          ₹{room.price.toLocaleString()} × {nights} nights
                        </span>
                        <span>₹{totalPrice.toLocaleString()}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>₹{totalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    size="lg"
                    type="submit"
                    className="w-full h-12 text-base font-semibold"
                    disabled={isSubmitting || nights === 0}
                  >
                    {isSubmitting
                      ? "Processing..."
                      : `Book Now - ₹${totalPrice.toLocaleString()}`}
                  </Button>

                  {submitError && (
                    <p className="text-sm text-red-500 text-center">
                      {submitError}
                    </p>
                  )}

                  <div className="text-center text-sm text-gray-500">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Shield className="w-4 h-4" />
                      <span>Secure Booking</span>
                    </div>
                    <p>Your payment information is encrypted and secure</p>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Booking Summary - Desktop */}
            <Card className="hidden lg:block border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {checkIn && checkOut ? (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {format(checkIn, "MMM dd")} –{" "}
                        {format(checkOut, "MMM dd")}
                      </span>
                      <span className="font-medium">{nights} nights</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Guests</span>
                      <span className="font-medium">{guests} guests</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>₹{totalPrice.toLocaleString()}</span>
                    </div>
                  </>
                ) : (
                  <p className="text-gray-500 text-sm">
                    Select dates to see total price
                  </p>
                )}
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <Clock className="w-4 h-4" />
                  <span>Free cancellation until 24 hours before check-in</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
