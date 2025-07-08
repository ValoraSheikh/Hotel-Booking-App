"use client"

import { useState } from "react"
import { Search, Star, Trash2, Filter, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for reviews
const mockReviews = [
  {
    id: "1",
    roomId: "R001",
    userName: "John Doe",
    roomTitle: "Deluxe Ocean View Suite",
    rating: 5,
    comment:
      "Absolutely amazing stay! The view was breathtaking and the service was exceptional. Would definitely recommend to anyone looking for a luxury experience.",
    createdDate: "2024-01-15",
  },
  {
    id: "2",
    roomId: "R002",
    userName: "Sarah Johnson",
    roomTitle: "Standard City Room",
    rating: 3,
    comment: "Room was clean but quite small. Staff was friendly though.",
    createdDate: "2024-01-14",
  },
  {
    id: "3",
    roomId: "R003",
    userName: "Mike Wilson",
    roomTitle: "Executive Business Suite",
    rating: 4,
    comment:
      "Great for business trips. Good workspace and fast WiFi. Only complaint is the air conditioning was a bit noisy at night.",
    createdDate: "2024-01-13",
  },
  {
    id: "4",
    roomId: "R001",
    userName: "Emily Chen",
    roomTitle: "Deluxe Ocean View Suite",
    rating: 5,
    comment: "Perfect honeymoon suite! Romantic atmosphere and stunning sunset views.",
    createdDate: "2024-01-12",
  },
  {
    id: "5",
    roomId: "R004",
    userName: "David Brown",
    roomTitle: "Family Room",
    rating: 2,
    comment:
      "Room was outdated and had some maintenance issues. The bathroom faucet was leaking and the carpet looked worn out. Not worth the price we paid.",
    createdDate: "2024-01-11",
  },
  {
    id: "6",
    roomId: "R005",
    userName: "Lisa Anderson",
    roomTitle: "Premium Garden View",
    rating: 4,
    comment: "Lovely garden view and comfortable bed. Breakfast was excellent.",
    createdDate: "2024-01-10",
  },
  {
    id: "7",
    roomId: "R002",
    userName: "Robert Taylor",
    roomTitle: "Standard City Room",
    rating: 3,
    comment: "Average room for the price. Location is convenient for downtown activities.",
    createdDate: "2024-01-09",
  },
  {
    id: "8",
    roomId: "R006",
    userName: "Jennifer Martinez",
    roomTitle: "Luxury Penthouse",
    rating: 5,
    comment:
      "Incredible penthouse with amazing amenities. The private terrace was the highlight of our stay. Exceptional service from start to finish.",
    createdDate: "2024-01-08",
  },
]

export default function ReviewsManagement() {
  const [reviews, setReviews] = useState(mockReviews)
  const [searchTerm, setSearchTerm] = useState("")
  const [ratingFilter, setRatingFilter] = useState("all")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [reviewToDelete, setReviewToDelete] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter reviews based on search and rating
  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.roomTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.roomId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRating = ratingFilter === "all" || review.rating.toString() === ratingFilter

    return matchesSearch && matchesRating
  })

  // Pagination
  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedReviews = filteredReviews.slice(startIndex, startIndex + itemsPerPage)

  const handleDeleteReview = (reviewId: string) => {
    setReviewToDelete(reviewId)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (reviewToDelete) {
      setReviews(reviews.filter((review) => review.id !== reviewToDelete))
      setDeleteDialogOpen(false)
      setReviewToDelete(null)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const truncateComment = (comment: string, maxLength = 50) => {
    if (comment.length <= maxLength) return comment
    return comment.substring(0, maxLength) + "..."
  }

  const getRatingBadgeColor = (rating: number) => {
    if (rating >= 4) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    if (rating >= 3) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  }

  return (
    <TooltipProvider>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Reviews Management</h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reviews.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">5-Star Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reviews.filter((review) => review.rating === 5).length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Low Ratings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reviews.filter((review) => review.rating <= 2).length}</div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search reviews by user, room, or comment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  <Filter className="h-4 w-4" />
                  Rating: {ratingFilter === "all" ? "All" : `${ratingFilter} Stars`}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setRatingFilter("all")}>All Ratings</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRatingFilter("5")}>5 Stars</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRatingFilter("4")}>4 Stars</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRatingFilter("3")}>3 Stars</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRatingFilter("2")}>2 Stars</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRatingFilter("1")}>1 Star</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Reviews Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Room ID</TableHead>
                    <TableHead className="min-w-[120px]">User Name</TableHead>
                    <TableHead className="min-w-[150px]">Room Title</TableHead>
                    <TableHead className="w-[120px]">Rating</TableHead>
                    <TableHead className="min-w-[200px]">Comment</TableHead>
                    <TableHead className="w-[100px]">Date</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedReviews.map((review) => (
                    <TableRow key={review.id}>
                      <TableCell className="font-mono text-sm">
                        <Badge variant="outline">{review.roomId}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{review.userName}</TableCell>
                      <TableCell>{review.roomTitle}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex">{renderStars(review.rating)}</div>
                          <Badge className={getRatingBadgeColor(review.rating)}>{review.rating}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="cursor-help">{truncateComment(review.comment)}</span>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>{review.comment}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(review.createdDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleDeleteReview(review.id)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Review
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredReviews.length)} of{" "}
              {filteredReviews.length} reviews
            </p>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-8 h-8 p-0"
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the review and remove it from the system.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 focus:ring-red-600">
                Delete Review
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </TooltipProvider>
  )
}
