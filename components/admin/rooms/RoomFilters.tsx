import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { AddRoomModal } from "@/components/admin/add-room-modal"

interface Props {
  searchTerm: string
  onSearchTermChange: (s: string) => void
}

export function RoomFilters({ searchTerm, onSearchTermChange }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
      <AddRoomModal />
      <div className="relative w-full sm:w-72">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search rooms…"
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          className="pl-10"
        />
      </div>
    </div>
  )
}
