
import BookingConfirmationEmail from '@/components/Email/BookingConfirmationEmail';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body?.user?.email) {
      return NextResponse.json({ error: 'User email is required' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'bookings@yourapp.onresend.com',
      to: body.user.email,
      subject: 'Sona Luxury Booking Confirmation ✅',
      react: BookingConfirmationEmail({ bookingDetails: body }),

    });

    if (error) {
      console.error("Email send error:", error);
      return NextResponse.json({ error: error.message || error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: error.message || "Internal error" }, { status: 500 });
  }
}
