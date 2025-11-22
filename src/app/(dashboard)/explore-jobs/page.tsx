"use client";
import { useState } from "react";
import JobCard from "@/components/ui/jobCards";
import JobFilter from "@/components/ui/jobFilter";
import Title from "@/components/ui/title";
import Pagination from "@/components/ui/pagination";
import Link from "next/link";

interface Job {
  id: number;
  title: string;
  company: string;
  type: string;
  location: string;
  date: string;
  salary: string;
}

interface PageProps {
  params: { page: string };
}

export default function ExploreJobs({ params }: PageProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const jobs: Job[] = [
    {
      id: 1,
      title: "Surgeon",
      company: "Edoubleone Company",
      type: "Full-Time",
      location: "Remote, USA",
      date: "2 days ago",
      salary: "$50.00 – $70.00",
    },
    {
      id: 2,
      title: "Surgeon",
      company: "Edoubleone Company",
      type: "Full-Time",
      location: "Remote, USA",
      date: "2 days ago",
      salary: "$50.00 – $70.00",
    },
    {
      id: 3,
      title: "Surgeon",
      company: "Edoubleone Company",
      type: "Full-Time",
      location: "Remote, USA",
      date: "2 days ago",
      salary: "$50.00 – $70.00",
    },
    {
      id: 4,
      title: "Surgeon",
      company: "Edoubleone Company",
      type: "Full-Time",
      location: "Remote, USA",
      date: "2 days ago",
      salary: "$50.00 – $70.00",
    },
    {
      id: 5,
      title: "Surgeon",
      company: "Edoubleone Company",
      type: "Full-Time",
      location: "Remote, USA",
      date: "2 days ago",
      salary: "$50.00 – $70.00",
    },
    {
      id: 6,
      title: "Surgeon",
      company: "Edoubleone Company",
      type: "Full-Time",
      location: "Remote, USA",
      date: "2 days ago",
      salary: "$50.00 – $70.00",
    },
    {
      id: 7,
      title: "Surgeon",
      company: "Edoubleone Company",
      type: "Full-Time",
      location: "Remote, USA",
      date: "2 days ago",
      salary: "$50.00 – $70.00",
    },
    {
      id: 8,
      title: "Surgeon",
      company: "Edoubleone Company",
      type: "Full-Time",
      location: "Remote, USA",
      date: "2 days ago",
      salary: "$50.00 – $70.00",
    },
    {
      id: 9,
      title: "Surgeon",
      company: "Edoubleone Company",
      type: "Full-Time",
      location: "Remote, USA",
      date: "2 days ago",
      salary: "$50.00 – $70.00",
    },
    {
      id: 10,
      title: "Surgeon",
      company: "Edoubleone Company",
      type: "Full-Time",
      location: "Remote, USA",
      date: "2 days ago",
      salary: "$50.00 – $70.00",
    },
    {
      id: 11,
      title: "Surgeon",
      company: "Edoubleone Company",
      type: "Full-Time",
      location: "Remote, USA",
      date: "2 days ago",
      salary: "$50.00 – $70.00",
    },
    {
      id: 12,
      title: "Surgeon",
      company: "Edoubleone Company",
      type: "Full-Time",
      location: "Remote, USA",
      date: "2 days ago",
      salary: "$50.00 – $70.00",
    },
  ];

  return (
    <div className="px-4 md:px-6 dm-font leading-[100%]">
      <Title text="Explore Jobs" />
      <div className="bg-white border-[1px] border-[var(--black-white-200)] rounded-[16px] px-6 mb-6">
        <div className="py-6">
          <h2 className="text-[20px] font-[600] text-[var(--black-white-1000)]">
            All Jobs
          </h2>
          <p className="text-[20px] font-[400] pt-2 text-[var(--black-white-900)]">
            10,000+ jobs
          </p>
        </div>

        {/* jobfilter */}
        <JobFilter />

        {/* Grid of jobs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[15px] mt-6">
          {jobs.map((job) => (
            <Link key={job.id} href={`/explore-jobs/details/${job.id}`}>
              <JobCard job={job} hideIcon={false} icon={true} hideText={true} />
            </Link>
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={10}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
