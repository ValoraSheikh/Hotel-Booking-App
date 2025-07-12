import BookingForm from "@/components/sections/BookingForm";
import dbConnect from "@/lib/db";
import Room from "@/models/Room.model";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function BookingPage({ params }: PageProps) {
  await dbConnect();

  const { id } = await params;
  const room = await Room.findById(id).lean();

  if (!room) {
    return notFound();
  }

  return <BookingForm roomId={id} room={JSON.parse(JSON.stringify(room))} />;
}
