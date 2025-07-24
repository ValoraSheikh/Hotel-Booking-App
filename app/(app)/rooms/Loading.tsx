import React from "react";

const Loading = () => {
  return (
    <>
      <div className="min-h-screen">
        <h1 className="text-center text-5xl playfair-display mt-6">
          Our Rooms
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-10 lg:px-32 fix-ipad py-10">
          <div className="relative mx-auto w-full max-w-lg rounded-sm border border-zinc-200 bg-white ring-4 ring-zinc-300/25">
            <div className="relative overflow-hidden rounded-sm bg-white">
              {/* Header */}
              <div className="relative overflow-hidden bg-gray-200 animate-pulse h-48">
                {/* Hotel Badge */}
                <div className="absolute top-0 left-0 p-6">
                  <div className="h-6 w-16 bg-gray-300 rounded-full animate-pulse"></div>
                </div>
                {/* Favorite Button */}
                <div className="absolute top-0 right-0 p-6">
                  <div className="h-8 w-8 bg-gray-300 rounded-full animate-pulse"></div>
                </div>
              </div>
              {/* Hotel Details */}
              <div className="p-6">
                {/* Hotel Name and Location */}
                <div className="mb-4">
                  <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-1"></div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
                {/* Amenities */}
                <div className="mb-4 flex flex-wrap gap-1.5">
                  <div className="h-6 w-16 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="h-6 w-20 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="h-6 w-16 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
                {/* Reviews */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="h-6 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
                <hr className="my-4 border-zinc-100" />
                {/* Price and Book Button */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <div className="h-7 w-16 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mt-1"></div>
                  </div>
                  <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg rounded-sm border border-zinc-200 bg-white ring-4 ring-zinc-300/25">
            <div className="relative overflow-hidden rounded-sm bg-white">
              {/* Header */}
              <div className="relative overflow-hidden bg-gray-200 animate-pulse h-48">
                {/* Hotel Badge */}
                <div className="absolute top-0 left-0 p-6">
                  <div className="h-6 w-16 bg-gray-300 rounded-full animate-pulse"></div>
                </div>
                {/* Favorite Button */}
                <div className="absolute top-0 right-0 p-6">
                  <div className="h-8 w-8 bg-gray-300 rounded-full animate-pulse"></div>
                </div>
              </div>
              {/* Hotel Details */}
              <div className="p-6">
                {/* Hotel Name and Location */}
                <div className="mb-4">
                  <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-1"></div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
                {/* Amenities */}
                <div className="mb-4 flex flex-wrap gap-1.5">
                  <div className="h-6 w-16 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="h-6 w-20 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="h-6 w-16 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
                {/* Reviews */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="h-6 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
                <hr className="my-4 border-zinc-100" />
                {/* Price and Book Button */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <div className="h-7 w-16 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mt-1"></div>
                  </div>
                  <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg rounded-sm border border-zinc-200 bg-white ring-4 ring-zinc-300/25">
            <div className="relative overflow-hidden rounded-sm bg-white">
              {/* Header */}
              <div className="relative overflow-hidden bg-gray-200 animate-pulse h-48">
                {/* Hotel Badge */}
                <div className="absolute top-0 left-0 p-6">
                  <div className="h-6 w-16 bg-gray-300 rounded-full animate-pulse"></div>
                </div>
                {/* Favorite Button */}
                <div className="absolute top-0 right-0 p-6">
                  <div className="h-8 w-8 bg-gray-300 rounded-full animate-pulse"></div>
                </div>
              </div>
              {/* Hotel Details */}
              <div className="p-6">
                {/* Hotel Name and Location */}
                <div className="mb-4">
                  <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-1"></div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
                {/* Amenities */}
                <div className="mb-4 flex flex-wrap gap-1.5">
                  <div className="h-6 w-16 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="h-6 w-20 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="h-6 w-16 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
                {/* Reviews */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="h-6 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
                <hr className="my-4 border-zinc-100" />
                {/* Price and Book Button */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <div className="h-7 w-16 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mt-1"></div>
                  </div>
                  <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
