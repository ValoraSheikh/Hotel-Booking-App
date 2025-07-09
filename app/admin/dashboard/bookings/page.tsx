"use client"

import { useState } from "react"
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Mock data for bookings
const mockBookings = [
  {
    id: "1",
    user: { name: "John Doe", email: "john.doe@example.com" },
    phoneNo: "+1234567890",
    room: { title: "Deluxe Ocean View Suite" },
    guests: 2,
    checkIn: new Date("2024-01-15"),
    checkOut: new Date("2024-01-18"),
    totalPrice: 450,
    status: "booked",
  },
  {
    id: "2",
    user: { name: "Sarah Johnson", email: "sarah.johnson@example.com" },
    phoneNo: "+1987654321",
    room: { title: "Standard Double Room" },
    guests: 1,
    checkIn: new Date("2024-01-10"),
    checkOut: new Date("2024-01-12"),
    totalPrice: 200,
    status: "completed",
  },
  {
    id: "3",
    user: { name: "Michael Brown", email: "michael.brown@example.com" },
    phoneNo: "+1122334455",
    room: { title: "Presidential Suite with Balcony" },
    guests: 4,
    checkIn: new Date("2024-01-20"),
    checkOut: new Date("2024-01-25"),
    totalPrice: 1200,
    status: "cancelled",
  },
  {
    id: "4",
    user: { name: "Emily Davis", email: "emily.davis@example.com" },
    phoneNo: "+1555666777",
    room: { title: "Family Room" },
    guests: 3,
    checkIn: new Date("2024-01-22"),
    checkOut: new Date("2024-01-24"),
    totalPrice: 300,
    status: "booked",
  },
  {
    id: "5",
    user: { name: "David Wilson", email: "david.wilson@example.com" },
    phoneNo: "+1888999000",
    room: { title: "Executive Suite" },
    guests: 2,
    checkIn: new Date("2024-01-08"),
    checkOut: new Date("2024-01-11"),
    totalPrice: 600,
    status: "completed",
  },
  {
    id: "6",
    user: { name: "Lisa Anderson", email: "lisa.anderson@example.com" },
    phoneNo: "+1777888999",
    room: { title: "Standard Single Room" },
    guests: 1,
    checkIn: new Date("2024-01-25"),
    checkOut: new Date("2024-01-27"),
    totalPrice: 150,
    status: "booked",
  },
]

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
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter bookings based on search and status
  const filteredBookings = mockBookings.filter((booking) => {
    const matchesSearch =
      booking.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.room.title.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || booking.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedBookings = filteredBookings.slice(startIndex, startIndex + itemsPerPage)

  const handleCancelBooking = (bookingId: string) => {
    // Handle booking cancellation logic here
    console.log("Cancelling booking:", bookingId)
  }

  const handleViewBooking = (bookingId: string) => {
    // Handle view booking logic here
    console.log("Viewing booking:", bookingId)
  }

  return (
    <TooltipProvider>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        {/* Page Header */}
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Bookings Management</h2>
            <p className="text-muted-foreground">View and manage room bookings made by users.</p>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or room..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
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

        {/* Bookings Table */}
        <Card>
          <CardHeader>
            <CardTitle>Bookings ({filteredBookings.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[200px]">User</TableHead>
                    <TableHead className="min-w-[120px]">Phone</TableHead>
                    <TableHead className="min-w-[180px]">Room</TableHead>
                    <TableHead className="min-w-[80px]">Guests</TableHead>
                    <TableHead className="min-w-[100px]">Check-in</TableHead>
                    <TableHead className="min-w-[100px]">Check-out</TableHead>
                    <TableHead className="min-w-[100px]">Total Price</TableHead>
                    <TableHead className="min-w-[100px]">Status</TableHead>
                    <TableHead className="min-w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedBookings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8">
                        No bookings found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{booking.user.name}</div>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="text-sm text-muted-foreground truncate max-w-[180px]">
                                  {booking.user.email}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{booking.user.email}</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{booking.phoneNo}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center space-x-2">
                                <Bed className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm truncate max-w-[150px]">{booking.room.title}</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{booking.room.title}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{booking.guests}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{format(booking.checkIn, "MMM dd, yyyy")}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{format(booking.checkOut, "MMM dd, yyyy")}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">${booking.totalPrice}</span>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(booking.status)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewBooking(booking.id)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              {booking.status === "booked" && (
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                      <X className="mr-2 h-4 w-4" />
                                      Cancel Booking
                                    </DropdownMenuItem>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to cancel this booking for{" "}
                                        <strong>{booking.user.name}</strong>? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleCancelBooking(booking.id)}
                                        className="bg-red-600 hover:bg-red-700"
                                      >
                                        Cancel Booking
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
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
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (currentPage > 1) setCurrentPage(currentPage - 1)
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage(page)
                      }}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}
