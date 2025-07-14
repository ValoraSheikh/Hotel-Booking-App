import BookingForm from "@/components/sections/BookingForm";
import dbConnect from "@/lib/db";
import Room from "@/models/Room.model";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function BookingPage({ params }: Props) {
  const { id } = await params;

  await dbConnect();

  const room = await Room.findById(id).lean();
  if (!room) return notFound();

  return <BookingForm roomId={id} room={JSON.parse(JSON.stringify(room))} />;
}
