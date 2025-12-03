"use client";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import JobCard from "@/components/ui/jobCards";
import Title from "@/components/ui/title";
import Pagination from "@/components/ui/pagination";
import CalendarIcon from "@/components/icon/calendarIcon";
import CalendarMenu from "@/components/dropDown.tsx/calendarMenu";
import { useUser } from "@/context/userContext";
import Link from "next/link";

export default function AppliedJobs() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { appliedJobs, isLoadingStats } = useUser();

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

  // Pagination logic
  const itemsPerPage = 12;
  const totalPages = Math.ceil(appliedJobs.length / itemsPerPage);
  const currentJobs = appliedJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
              {appliedJobs.length} jobs
            </p>
          </div>
          <button
            className="flex items-center justify-center gap-[25px] w-[122px] h-[40px] rounded-[8px] bg-[var(--primary-200)]"
            onClick={toggleMenu}
          >
            <CalendarIcon />
            <IoIosArrowDown size={20} className="text-[#1C9D75]" />
          </button>
          <CalendarMenu isOpen={isOpen} openModal={() => setIsOpen(false)} />
        </div>

        {/* Grid of jobs */}
        {isLoadingStats ? (
          <div className="py-10 text-center">Loading applied jobs...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[15px] mt-6">
            {currentJobs.map((job) => (
              <div key={job.id}>
                <Link href={`/explore-jobs/details/${job.id}`}>
                  <JobCard
                    job={job}
                    hideIcon={true}
                    icon={false}
                    hideText={false}
                  />
                </Link>
              </div>
            ))}
            {appliedJobs.length === 0 && (
              <div className="col-span-full text-center py-10">
                No applied jobs found.
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
