import { TableRow, TableCell } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { Eye, Edit, Trash2, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Room } from "@/types"

interface Props {
  room: Room
  onDelete: (id: string) => void
}

export function RoomRow({ room, onDelete }: Props) {
  return (
    <TableRow key={room.id}>
      <TableCell>
        <Image src={room.image} alt={room.title} width={80} height={60} className="rounded-md object-cover" />
      </TableCell>
      <TableCell>{room.title}</TableCell>
      <TableCell>${room.price}</TableCell>
      {/* other cells... */}
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem><Eye /> View</DropdownMenuItem>
            <DropdownMenuItem><Edit /> Edit</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive" onClick={() => onDelete(room.id)}>
              <Trash2 /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}