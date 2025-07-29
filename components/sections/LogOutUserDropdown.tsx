
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button
        id="dropdownUserAvatarButton"
        onClick={toggleDropdown}
        className="flex text-sm p-1.5 border rounded-sm focus:ring-4 focus:ring-gray-100 md:me-0"
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Dropdown"
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 4 15"
        >
          <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
      </button>

      <div
        id="dropdownAvatar"
        className={`absolute z-10 transition-[opacity,margin] duration ${
          isOpen ? "opacity-100 block" : "opacity-0 hidden"
        } bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-36 sm:w-44 md:w-48 lg:w-56 right-0 mt-2 dark:bg-gray-700 dark:divide-gray-600`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="dropdownUserAvatarButton"
      >
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
          <li>
            <Link
              href="/sign-in"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Sign In
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
