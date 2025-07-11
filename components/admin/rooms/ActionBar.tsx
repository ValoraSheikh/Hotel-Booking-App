import React from "react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Search } from "lucide-react";
import { AddRoomModal } from "@/components/admin/add-room-modal";

interface ActionBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (open: boolean) => void;
}

const ActionBar: React.FC<ActionBarProps> = ({
  searchTerm,
  setSearchTerm,
  isAddDialogOpen,
  setIsAddDialogOpen,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogTrigger asChild>
          <AddRoomModal />
        </DialogTrigger>
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
  );
};

export default ActionBar;