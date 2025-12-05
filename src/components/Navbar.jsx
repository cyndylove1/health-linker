"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/context/userContext";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, logout, user } = useAuth();
  const { profile } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const menu = ["/", "/about", "/contact"];
  const activeIndex = menu.indexOf(pathname);

  // Check if user is admin
  const isAdmin = () => {
    if (typeof window !== "undefined") {
      const isAdminFlag = localStorage.getItem("isAdmin") === "true";
      if (isAdminFlag) return true;
    }
    return user?.role === "admin" || user?.role === "super_admin" || user?.email === "admin@healthlinker.com";
  };

  // Get dashboard link based on role
  const getDashboardLink = () => {
    return isAdmin() ? "/admin/dashboard" : "/dashboard";
  };

  // Get user display name
  const getUserDisplayName = () => {
    if (profile?.name) return profile.name;
    if (profile?.firstName && profile?.lastName) {
      return `${profile.firstName} ${profile.lastName}`;
    }
    if (profile?.firstName) return profile.firstName;
    if (profile?.email) return profile.email;
    return "User";
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur-xl">

      {/* Soft underline */}
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

        {/* NAVIGATION WITH SLIDING INDICATOR */}
        {/* NAVIGATION – CLEAN, NO UNDERLINE, NO SLIDING BAR */}
        <div className="hidden md:flex items-center gap-8">

          {menu.map((path) => (
            <Link
              key={path}
              href={path}
              className={`transition font-medium ${pathname === path
                  ? "text-[#1C9D75]"     // active green
                  : "text-gray-700 hover:text-[#1C9D75]" // inactive hover
                }`}
            >
              {path === "/" ? "Home" : path === "/about" ? "About" : "Contact"}
            </Link>
          ))}

        </div>


        {/* Right Side */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition duration-200"
                >
                  <div className="w-8 h-8 bg-[#1C9D75] rounded-full flex items-center justify-center text-white font-medium text-sm">
                    {getUserDisplayName().charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden md:block text-gray-700 font-medium">
                    {getUserDisplayName()}
                  </span>
                  <svg 
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                      isDropdownOpen ? 'rotate-180' : ''
                    }`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{getUserDisplayName()}</p>
                      {profile?.email && (
                        <p className="text-xs text-gray-500">{profile.email}</p>
                      )}
                    </div>
                    <Link
                      href={getDashboardLink()}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {isAdmin() ? "Admin Dashboard" : "Dashboard"}
                    </Link>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button
                        onClick={() => {
                          logout();
                          setIsDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-700 hover:text-[#1C9D75] transition">
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
      </div>
    </nav>
  );
}
