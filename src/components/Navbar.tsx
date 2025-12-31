"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/context/userContext";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuth();
  const { profile } = useUser();

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const menu: string[] = ["/", "/about", "/contact"];

  const getUserDisplayName = (): string => {
    if (profile?.name) return profile.name;
    if (profile?.firstName && profile?.lastName)
      return `${profile.firstName} ${profile.lastName}`;
    if (profile?.firstName) return profile.firstName;
    if (profile?.email) return profile.email;
    return "User";
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node | null; 

      if (
        dropdownRef.current &&
        target &&
        !dropdownRef.current.contains(target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full sticky top-0 z-50 bg-white/80">
      {/* underline */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gray-300/40"></div>

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo-2.png"
            width={120}
            height={40}
            alt="Health Thinker Logo"
            className="h-5 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {menu.map((path) => (
            <Link
              key={path}
              href={path}
              className={`transition font-medium ${
                pathname === path
                  ? "text-[#1C9D75]"
                  : "text-gray-700 hover:text-[#1C9D75]"
              }`}
            >
              {path === "/" ? "Home" : path === "/about" ? "About" : "Contact"}
            </Link>
          ))}
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition"
              >
                <div className="w-8 h-8 bg-[#1C9D75] rounded-full flex items-center justify-center text-white font-medium text-sm">
                  {getUserDisplayName().charAt(0).toUpperCase()}
                </div>
                <span className="text-gray-700 font-medium">
                  {getUserDisplayName()}
                </span>

                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {getUserDisplayName()}
                    </p>
                    {profile?.email && (
                      <p className="text-xs text-gray-500">{profile.email}</p>
                    )}
                  </div>

                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Profile
                  </Link>

                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-gray-700 hover:text-[#1C9D75] transition"
              >
                Login
              </Link>

              <Link
                href="/sign-up"
                className="bg-[#1C9D75] text-white px-5 py-2 rounded-full hover:bg-[#178764] transition"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>

      {/* BACKDROP */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* SLIDE-IN MOBILE PANEL */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 transform transition-transform duration-300 md:hidden
        ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4">
          <Image
            src="/logo-2.png"
            width={110}
            height={30}
            alt="logo"
            className="object-contain"
          />

          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* MENU LIST */}
        <div className="px-6 py-8 space-y-6 bg-white h-screen">
          <Link
            href="/"
            className="block text-gray-700 text-lg hover:text-[#1C9D75]"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block text-gray-700 hover:text-[#1C9D75] text-lg"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="block text-gray-700 hover:text-[#1C9D75] text-lg"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>

          {!isAuthenticated && (
            <div className="flex flex-col items-center space-y-4 pt-4">
              <Link
                href="/login"
                className="text-[#1C9D75] font-medium text-lg"
              >
                Login
              </Link>

              <Link
                href="/sign-up"
                className="bg-[#1C9D75] text-white px-6 py-2 rounded-full font-medium text-lg w-full text-center"
              >
                Sign up
              </Link>
            </div>
          )}

          {isAuthenticated && (
            <div className="flex flex-col space-y-4 pt-4">
              <Link href="/dashboard" className="text-gray-700 text-lg">
                Dashboard
              </Link>
              <Link href="/profile" className="text-gray-700 text-lg">
                Profile
              </Link>

              <button
                onClick={logout}
                className="text-red-600 text-left text-lg"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </aside>
    </nav>
  );
}
