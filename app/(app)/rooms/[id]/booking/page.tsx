import BookingForm from "@/components/sections/BookingForm";
import dbConnect from "@/lib/db";
import Room from "@/models/Room.model";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type PageProps = {
  params: {
    id: string;
  };
};

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  return {
    title: `Book Room ${params.id} | Hotel`,
  };
};

export default async function BookingPage({ params }: PageProps) {
  await dbConnect();
  const { id } = params;

  try {
    const room = await Room.findById(id).lean();

    if (!room) {
      return notFound(); // better than rendering <div>Room not found</div>
    }

    return <BookingForm roomId={id} room={JSON.parse(JSON.stringify(room))} />;
  } catch (error) {
    console.error("Error fetching room:", error);
    return notFound(); // fallback in case of DB errors
  }
}
