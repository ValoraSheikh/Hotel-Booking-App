"use client"

import { useState } from "react"
import {
  Star,
  Users,
  Maximize,
  Bed,
  Eye,
  Wifi,
  Bath,
  Wind,
  Tv,
  Coffee,
  Shield,
  Car,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Heart,
  Share2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default function HotelRoomDetails() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [checkIn, setCheckIn] = useState("2024-01-15")
  const [checkOut, setCheckOut] = useState("2024-01-18")
  const [guests, setGuests] = useState(2)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const roomImages = [
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1568495248636-6432b97bd949?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1718359759373-1b2670b7478b?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ]

  const amenities = {
    basics: [
      { icon: Wifi, name: "Free Wi-Fi" },
      { icon: Bath, name: "Ensuite Bathroom" },
      { icon: Wind, name: "Hair Dryer" },
      { icon: Car, name: "Free Parking" },
    ],
    entertainment: [
      { icon: Tv, name: "Smart TV" },
      { icon: Wifi, name: "Netflix" },
      { icon: Tv, name: "YouTube" },
    ],
    comfort: [
      { icon: Wind, name: "Air Conditioning" },
      { icon: Coffee, name: "Mini Fridge" },
      { icon: Bath, name: "Premium Towels" },
      { icon: Bed, name: "Premium Bedding" },
    ],
    safety: [
      { icon: Shield, name: "Smoke Detector" },
      { icon: Shield, name: "Safe Box" },
      { icon: Shield, name: "24/7 Security" },
    ],
  }

  const reviews = [
    {
      name: "Sarah Johnson",
      date: "December 2023",
      rating: 5,
      text: "Absolutely stunning room with breathtaking ocean views. The bed was incredibly comfortable and the amenities were top-notch. Will definitely stay here again!",
    },
    {
      name: "Michael Chen",
      date: "November 2023",
      rating: 5,
      text: "Perfect location and beautiful room. The staff was incredibly helpful and the room exceeded our expectations. Great value for money.",
    },
    {
      name: "Emma Davis",
      date: "October 2023",
      rating: 4,
      text: "Lovely room with great amenities. The only minor issue was the Wi-Fi speed, but everything else was perfect. Highly recommend!",
    },
  ]

  const faqs = [
    {
      question: "Is breakfast included?",
      answer: "Yes, a complimentary continental breakfast is included with your stay from 7:00 AM to 10:30 AM daily.",
    },
    {
      question: "Can I bring pets?",
      answer: "We welcome well-behaved pets with a $50 per night pet fee. Please inform us in advance when booking.",
    },
    {
      question: "Is there a late checkout option?",
      answer:
        "Late checkout until 2:00 PM is available for $25, subject to availability. Please request at the front desk.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "Free cancellation up to 24 hours before check-in. Cancellations within 24 hours are subject to a one-night charge.",
    },
  ]

  const relatedRooms = [
    {
      name: "Premium Ocean Suite",
      price: 349,
      image: "/placeholder.svg?height=200&width=300",
      features: ["Ocean View", "Balcony", "King Bed"],
    },
    {
      name: "Garden View Room",
      price: 189,
      image: "/placeholder.svg?height=200&width=300",
      features: ["Garden View", "Queen Bed", "Patio"],
    },
    {
      name: "Executive Suite",
      price: 449,
      image: "/placeholder.svg?height=200&width=300",
      features: ["City View", "Separate Living Area", "King Bed"],
    },
  ]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % roomImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + roomImages.length) % roomImages.length)
  }

  const calculateNights = () => {
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  }

  const nights = calculateNights()
  const basePrice = 249
  const totalBeforeTax = basePrice * nights
  const taxes = Math.round(totalBeforeTax * 0.12)
  const totalPrice = totalBeforeTax + taxes

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="text-sm text-gray-600">
            <span>Home</span> / <span>Rooms</span> / <span className="text-gray-900 font-medium">Deluxe King Room</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Image Carousel */}
              <div className="relative h-64 sm:h-80 lg:h-96">
                <Image
                height={500}
                width={500}
                  src={roomImages[currentImageIndex] || "/placeholder.svg"}
                  alt="Room view"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {roomImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Room Info */}
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <h1 className="text-3xl font-bold text-gray-900 font-serif mb-2 sm:mb-0">Deluxe King Room</h1>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900">
                      ${basePrice}
                      <span className="text-lg font-normal text-gray-600">/night</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
                    ))}
                    <span className="ml-2 text-gray-600">4.8 from 685 reviews</span>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <p className="text-red-800 font-medium">🔥 Only 2 rooms left at this price!</p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-green-800 font-medium">💰 20% off today - Limited time offer!</p>
                </div>
              </div>
            </div>

            {/* Room Overview */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 font-serif mb-4">Room Overview</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Experience luxury and comfort in our spacious Deluxe King Room featuring breathtaking ocean views.
                  This elegantly appointed room offers a perfect blend of modern amenities and classic comfort, making
                  it ideal for both business and leisure travelers. Enjoy the private balcony with stunning sunset views
                  and premium bedding for the ultimate relaxation experience.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Maximize className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                    <div className="font-semibold text-gray-900">35 m²</div>
                    <div className="text-sm text-gray-600">Room Size</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Users className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                    <div className="font-semibold text-gray-900">Max 4</div>
                    <div className="text-sm text-gray-600">Guests</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Bed className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                    <div className="font-semibold text-gray-900">King Bed</div>
                    <div className="text-sm text-gray-600">Bed Type</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Eye className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                    <div className="font-semibold text-gray-900">Ocean View</div>
                    <div className="text-sm text-gray-600">View</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    Ocean View
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Private Balcony
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                    Premium Bedding
                  </span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                    Free Wi-Fi
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 font-serif mb-6">Amenities</h2>

                {Object.entries(amenities).map(([category, items]) => (
                  <div key={category} className="mb-6 last:mb-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 capitalize">{category}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {items.map((amenity, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <amenity.icon className="w-5 h-5 text-gray-600" />
                          <span className="text-sm text-gray-700">{amenity.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 font-serif">Guest Reviews</h2>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-semibold">4.8</span>
                    <span className="text-gray-600">(685 reviews)</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {reviews.map((review, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold text-gray-900">{review.name}</div>
                        <div className="text-sm text-gray-600">{review.date}</div>
                      </div>
                      <div className="flex mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-600 leading-relaxed">{review.text}</p>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-6 bg-transparent">
                  View All Reviews
                </Button>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 font-serif mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-gray-900">{faq.question}</span>
                        {expandedFaq === index ? (
                          <ChevronUp className="w-5 h-5 text-gray-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-600" />
                        )}
                      </button>
                      {expandedFaq === index && (
                        <div className="px-4 pb-4">
                          <p className="text-gray-600">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Related Rooms */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 font-serif mb-6">You Might Also Like</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedRooms.map((room, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <Image
                      height={500}
                      width={500}
                        src={room.image || "/placeholder.svg"}
                        alt={room.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">{room.name}</h3>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {room.features.map((feature, featureIndex) => (
                            <span key={featureIndex} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              {feature}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-gray-900">
                            ${room.price}
                            <span className="text-sm font-normal text-gray-600">/night</span>
                          </span>
                          <Button size="sm">View Room</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 font-serif mb-6">Location & Nearby</h2>
                <div className="bg-gray-200 rounded-lg h-64 mb-6 flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                    <p>Interactive Map</p>
                    <p className="text-sm">123 Ocean Drive, Miami Beach, FL</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-gray-600" />
                    <div>
                      <div className="font-medium text-gray-900">South Beach</div>
                      <div className="text-sm text-gray-600">2 min walk</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-gray-600" />
                    <div>
                      <div className="font-medium text-gray-900">Art Deco District</div>
                      <div className="text-sm text-gray-600">5 min walk</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-gray-600" />
                    <div>
                      <div className="font-medium text-gray-900">Lincoln Road</div>
                      <div className="text-sm text-gray-600">8 min walk</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-gray-600" />
                    <div>
                      <div className="font-medium text-gray-900">Miami Airport</div>
                      <div className="text-sm text-gray-600">25 min drive</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 font-serif mb-4">Still Have Questions?</h2>
                <p className="text-gray-600 mb-6">Our team is here to help you 24/7</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Button variant="outline" className="flex items-center justify-center space-x-2 h-12 bg-transparent">
                    <MessageCircle className="w-5 h-5" />
                    <span>WhatsApp</span>
                  </Button>
                  <Button variant="outline" className="flex items-center justify-center space-x-2 h-12 bg-transparent">
                    <MessageCircle className="w-5 h-5" />
                    <span>Live Chat</span>
                  </Button>
                  <Button variant="outline" className="flex items-center justify-center space-x-2 h-12 bg-transparent">
                    <Phone className="w-5 h-5" />
                    <span>Call Us</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Widget - Sticky on Desktop */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <Card className="shadow-xl">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-gray-900">
                      ${basePrice}
                      <span className="text-lg font-normal text-gray-600">/night</span>
                    </div>
                    <div className="text-sm text-gray-600">Best price guaranteed</div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                        <input
                          type="date"
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                        <input
                          type="date"
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value={1}>1 Guest</option>
                        <option value={2}>2 Guests</option>
                        <option value={3}>3 Guests</option>
                        <option value={4}>4 Guests</option>
                      </select>
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>
                          ${basePrice} × {nights} nights
                        </span>
                        <span>${totalBeforeTax}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Taxes & fees</span>
                        <span>${taxes}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t pt-2">
                        <span>Total</span>
                        <span>${totalPrice}</span>
                      </div>
                    </div>

                    <Button className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700">
                      <Link href='/booking'>
                        Book Now
                      </Link>
                    </Button>

                    <p className="text-xs text-gray-600 text-center">
                      Free cancellation until 24 hours before check-in
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
