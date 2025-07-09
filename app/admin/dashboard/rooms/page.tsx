"use client"

import React, { useState } from "react"
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Eye, Hotel, MoreHorizontal, Plus, Search, Star, Trash2 } from "lucide-react"
import Image from "next/image"

const sampleRooms = [
  {
    id: 1,
    title: "Deluxe Ocean View Suite",
    price: 299,
    beds: "1 King Bed",
    capacity: 2,
    available: true,
    rating: 4.8,
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Standard Double Room",
    price: 149,
    beds: "2 Queen Beds",
    capacity: 4,
    available: false,
    rating: 4.2,
    image: "/placeholder.svg",
  },
  {
    id: 3,
    title: "Presidential Suite",
    price: 599,
    beds: "1 King Bed + Sofa",
    capacity: 4,
    available: true,
    rating: 4.9,
    image: "/placeholder.svg",
  },
  {
    id: 4,
    title: "Family Room",
    price: 199,
    beds: "1 King + 2 Twin",
    capacity: 6,
    available: true,
    rating: 4.5,
    image: "/placeholder.svg",
  },
  {
    id: 5,
    title: "Economy Single",
    price: 89,
    beds: "1 Single Bed",
    capacity: 1,
    available: false,
    rating: 3.9,
    image: "/placeholder.svg",
  },
]

export default function HotelDashboard() {
  const [rooms, setRooms] = useState(sampleRooms)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [showEmptyState, setShowEmptyState] = useState(false)

  const itemsPerPage = 5
  const filteredRooms = rooms.filter(
    (room) => room.title.toLowerCase().includes(searchTerm.toLowerCase()) || room.id.toString().includes(searchTerm)
  )
  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedRooms = filteredRooms.slice(startIndex, startIndex + itemsPerPage)

  const handleAddRoom = (e: React.FormEvent) => {
    e.preventDefault()
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
    <div className="min-h-screen bg-background w-full px-4 py-6 lg:px-8 space-y-6">
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

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Add Room
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleAddRoom}>
              <DialogHeader>
                <DialogTitle>Add New Room</DialogTitle>
                <DialogDescription>Create a new room listing.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Room Title</Label>
                  <Input id="title" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input id="price" type="number" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input id="capacity" type="number" required />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="beds">Beds</Label>
                  <Input id="beds" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" />
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

      {/* Table (Desktop) */}
      {filteredRooms.length === 0 ? (
        <Card className="text-center py-12">
          <CardHeader>
            <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
              <Hotel className="h-6 w-6 text-muted-foreground" />
            </div>
            <CardTitle>No rooms found</CardTitle>
            <CardDescription>
              {searchTerm ? "No rooms match your search." : "Start by adding your first room."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Room
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Table for sm and above */}
          <div className="hidden sm:block overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden sm:table-cell">Price</TableHead>
                  <TableHead className="hidden md:table-cell">Beds</TableHead>
                  <TableHead className="hidden lg:table-cell">Capacity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden xl:table-cell">Rating</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedRooms.map((room) => (
                  <TableRow key={room.id}>
                    <TableCell>
                      <Image
                        src={room.image}
                        alt={room.title}
                        width={80}
                        height={60}
                        className="rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{room.title}</TableCell>
                    <TableCell className="hidden sm:table-cell">${room.price}</TableCell>
                    <TableCell className="hidden md:table-cell">{room.beds}</TableCell>
                    <TableCell className="hidden lg:table-cell">{room.capacity} guests</TableCell>
                    <TableCell>
                      <Badge
                        variant={room.available ? "default" : "destructive"}
                        className={room.available ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                      >
                        {room.available ? "Available" : "Unavailable"}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden xl:table-cell">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{room.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteRoom(room.id)} className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile cards */}
          <div className="space-y-4 block sm:hidden">
            {paginatedRooms.map((room) => (
              <Card key={room.id} className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image src={room.image} alt="" width={64} height={48} className="rounded" />
                    <div>
                      <h3 className="font-medium">{room.title}</h3>
                      <p className="text-sm text-muted-foreground">${room.price}</p>
                    </div>
                  </div>
                  <Badge
                    variant={room.available ? "default" : "destructive"}
                    className={room.available ? "bg-green-100 text-green-800" : ""}
                  >
                    {room.available ? "Available" : "Unavailable"}
                  </Badge>
                </div>
                <div className="text-sm flex justify-between">
                  <span>{room.beds}</span>
                  <span>{room.capacity} guests</span>
                </div>
                <div className="flex justify-end gap-2">
                  <Button size="icon" variant="ghost"><Eye size={16} /></Button>
                  <Button size="icon" variant="ghost"><Edit size={16} /></Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDeleteRoom(room.id)}><Trash2 size={16} /></Button>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    setCurrentPage(Math.max(1, currentPage - 1))
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
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}
