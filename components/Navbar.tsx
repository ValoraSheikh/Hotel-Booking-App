"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Mail,
  Mails,
  Menu,
  Phone,
  Smartphone,
  Twitter,
  X,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import UserDropdown from "./sections/UserDropdown";

export default function Header() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prevent background scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Mobile Header (logo + hamburger) */}
      <div className="md:hidden flex justify-between items-center bg-white p-4">
        <Link href="/">
          <Image src="/img/logo.png" alt="Logo" width={90} height={100} />
        </Link>
        <button onClick={() => setMobileMenuOpen(true)}>
          <Menu />
        </button>
      </div>

      <div
        className={`offcanvas-menu-overlay fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      ></div>

      {/* Canvas Open Icon */}
      <div className="canvas-open md:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setMobileMenuOpen(true)}>
          <i className="icon_menu text-2xl text-gray-900"></i>
        </button>
      </div>

      {/* Offcanvas Menu Wrapper */}
      <div
        className={`offcanvas-menu-wrapper fixed top-0 right-0 w-80 max-w-[90%] h-full bg-white text-gray-900 p-6 transform transition-transform duration-300 z-50 overflow-y-auto md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Canvas Close Icon */}
        <div className="canvas-close flex justify-end mb-6">
          <button onClick={() => setMobileMenuOpen(false)}>
            <X />
          </button>
        </div>

        {/* Search Icon */}
        <div className="search-icon search-switch mb-6 flex justify-end">
          <button>
            <i className="icon_search text-xl text-gray-900"></i>
          </button>
        </div>

        {/* Header Configure Area */}
        <div className="header-configure-area mb-6 space-y-4">
          <div className="language-option flex items-center gap-2">
            <Image
              src="/img/india-flag.jpg"
              width={26}
              height={26}
              alt="flag"
              className=""
            />
            <span className="uppercase font-medium">
              IN <i className="fa fa-angle-down ml-1"></i>
            </span>
          </div>
          <a
            href="#"
            className="bk-btn inline-block px-6 py-4 text-xs uppercase bg-[#dfa974] text-white font-bold tracking-wider"
          >
            Booking Now
          </a>
        </div>

        {/* Mobile Menu */}
        <nav className="px-6">
          <ul className="space-y-4 text-gray-800 font-medium text-sm">
            <li className="active">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
            </li>
            <div className="bg-gray-200 w-full h-[1px]"></div>
            <li>
              <Link href="/rooms" onClick={() => setMobileMenuOpen(false)}>
                Rooms
              </Link>
            </li>
            <div className="bg-gray-200 w-full h-[1px]"></div>
            <li>
              <Link href="/about-us" onClick={() => setMobileMenuOpen(false)}>
                About Us
              </Link>
            </li>
            <div className="bg-gray-200 w-full h-[1px]"></div>
            <li>
              <Link href="/blogs" onClick={() => setMobileMenuOpen(false)}>
                News
              </Link>
            </li>
            <div className="bg-gray-200 w-full h-[1px]"></div>
            <li>
              <Link href="/contact-us" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
            </li>
            <div className="bg-gray-200 w-full h-[1px]"></div>
          </ul>
        </nav>

        {/* Social Icons */}
        <div className="px-6 mt-6 flex gap-4 text-[#5A4D48]">
          <a href="#">
            <Facebook className="w-5 h-5" />
          </a>
          <a href="#">
            <Twitter className="w-5 h-5" />
          </a>
          {/* <a href="#"><Tripadvisor className="w-5 h-5" /></a> */}
          <a href="#">
            <Instagram className="w-5 h-5" />
          </a>
        </div>

        {/* Contact Info */}
        <ul className="px-6 mt-6 space-y-2 text-sm text-[#5A4D48] ">
          <li className="flex items-center gap-2 ">
            <Smartphone /> (12) 345 67890
          </li>
          <li className="flex items-center gap-2">
            <Mails /> info.colorlib@gmail.com
          </li>
          {session?.user && (
            <button
              onClick={() => signOut({ callbackUrl: "/sign-in" })}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </ul>
      </div>

      {/* Header Section Begin */}
      <header className="header-section hidden md:block bg-white">
        {/* Top Nav */}
        <div className="top-nav border-b border-gray-200">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center text-sm text-gray-800 lg:px-32">
            <ul className="tn-left flex gap-6">
              <li className="flex items-center gap-2 font-semibold">
                <Phone /> (12) 345 67890
              </li>
              <li className="flex items-center gap-2 font-semibold">
                <Mail /> info.colorlib@gmail.com
              </li>
            </ul>
            <div className="tn-right flex items-center gap-6">
              <div className="top-social flex gap-4">
                <a href="#">
                  <Instagram />
                </a>
                <a href="#">
                  <Image
                    height={25}
                    width={25}
                    alt="l=kuch bhi"
                    src="https://simpleicons.org/icons/tripadvisor.svg"
                  />
                </a>
                <a href="#">
                  <Facebook />
                </a>
                <a href="#">
                  <Twitter />
                </a>
              </div>
              <a
                href="#"
                className="bk-btn px-4 py-2 text-xs uppercase bg-[#dfa974] text-white font-bold tracking-wider"
              >
                Booking Now
              </a>
              <div className="language-option relative flex items-center gap-2 cursor-pointer">
                {session?.user && <UserDropdown />}
              </div>
            </div>
          </div>
        </div>
        {/* Main Menu Item */}
        <div className="menu-item lg:px-32">
          <div className="container mx-auto px-4 py-6 flex items-center justify-between">
            <div className="logo">
              <Link href="/">
                <Image src="/img/logo.png" alt="Logo" width={90} height={100} />
              </Link>
            </div>
            <div className="nav-menu flex items-center gap-8">
              <nav className="mainmenu">
                <ul className="flex gap-8 text-gray-900 font-medium text-sm">
                  <li className="relative after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#dfa974] after:transition-all hover:after:w-10 py-1">
                    <Link href="/">Home</Link>
                  </li>

                  <li className="relative after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#dfa974] after:transition-all hover:after:w-11 py-1">
                    <Link href="/rooms">Rooms</Link>
                  </li>

                  <li className="relative after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#dfa974] after:transition-all hover:after:w-15 py-1">
                    <Link href="/about-us">About Us</Link>
                  </li>

                  
                    <li className="relative after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#dfa974] after:transition-all hover:after:w-15 py-1">
                      <Link href="/bookings">Bookings</Link>
                    </li>
                  

                  <li className="relative after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#dfa974] after:transition-all hover:after:w-8 py-1">
                    <Link href="/blogs">News</Link>
                  </li>

                  <li className="relative after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#dfa974] after:transition-all hover:after:w-13 py-1">
                    <Link href="/contact-us">Contact</Link>
                  </li>
                </ul>
              </nav>
              <div className="nav-right search-switch text-lg cursor-pointer">
                <i className="icon_search"></i>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Header End */}
    </>
  );
}
