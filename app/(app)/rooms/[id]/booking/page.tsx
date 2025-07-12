// app/(app)/rooms/[id]/booking/page.tsx

import BookingForm from "@/components/sections/BookingForm";
import dbConnect from "@/lib/db";
import Room from "@/models/Room.model";
import { notFound } from "next/navigation";

interface BookingPageProps {
  params: { id: string };
}

export default async function BookingPage({ params }: BookingPageProps) {
  await dbConnect();

  const room = await Room.findById(params.id).lean();

  if (!room) return notFound();

  return <BookingForm roomId={params.id} room={JSON.parse(JSON.stringify(room))} />;
}
