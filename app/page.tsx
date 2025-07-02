import AboutUs from "./components/sections/AboutUs";
import Hero from "./components/sections/Hero";
import Room from "./components/sections/Room";
import Services from "./components/sections/Services";

export default function Home() {
  return (
    <>
      <Hero/>
      <AboutUs/>
      <Services/>
      <Room/>
    </>
  );
}
