"use client"

import Link from "next/link"
import WishlistCard from "@/components/wishlistCard"

export default function WishlistPage() {
  // Sample wishlist data
  const wishlistItems = [
    {
      id: 1,
      title: "Deluxe Ocean View Suite",
      price: "₹4,500",
      image: "/placeholder.svg?height=200&width=300",
      location: "Goa, India",
    },
    {
      id: 2,
      title: "Mountain Resort Villa",
      price: "₹3,200",
      image: "/placeholder.svg?height=200&width=300",
      location: "Manali, India",
    },
    {
      id: 3,
      title: "Heritage Palace Room",
      price: "₹5,800",
      image: "/placeholder.svg?height=200&width=300",
      location: "Udaipur, India",
    },
    {
      id: 4,
      title: "Beachfront Cottage",
      price: "₹2,800",
      image: "/placeholder.svg?height=200&width=300",
      location: "Kerala, India",
    },
    {
      id: 5,
      title: "City Center Penthouse",
      price: "₹6,200",
      image: "/placeholder.svg?height=200&width=300",
      location: "Mumbai, India",
    },
    {
      id: 6,
      title: "Riverside Retreat",
      price: "₹3,800",
      image: "/placeholder.svg?height=200&width=300",
      location: "Rishikesh, India",
    },
  ]



  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-8 py-8">
        {/* Page Heading */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">Your Wishlist ❤️</h1>
          <p className="text-gray-600 text-sm sm:text-base">{wishlistItems.length} saved properties</p>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <WishlistCard key={item.id} item={item}/>
          ))}
        </div>

        {/* Empty State (when no items) */}
        {wishlistItems.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">💔</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">Start exploring and save your favorite properties</p>
            <Link
              href="/search"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Browse Hotels
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
