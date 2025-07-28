import * as React from 'react';
import { Html, Head, Preview, Body, Container, Text, Section } from '@react-email/components';

interface BookingConfirmationEmailProps {
  bookingDetails: {
    user: {
      name: string;
      email: string;
    };
    phoneNo: number;
    room: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    totalPrice: number;
  };
}

export default function BookingConfirmationEmail({ bookingDetails }: BookingConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your booking is confirmed 🎉</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={heading}>🎉 Booking Confirmed, {bookingDetails.user.name}!</Text>

          <Section>
            <Text style={paragraph}><strong>Room:</strong> {bookingDetails.room}</Text>
            <Text style={paragraph}><strong>Check-In:</strong> {new Date(bookingDetails.checkIn).toLocaleDateString()}</Text>
            <Text style={paragraph}><strong>Check-Out:</strong> {new Date(bookingDetails.checkOut).toLocaleDateString()}</Text>
            <Text style={paragraph}><strong>Guests:</strong> {bookingDetails.guests}</Text>
            <Text style={paragraph}><strong>Total Price:</strong> ₹{bookingDetails.totalPrice}</Text>
            <Text style={paragraph}><strong>Phone:</strong> {bookingDetails.phoneNo}</Text>
            <Text style={paragraph}><strong>Email:</strong> {bookingDetails.user.email}</Text>
          </Section>

          <Text style={{ ...paragraph, marginTop: '20px' }}>
            Thank you for choosing <strong>Sona Luxury</strong>. We look forward to hosting you!
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Inline styles
const main = {
  backgroundColor: '#f8f8f8',
  padding: '20px 0',
  fontFamily: 'Arial, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  padding: '20px',
  borderRadius: '8px',
  maxWidth: '480px',
  margin: '0 auto',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
};

const heading = {
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '20px',
};

const paragraph = {
  fontSize: '14px',
  margin: '4px 0',
};
