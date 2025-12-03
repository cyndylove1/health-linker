"use client";
import { useState } from "react";
import JobCard from "@/components/ui/jobCards";
import JobFilter from "@/components/ui/jobFilter";
import Title from "@/components/ui/title";
import Pagination from "@/components/ui/pagination";
import Link from "next/link";
import { useUser } from "@/context/userContext";

export default function SavedJobs() {
  const [currentPage, setCurrentPage] = useState(1);
  const { savedJobs, isLoadingStats } = useUser();

  // Pagination logic (client-side for now as context returns all saved jobs)
  const itemsPerPage = 12;
  const totalPages = Math.ceil(savedJobs.length / itemsPerPage);
  const currentJobs = savedJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="md:px-6 px-4 dm-font leading-[100%]">
      <Title text="Saved Jobs" />
      <div className="bg-white border-[1px] border-[var(--black-white-200)] rounded-[16px] px-6 mb-6">
        <div className="py-6">
          <h2 className="text-[20px] font-[600] text-[var(--black-white-1000)]">
            All Jobs
          </h2>
          <p className="text-[20px] font-[400] pt-2 text-[var(--black-white-900)]">
            {savedJobs.length} jobs
          </p>
        </div>

        {/* jobfilter */}
        <JobFilter />

        {/* Grid of jobs */}
        {isLoadingStats ? (
          <div className="py-10 text-center">Loading saved jobs...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[15px] mt-6">
            {currentJobs.map((job) => (
              <Link key={job.id} href={`/explore-jobs/details/${job.id}`}>
                <JobCard job={job} hideIcon={false} icon={true} hideText={true} />
              </Link>
            ))}
            {savedJobs.length === 0 && (
              <div className="col-span-full text-center py-10">
                No saved jobs found.
              </div>
            )}
          </div>
        )}

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
    </div>
  );
}
