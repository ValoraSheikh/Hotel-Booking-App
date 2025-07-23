"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarDays } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!checkIn) newErrors.checkIn = "Check-in date is required";
    if (!checkOut) newErrors.checkOut = "Check-out date is required";
    if (checkIn && checkOut && checkOut <= checkIn) {
      newErrors.checkOut = "Check-out must be after check-in date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (!checkOut || !checkIn) {
      return alert("Check-out date is required.");
    }

    return router.push('/rooms')

  };

  const images = [
    "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1517840901100-8179e982acb7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full lg:px-[10%] bg-black/40">
      {/* Slider Background */}
      <div className="absolute inset-0 z-0">
        {images.map((img, index) => (
          <Image
            key={index}
            src={img}
            placeholder="blur"
            blurDataURL="..."
            alt={`Hero ${index}`}
            fill
            className={`object-cover transition-opacity duration-1000 ease-in-out absolute inset-0 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
            priority={index === 0}
          />
        ))}
      </div>

      <div className="relative z-10 ">
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ">
            {/* Hero Text */}
            <div className="lg:col-span-6 text-white space-y-6 max-md:mt-28 max-md:px-1 md:mt-24">
              <h1
                style={{ fontSize: "5.5rem" }}
                className="text-7xl font-bold playfair-display"
              >
                Sona A Luxury Hotel
              </h1>
              <p className="text-lg text-white/90 max-w font-semibold">
                Here are the best hotel booking sites, including recommendations
                for international travel and for finding low-priced hotel rooms.
              </p>
              <a
                href="#"
                className="inline-block border-b-2 border-b-[#dfa974] text-sm text-white uppercase font-semibold tracking-wider"
              >
                Discover Now
              </a>
            </div>

            {/* Booking Form */}
            <div className="lg:col-span-5 lg:col-start-8 bg-white bg-opacity-90 py-14 md:px-6 rounded shadow-lg max-md:mt-5 max-md:px-10 md:mt-2 md:mx-0 ">
              <h3 className="text-4xl font-semibold text-[#333] mb-6 playfair-display md:text-center">
                Booking Your Hotel
              </h3>
              <form action="#" className="space-y-4" onClick={handleSubmit}>
                <div>
                  <label
                    htmlFor="date-in"
                    className="block text-sm font-medium text-gray-400 pb-3"
                  >
                    Check In:
                  </label>
                  <div className="relative">
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
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="date-out"
                    className="block text-sm font-medium text-gray-400 pb-3"
                  >
                    Check Out:
                  </label>
                  <div className="relative">
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
                              date < new Date() || (checkIn && date <= checkIn)
                            )
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="guest"
                    className="block text-sm font-medium text-gray-400 pb-3"
                  >
                    Guests:
                  </label>
                  <select
                    id="guest"
                    className="w-full px-4 py-2 border border-gray-200 rounded"
                  >
                    <option>2 Adults</option>
                    <option>3 Adults</option>
                    <option>4 Adults</option>
                    <option>5+ Adults</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="room"
                    className="block text-sm font-medium text-gray-400 pb-3"
                  >
                    Room:
                  </label>
                  <select
                    id="room"
                    className="w-full px-4 py-2 border border-gray-200 rounded"
                  >
                    <option>1 Room</option>
                    <option>2 Room</option>
                    <option>3+ Room</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-white text-[#dfa974] uppercase font-semibold py-3 mt-4 hover:bg-[#efe1d336] transition border-[#dfa974] border"
                >
                  Check Availability
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
