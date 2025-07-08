"use client"

import { useState } from "react";
import { Search, Plus, Star, Edit, Trash2, Eye, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EmptyState } from "@/components/admin/EmptyState";
import Image from "next/image";
import { RoomPagination } from "@/components/admin/RoomPagination";

// Mock data for demonstration
const mockRooms = [
  {
    id: 1,
    title: "Executive Suite",
    price: 299,
    beds: "1 King Bed",
    capacity: 2,
    available: true,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=300&h=200&fit=crop"
  },
  {
    id: 2,
    title: "Ocean View Room",
    price: 199,
    beds: "2 Queen Beds",
    capacity: 4,
    available: false,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=300&h=200&fit=crop"
  },
  {
    id: 3,
    title: "Standard Double",
    price: 149,
    beds: "1 Double Bed",
    capacity: 2,
    available: true,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300&h=200&fit=crop"
  },
  {
    id: 4,
    title: "Deluxe Family Room",
    price: 349,
    beds: "1 King + 1 Sofa Bed",
    capacity: 6,
    available: true,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&h=200&fit=crop"
  },
  {
    id: 5,
    title: "Single Room",
    price: 99,
    beds: "1 Single Bed",
    capacity: 1,
    available: false,
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop"
  }
];

const Admin = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newRoom, setNewRoom] = useState({
    title: "",
    price: "",
    beds: "",
    capacity: "",
    description: "",
    available: true
  });

  const itemsPerPage = 5;
  
  // Filter rooms based on search query
  const filteredRooms = mockRooms.filter(room =>
    room.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.id.toString().includes(searchQuery)
  );

  // Paginate filtered rooms
  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRooms = filteredRooms.slice(startIndex, startIndex + itemsPerPage);

  const handleAddRoom = () => {
    console.log("Adding room:", newRoom);
    setIsAddDialogOpen(false);
    setNewRoom({
      title: "",
      price: "",
      beds: "",
      capacity: "",
      description: "",
      available: true
    });
  };

  const handleAction = (action: string, roomId: number) => {
    console.log(`${action} room with ID: ${roomId}`);
  };

  // Show empty state if no rooms match search
  const showEmptyState = searchQuery && filteredRooms.length === 0;

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Hotel Rooms</h1>
            <p className="text-muted-foreground">Manage your hotel room inventory</p>
          </div>
        </div>

        {/* Top Actions */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              {/* Add Room Button */}
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full md:w-auto">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Room
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Room</DialogTitle>
                    <DialogDescription>
                      Create a new room in your hotel inventory.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Room Title</Label>
                      <Input
                        id="title"
                        value={newRoom.title}
                        onChange={(e) => setNewRoom({...newRoom, title: e.target.value})}
                        placeholder="Executive Suite"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="price">Price per night</Label>
                      <Input
                        id="price"
                        type="number"
                        value={newRoom.price}
                        onChange={(e) => setNewRoom({...newRoom, price: e.target.value})}
                        placeholder="299"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="beds">Bed Configuration</Label>
                      <Select value={newRoom.beds} onValueChange={(value) => setNewRoom({...newRoom, beds: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select bed type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1 Single Bed">1 Single Bed</SelectItem>
                          <SelectItem value="1 Double Bed">1 Double Bed</SelectItem>
                          <SelectItem value="1 Queen Bed">1 Queen Bed</SelectItem>
                          <SelectItem value="1 King Bed">1 King Bed</SelectItem>
                          <SelectItem value="2 Single Beds">2 Single Beds</SelectItem>
                          <SelectItem value="2 Queen Beds">2 Queen Beds</SelectItem>
                          <SelectItem value="1 King + 1 Sofa Bed">1 King + 1 Sofa Bed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="capacity">Capacity</Label>
                      <Select value={newRoom.capacity} onValueChange={(value) => setNewRoom({...newRoom, capacity: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Number of guests" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Guest</SelectItem>
                          <SelectItem value="2">2 Guests</SelectItem>
                          <SelectItem value="3">3 Guests</SelectItem>
                          <SelectItem value="4">4 Guests</SelectItem>
                          <SelectItem value="5">5 Guests</SelectItem>
                          <SelectItem value="6">6 Guests</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newRoom.description}
                        onChange={(e) => setNewRoom({...newRoom, description: e.target.value})}
                        placeholder="Room description and amenities..."
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddRoom}>Add Room</Button>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by room title or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rooms Table */}
        {showEmptyState ? (
          <EmptyState searchQuery={searchQuery} />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                Rooms ({filteredRooms.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-20">Image</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Beds</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead className="w-16">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentRooms.map((room) => (
                      <TableRow key={room.id}>
                        <TableCell>
                          <Image
                          height={500}
                          width={500}
                            src={room.image}
                            alt={room.title}
                            className="h-12 w-16 rounded-md object-cover"
                          />
                        </TableCell>
                        <TableCell className="font-medium">{room.title}</TableCell>
                        <TableCell>${room.price}/night</TableCell>
                        <TableCell>{room.beds}</TableCell>
                        <TableCell>{room.capacity} guests</TableCell>
                        <TableCell>
                          <Badge variant={room.available ? "default" : "destructive"} className={
                            room.available 
                              ? "bg-success text-success-foreground hover:bg-success/80" 
                              : ""
                          }>
                            {room.available ? "Available" : "Unavailable"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-warning text-warning" />
                            <span className="text-sm font-medium">{room.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                              <DropdownMenuItem onClick={() => handleAction("view", room.id)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleAction("edit", room.id)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleAction("delete", room.id)}
                                className="text-destructive focus:text-destructive"
                              >
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

              {/* Pagination */}
              {filteredRooms.length > itemsPerPage && (
                <div className="mt-6">
                  <RoomPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Admin;