"use client";

import Image from "next/image";

export default function AboutUs() {
  return (
    <section className="mx-auto lg:px-40 py-28 px-1">
      {" "}
      {/* aboutus-section spad */}
      <div className="container mx-auto px-4">
        {" "}
        {/* container */}
        <div className="flex flex-wrap -mx-4">
          {" "}
          {/* row */}
          {/* Left Column */}
          <div className="w-full lg:w-1/2 px-10 text-gray-700 mb-5">
            {" "}
            {/* col-lg-6 */}
            <div className="space-y-6">
              {" "}
              {/* about-text */}
              {/* section-title */}
              <div className="space-y-2 flex flex-col items-center">
                <span className="block text-sm uppercase tracking-widest text-[#dfa974] font-semibold text-center">
                  About Us
                </span>
                <h2 className="text-5xl font-playfair font-bold leading-snug text-gray-800 text-center playfair-display max-sm:text-4xl">
                  Intercontinental LA <br />
                  Westlake Hotel
                </h2>
              </div>
              {/* f-para */}
              <p className="text-gray-600 font-medium leading-relaxed text-center">
                Sona.com is a leading online accommodation site. We’re
                passionate about travel. Every day, we inspire and reach
                millions of travelers across 90 local websites in 41 languages.
              </p>
              {/* s-para */}
              <p className="text-gray-700 font-medium leading-relaxed text-center">
                So when it comes to booking the perfect hotel, vacation rental,
                resort, apartment, guest house, or tree house, we’ve got you
                covered.
              </p>
              <div className="flex justify-center mt-6">
                <a
                  href="#"
                  className="text-sm text-black uppercase font-semibold tracking-wider border-b-2 border-[#dfa974] pb-[2px]"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
          {/* Right Column */}
          <div className="w-full lg:w-1/2 px-4">
            {" "}
            {/* col-lg-6 */}
            <div className="grid md:grid-cols-2 gap-4">
              {" "}
              {/* about-pic → row + col-sm-6 */}
              <div>
                <Image
                  src="/img/about/about-1.jpg"
                  alt="About Image 1"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div>
                <Image
                  src="/img/about/about-2.jpg"
                  alt="About Image 2"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
