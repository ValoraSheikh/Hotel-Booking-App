"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Testimonial {
  img: string;
  quote: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    img: "https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    quote:
      "The ability to capture responses is a game-changer. If a user gets tired of the sign up and leaves, that data is still persisted. Additionally, it's great to select between formats.",
    name: "Jessie J",
    role: "Acme LTD",
  },
  {
    img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    quote:
      "Having the power to capture user feedback is revolutionary. Even if a participant abandons the sign-up process midway, their valuable input remains intact.",
    name: "Nick V",
    role: "Malika Inc.",
  },
  {
    img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    quote:
      "The functionality to capture responses is a true game-changer. Even if a user becomes fatigued during sign-up and abandons the process, their information remains stored.",
    name: "Amelia W",
    role: "Panda AI",
  },
];

export default function TestimonialSlider() {
  const [active, setActive] = useState(0);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const autorotate = true;
  const autorotateTiming = 7000;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (autorotate) {
      intervalRef.current = setInterval(() => {
        setActive((prev) => (prev + 1) % testimonials.length);
      }, autorotateTiming);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (testimonialsRef.current) {
      const next = testimonialsRef.current.children[active] as HTMLElement;
      testimonialsRef.current.style.height = `${next.offsetHeight}px`;
    }
  }, [active]);

  return (
    <div>
      <span className="block text-sm uppercase tracking-widest text-[#dfa974] font-semibold text-center mb-1">
                  Testimonials
                </span>
      <h1 className=" text-center playfair-display text-5xl p-5 mb-5">
        What Customers Say?
      </h1>

      <div className="w-full max-w-3xl mx-auto text-center pb-32 max-md:px-2">
        {/* Testimonial image */}

        <div className="relative h-32">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[480px] h-[480px] pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-b before:from-[#dfa974]/25 before:via-[#dfa974]/5 before:via-25% before:to-[#dfa974]/0 before:to-75% before:rounded-full before:-z-10">
            <div className="h-32 [mask-image:_linear-gradient(0deg,transparent,theme(colors.white)_20%,theme(colors.white))]">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 -z-10 transition-transform duration-700 ease-[cubic-bezier(0.68,-0.3,0.32,1)] ${
                    active === index
                      ? "opacity-100 rotate-0"
                      : "opacity-0 rotate-[60deg]"
                  }`}
                >
                  <Image
                    className="relative top-11 left-1/2 -translate-x-1/2 rounded-full"
                    src={testimonial.img}
                    alt={testimonial.name}
                    width={56}
                    height={56}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quote Text */}
        <div className="mb-9">
          <div
            className="relative flex flex-col transition-all duration-150 delay-300 ease-in-out"
            ref={testimonialsRef}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`transition duration-500 ease-in-out delay-200 ${
                  active === index
                    ? "opacity-100 translate-x-0"
                    : "absolute opacity-0 translate-x-4"
                } text-2xl font-bold text-slate-900 before:content-['\\201C'] after:content-['\\201D']`}
              >
                {testimonial.quote}
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center -m-1.5">
          {testimonials.map((testimonial, index) => (
            <button
              key={index}
              className={`inline-flex justify-center whitespace-nowrap rounded-full px-3 py-1.5 m-1.5 text-xs shadow-sm focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150 ${
                active === index
                  ? "bg-[#dfa974] text-white shadow-indigo-950/10"
                  : "bg-white hover:bg-indigo-100 text-slate-900"
              }`}
              onClick={() => {
                if (intervalRef.current) clearInterval(intervalRef.current);
                setActive(index);
              }}
            >
              <span>{testimonial.name}</span>
              <span
                className={
                  active === index ? "text-indigo-200" : "text-slate-300"
                }
              >
                {" "}
                -{" "}
              </span>
              <span>{testimonial.role}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
