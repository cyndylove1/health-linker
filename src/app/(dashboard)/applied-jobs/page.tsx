"use client";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import JobCard from "@/components/ui/jobCards";
import Title from "@/components/ui/title";
import Pagination from "@/components/ui/pagination";
import CalendarIcon from "@/components/icon/calendarIcon";
import CalendarMenu from "@/components/dropDown.tsx/calendarMenu";

interface Job {
  id: number;
  title: string;
  company: string;
  type: string;
  location: string;
  date: string;
  salary: string;
  applied: string;
}

export default function AppliedJobs() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const jobs: Job[] = [
    {
      id: 1,
      title: "Surgeon",
      company: "Edoubleone Company",
      type: "Full-Time",
      location: "Remote, USA",
      date: "2 days ago",
      salary: "$50.00 – $70.00",
      applied: "Applied on October 20th",
    },
    {
      id: 2,
      title: "Surgeon",
      company: "Edoubleone Company",
      type: "Full-Time",
      location: "Remote, USA",
      date: "2 days ago",
      salary: "$50.00 – $70.00",
      applied: "Applied on October 20th",
    },
    {
      id: 3,
      title: "Surgeon",
      company: "Edoubleone Company",
      type: "Full-Time",
      location: "Remote, USA",
      date: "2 days ago",
      salary: "$50.00 – $70.00",
      applied: "Applied on October 20th",
    },
    {
      id: 4,
      title: "Surgeon",
      company: "Edoubleone Company",
      type: "Full-Time",
      location: "Remote, USA",
      date: "2 days ago",
      salary: "$50.00 – $70.00",
      applied: "Applied on October 20th",
    },
    {
      id: 5,
      title: "Surgeon",
      company: "Edoubleone Company",
      type: "Full-Time",
      location: "Remote, USA",
      date: "2 days ago",
      salary: "$50.00 – $70.00",
      applied: "Applied on October 20th",
    },
    {
      id: 6,
      title: "Surgeon",
      company: "Edoubleone Company",
      type: "Full-Time",
      location: "Remote, USA",
      date: "2 days ago",
      salary: "$50.00 – $70.00",
      applied: "Applied on October 20th",
    },
    {
      id: 7,
      title: "Surgeon",
      company: "Edoubleone Company",
      type: "Full-Time",
      location: "Remote, USA",
      date: "2 days ago",
      salary: "$50.00 – $70.00",
      applied: "Applied on October 20th",
    },
    {
      id: 8,
      title: "Surgeon",
      company: "Edoubleone Company",
      type: "Full-Time",
      location: "Remote, USA",
      date: "2 days ago",
      salary: "$50.00 – $70.00",
      applied: "Applied on October 20th",
    },
    {
      id: 9,
      title: "Surgeon",
      company: "Edoubleone Company",
      type: "Full-Time",
      location: "Remote, USA",
      date: "2 days ago",
      salary: "$50.00 – $70.00",
      applied: "Applied on October 20th",
    },
    {
      id: 10,
      title: "Surgeon",
      company: "Edoubleone Company",
      type: "Full-Time",
      location: "Remote, USA",
      date: "2 days ago",
      salary: "$50.00 – $70.00",
      applied: "Applied on October 20th",
    },
    {
      id: 11,
      title: "Surgeon",
      company: "Edoubleone Company",
      type: "Full-Time",
      location: "Remote, USA",
      date: "2 days ago",
      salary: "$50.00 – $70.00",
      applied: "Applied on October 20th",
    },
    {
      id: 12,
      title: "Surgeon",
      company: "Edoubleone Company",
      type: "Full-Time",
      location: "Remote, USA",
      date: "2 days ago",
      salary: "$50.00 – $70.00",
      applied: "Applied on October 20th",
    },
  ];

  return (
    <div className="md:px-6 px-4 dm-font leading-[100%] relative">
      <Title text="Applied Jobs" />
      <div className="bg-white border-[1px] border-[var(--black-white-200)] rounded-[16px] px-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="py-6">
            <h2 className="text-[20px] font-[600] text-[var(--black-white-1000)]">
              Your applied jobs
            </h2>
            <p className="text-[20px] font-[400] pt-2 text-[var(--black-white-900)]">
              47 jobs
            </p>
          </div>
          <button
            className="flex items-center justify-center gap-[25px] w-[122px] h-[40px] rounded-[8px] bg-[var(--primary-200)]"
            onClick={toggleMenu}
          >
            <CalendarIcon />
            <IoIosArrowDown size={20} className="text-[#1C9D75]" />
          </button>
          <CalendarMenu isOpen={isOpen} openModal={() => { }} />
        </div>

        {/* Grid of jobs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[15px] mt-6">
          {jobs.map((job) => (
            <div key={job.id}>
              <JobCard
                job={job}
                hideIcon={true}
                icon={false}
                hideText={false}
              />
            </div>
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
