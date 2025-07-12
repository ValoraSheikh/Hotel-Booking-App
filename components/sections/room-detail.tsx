import React, { useCallback, useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp, MapPin, MessageCircle, Phone, Star } from "lucide-react";
import { useSession, signIn } from "next-auth/react";

interface Review {
  _id: string;
  user: { name: string };
  rating: number;
  comment: string;
  createdAt: string;
}

interface RoomDetailProps {
  roomId: string;
}

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

// const relatedRooms = [
//   {
//     name: "Premium Ocean Suite",
//     price: 349,
//     image: "/placeholder.svg?height=200&width=300",
//     features: ["Ocean View", "Balcony", "King Bed"],
//   },
//   {
//     name: "Garden View Room",
//     price: 189,
//     image: "/placeholder.svg?height=200&width=300",
//     features: ["Garden View", "Queen Bed", "Patio"],
//   },
//   {
//     name: "Executive Suite",
//     price: 449,
//     image: "/placeholder.svg?height=200&width=300",
//     features: ["City View", "Separate Living Area", "King Bed"],
//   },
// ];

const RoomDetailComponent = ({ roomId }: RoomDetailProps) => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSubmissionStatus, setReviewSubmissionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [reviewError, setReviewError] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loadingReviews, setLoadingReviews] = useState(true);

  const fetchReviews = useCallback(async () => {
    try {
      setLoadingReviews(true);
      const response = await fetch(`/api/reviews?room=${roomId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch reviews");
      }

      setReviews(data.reviews || []);
      const avg = data.reviews.length
        ? data.reviews.reduce(
            (acc: number, review: Review) => acc + review.rating,
            0
          ) / data.reviews.length
        : 0;
      setAverageRating(avg);
      setTotalReviews(data.reviews.length);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoadingReviews(false);
    }
  }, [roomId]);

  useEffect(() => {
    if (roomId) {
      fetchReviews();
    }
  }, [roomId, fetchReviews]);

  const submitReview = async () => {
    if (!reviewText.trim() || reviewRating === 0) {
      setReviewError("Please provide both a rating and a comment.");
      return;
    }

    setIsSubmittingReview(true);
    setReviewError("");
    setReviewSubmissionStatus("idle");

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          room: roomId,
          rating: reviewRating,
          comment: reviewText,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit review");
      }

      setReviewSubmissionStatus("success");
      setReviewText("");
      setReviewRating(0);
      setHoveredRating(0);
      fetchReviews(); // Refresh reviews after submission
      setTimeout(() => setReviewSubmissionStatus("idle"), 3000);
    } catch (error) {
      setReviewSubmissionStatus("error");
      setReviewError(
        error instanceof Error ? error.message : "An error occurred"
      );
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <div className="lg:col-span-2 space-y-8">
      {/* Write a Review Section */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 font-serif mb-6">
            Write a Review
          </h2>
          {isLoggedIn ? (
            <div className="space-y-6">
              {reviewSubmissionStatus === "success" && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="ml-3 text-sm font-medium text-green-800">
                      Thank you! Your review has been submitted successfully.
                    </p>
                  </div>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Your Rating <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="p-1 transition-colors"
                      disabled={isSubmittingReview}
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= (hoveredRating || reviewRating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        } transition-colors`}
                      />
                    </button>
                  ))}
                  {reviewRating > 0 && (
                    <span className="ml-3 text-sm text-gray-600">
                      {reviewRating === 1
                        ? "Poor"
                        : reviewRating === 2
                        ? "Fair"
                        : reviewRating === 3
                        ? "Good"
                        : reviewRating === 4
                        ? "Very Good"
                        : "Excellent"}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your experience with this room. What did you like most? Any suggestions for improvement?"
                  rows={5}
                  disabled={isSubmittingReview}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:bg-gray-50 disabled:text-gray-500"
                  maxLength={1000}
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500">
                    {reviewText.length}/1000 characters
                  </span>
                </div>
              </div>
              {(reviewError || reviewSubmissionStatus === "error") && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 text-red-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="ml-3 text-sm font-medium text-red-800">
                      {reviewError ||
                        "Failed to submit review. Please try again."}
                    </p>
                  </div>
                </div>
              )}
              <div className="flex justify-end">
                <Button
                  onClick={submitReview}
                  disabled={
                    isSubmittingReview ||
                    !reviewText.trim() ||
                    reviewRating === 0
                  }
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmittingReview ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    "Submit Review"
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <svg
                className="w-12 h-12 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Please log in to write a review
              </h3>
              <p className="text-gray-600 mb-4">
                Share your experience with other travelers
              </p>
              <div className="space-x-3">
                <Button
                  onClick={() => signIn()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Log In
                </Button>
                <Button variant="outline" className="bg-transparent">
                  Sign Up
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reviews Section */}
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
                      i < Math.round(averageRating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold">
                {averageRating.toFixed(1)}
              </span>
              <span className="text-gray-600">({totalReviews} reviews)</span>
            </div>
          </div>
          {loadingReviews ? (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-8 text-gray-600">
              No reviews yet. Be the first to review!
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.slice(0, 3).map((review) => (
                <div
                  key={review._id}
                  className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-gray-900">
                      {review.user?.name || "Anonymous"}
                    </div>
                    <div className="text-sm text-gray-600">
                      {new Date(review.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
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
                  <p className="text-gray-600 leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
          {reviews.length > 3 && (
            <Button variant="outline" className="w-full mt-6 bg-transparent">
              View All Reviews
            </Button>
          )}
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
      {/* <Card>
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
      </Card> */}

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
