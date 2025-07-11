import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Hotel } from "lucide-react";
import { AddRoomModal } from "@/components/admin/add-room-modal";

interface EmptyStateCardProps {
  searchTerm: string;
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (open: boolean) => void;
}

const EmptyStateCard: React.FC<EmptyStateCardProps> = ({
  searchTerm,
  isAddDialogOpen,
  setIsAddDialogOpen,
}) => {
  return (
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
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <AddRoomModal />
          </DialogTrigger>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default EmptyStateCard;