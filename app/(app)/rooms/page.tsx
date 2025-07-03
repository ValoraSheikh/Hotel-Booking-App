import Image from "next/image";
import React from "react";

const room = () => {
  return (
    <>
    <h1 className="text-center text-5xl playfair-display mt-6">Our Rooms</h1>

    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-10 lg:px-32 fix-ipad py-10">
    
        {/* Hotel Card */}
        <div className="relative mx-auto w-full max-w-lg rounded-3xl border border-zinc-200 bg-white ring-4 ring-zinc-300/25">
          <div className="relative overflow-hidden rounded-3xl bg-white">
            {/* Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600">
              {/* Hotel Badge */}
              <div className="absolute top-0 left-0 p-6">
                <span className="inline-flex items-center gap-1 rounded-full bg-zinc-900/50 px-2.5 py-1 text-sm font-medium text-white backdrop-blur-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="hi-micro hi-star inline-block size-4 text-orange-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>4.8</span>
                </span>
              </div>
              {/* END Hotel Badge */}
              {/* Favorite Button */}
              <div className="absolute top-0 right-0 p-6">
                <button
                  type="button"
                  className="inline-flex size-8 items-center justify-center rounded-full bg-zinc-900/50 text-white backdrop-blur-sm hover:bg-zinc-900 hover:text-red-400"
                  aria-label="Favorite"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="lucide lucide-heart inline-block size-4"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </button>
              </div>
              {/* END Favorite Button */}
              {/* Image */}
              <Image
                src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Hotel Room"
                height={500}
                width={500}
                className="aspect-16/9 w-full object-cover"
              />
              {/* END Image */}
            </div>
            {/* END Header */}
            {/* Hotel Details */}
            <div className="p-6">
              {/* Hotel Name and Location */}
              <div className="mb-4">
                <h3 className="mb-1 text-xl font-bold text-zinc-800">
                  Grand Plaza Hotel
                </h3>
                <div className="flex items-center gap-1.5 text-sm text-zinc-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="lucide lucide-map-pin inline-block size-6"
                  >
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                    <circle cx={12} cy={10} r={3} />
                  </svg>
                  <span>Downtown Manhattan, New York</span>
                </div>
              </div>
              {/* END Hotel Name and Location */}
              {/* Amenities */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1.5">
                  <span className="rounded-lg bg-zinc-200/50 px-2 py-1 text-xs font-medium text-zinc-700">
                    Free WiFi
                  </span>
                  <span className="rounded-lg bg-zinc-200/50 px-2 py-1 text-xs font-medium text-zinc-700">
                    Pool
                  </span>
                  <span className="rounded-lg bg-zinc-200/50 px-2 py-1 text-xs font-medium text-zinc-700">
                    Spa
                  </span>
                </div>
              </div>
              {/* END Amenities */}
              {/* Reviews */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="hi-micro hi-star inline-block size-4 text-orange-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium text-zinc-800">4.8</span>
                  <span className="text-sm text-zinc-600">(1,685 reviews)</span>
                </div>
                <span className="inline-flex items-center gap-1 rounded-lg bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="lucide lucide-sparkles inline-block size-3"
                  >
                    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                    <path d="M20 3v4" />
                    <path d="M22 5h-4" />
                    <path d="M4 17v2" />
                    <path d="M5 18H3" />
                  </svg>
                  <span>Excellent</span>
                </span>
              </div>
              {/* END Reviews */}
              <hr className="my-4 border-zinc-100" />
              {/* Price and Book Button */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-zinc-800">
                      $289
                    </span>
                    <span className="text-sm text-zinc-600">per night</span>
                  </div>
                  <p className="text-xs text-emerald-600">Free cancellation</p>
                </div>
                <button
                  type="button"
                  className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700 hover:shadow-blue-500/50"
                >
                  Book Now
                </button>
              </div>
              {/* END Price and Book Button */}
            </div>
          </div>
        </div>
        {/* END Hotel Card */}
    
        {/* Hotel Card */}
        <div className="relative mx-auto w-full max-w-lg rounded-3xl border border-zinc-200 bg-white ring-4 ring-zinc-300/25">
          <div className="relative overflow-hidden rounded-3xl bg-white">
            {/* Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600">
              {/* Hotel Badge */}
              <div className="absolute top-0 left-0 p-6">
                <span className="inline-flex items-center gap-1 rounded-full bg-zinc-900/50 px-2.5 py-1 text-sm font-medium text-white backdrop-blur-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="hi-micro hi-star inline-block size-4 text-orange-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>4.8</span>
                </span>
              </div>
              {/* END Hotel Badge */}
              {/* Favorite Button */}
              <div className="absolute top-0 right-0 p-6">
                <button
                  type="button"
                  className="inline-flex size-8 items-center justify-center rounded-full bg-zinc-900/50 text-white backdrop-blur-sm hover:bg-zinc-900 hover:text-red-400"
                  aria-label="Favorite"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="lucide lucide-heart inline-block size-4"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </button>
              </div>
              {/* END Favorite Button */}
              {/* Image */}
              <Image
                src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Hotel Room"
                height={500}
                width={500}
                className="aspect-16/9 w-full object-cover"
              />
              {/* END Image */}
            </div>
            {/* END Header */}
            {/* Hotel Details */}
            <div className="p-6">
              {/* Hotel Name and Location */}
              <div className="mb-4">
                <h3 className="mb-1 text-xl font-bold text-zinc-800">
                  Grand Plaza Hotel
                </h3>
                <div className="flex items-center gap-1.5 text-sm text-zinc-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="lucide lucide-map-pin inline-block size-6"
                  >
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                    <circle cx={12} cy={10} r={3} />
                  </svg>
                  <span>Downtown Manhattan, New York</span>
                </div>
              </div>
              {/* END Hotel Name and Location */}
              {/* Amenities */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1.5">
                  <span className="rounded-lg bg-zinc-200/50 px-2 py-1 text-xs font-medium text-zinc-700">
                    Free WiFi
                  </span>
                  <span className="rounded-lg bg-zinc-200/50 px-2 py-1 text-xs font-medium text-zinc-700">
                    Pool
                  </span>
                  <span className="rounded-lg bg-zinc-200/50 px-2 py-1 text-xs font-medium text-zinc-700">
                    Spa
                  </span>
                </div>
              </div>
              {/* END Amenities */}
              {/* Reviews */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="hi-micro hi-star inline-block size-4 text-orange-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium text-zinc-800">4.8</span>
                  <span className="text-sm text-zinc-600">(1,685 reviews)</span>
                </div>
                <span className="inline-flex items-center gap-1 rounded-lg bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="lucide lucide-sparkles inline-block size-3"
                  >
                    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                    <path d="M20 3v4" />
                    <path d="M22 5h-4" />
                    <path d="M4 17v2" />
                    <path d="M5 18H3" />
                  </svg>
                  <span>Excellent</span>
                </span>
              </div>
              {/* END Reviews */}
              <hr className="my-4 border-zinc-100" />
              {/* Price and Book Button */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-zinc-800">
                      $289
                    </span>
                    <span className="text-sm text-zinc-600">per night</span>
                  </div>
                  <p className="text-xs text-emerald-600">Free cancellation</p>
                </div>
                <button
                  type="button"
                  className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700 hover:shadow-blue-500/50"
                >
                  Book Now
                </button>
              </div>
              {/* END Price and Book Button */}
            </div>
          </div>
        </div>
        {/* END Hotel Card */}
    
        {/* Hotel Card */}
        <div className="relative mx-auto w-full max-w-lg rounded-3xl border border-zinc-200 bg-white ring-4 ring-zinc-300/25">
          <div className="relative overflow-hidden rounded-3xl bg-white">
            {/* Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600">
              {/* Hotel Badge */}
              <div className="absolute top-0 left-0 p-6">
                <span className="inline-flex items-center gap-1 rounded-full bg-zinc-900/50 px-2.5 py-1 text-sm font-medium text-white backdrop-blur-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="hi-micro hi-star inline-block size-4 text-orange-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>4.8</span>
                </span>
              </div>
              {/* END Hotel Badge */}
              {/* Favorite Button */}
              <div className="absolute top-0 right-0 p-6">
                <button
                  type="button"
                  className="inline-flex size-8 items-center justify-center rounded-full bg-zinc-900/50 text-white backdrop-blur-sm hover:bg-zinc-900 hover:text-red-400"
                  aria-label="Favorite"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="lucide lucide-heart inline-block size-4"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </button>
              </div>
              {/* END Favorite Button */}
              {/* Image */}
              <Image
                src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Hotel Room"
                height={500}
                width={500}
                className="aspect-16/9 w-full object-cover"
              />
              {/* END Image */}
            </div>
            {/* END Header */}
            {/* Hotel Details */}
            <div className="p-6">
              {/* Hotel Name and Location */}
              <div className="mb-4">
                <h3 className="mb-1 text-xl font-bold text-zinc-800">
                  Grand Plaza Hotel
                </h3>
                <div className="flex items-center gap-1.5 text-sm text-zinc-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="lucide lucide-map-pin inline-block size-6"
                  >
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                    <circle cx={12} cy={10} r={3} />
                  </svg>
                  <span>Downtown Manhattan, New York</span>
                </div>
              </div>
              {/* END Hotel Name and Location */}
              {/* Amenities */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1.5">
                  <span className="rounded-lg bg-zinc-200/50 px-2 py-1 text-xs font-medium text-zinc-700">
                    Free WiFi
                  </span>
                  <span className="rounded-lg bg-zinc-200/50 px-2 py-1 text-xs font-medium text-zinc-700">
                    Pool
                  </span>
                  <span className="rounded-lg bg-zinc-200/50 px-2 py-1 text-xs font-medium text-zinc-700">
                    Spa
                  </span>
                </div>
              </div>
              {/* END Amenities */}
              {/* Reviews */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="hi-micro hi-star inline-block size-4 text-orange-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium text-zinc-800">4.8</span>
                  <span className="text-sm text-zinc-600">(1,685 reviews)</span>
                </div>
                <span className="inline-flex items-center gap-1 rounded-lg bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="lucide lucide-sparkles inline-block size-3"
                  >
                    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                    <path d="M20 3v4" />
                    <path d="M22 5h-4" />
                    <path d="M4 17v2" />
                    <path d="M5 18H3" />
                  </svg>
                  <span>Excellent</span>
                </span>
              </div>
              {/* END Reviews */}
              <hr className="my-4 border-zinc-100" />
              {/* Price and Book Button */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-zinc-800">
                      $289
                    </span>
                    <span className="text-sm text-zinc-600">per night</span>
                  </div>
                  <p className="text-xs text-emerald-600">Free cancellation</p>
                </div>
                <button
                  type="button"
                  className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700 hover:shadow-blue-500/50"
                >
                  Book Now
                </button>
              </div>
              {/* END Price and Book Button */}
            </div>
          </div>
        </div>
        {/* END Hotel Card */}

    </div>
    </>
  );
};

export default room;
