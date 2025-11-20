"use client";

import Image from "next/image";
import { useState } from "react";

export default function AlertSignup() {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [frequency, setFrequency] = useState("daily");

  return (
    <section
      className="w-full py-24 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/signup-background.png')", 
        backgroundAttachment: "fixed", 
      }}
    >
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* Heading – FIXED to match Figma */}
        <h2 className="text-[40px] md:text-[45px] font-medium tracking-wide text-white mb-3 leading-[1.15]">
  Sign up today for daily job alerts
</h2>


        <p className="text-sm text-white/80 mb-12">
          Lorem ipsum sit dolor amec avous.
        </p>

        {/* Center Card */}
        <div className="mx-auto w-full max-w-[380px]">
          <div
            className="relative rounded-[28px] p-7 shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(235,241,241,0.92) 35%, rgba(230,240,240,0.88) 100%)",
              height: "350px", // 🔥 Increased box height slightly
            }}
          >
            {/* Card Title */}
            <div className="text-center mb-6">
              <div className="text-xl font-semibold text-gray-800">
                My Job <span className="text-[#1C9D75]">Alert</span>
              </div>
            </div>

            {/* Form */}
            <form className="space-y-5">

              {/* Job Title */}
              <input
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Enter your Job Title"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none shadow-sm"
              />

              {/* Location */}
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Image src="/location2.png" alt="location" width={18} height={18} />
                </div>

                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter Location"
                  className="w-full pl-10 border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none shadow-sm"
                />
              </div>

              {/* Dropdown */}
              <div className="relative">
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="appearance-none w-full border border-gray-200 rounded-lg px-4 py-3 pr-10 text-sm bg-white outline-none shadow-sm"
                >
                  <option value="daily">Send alert daily</option>
                  <option value="weekly">Send alert weekly</option>
                  <option value="monthly">Send alert monthly</option>
                </select>

                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <Image src="/drop-down.png" alt="dropdown" width={18} height={18} />
                </div>
              </div>

              {/* Button */}
              <button
                type="button"
                className="w-full bg-[#1C9D75] text-white rounded-full py-3 text-sm font-medium shadow-md hover:bg-[#178764] transition"
              >
                Set Alert
              </button>
            </form>
          </div>

          <div className="h-6" />
        </div>
      </div>
    </section>
  );
}
