"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[65%_35%] gap-[20px]">
        {/* ================= LEFT SIDE ================= */}
        <div
          className="rounded-[32px] p-12 text-white relative overflow-hidden min-h-[520px]"
          style={{
            backgroundImage: "url('/header-background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Headings */}
          <h1 className="text-[54px] font-bold leading-[1.1]">
            <span className="text-white/70">Discover.</span> <br />
            <span className="text-white/85">Search.</span> <br />
            <span className="text-white">Get a job.</span>
          </h1>

          <p className="text-white/85 mt-5 text-lg max-w-lg">
            Great platform for the job seeker that searching for new career
            heights and passionate about startups.
          </p>

          {/* Search bar */}
          <div className="mt-10 bg-white rounded-full p-4 flex items-center gap-4 shadow-lg">
            <input
              type="text"
              placeholder="Job Title, Keywords, or Company"
              className="flex-1 px-6 py-3 rounded-full outline-none text-gray-700"
            />

            <input
              type="text"
              placeholder="City, state, zip code, remote"
              className="flex-1 px-6 py-3 rounded-full outline-none text-gray-700"
            />

            <button className="bg-[#1C9D75] rounded-full p-4 hover:bg-[#178764] transition">
              <Image src="/search.png" width={22} height={22} alt="search" />
            </button>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4 mt-10">
            <Link
              href="/signup"
              className="bg-white text-[#1C9D75] px-7 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              Sign up
            </Link>

            <button className="bg-white/10 backdrop-blur-md border border-white/20 px-7 py-3 rounded-full text-white font-semibold hover:bg-white/20 transition">
              Explore Job search
            </button>
          </div>
        </div>

        {/* ================= RIGHT SIDE — PERFECT ================= */}
       <div className="relative rounded-[32px] overflow-hidden shadow-sm bg-white">

  {/* FULL BACKGROUND IMAGE */}
  <div className="relative w-full h-[480px] rounded-[32px] overflow-hidden">
    <Image
      src="/Property.png"
      alt="Hero"
      fill
      className="object-cover object-center"
      priority
    />

    {/* Bottom fade */}
    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
  </div>

  {/* LEFT ARROW */}
  <div className="absolute top-1/2 left-4 -translate-y-1/2 z-30 cursor-pointer">
    <Image
      src="/left.png"
      alt="Left Arrow"
      width={36}
      height={36}
      className="opacity-90 hover:opacity-100 transition"
    />
  </div>

  {/* RIGHT ARROW */}
  <div className="absolute top-1/2 right-4 -translate-y-1/2 z-30 cursor-pointer">
    <Image
      src="/right.png"
      alt="Right Arrow"
      width={36}
      height={36}
      className="opacity-90 hover:opacity-100 transition"
    />
  </div>

  {/* TEXT ON IMAGE */}
  <h2 className="absolute top-6 left-6 text-[34px] font-bold leading-tight z-30">
    <span className="text-white/70 drop-shadow-[0_1px_3px_rgba(0,0,0,0.35)]">
      You search
    </span>
    <br />
    <span className="text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
      You get.
    </span>
  </h2>

  {/* TOP RIGHT DOTS */}
  <div className="absolute top-6 right-6 flex items-center gap-3 z-30">
    <span className="w-3 h-3 bg-white rounded-full"></span>
    <span className="w-3 h-3 border border-white rounded-full"></span>
    <span className="w-3 h-3 border border-white rounded-full"></span>
  </div>

  {/* Logo + Name */}
  <div className="absolute bottom-6 left-6 flex flex-col items-start gap-1 z-30">
    <Image
      src="/logo.png"
      alt="Health Linker"
      width={38}
      height={38}
      className="object-contain"
    />

    <span className="text-[20px] font-semibold text-gray-900">
      Health Linker
    </span>
  </div>

</div>

      </div>
    </section>
  );
}
