"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  
  const pathname = usePathname();
  const menu = ["/", "/about", "/contact"];
  const activeIndex = menu.indexOf(pathname);

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
      className={`transition font-medium ${
        pathname === path
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
          <Link href="/login" className="text-gray-700 hover:text-[#1C9D75] transition">
            Login
          </Link>

          <Link
            href="/sign-up"
            className="bg-[#1C9D75] text-white px-5 py-2 rounded-full hover:bg-[#178764] transition"
          >
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
}
