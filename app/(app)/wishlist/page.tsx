"use client";

import Link from "next/link";
import WishlistCard from "@/components/sections/wishlistCard";
import useWishlist from "@/hooks/useWishlist";
import Loading from "./Loading";

export default function WishlistPage() {
  const { error, isLoading, wishlist, setWishlist } = useWishlist();

  if (isLoading) {
    return <Loading/>
  }

  if (error) {
    console.log("😫", error);
  }

  const removeCard = (id: number) => {
    setWishlist(wishlist.filter((b) => b._id !== id ))
  }


  return (
    <div className="min-h-screen bg-gray-50 md:px-24">
      <div className="container mx-auto px-4 sm:px-8 py-8">
        {/* Page Heading */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 font-sans">
            Your Wishlist
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            {wishlist.length} saved rooms
          </p>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <WishlistCard key={item._id} item={item} removeCard={removeCard}/>
          ))}
        </div>

        {/* Empty State (when no items) */}
        {wishlist.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">💔</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Start exploring and save your favorite rooms
            </p>
            <Link
              href="/rooms"
              className="inline-block bg-[#dfa974] text-white px-6 py-3 uppercase font-semibold tracking-wider hover:opacity-95 transition-colors"
            >
              Browse Rooms
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
