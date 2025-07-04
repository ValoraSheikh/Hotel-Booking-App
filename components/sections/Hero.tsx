"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const [current, setCurrent] = useState(0);
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
              <form action="#" className="space-y-4">
                <div>
                  <label
                    htmlFor="date-in"
                    className="block text-sm font-medium text-gray-400 pb-3"
                  >
                    Check In:
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="date-in"
                      className="w-full px-4 py-2 border border-gray-200 rounded"
                    />
                    <i className="icon_calendar absolute right-3 top-2.5 text-gray-400" />
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
                    <input
                      type="date"
                      id="date-out"
                      className="w-full px-4 py-2 border border-gray-200 rounded"
                    />
                    <i className="icon_calendar absolute right-3 top-2.5 text-gray-500" />
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
