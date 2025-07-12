import BookingForm from "@/components/sections/BookingForm";
import dbConnect from "@/lib/db";
import Room from "@/models/Room.model";

export default async function BookingPage({
  params,
}: {
  params: { id: string };
}) {
  await dbConnect();
  const { id } = await params;
  const room = await Room.findById(id).lean();

  console.log("Here is the room", id);
  

  if (!room) {
    return <div>Room not found</div>;
  }

  return <BookingForm roomId={id} room={JSON.parse(JSON.stringify(room))} />;
}
