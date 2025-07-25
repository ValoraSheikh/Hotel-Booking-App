import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Booking } from "@/types";

const formatDate = (date: string | Date) => {
  const d = new Date(date); // always convert to Date object
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

interface props {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedBooking: Booking | null;
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "booked":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          Booked
        </Badge>
      );
    case "completed":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          Completed
        </Badge>
      );
    case "cancelled":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          Cancelled
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getPayStatusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          Pending
        </Badge>
      );
    case "success":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          Success
        </Badge>
      );
    case "failed":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          Failed
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const BookingDetailModal = ({ open, setOpen, selectedBooking }: props) => {
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>
              Complete information about the selected Booking.
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Name:</Label>
                <div className="col-span-3">{selectedBooking.user.name}</div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Email:</Label>
                <div className="col-span-3">{selectedBooking.user.email}</div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Phone:</Label>
                <div className="col-span-3 font-mono text-sm">
                  {selectedBooking.phoneNo}
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Room:</Label>
                <div className="col-span-3 text-sm">
                  {selectedBooking.room.title}
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">CheckIn:</Label>
                <div className="col-span-3 font-mono text-sm">
                  {formatDate(selectedBooking.checkIn)}
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">CheckOut:</Label>
                <div className="col-span-3 font-mono text-sm">
                  {formatDate(selectedBooking.checkOut)}
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="font-medium">Booking Status:</Label>
                <div className="col-span-3">
                  {getStatusBadge(selectedBooking.status)}
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="font-medium">Payment Status:</Label>
                <div className="col-span-3">
                  {getPayStatusBadge(selectedBooking.paymentStatus)}
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Merchant ID</Label>
                <div className="col-span-3">
                  <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-300 font-mono">
                    {selectedBooking.merchantOrderId}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Amount:</Label>
                <div className="col-span-3 font-mono text-sm">
                  {selectedBooking.totalPrice}
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Created:</Label>
                <div className="col-span-3 font-mono text-sm">
                  {formatDate(selectedBooking.createdAt)}
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Booking ID:</Label>
                <div className="col-span-3 font-mono text-sm">
                  {selectedBooking._id}
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Guest:</Label>
                <div className="col-span-3 font-mono text-sm">
                  {selectedBooking.guests}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookingDetailModal;
