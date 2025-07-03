import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <section className="container mx-auto px-8 py-10 lg:py-28 lg:px-32">
        <h2 className="block antialiased tracking-normal font-sans font-semibold text-blue-gray-900 !text-2xl !leading-snug lg:!text-5xl playfair-display">
          Some Our News
        </h2>
        <p className="block antialiased font-sans text-sm leading-relaxed  mt-2 max-w-lg !font-normal !text-gray-500">
          We&apos;re constantly trying to express ourselves and actualize our
          dreams. If you have the opportunity to play this game of life you need
          to appreciate every moment.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="flex-col bg-clip-border bg-transparent text-gray-700 shadow-md relative grid min-h-[30rem] items-end overflow-hidden rounded-xl">
            <Image
              height={500}
              width={500}
              src="https://www.material-tailwind.com/image/blog-11.jpeg"
              alt="bg"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/70" />
            <Link href='/blogs/1'>
            <div className="p-6 relative flex flex-col justify-end">
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-white">
                Search and Discovery
              </h4>
              <p className="block antialiased font-sans text-base leading-relaxed text-white my-2 font-normal">
                Website visitors today demand a frictionless user expericence —
                especially when using search. Because of the hight standards we
                tend to offer.
              </p>
            </div>
            </Link>
          </div>
          <div className="flex-col bg-clip-border bg-transparent text-gray-700 shadow-md relative grid min-h-[30rem] items-end overflow-hidden rounded-xl">
            <Image
              height={500}
              width={500}
              src="https://www.material-tailwind.com/image/blog-10.jpeg"
              alt="bg"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/70" />
            <div className="p-6 relative flex flex-col justify-end">
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-white">
                Last visits in US
              </h4>
              <p className="block antialiased font-sans text-base leading-relaxed text-white my-2 font-normal">
                Wealth creation is an evolutionarily recent positive-sum game.
                Status is an old zero-sum game. Those attacking wealth creation
                are often just seeking status.
              </p>
            </div>
          </div>
          <div className="flex-col bg-clip-border bg-transparent text-gray-700 shadow-md relative grid min-h-[30rem] items-end overflow-hidden rounded-xl">

            <Image
              height={500}
              width={500}
              src="https://images.unsplash.com/photo-1751510288463-1a3be4f0e6a0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="bg"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/70" />
            <div className="p-6 relative flex flex-col justify-end">
              
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-white">
                Grow in a beautiful area
              </h4>
              <p className="block antialiased font-sans text-base leading-relaxed text-white my-2 font-normal">
                Free people make free choices. Free choices mean you get unequal
                outcomes. You can have freedom, or you can have equal outcomes.
                You can&apos;t have both.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
