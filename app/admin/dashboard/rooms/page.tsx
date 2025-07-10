"use client"

import type React from "react"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Eye, Hotel, MoreHorizontal, Search, Star, Trash2, ChevronDown } from "lucide-react"
import Image from "next/image"
import { AddRoomModal } from "@/components/admin/add-room-modal"

// Sample data
const sampleRooms = [
  {
    id: 1,
    title: "Deluxe Ocean View Suite",
    price: 299,
    beds: "1 King Bed",
    capacity: 2,
    available: true,
    rating: 4.8,
    image: "/placeholder.svg?height=80&width=120",
  },
  {
    id: 2,
    title: "Standard Double Room",
    price: 149,
    beds: "2 Queen Beds",
    capacity: 4,
    available: false,
    rating: 4.2,
    image: "/placeholder.svg?height=80&width=120",
  },
  {
    id: 3,
    title: "Presidential Suite",
    price: 599,
    beds: "1 King Bed + Sofa",
    capacity: 4,
    available: true,
    rating: 4.9,
    image: "/placeholder.svg?height=80&width=120",
  },
  {
    id: 4,
    title: "Family Room",
    price: 199,
    beds: "1 King + 2 Twin",
    capacity: 6,
    available: true,
    rating: 4.5,
    image: "/placeholder.svg?height=80&width=120",
  },
  {
    id: 5,
    title: "Economy Single",
    price: 89,
    beds: "1 Single Bed",
    capacity: 1,
    available: false,
    rating: 3.9,
    image: "/placeholder.svg?height=80&width=120",
  },
]

export default function HotelDashboard() {
  const [rooms, setRooms] = useState(sampleRooms)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [showEmptyState, setShowEmptyState] = useState(false)

  // Remove: const itemsPerPage = 5
  // The pagination logic will now use rowsPerPage state

  // Filter rooms based on search term
  const filteredRooms = rooms.filter(
    (room) => room.title.toLowerCase().includes(searchTerm.toLowerCase()) || room.id.toString().includes(searchTerm),
  )

  // Pagination logic
  const totalPages = Math.ceil(filteredRooms.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const paginatedRooms = filteredRooms.slice(startIndex, startIndex + rowsPerPage)

  const handleAddRoom = (event: React.FormEvent) => {
    event.preventDefault()
    // Add room logic would go here
    setIsAddDialogOpen(false)
  }

  const handleDeleteRoom = (id: number) => {
    setRooms(rooms.filter((room) => room.id !== id))
  }

  const toggleEmptyState = () => {
    if (showEmptyState) {
      setRooms(sampleRooms)
      setShowEmptyState(false)
    } else {
      setRooms([])
      setShowEmptyState(true)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Room Management</h1>
            <p className="text-muted-foreground">Manage your hotel rooms and availability</p>
          </div>
          <Button onClick={toggleEmptyState} variant="outline" size="sm">
            {showEmptyState ? "Show Rooms" : "Show Empty State"}
          </Button>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <AddRoomModal/>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleAddRoom}>
                <DialogHeader>
                  <DialogTitle>Add New Room</DialogTitle>
                  <DialogDescription>
                    Create a new room listing. Fill in all the required information.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Room Title</Label>
                    <Input id="title" placeholder="Enter room title" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="price">Price ($)</Label>
                      <Input id="price" type="number" placeholder="299" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="capacity">Capacity</Label>
                      <Input id="capacity" type="number" placeholder="2" required />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="beds">Bed Configuration</Label>
                    <Input id="beds" placeholder="1 King Bed" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Room description..." />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Room</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search rooms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Content */}
        {filteredRooms.length === 0 ? (
          <Card className="text-center py-12">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
                <Hotel className="h-6 w-6 text-muted-foreground" />
              </div>
              <CardTitle>No rooms found</CardTitle>
              <CardDescription>
                {searchTerm ? "No rooms match your search criteria." : "Get started by adding your first room."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AddRoomModal/>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Rooms ({filteredRooms.length})</CardTitle>
              <CardDescription>Manage your hotel room inventory and pricing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Image</TableHead>
                      <TableHead>Room Title</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="hidden sm:table-cell">Beds</TableHead>
                      <TableHead className="hidden md:table-cell">Capacity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden lg:table-cell">Rating</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedRooms.map((room) => (
                      <TableRow key={room.id}>
                        <TableCell>
                          <Image
                            src={room.image || "/placeholder.svg"}
                            alt={room.title}
                            width={80}
                            height={60}
                            className="rounded-md object-cover"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="max-w-[200px] truncate">{room.title}</div>
                        </TableCell>
                        <TableCell className="font-semibold">${room.price}</TableCell>
                        <TableCell className="hidden sm:table-cell text-muted-foreground">{room.beds}</TableCell>
                        <TableCell className="hidden md:table-cell">{room.capacity} guests</TableCell>
                        <TableCell>
                          <Badge
                            variant={room.available ? "default" : "destructive"}
                            className={room.available ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                          >
                            {room.available ? "Available" : "Unavailable"}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{room.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Room
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteRoom(room.id)}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Room
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Enhanced Pagination */}
              {filteredRooms.length > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t">
                  {/* Rows per page */}
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Rows per page:</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 px-3 bg-transparent">
                          {rowsPerPage}
                          <ChevronDown className="ml-1 h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        {[10, 20, 30, 40, 50].map((size) => (
                          <DropdownMenuItem
                            key={size}
                            onClick={() => {
                              setRowsPerPage(size)
                              setCurrentPage(1) // Reset to first page when changing page size
                            }}
                            className={rowsPerPage === size ? "bg-accent" : ""}
                          >
                            {size}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Page info and navigation */}
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground">
                      Page {currentPage} of {totalPages}
                    </div>
                    <div className="flex items-center gap-1">
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
                        disabled={currentPage === totalPages}
                        className="h-8 px-3"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
