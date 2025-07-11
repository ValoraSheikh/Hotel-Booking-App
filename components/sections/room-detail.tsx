import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import {
  ChevronDown,
  ChevronUp,
  MapPin,
  MessageCircle,
  Phone,
  Star,
} from "lucide-react";
import Image from "next/image";

const RoomDetailComponent = () => {
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
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
  ];

  const faqs = [
    {
      question: "Is breakfast included?",
      answer:
        "Yes, a complimentary continental breakfast is included with your stay from 7:00 AM to 10:30 AM daily.",
    },
    {
      question: "Can I bring pets?",
      answer:
        "We welcome well-behaved pets with a $50 per night pet fee. Please inform us in advance when booking.",
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
  ];

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
  ];

  return (
    <div className="lg:col-span-2 space-y-8">
      {/* Reviews */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 font-serif">
              Guest Reviews
            </h2>
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold">4.8</span>
              <span className="text-gray-600">(685 reviews)</span>
            </div>
          </div>

          <div className="space-y-6">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-gray-900">
                    {review.name}
                  </div>
                  <div className="text-sm text-gray-600">{review.date}</div>
                </div>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
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
          <h2 className="text-2xl font-bold text-gray-900 font-serif mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() =>
                    setExpandedFaq(expandedFaq === index ? null : index)
                  }
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">
                    {faq.question}
                  </span>
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
          <h2 className="text-2xl font-bold text-gray-900 font-serif mb-6">
            You Might Also Like
          </h2>
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
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {room.name}
                  </h3>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {room.features.map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">
                      ${room.price}
                      <span className="text-sm font-normal text-gray-600">
                        /night
                      </span>
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
          <h2 className="text-2xl font-bold text-gray-900 font-serif mb-6">
            Location & Nearby
          </h2>
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
                <div className="font-medium text-gray-900">
                  Art Deco District
                </div>
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
          <h2 className="text-2xl font-bold text-gray-900 font-serif mb-4">
            Still Have Questions?
          </h2>
          <p className="text-gray-600 mb-6">
            Our team is here to help you 24/7
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="flex items-center justify-center space-x-2 h-12 bg-transparent"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp</span>
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center space-x-2 h-12 bg-transparent"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Live Chat</span>
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center space-x-2 h-12 bg-transparent"
            >
              <Phone className="w-5 h-5" />
              <span>Call Us</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoomDetailComponent;
