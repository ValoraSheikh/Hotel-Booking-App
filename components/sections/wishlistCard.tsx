import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const handleRemove = async (id: number) => {
  console.log(`Remove item ${id}`);

  const roomData = {
    roomId: id.toString(),
  };

  console.log('😎', roomData);

  const response = await fetch(`/api/wishlist`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(roomData),
  });

  let data = null;

  try {
    data = await response.json();
  } catch (err) {
    console.error("❌ Failed to parse JSON:", err);
  }

  if (!response.ok) {
    console.error("❌ Response not OK:", response.status, data);
    throw new Error(data?.error || "Something went wrong");
  }

  console.log("✅ Wishlist item removed:", data);
};


type props = {
  _id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  capacity: number;
  size: number;
  beds: string;
  services: string[];
  featured?: boolean;
  roomNumber: string;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
  rating: number;
  location: string;
};

const WishlistCard = ({
  item,
  removeCard,
}: {
  item: props;
  removeCard: (id: number) => void;
}) => {
  return (
    <>
      <Card
        key={item._id}
        className="rounded-sm shadow-md border overflow-hidden hover:shadow-lg transition-shadow"
      >
        <CardContent className="p-0">
          {/* Hotel Image */}
          <div className="relative h-52 w-full">
            <Image
              src={item.images[0] || "/placeholder.svg"}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Card Content */}
          <div className="p-4">
            {/* Room Title and Location */}
            <div className="mb-3">
              <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2">
                {item.title}
              </h3>
              {/* <p className="text-sm text-gray-600">{item.location}</p> */}
            </div>

            {/* Price */}
            <div className="mb-4">
              <span className="text-xl font-semibold text-gray-900">
                {item.price}
              </span>
              <span className="text-gray-600 text-sm ml-1">/ night</span>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center">
              <Link
                href={`/rooms/${item._id}`}
                className="text-sm text-black uppercase font-semibold tracking-wider border-b-2 border-[#dfa974] pb-[2px]"
              >
                More details
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  handleRemove(item._id);
                  removeCard(item._id);
                }}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 text-sm p-2 h-auto cursor-pointer"
              >
                Remove
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default WishlistCard;
