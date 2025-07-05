import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-900 mb-6">
          Find Your Perfect Stay
        </h3>
        <form action="#" method="POST" className="space-y-4">
          <div>
            <label
              htmlFor="hotel-destination"
              className="block text-sm font-medium text-gray-700"
            >
              Destination or Hotel Name
            </label>
            <input
              type="text"
              name="hotel-destination"
              id="hotel-destination"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="e.g., Paris, Grand Hyatt"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="hotel-checkin"
                className="block text-sm font-medium text-gray-700"
              >
                Check-in Date
              </label>
              <input
                type="date"
                name="hotel-checkin"
                id="hotel-checkin"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="hotel-checkout"
                className="block text-sm font-medium text-gray-700"
              >
                Check-out Date
              </label>
              <input
                type="date"
                name="hotel-checkout"
                id="hotel-checkout"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="hotel-adults"
                className="block text-sm font-medium text-gray-700"
              >
                Adults
              </label>
              <select
                id="hotel-adults"
                name="hotel-adults"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option>1</option>
                <option selected="">2</option>
                <option>3</option>
                <option>4</option>
                <option>5+</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="hotel-children"
                className="block text-sm font-medium text-gray-700"
              >
                Children
              </label>
              <select
                id="hotel-children"
                name="hotel-children"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option selected="">0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4+</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="hotel-rooms"
                className="block text-sm font-medium text-gray-700"
              >
                Rooms
              </label>
              <select
                id="hotel-rooms"
                name="hotel-rooms"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option selected="">1</option>
                <option>2</option>
                <option>3</option>
                <option>4+</option>
              </select>
            </div>
          </div>
          <div>
            <label
              htmlFor="hotel-room-type"
              className="block text-sm font-medium text-gray-700"
            >
              Room Type (Optional)
            </label>
            <select
              id="hotel-room-type"
              name="hotel-room-type"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option>Any</option>
              <option>Standard</option>
              <option>Deluxe</option>
              <option>Suite</option>
              <option>Family Room</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Search Hotels
            </button>
          </div>
        </form>
        {/* Example Image */}
        <div className="mt-6">
          <Image
            src="https://picsum.photos/600/200?random=1"
            alt="Hotel scenic view"
            className="w-full h-32 object-cover rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
