import { Facebook, Instagram, Send, Twitter, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#222736] text-white text-sm lg:px-32">
      {/* Top Footer Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-12">
          {/* About Section */}
          <div className="lg:w-1/3">
            <div className="mb-4">
              <Link href="/">
                <Image src="/img/footer-logo.png" alt="Logo" width={90} height={100} />
              </Link>
            </div>
            <p className="text-[#aaaab3] mb-6 leading-relaxed">
              We inspire and reach millions of travelers
              <br />
              across 90 local websites
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="h-10 w-10 border border-[#5A4D48] rounded-full flex items-center justify-center hover:bg-[#dfa974] hover:border-[#dfa974] transition"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="h-10 w-10 border border-[#5A4D48] rounded-full flex items-center justify-center hover:bg-[#dfa974] hover:border-[#dfa974] transition"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="h-10 w-10 border border-[#5A4D48] rounded-full flex items-center justify-center hover:bg-[#dfa974] hover:border-[#dfa974] transition"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="h-10 w-10 border border-[#5A4D48] rounded-full flex items-center justify-center hover:bg-[#dfa974] hover:border-[#dfa974] transition"
              >
                <Youtube className="w-4 h-4" />
              </a>
              {/* Placeholder for Tripadvisor */}
              <a
                href="#"
                className="h-10 w-10 border border-[#5A4D48] rounded-full flex items-center justify-center hover:bg-[#dfa974] hover:border-[#dfa974] transition text-white"
              >
                <Image
                  height={25}
                  width={25}
                  alt="tripadviser"
                  src="https://simpleicons.org/icons/tripadvisor.svg"
                />
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div className="lg:w-1/4">
            <h6 className="uppercase tracking-widest text-[#dfa974] font-bold mb-4 text-xs">
              Contact Us
            </h6>
            <ul className="space-y-2 text-[#aaaab3]">
              <li>(12) 345 67890</li>
              <li>info.colorlib@gmail.com</li>
              <li>856 Cordia Extension Apt. 356, Lake, United State</li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="lg:w-1/4">
            <h6 className="uppercase tracking-widest text-[#dfa974] font-bold mb-4 text-xs">
              New Latest
            </h6>
            <p className="text-[#aaaab3] mb-4">
              Get the latest updates and offers.
            </p>
            <form className="relative">
              <input
                type="text"
                placeholder="Email"
                className="w-full h-12 px-4 rounded bg-[#393D4A] text-[#707079] border-none placeholder:text-[#aaaab3]"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-12 px-4 bg-[#dfa974] text-white rounded-r"
              >
                <Send />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-[rgba(16,20,31,0.2)] py-4 ">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-between items-center text-[#aaaab3] text-sm gap-4">
          {/* Links */}
          <ul className="flex flex-wrap gap-6">
            <li>
              <a href="#" className="hover:underline font-semibold">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline font-semibold">
                Terms of use
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline font-semibold">
                Privacy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline font-semibold">
                Environmental Policy
              </a>
            </li>
          </ul>

          {/* Credits */}
          <p className="text-center lg:text-right text-[#707079]">
            &copy; {currentYear} All rights reserved | Made{" "}
            <i className="fa fa-heart text-red-500"></i> by{" "}
            <a
              href="https://github.com/ValoraSheikh"
              target="_blank"
              className="hover:underline"
            >
              Aman Sheikh
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
