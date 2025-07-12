"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { Search, Filter, Eye, X, MoreHorizontal, Calendar, Users, Phone, Bed, DollarSign } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
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

interface Booking {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  phoneNo: string;
  room: {
    title: string;
    price: number;
  };
  guests: number;
  checkIn: string; // ISO date string
  checkOut: string; // ISO date string
  totalPrice: number;
  status: string;
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "booked":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Booked</Badge>
    case "completed":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
    case "cancelled":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelled</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [bookingToCancel, setBookingToCancel] = useState<string | null>(null)

  // Fetch bookings from API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/admin/booking')
        
        // Check for HTML response
        const contentType = response.headers.get('content-type')
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text()
          throw new Error(`Unexpected response type: ${contentType}. Response: ${text.slice(0, 100)}`)
        }
        
        const data = await response.json()
        
        if (!response.ok) {
          throw new Error(data.error || `Request failed with status ${response.status}`)
        }
        
        setBookings(data.bookings)
        setError(null)
      } catch (err) {
        console.error('Error fetching bookings:', err)
        setError(err instanceof Error ? err.message : 'Failed to load bookings. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchBookings()
  }, [])

  // Filter bookings based on search and status
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.room.title.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || booking.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const paginatedBookings = filteredBookings.slice(startIndex, startIndex + rowsPerPage)

  // Reset to page 1 when rows per page changes
  const handleRowsPerPageChange = (value: string) => {
    setRowsPerPage(Number.parseInt(value))
    setCurrentPage(1)
  }

  const handleCancelBooking = async (bookingId: string) => {
    try {
      const response = await fetch(`/api/admin/booking/${bookingId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to cancel booking')
      }

      // Update local state to reflect cancellation
      setBookings(bookings.map(booking => 
        booking._id === bookingId ? { ...booking, status: 'cancelled' } : booking
      ))
    } catch (error) {
      console.error('Cancel booking error:', error)
      setError('Failed to cancel booking. Please try again.')
    } finally {
      setCancelDialogOpen(false)
      setBookingToCancel(null)
    }
  }

  const handleViewBooking = (bookingId: string) => {
    // Handle view booking logic here
    console.log("Viewing booking:", bookingId)
  }

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading bookings...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="bg-red-100 text-red-700 p-6 rounded-md max-w-md">
          <p className="font-medium">Error loading bookings</p>
          <p className="mt-2">{error}</p>
          <Button 
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="w-full h-full overflow-hidden flex flex-col bg-background">
        {/* Page Header - Responsive spacing */}
        <div className="flex-shrink-0 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-start justify-between space-y-2 sm:items-center sm:space-y-0">
            <div className="min-w-0 flex-1">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight truncate">Bookings Management</h2>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">
                View and manage room bookings made by users.
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filter Controls - Fluid spacing */}
        <div className="flex-shrink-0 px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6">
          <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1 min-w-0 max-w-full sm:max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or room..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-full"
              />
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="booked">Booked</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Main Content Area - Flexible and fills remaining space */}
        <div className="flex-1 min-h-0 overflow-hidden px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6">
          <Card className="h-full overflow-hidden flex flex-col">
            <CardHeader className="flex-shrink-0 pb-3 px-4 sm:px-6">
              <CardTitle className="text-lg sm:text-xl">Bookings ({filteredBookings.length})</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 min-h-0 overflow-hidden p-0">
              {/* Table Container - Internal scrolling */}
              <div className="h-full flex flex-col">
                <div className="flex-1 min-h-0 overflow-auto px-4 sm:px-6">
                  <div className="min-w-full inline-block align-middle h-full">
                    <div className="h-full overflow-auto">
                      <Table className="relative">
                        <TableHeader className="sticky top-0 bg-card z-10 shadow-sm">
                          <TableRow>
                            <TableHead className="w-[200px] min-w-[180px]">User</TableHead>
                            <TableHead className="w-[120px] min-w-[100px]">Phone</TableHead>
                            <TableHead className="w-[180px] min-w-[150px]">Room</TableHead>
                            <TableHead className="w-[80px] min-w-[70px] text-center">Guests</TableHead>
                            <TableHead className="w-[110px] min-w-[100px]">Check-in</TableHead>
                            <TableHead className="w-[110px] min-w-[100px]">Check-out</TableHead>
                            <TableHead className="w-[100px] min-w-[90px] text-right">Price</TableHead>
                            <TableHead className="w-[100px] min-w-[90px]">Status</TableHead>
                            <TableHead className="w-[60px] min-w-[60px] text-center">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {paginatedBookings.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={9} className="text-center py-8 sm:py-12">
                                <div className="flex flex-col items-center space-y-3 px-4">
                                  <div className="text-sm sm:text-base text-muted-foreground">
                                    {searchTerm || statusFilter !== "all" 
                                      ? "No bookings match your search criteria" 
                                      : "No bookings found"}
                                  </div>
                                  {(searchTerm || statusFilter !== "all") && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => {
                                        setSearchTerm("")
                                        setStatusFilter("all")
                                      }}
                                    >
                                      Clear filters
                                    </Button>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ) : (
                            paginatedBookings.map((booking) => (
                              <TableRow key={booking._id} className="hover:bg-muted/50">
                                <TableCell className="py-2 sm:py-3">
                                  <div className="space-y-1">
                                    <div className="font-medium text-sm truncate max-w-[160px]">
                                      {booking.user.name}
                                    </div>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <div className="text-xs text-muted-foreground truncate max-w-[160px] cursor-help">
                                          {booking.user.email}
                                        </div>
                                      </TooltipTrigger>
                                      <TooltipContent side="top">
                                        <p>{booking.user.email}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </div>
                                </TableCell>
                                <TableCell className="py-2 sm:py-3">
                                  <div className="flex items-center space-x-1">
                                    <Phone className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                                    <span className="text-xs truncate">{booking.phoneNo}</span>
                                  </div>
                                </TableCell>
                                <TableCell className="py-2 sm:py-3">
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div className="flex items-center space-x-1 cursor-help">
                                        <Bed className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                                        <span className="text-xs truncate max-w-[130px]">{booking.room.title}</span>
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="top">
                                      <p>{booking.room.title}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TableCell>
                                <TableCell className="py-2 sm:py-3 text-center">
                                  <div className="flex items-center justify-center space-x-1">
                                    <Users className="h-3 w-3 text-muted-foreground" />
                                    <span className="text-xs">{booking.guests}</span>
                                  </div>
                                </TableCell>
                                <TableCell className="py-2 sm:py-3">
                                  <div className="flex items-center space-x-1">
                                    <Calendar className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                                    <span className="text-xs whitespace-nowrap">
                                      {format(new Date(booking.checkIn), "MMM dd")}
                                    </span>
                                  </div>
                                </TableCell>
                                <TableCell className="py-2 sm:py-3">
                                  <div className="flex items-center space-x-1">
                                    <Calendar className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                                    <span className="text-xs whitespace-nowrap">
                                      {format(new Date(booking.checkOut), "MMM dd")}
                                    </span>
                                  </div>
                                </TableCell>
                                <TableCell className="py-2 sm:py-3 text-right">
                                  <div className="flex items-center justify-end space-x-1">
                                    <DollarSign className="h-3 w-3 text-muted-foreground" />
                                    <span className="text-xs font-medium">${booking.totalPrice}</span>
                                  </div>
                                </TableCell>
                                <TableCell className="py-2 sm:py-3">{getStatusBadge(booking.status)}</TableCell>
                                <TableCell className="py-2 sm:py-3 text-center">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" className="h-7 w-7 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <MoreHorizontal className="h-3 w-3" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem onClick={() => handleViewBooking(booking._id)}>
                                        <Eye className="mr-2 h-4 w-4" />
                                        View Details
                                      </DropdownMenuItem>
                                      {booking.status === "booked" && (
                                        <DropdownMenuItem 
                                          onSelect={(e) => {
                                            e.preventDefault()
                                            setBookingToCancel(booking._id)
                                            setCancelDialogOpen(true)
                                          }}
                                        >
                                          <X className="mr-2 h-4 w-4" />
                                          Cancel Booking
                                        </DropdownMenuItem>
                                      )}
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>

                {/* Material UI Style Pagination */}
                <div className="flex-shrink-0 border-t bg-card px-4 sm:px-6 py-3">
                  <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    {/* Rows per page */}
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-muted-foreground whitespace-nowrap">Rows per page:</span>
                      <Select value={rowsPerPage.toString()} onValueChange={handleRowsPerPageChange}>
                        <SelectTrigger className="w-16 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="20">20</SelectItem>
                          <SelectItem value="30">30</SelectItem>
                          <SelectItem value="40">40</SelectItem>
                          <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Page info and navigation */}
                    <div className="flex items-center space-x-4">
                      <div className="text-sm text-muted-foreground whitespace-nowrap">
                        Page {currentPage} of {totalPages}
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                          className="h-8 px-3"
                        >
                          Previous
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages || totalPages === 0}
                          className="h-8 px-3"
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cancel Booking Confirmation Dialog */}
        <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
              <AlertDialogDescription>
                {bookingToCancel && (
                  <>
                    Are you sure you want to cancel this booking for{" "}
                    <strong>
                      {bookings.find(b => b._id === bookingToCancel)?.user.name || "this user"}
                    </strong>?
                  </>
                )}
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={() => bookingToCancel && handleCancelBooking(bookingToCancel)}
                className="bg-red-600 hover:bg-red-700"
              >
                Cancel Booking
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </TooltipProvider>
  )
}