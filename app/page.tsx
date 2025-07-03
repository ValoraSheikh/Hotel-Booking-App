import AboutUs from "./components/sections/AboutUs";
import Blog from "./components/sections/Blog";
import Hero from "./components/sections/Hero";
import Room from "./components/sections/Room";
import Services from "./components/sections/Services";
import Testimonials from "./components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <Hero/>
      <AboutUs/>
      <Services/>
      <Room/>
      <Testimonials/>
      <Blog/>
    </>
  );
}
