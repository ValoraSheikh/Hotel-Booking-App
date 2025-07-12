import BookingForm from "@/components/sections/BookingForm";
import dbConnect from "@/lib/db";
import Room from "@/models/Room.model";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function BookingPage({ params }: PageProps) {
  await dbConnect();
  const { id } = await params;
  const room = await Room.findById(id).lean();

  console.log("Here is the room", id);
  

  if (!room) {
    return <div>Room not found</div>;
  }

  return <BookingForm roomId={id} room={JSON.parse(JSON.stringify(room))} />;
}
