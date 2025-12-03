"use client";
import { useEffect, useState, use } from "react";
import { MapPin } from "lucide-react";
import { useJob, Job } from "@/context/jobContext";
import { toast } from "react-toastify";
import { IoHeartOutline, IoShareSocialOutline } from "react-icons/io5";
import BackButton from "@/components/button/backButton";
import JobFilter from "@/components/ui/jobFilter";
import JobDescription from "@/components/ui/jobDescription";
import ShareMenu from "@/components/dropDown.tsx/shareMenu";

export default function Details({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const jobId = resolvedParams.id;

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const { applyForJob, getJobDetails } = useJob();

  const [selectedJob, setSelectedJob] = useState(Number(jobId));
  const [isApplying, setIsApplying] = useState(false);
  const [jobData, setJobData] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch job details
  useEffect(() => {
    const fetchJobData = async () => {
      if (!jobId) return;

      try {
        setIsLoading(true);
        const job = await getJobDetails(jobId);
        setJobData(job);
      } catch (error) {
        console.error("Failed to fetch job details:", error);
        toast.error("Failed to load job details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobData();
  }, [jobId, getJobDetails]);

  const handleApplyJob = async () => {
    try {
      setIsApplying(true);

      const applicationData = {
        coverLetter:
          "I am interested in this position and would like to apply.",
        resume: "resume.pdf",
      };

      await applyForJob(jobId, applicationData);
    } catch (error) {
      console.error("Failed to apply for job:", error);
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <>
      <div>
        <div className="md:px-6 px-4 dm-font leading-[100%]">
          <BackButton />

          <div className="bg-white border-[1px] border-[var(--black-white-200)] rounded-[16px] px-6 mb-6">
            <div className="py-6">
              <h2 className="text-[20px] font-[600] text-[var(--black-white-1000)]">
                All Jobs
              </h2>
              <p className="text-[20px] font-[400] pt-2 text-[var(--black-white-900)]">
                10,000+ jobs
              </p>
            </div>

            <JobFilter />

            {/* JOB HEADER */}
            <div className="border-b border-[var(--black-white-200)] mt-6">
              <div className="flex justify-between">
                <h2 className="font-[600] text-[16px] text-[var(--black-white-1100)]">
                  {jobData?.title || "Job Title"}
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

                  <div className="bg-[#bbbbbb] w-[25px] h-[25px] rounded-full flex items-center justify-center">
                    <IoHeartOutline size={20} className="text-white" />
                  </div>
                </div>
              </div>

              <p className="font-[400] text-[14px] text-[var(--black-white-1100)]">
                {jobData?.company || "Company Name"}
              </p>

              <span className="inline-block mt-3 px-3 py-1 text-[14px] font-[500] bg-[var(--primary-200)] text-[var(--primary-1200)] rounded-full">
                {jobData?.type}
              </span>

              <div className="flex items-center justify-between text-[var(--black-white-1100)] py-2">
                <div className="flex items-center gap-[7px] font-[400] text-[14px]">
                  <MapPin size={16} />
                  <span>{jobData?.location || "Location"}</span>
                </div>
                <div className="font-[400] text-[14px]">
                  {jobData?.date || "Recently posted"}
                </div>
              </div>

              <div className="flex items-center gap-[5px] py-2">
                <p className="text-[16px] font-[700]">
                  {jobData?.salary || "Salary not specified"}
                </p>
                <h2 className="text-[12px] font-[500] text-[var(--black-white-700)]">
                  per hour
                </h2>
              </div>
            </div>

            {/* APPLY BUTTON */}
            <div className="flex justify-end border-b border-[var(--black-white-200)] py-2">
              <button
                className={`flex items-center justify-center gap-[5px] rounded-[50px] h-[40px] w-[128px] font-[600] text-[16px] ${
                  isApplying
                    ? "bg-[#8dceba] cursor-not-allowed text-white"
                    : "bg-[var(--primary-1200)] text-white hover:bg-[#078e63]"
                }`}
                onClick={handleApplyJob}
                disabled={isApplying}
              >
                {isApplying ? "Applying..." : "Apply "}
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

            {/* JOB DESCRIPTION COMPONENT (Dynamic) */}
            <JobDescription jobData={jobData} />
          </div>
        </div>
      </div>
    </>
  );
}
