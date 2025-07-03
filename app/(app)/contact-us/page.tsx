import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <>
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="md:flex gap-x-24 clear-left md:mb-16 mb-10">
            <div className=" md:mb-0 mb-4">
              <h2 className="text-black font-manrope text-5xl font-semibold leading-10 mb-5 md:text-left text-center playfair-display">
                Get In Touch
              </h2>
              <p className="text-gray-600 text-lg font-normal leading-7 mb-7 md:text-left text-center">
                Whether you have a concern or simply want to say hello, We are
                here to facilitate communication with you.
              </p>
              <div className="flex md:items-center md:justify-start justify-center">
                <button className="w-36 h-12 uppercase bg-[#dfa974] transition-all duration-700 shadow text-white text-center text-base font-semibold leading-6">
                  Contact Us
                </button>
              </div>
            </div>
            <div className="border-l-2 md:border-indigo-600 border-white px-10 py-6">
              <div className="mb-8">
                <h6 className="text-gray-500 text-sm font-medium leading-5 pb-3 md:text-start text-center">
                  Email Address
                </h6>
                <h3 className="text-black text-xl font-semibold leading-8 md:text-start text-center">
                  pagedone@gmail.com
                </h3>
              </div>
              <div>
                <h6 className="text-gray-500 text-sm font-medium leading-5 pb-3 md:text-start text-center">
                  Phone Number
                </h6>
                <h3 className="text-black text-xl font-semibold leading-8 md:text-start text-center">
                  470-601-1911
                </h3>
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8">
            <div className="h-96 relative flex justify-center">
              <div className="w-full h-full absolute bg-gradient-to-t from-gray-800/50 to-gray-600/50" />
              <Image
                height={500}
                width={500}
                src="https://pagedone.io/asset/uploads/1696246502.png"
                alt="United Kingdom image"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 mb-6 text-center px-6">
                <h5 className="text-white text-lg font-semibold leading-7 mb-2">
                  United Kingdom
                </h5>
                <p className="text-white text-base font-medium leading-6">
                  123 High Street, Westminster, London
                </p>
              </div>
            </div>
            <div className="h-96 relative flex justify-center">
              <div className="w-full h-full absolute bg-gradient-to-t from-gray-800/50 to-gray-600/50" />
              <Image
                height={500}
                width={500}
                src="https://pagedone.io/asset/uploads/1696246522.png"
                alt="Germany image"
                className="w-full h-full  object-cover"
              />
              <div className="absolute bottom-0 mb-6 text-center px-6">
                <h5 className="text-white text-lg font-semibold leading-7 mb-2">
                  Germany
                </h5>
                <p className="text-white text-base font-medium leading-6">
                  101 Unter den Linden, Mitte <br />
                  District, Berlin
                </p>
              </div>
            </div>
            <div className="h-96 relative flex justify-center">
              <div className="w-full h-full absolute bg-gradient-to-t from-gray-800/50 to-gray-600/50" />
              <Image
                height={500}
                width={500}
                src="https://pagedone.io/asset/uploads/1696246551.png"
                alt="France image"
                className="w-full h-full  object-cover"
              />
              <div className="absolute bottom-0 mb-6 text-center px-6">
                <h5 className="text-white text-lg font-semibold leading-7 mb-2">
                  France
                </h5>
                <p className="text-white text-base font-medium leading-6">
                  456 Rue de la Paix, 8th Arrondissement, Paris
                </p>
              </div>
            </div>
            <div className="h-96 relative flex justify-center">
              <div className="w-full h-full absolute bg-gradient-to-t from-gray-800/50 to-gray-600/50" />
              <Image
                height={500}
                width={500}
                src="https://pagedone.io/asset/uploads/1696246565.png"
                alt="Switzerland image"
                className="w-full h-full  object-cover"
              />
              <div className="absolute bottom-0 mb-6 text-center px-6">
                <h5 className="text-white text-lg font-semibold leading-7 mb-2">
                  Switzerland
                </h5>
                <p className="text-white text-base font-medium leading-6">
                  987 Bahnhofstrasse, Zurich <br /> City Center, Zurich
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-8 py-8 lg:py-16">
        <div className="container mx-auto text-center">
          <h5 className="block antialiased tracking-normal font-sans font-semibold text-sm mb-4 lg:!text-2xl text-[#dfa974] uppercase">
            Customer Care
          </h5>
          <h1 className="block antialiased tracking-normal font-sans font-semibold leading-tight text-blue-gray-900 mb-4 !text-5xl lg:!text-5xl playfair-display">
            We&apos;re Here to Help
          </h1>
          <p className="block antialiased font-sans leading-relaxed  mb-10 font-normal !text-lg lg:mb-20 mx-auto max-w-3xl !text-gray-500">
            Whether it&apos;s a question about our services, a request for
            technical assistance, or suggestions for improvement, our team is
            eager to hear from you.
          </p>
          <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-2 items-start">
            <Image
              height={500}
              width={300}
              src="https://images.unsplash.com/photo-1742415105843-6a4719046907?q=80&w=848&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="map"
              className="w-full h-full rounded-xl object-cover min-h-[400px]"
            />
            <form action="#" className="flex flex-col gap-4 lg:max-w-sm">
              <p className="block antialiased font-sans text-sm leading-normal  text-left !font-semibold !text-gray-600">
                Select Options for Business Engagement
              </p>
              <div className="flex gap-4">
                <button
                  className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] max-w-fit"
                  type="button"
                  data-ripple-dark="true"
                >
                  General inquiry
                </button>
                <button
                  className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] max-w-fit"
                  type="button"
                  data-ripple-dark="true"
                >
                  Product Support
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="block antialiased font-sans text-sm leading-normal mb-2 text-left font-medium !text-gray-900">
                    First Name
                  </p>
                  <div className="relative w-full h-11 !min-w-full">
                    <input
                      placeholder="First Name"
                      name="first-name"
                      className="peer w-full h-full bg-transparent font-sans font-normal outline focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border-t-transparent  placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md !border !border-gray-300 text-gray-900 placeholder:!text-gray-500 focus:!border-gray-900 focus:!border-2 focus:border-t-gray-900"
                    />
                    <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900 hidden"></label>
                  </div>
                </div>
                <div>
                  <p className="block antialiased font-sans text-sm leading-normal  mb-2 text-left font-medium !text-gray-900">
                    Last Name
                  </p>
                  <div className="relative w-full h-11 !min-w-full">
                    <input
                      placeholder="Last Name"
                      name="last-name"
                      className="peer w-full h-full bg-transparent font-sans font-normal  outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border-t-transparent  placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md !border !border-gray-300 text-gray-900 placeholder:!text-gray-500 focus:!border-gray-900 focus:!border-2 focus:border-t-gray-900"
                    />
                    <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900 hidden"></label>
                  </div>
                </div>
              </div>
              <div>
                <p className="block antialiased font-sans text-sm leading-normal  mb-2 text-left font-medium !text-gray-900">
                  Your Email
                </p>
                <div className="relative w-full h-11 !min-w-full">
                  <input
                    placeholder="name@email.com"
                    name="email"
                    className="peer w-full h-full bg-transparent font-sans font-normal  outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border-t-transparent  placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md !border !border-gray-300 text-gray-900 placeholder:!text-gray-500 focus:!border-gray-900 focus:!border-2 focus:border-t-gray-900"
                  />
                  <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900 hidden"></label>
                </div>
              </div>
              <div>
                <p className="block antialiased font-sans text-sm leading-normal  mb-2 text-left font-medium !text-gray-900">
                  Your Message
                </p>
                <div className="relative w-full !min-w-full">
                  <textarea
                    rows={6}
                    placeholder="Message"
                    name="message"
                    className="peer w-full h-full min-h-[100px] bg-transparent font-sans font-normal  outline-0 focus:outline-0  disabled:bg-blue-gray-50 disabled:border-0 disabled:resize-none transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] !resize-none !border !border-gray-300 text-gray-900 placeholder:!text-gray-500 focus:!border-gray-900 focus:!border-2 "
                    spellCheck="false"
                    defaultValue={""}
                  />
                  <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900 hidden" />
                </div>
              </div>
              <button
                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3 px-6 bg-[#dfa974] text-white cursor-pointer  w-1/2"
                type="button"
                data-ripple-light="true"
              >
                SUBMIT now
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
