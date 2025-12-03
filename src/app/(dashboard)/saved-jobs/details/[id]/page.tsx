"use client";
import { useState } from "react";
import { MapPin } from "lucide-react";
import { IoHeartOutline, IoShareSocialOutline, IoHeart } from "react-icons/io5";
import BackButton from "@/components/button/backButton";
import JobFilter from "@/components/ui/jobFilter";
import SavedJobDescription from "@/components/ui/savedJobDescriptions";
import ShareMenu from "@/components/dropDown.tsx/shareMenu";
import { useParams } from "next/navigation";
import { useJob } from "@/context/jobContext";
import { useUser } from "@/context/userContext";


export default function Details() {
  const params = useParams();
  const { id } = params;
  const { jobs, applyForJob, saveJob, unsaveJob } = useJob();
  const { savedJobs } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  // Find the job from saved jobs or all jobs
  const job = savedJobs.find((j) => String(j.id) === String(id)) ||
    jobs.find((j) => String(j.id) === String(id));

  const isSaved = savedJobs.some((j) => String(j.id) === String(id));

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleApply = async () => {
    if (job) {
      try {
        await applyForJob(job.id, {});
      } catch (error) {
        // Error handled in context
      }
    }
  };

  const handleSaveToggle = async () => {
    if (!job) return;
    try {
      if (isSaved) {
        await unsaveJob(job.id);
      } else {
        await saveJob(job.id);
      }
    } catch (error) {
      // Error handled in context
    }
  };

  if (!job) {
    return (
      <div className="md:px-6 px-4 dm-font leading-[100%] py-10 text-center">
        <BackButton />
        <p className="mt-4">Job not found or loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="md:px-6 px-4 dm-font leading-[100%]">
        <BackButton />
        <div className="bg-white border-[1px] border-[var(--black-white-200)] rounded-[16px] px-6 mb-6">
          <div className="py-6">
            <h2 className="text-[20px] font-[600] text-[var(--black-white-1000)]">
              All Jobs
            </h2>
            <p className="text-[20px] font-[400] pt-2 text-[var(--black-white-900)]">
              {jobs.length}+ jobs
            </p>
          </div>
          <JobFilter />
          {/* job title */}
          <div className="border-b border-[var(--black-white-200)] mt-6">
            <div className="flex justify-between">
              <h2 className="font-[600] text-[16px] text-[var(--black-white-1100)]">
                {job.title}
              </h2>
              <div className="flex items-center gap-[10px]">
                <div>
                  <button
                    className="text-[20px] text-gray-800"
                    onClick={toggleMenu}
                  >
                    <IoShareSocialOutline size={22} />
                  </button>
                  <ShareMenu
                    menuOpen={menuOpen}
                    closeMenu={() => setMenuOpen(false)}
                  />
                </div>

                <button
                  onClick={handleSaveToggle}
                  className="bg-[#bbbbbb] w-[25px] h-[25px] rounded-full flex items-center justify-center hover:bg-[var(--primary-1200)] transition-colors"
                >
                  {isSaved ? (
                    <IoHeart size={20} className="text-[var(--primary-1200)]" />
                  ) : (
                    <IoHeartOutline size={20} className="text-white" />
                  )}
                </button>
              </div>
            </div>
            <p className="font-[400] text-[14px] text-[var(--black-white-1100)]">
              {job.company}
            </p>
            <span className="inline-block mt-3 px-3 py-1 text-[14px] font-[500] bg-[var(--primary-200)] text-[var(--primary-1200)] rounded-full">
              {job.type}
            </span>
            <div className="flex items-center justify-between text-[var(--black-white-1100)] py-2">
              <div className="flex items-center gap-[7px] font-[400] text-[14px]">
                <MapPin size={16} />
                <span className="font-[400] text-[14px] text-[var(--black-white-1100)]">
                  {job.location}
                </span>
              </div>
              <div className="font-[400] text-[14px]">{job.date}</div>
            </div>

            <div className="flex items-center gap-[5px] py-2">
              <p className="text-[14px] font-[700]">{job.salary}</p>
              {/* <h2 className="text-[12px] font-[500] text-[var(--black-white-700)]">
                per hour
              </h2> */}
            </div>
          </div>
          {/* Apply button */}
          <div className="flex justify-end border-b border-[var(--black-white-200)] py-2">
            <button
              onClick={handleApply}
              className="flex items-center justify-center gap-[5px] bg-[var(--primary-1200)] hover:bg-[#078e63] text-white rounded-[50px] h-[40px] w-[128px] font-[600] text-[16px]"
            >
              Apply
              <svg
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.3848 15.5898L10.3168 21.4981"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21.1388 11.5875L19.9093 11.5442C17.9172 11.4742 16.9212 11.4392 16.5748 12.0415C16.2284 12.6438 16.7976 13.4211 17.936 14.9756L18.8356 16.2041C19.974 17.7586 20.5432 18.5359 21.222 18.3875C21.9008 18.239 22.1681 17.2789 22.7026 15.3586L23.0325 14.1734C23.3543 13.0172 23.5152 12.439 23.2266 12.0449C22.938 11.6508 22.3382 11.6296 21.1388 11.5875Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <SavedJobDescription />
        </div>
      </div>
    </>
  );
}
