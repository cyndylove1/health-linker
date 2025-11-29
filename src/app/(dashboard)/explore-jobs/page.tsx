"use client";
import JobCard from "@/components/ui/jobCards";
import JobFilter from "@/components/ui/jobFilter";
import Title from "@/components/ui/title";
import Pagination from "@/components/ui/pagination";
import Link from "next/link";
import { useJob } from "@/context/jobContext";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ExploreJobs() {
  const { jobs, totalJobs, currentPage, totalPages, fetchJobs, isLoading } = useJob();
  const searchParams = useSearchParams();

  // Get search parameters if they exist
  const search = searchParams.get('search');
  const location = searchParams.get('location');

  useEffect(() => {
    // Fetch jobs with search parameters if they exist, otherwise fetch all jobs
    const filters: any = { page: 1, limit: 12 };
    if (search) filters.search = search;
    if (location) filters.location = location;

    fetchJobs(filters);
  }, [searchParams]); // Re-fetch when search params change

  const handlePageChange = (page: number) => {
    const filters: any = { page };
    if (search) filters.search = search;
    if (location) filters.location = location;
    fetchJobs(filters);
  };

  return (
    <div className="px-4 md:px-6 dm-font leading-[100%]">
      <Title text="Explore Jobs" />
      <div className="bg-white border-[1px] border-[var(--black-white-200)] rounded-[16px] px-6 mb-6">
        <div className="py-6">
          <h2 className="text-[20px] font-[600] text-[var(--black-white-1000)]">
            {search || location ? "Search Results" : "All Jobs"}
          </h2>
          <p className="text-[20px] font-[400] pt-2 text-[var(--black-white-900)]">
            {totalJobs > 0 ? `${totalJobs} ${totalJobs === 1 ? 'job' : 'jobs'} found` : "No jobs available"}
          </p>
        </div>

        {/* jobfilter */}
        <JobFilter />

        {/* Grid of jobs */}
        {isLoading ? (
          <div className="py-10 text-center">Loading jobs...</div>
        ) : jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[15px] mt-6">
            {jobs.map((job) => (
              <Link key={job.id} href={`/explore-jobs/details/${job.id}`}>
                <JobCard job={job} hideIcon={false} icon={true} hideText={true} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-10 text-center text-gray-500">
            No jobs found. {search || location ? "Try adjusting your search criteria." : "Check back later for new opportunities."}
          </div>
        )}

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
