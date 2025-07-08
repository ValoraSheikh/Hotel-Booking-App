"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";

export default function UserDropdown() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (): void => setIsOpen(!isOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (status !== "authenticated") return null;

  console.log(session);

  const user = session.user;

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button
        id="dropdownUserAvatarButton"
        onClick={toggleDropdown}
        className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300"
        type="button"
      >
        <span className="sr-only">Open user menu</span>
        <Image
          height={100}
          width={100}
          className="w-8 h-8 rounded-full"
          src={user.image || "/default-avatar.png"} // fallback image
          alt="user photo"
        />
      </button>

      {/* Dropdown menu */}
      <div
        id="dropdownAvatar"
        className={`z-10 ${
          isOpen ? "block" : "hidden"
        } bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 absolute mt-2 right-0`}
      >
        <div className="px-4 py-3 text-sm text-gray-900">
          <div>{user.name || "User"}</div>
          <div className="font-medium truncate">{user.email}</div>
        </div>
        <ul
          className="py-2 text-sm text-gray-700"
          aria-labelledby="dropdownUserAvatarButton"
        >
          {session?.user?.role === "admin" && (
            <li>
              <a
                href="/dashboard"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Dashboard
              </a>
            </li>
          )}
        </ul>
        <div className="py-2">
          <button
            onClick={() => signOut({ callbackUrl: "/sign-in" })}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
