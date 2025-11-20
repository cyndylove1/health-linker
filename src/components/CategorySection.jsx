"use client";

import React from "react";

const primary = "#1C9D75"; // brand green

const experience = [
  { title: "Zero Experience", jobs: "56 Jobs", dark: false },
  { title: "Internship", jobs: "56 Jobs", dark: false },
  { title: "Volunteer", jobs: "56 Jobs", dark: false },
  { title: "Intermediate", jobs: "56 Jobs", dark: false },
  { title: "Experienced", jobs: "56 Jobs", dark: false },
  { title: "Entry", jobs: "56 Jobs", dark: false },
  { title: "Senior", jobs: "56 Jobs", dark: false },
];

const sectors = [
  { title: "Nurse", jobs: "56 Jobs", dark: false },
  { title: "Doctor", jobs: "56 Jobs", dark: true },
  { title: "Healthcare", jobs: "56 Jobs", dark: false },
  { title: "Surgeon", jobs: "56 Jobs", dark: true },
  { title: "Dentist", jobs: "56 Jobs", dark: false },
  { title: "Pharmacist", jobs: "56 Jobs", dark: true },
  { title: "All sector", jobs: "5000+ Jobs", dark: false },
];

function Card({ title, jobs, dark }) {
  // two gradient variants: light (default), dark variant for some cards
  const light = "bg-gradient-to-b from-[#20b07b] to-[#198258]"; // greener
  const darkBg = "bg-gradient-to-b from-[#0e5b3f] to-[#137352]"; // darker
  const chosen = dark ? darkBg : light;

  return (
    <div
      className={`rounded-2xl ${chosen} text-white p-5 min-h-[110px] flex flex-col justify-between shadow-md`}
      role="group"
    >
      <div>
        <div className="text-sm">{title}</div>
        <div className="text-xs mt-2 opacity-90">{jobs}</div>
      </div>

      <div className="mt-3">
        <a
          href="#"
          className="text-sm underline underline-offset-4 decoration-white/80 decoration-2 inline-flex items-center gap-2"
        >
          Explore
          <svg
            className="w-3 h-3"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M5 12h14M13 5l7 7-7 7"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default function CategorySection() {
  return (
    <section className="w-full bg-[#F3FCF9] py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-3xl sm:text-4xl font-extrabold">
            <span style={{ color: primary }}>Explore</span>{" "}
            <span className="text-gray-900">by Category</span>
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Lorem ipsum sit dolor amec avous.
          </p>
        </div>

        {/* Experience Section */}
        <div className="mb-8">
          <h4 className="text-lg font-medium text-gray-800 mb-4">
            Search by Experience level
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {experience.map((it, idx) => (
              <Card
                key={it.title}
                title={it.title}
                jobs={it.jobs}
                dark={it.dark}
              />
            ))}
          </div>
        </div>

        {/* Job Sector Section */}
        <div>
          <h4 className="text-lg font-medium text-gray-800 mb-4">
            Search by Job Sector
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {sectors.map((it) => (
              <Card key={it.title} title={it.title} jobs={it.jobs} dark={it.dark} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
