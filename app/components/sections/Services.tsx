"use client";

import React from "react";
import "@/app/globals.css";
import { BedDouble, Beer, CarTaxiFront, MapPinHouse, Salad, WashingMachine } from "lucide-react";

export default function Services() {
  return (
    <section className="services-section py-20 md:py-[100px] lg:px-40">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <span className="block text-[#dfa974] text-sm font-semibold uppercase mb-2 ">
            What We Do
          </span>
          <h2 className="text-[32px] md:text-5xl playfair-display text-[#111] leading-snug ">
            Discover Our Services
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {[
    { icon: <MapPinHouse size={48} />, title: "Travel Plan" },
    { icon: <Salad size={48} />, title: "Catering Service" },
    { icon: <BedDouble size={48} />, title: "Babysitting" },
    { icon: <WashingMachine size={48} />, title: "Laundry" },
    { icon: <CarTaxiFront size={48} />, title: "Hire Driver" },
    { icon: <Beer size={48} />, title: "Bar & Drink" },
  ].map((item, i) => (
    <div
      key={i}
      className="group text-center px-4 py-8 transition duration-300 hover:bg-[#dfa974] hover:text-white"
    >
      <div className="flex justify-center mb-6">
        <div className="text-[#dfa974] group-hover:text-white transition-colors duration-300">
          {item.icon}
        </div>
      </div>
      <h4 className="text-2xl font-semibold mb-4 playfair-display">
        {item.title}
      </h4>
      <p className="text-gray-500 group-hover:text-white text-sm font-semibold transition-colors duration-300 max-w-[300px] mx-auto">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna.
      </p>
    </div>
  ))}
</div>

      </div>
    </section>
  );
}
