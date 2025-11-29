"use client";

import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-white text-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

          {/* LEFT: Logo + About + Social + Contact */}
          <div className="md:col-span-5 lg:col-span-4 space-y-6">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-[140px]">
                <Image
                  src="/logo-2.png"
                  alt="Health Linker"
                  width={140}
                  height={36}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Short description */}
            <p className="text-sm text-gray-500 max-w-[340px]">
              HealthLinker is dedicated to connecting healthcare professionals with rewarding career opportunities. We empower nurses, doctors, therapists, and other healthcare workers to find meaningful positions that make a difference.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              <Image src="/X-Logo.png" alt="X" width={26} height={26} />
              <Image src="/Instagram-Logo.png" alt="Instagram" width={26} height={26} />
              <Image src="/YouTube-Logo.png" alt="YouTube" width={26} height={26} />
              <Image src="/Linkedin-Logo.png" alt="LinkedIn" width={26} height={26} />
            </div>

            {/* Phone and email */}
            <div className="text-sm text-gray-600 space-y-2">
              <div>+1 (800) HEALTH-1</div>
              <div>support@healthlinker.com</div>
            </div>
          </div>

          {/* MIDDLE / RIGHT: Link columns */}
          <div className="md:col-span-7 lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Company */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><a href="/about" className="hover:text-gray-900">About Us</a></li>
                <li><a href="/contact" className="hover:text-gray-900">Contact Us</a></li>
                <li><a href="/jobs" className="hover:text-gray-900">Browse Jobs</a></li>
              </ul>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><a href="#" className="hover:text-gray-900">Terms of Service</a></li>
                <li><a href="#" className="hover:text-gray-900">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-gray-900">FAQ</a></li>
              </ul>
            </div>

            {/* Contact column */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Get Support</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li>support@healthlinker.com</li>
                <li>+1 (800) 324-5825</li>
                <li>Available 24/7 for assistance</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mt-8 pt-8" />

        {/* Bottom copyright */}
        <div className="text-center text-xs text-gray-400 py-6">
          © {new Date().getFullYear()} HealthLinker. Connecting Healthcare Professionals with Opportunities. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
