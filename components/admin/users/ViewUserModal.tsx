import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { User } from "@/types";

interface ViewUserModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedUser: User | null;
  formatDate: (date: Date) => string;
}

export const ViewUserModal = ({ open, setOpen, selectedUser, formatDate }: ViewUserModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>Complete information about the selected user.</DialogDescription>
        </DialogHeader>
        {selectedUser && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-medium">Name:</Label>
              <div className="col-span-3">{selectedUser.name}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-medium">Email:</Label>
              <div className="col-span-3">{selectedUser.email}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-medium">Provider:</Label>
              <div className="col-span-3">
                <Badge
                  variant={selectedUser.provider === "google" ? "default" : "secondary"}
                  className={
                    selectedUser.provider === "google"
                      ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
                  }
                >
                  {selectedUser.provider === "google" ? "Google" : "Credentials"}
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-medium">Role:</Label>
              <div className="col-span-3">
                <Badge
                  variant={selectedUser.role === "admin" ? "destructive" : "default"}
                  className={
                    selectedUser.role === "admin"
                      ? "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-300"
                      : "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300"
                  }
                >
                  {selectedUser.role === "admin" ? "Admin" : "User"}
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-medium">Created:</Label>
              <div className="col-span-3">{formatDate(selectedUser.createdAt)}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-medium">User ID:</Label>
              <div className="col-span-3 font-mono text-sm">{selectedUser._id}</div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};