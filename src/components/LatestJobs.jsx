"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";

const primary = "#1C9D75";

const jobs = new Array(8).fill(0).map((_, i) => ({
  id: i + 1,
  title: "Surgeon",
  company: "Edoubleone Company",
  type: "Full-Time",
  location: "Remote, USA",
  posted: "2 days ago",
  salary: "$50.00 - $70.00",
}));

export default function LatestJobs() {
  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-6">
          <h3 className="text-3xl sm:text-4xl font-extrabold">
            <span className="text-gray-900">Latest</span>{" "}
            <span style={{ color: primary }}>Jobs</span>
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Lorem ipsum sit dolor amec avous.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {jobs.map((job) => (
            <Link key={job.id} href={`/job/${job.id}`}>
              <div className="relative bg-white rounded-xl border border-gray-100 shadow-sm p-5 overflow-hidden cursor-pointer hover:shadow-md transition">
                
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                    <Image src="/wish.png" alt="save" width={18} height={18} />
                  </div>
                </div>

                <h4 className="text-sm font-semibold text-gray-900 mb-1">
                  {job.title}
                </h4>

                <div className="text-xs text-gray-500 mb-3">{job.company}</div>

                <div className="mb-2">
                  <span
                    className="inline-block text-xs font-medium px-3 py-1 rounded-full"
                    style={{
                      background: "rgba(28,157,117,0.12)",
                      color: primary,
                    }}
                  >
                    {job.type}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Image src="/location.png" alt="loc" width={16} height={16} />
                    <span>{job.location}</span>
                  </div>

                  <div className="text-xs text-gray-400 whitespace-nowrap">
                    {job.posted}
                  </div>
                </div>

                <div className="border-t border-gray-100 my-3"></div>

                <div>
                  <div className="text-sm font-bold text-gray-900">{job.salary}</div>
                  <div className="text-xs text-gray-400">per hour</div>
                </div>

              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-3 bg-[#1C9D75] text-white px-6 py-2 rounded-full shadow-md hover:bg-[#178764] transition"
          >
            View all
            <Image
              src="/arrow-left.png"
              alt="arrow"
              width={16}
              height={16}
              className="object-contain"
            />
          </Link>
        </div>

      </div>
    </section>
  );
}
