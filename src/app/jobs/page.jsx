"use client";
import { useState } from "react";
import Image from "next/image";
import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";

const primary = "#1C9D75";

// Generate 10,000 jobs
const jobs = new Array(200).fill(0).map((_, i) => ({
  id: i + 1,
  title: "Surgeon",
  company: "Edoubleone Company",
  type: "Full-Time",
  location: "Remote, USA",
  posted: "2 days ago",
  salary: "$50.00 - $70.00",
}));

export default function JobsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const jobsPerPage = 20;
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  // Slice jobs for current page
  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const currentJobs = jobs.slice(startIndex, endIndex);

  // Pagination with dots
  const getPagination = () => {
    let pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, "...", totalPages - 1, totalPages];
      } else if (currentPage >= totalPages - 2) {
        pages = [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        ];
      }
    }
    return pages;
  };

  const pagination = getPagination();

  return (
    <main className="w-full bg-white">
      <Navbar />

      {/* --- Your existing HERO / SEARCH / FILTER code remains untouched --- */}

      <section className="max-w-7xl mx-auto px-6 py-10">

        {/* JOB GRID — now loads correct jobs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {currentJobs.map((job) => (
            <div key={job.id} className="relative bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <div className="absolute top-3 right-3">
                <div className="w-7 h-7 rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-sm">
                  <Image src="/wish.png" width={14} height={14} alt="save" />
                </div>
              </div>

              <h4 className="text-sm font-semibold text-gray-900">{job.title}</h4>
              <p className="text-xs text-gray-500">{job.company}</p>

              <span
                className="inline-block mt-2 text-[10px] font-medium px-3 py-1 rounded-full"
                style={{ background: "rgba(28,157,117,0.12)", color: primary }}
              >
                {job.type}
              </span>

              <div className="flex items-center justify-between mt-3 text-[11px]">
                <div className="flex items-center gap-2 text-gray-500">
                  <Image src="/location.png" width={12} height={12} alt="loc" />
                  <span>{job.location}</span>
                </div>
                <span className="text-gray-400">{job.posted}</span>
              </div>

              <div className="border-t border-gray-100 my-3" />

              <div>
                <div className="text-sm font-bold text-gray-900">{job.salary}</div>
                <div className="text-[11px] text-gray-400">per hour</div>
              </div>
            </div>
          ))}
        </div>

<div className="flex justify-between items-center mt-10">

  {/* Previous */}
  <button
    onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
    className={`flex items-center gap-1 text-sm transition text-gray-400
    `}
  >
    <Image src="/Arrowleft.png" width={14} height={14} alt="prev" />
    Previous
  </button>

  {/* Page Numbers */}
  <div className="flex items-center gap-3">
    {pagination.map((item, index) =>
      item === "..." ? (
        <span key={index} className="text-gray-400 text-sm px-1">…</span>
      ) : (
        <button
          key={index}
          onClick={() => setCurrentPage(item)}
          className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm
            ${item === currentPage
              ? "bg-[#ede6ff] text-[#1C1C7A] font-semibold"
              : "text-gray-700 hover:bg-gray-100"
            }
          `}
        >
          {item}
        </button>
      )
    )}
  </div>

  {/* Next */}
  <button
    onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
    className={`flex items-center gap-1 text-sm transition
      ${currentPage < totalPages ? "text-black" : "text-gray-400"}
    `}
  >
    Next
    <Image src="/Arrow-right.png" width={14} height={14} alt="next" />
  </button>

</div>


      </section>

      <Footer />
    </main>
  );
}
