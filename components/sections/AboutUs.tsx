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
                  The Good Hall <br />
                  Best Resort in Barmer
                </h2>
              </div>
              {/* f-para */}
              <p className="text-gray-600 font-medium leading-relaxed text-center">
                Nestled in the heart of Barmer, The Goodhall restaurant offers a unique and immersive experience that celebrates the rich heritage of Rajasthan. Guests can dine in authentically designed Rajasthani cultural rooms and huts, savoring traditional cuisines that tantalize the taste buds.
              </p>
              {/* s-para */}
              <p className="text-gray-700 font-medium leading-relaxed text-center">
                Beyond the culinary delights, The Goodhall also boasts an exciting waterpark, providing a perfect blend of cultural immersion and family-friendly fun.
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
                  src="https://res.cloudinary.com/dxlh1tom2/image/upload/v1754111691/ChatGPT_Image_Aug_2_2025_10_43_15_AM_e6wgp8.png"
                  alt="About Image 1"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div>
                <Image
                  src="https://res.cloudinary.com/dxlh1tom2/image/upload/v1754111859/ChatGPT_Image_Aug_2_2025_10_47_01_AM_xubmzl.png"
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
