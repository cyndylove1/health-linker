"use client";

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useJob } from "@/context/jobContext";
import { useAuth } from "@/context/authContext";
import { useUser } from "@/context/userContext";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

const primary = "#1C9D75";

export default function LatestJobs() {
  const { jobs, isLoading, saveJob, unsaveJob } = useJob();
  const { savedJobs } = useUser();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [savingJobId, setSavingJobId] = useState(null);
  const [showAll, setShowAll] = useState(false);

  // Get jobs to display based on showAll state
  const latestJobs = showAll ? jobs : jobs.slice(0, 8);

  const handleSaveJob = async (jobId, e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    setSavingJobId(jobId);
    const isSaved = savedJobs.some(job => String(job.id) === String(jobId));

    try {
      if (isSaved) {
        await unsaveJob(jobId);
      } else {
        await saveJob(jobId);
      }
    } catch (error) {
      console.error('Save job failed:', error);
    } finally {
      setSavingJobId(null);
    }
  };

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

        {isLoading ? (
          <div className="text-center py-10">Loading latest jobs...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {latestJobs.map((job) => (
                <Link key={job.id} href={`/jobs/${job.id}`}>
                  <div className="relative bg-white rounded-xl border border-gray-100 shadow-sm p-5 overflow-hidden cursor-pointer hover:shadow-md transition">

                    <div className="absolute top-4 right-4">
                      <button
                        onClick={(e) => handleSaveJob(String(job.id), e)}
                        disabled={savingJobId === String(job.id)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${savedJobs.some(saved => String(saved.id) === String(job.id))
                          ? 'bg-[#1C9D75] hover:bg-[#178764]'
                          : 'bg-white border border-gray-200 hover:bg-gray-50'
                          } ${savingJobId === String(job.id) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        {savedJobs.some(saved => String(saved.id) === String(job.id)) ? (
                          <IoHeart size={18} className="text-white" />
                        ) : (
                          <IoHeartOutline size={18} className="text-gray-400" />
                        )}
                      </button>
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
                        {job.date}
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

            {latestJobs.length === 0 && (
              <div className="text-center py-10 text-gray-500">
                No jobs available at the moment.
              </div>
            )}
          </>
        )}

        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-3 bg-[#1C9D75] text-white px-6 py-2 rounded-full shadow-md hover:bg-[#178764] transition"
          >
            {showAll ? "Show less" : "View all"}
            <Image
              src="/arrow-left.png"
              alt="arrow"
              width={16}
              height={16}
              className={`object-contain transition-transform ${showAll ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

      </div>
    </section>
  );
}
