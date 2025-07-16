import AboutUs from "../components/sections/AboutUs";
import Blog from "../components/sections/Blog";
import Hero from "../components/sections/Hero";
import Room from "../components/sections/Room";
import Services from "../components/sections/Services";
import Testimonials from "../components/sections/Testimonials";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hotel Booking App - Your Perfect Stay',
  description: 'Discover and book luxurious hotels for your next trip with our easy-to-use booking platform.',
  keywords: ['hotel booking', 'luxury hotels', 'travel', 'accommodation', 'vacation'],
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'Hotel Booking App - Your Perfect Stay',
    description: 'Discover and book luxurious hotels for your next trip with our easy-to-use booking platform.',
    url: 'https://hotel-booking-app-woad.vercel.app/',
    siteName: 'Hotel Booking App',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        width: 1200,
        height: 630,
        alt: 'Hotel Booking App Home',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function Home() {
  return (
    <div className=" overflow-x-hidden">
      <Hero />
      <AboutUs />
      <Services />
      <Room />
      <Testimonials />
      <Blog />
    </div>
  );
}