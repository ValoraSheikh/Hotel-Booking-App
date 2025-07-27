import React from "react";
import { Room } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Eye, MoreHorizontal, Star, Trash2 } from "lucide-react";
import Image from "next/image";

interface RoomTableProps {
  rooms: Room[];
}

const RoomTable: React.FC<RoomTableProps> = ({ rooms }) => {
  const handleDeleteRoom = async (id: string) => {
    try {
      const res = await fetch(`/api/rooms/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to delete room");
    } catch (error) {
      console.error("Failed to delete room:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rooms ({rooms.length})</CardTitle>
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
              {rooms.map((room) => (
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
                  <TableCell className="hidden sm:table-cell text-muted-foreground">
                    {room.beds}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {room.capacity} guests
                  </TableCell>
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
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDeleteRoom(room.id)}
                        >
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
      </CardContent>
    </Card>
  );
};

export default RoomTable;