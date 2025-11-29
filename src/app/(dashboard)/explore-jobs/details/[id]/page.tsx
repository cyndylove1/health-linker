"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import { ArrowLeft } from "lucide-react";
import { useJob, Job } from "@/context/jobContext";
import { toast } from "react-toastify";

const primary = "#1C9D75";

export default function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const jobId = resolvedParams.id;
  const { applyForJob, getJobDetails, jobs } = useJob();

  // State for selected job card and job data
  const [selectedJob, setSelectedJob] = useState(Number(jobId));
  const [isApplying, setIsApplying] = useState(false);
  const [jobData, setJobData] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch job details on component mount
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
      // You can customize this application data as needed
      const applicationData = {
        coverLetter: "I am interested in this position and would like to apply.",
        resume: "resume.pdf", // This would typically come from user's profile
      };
      
      await applyForJob(jobId, applicationData);
    } catch (error) {
      console.error("Failed to apply for job:", error);
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Back Button */}
      <div className="flex items-center gap-3">
        <Link 
          href="/explore-jobs"
          className="flex items-center gap-2 text-[var(--black-white-700)] hover:text-[var(--primary-1200)] transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Jobs
        </Link>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex gap-6">
        {isLoading ? (
          <>
            <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
                <div className="h-10 bg-gray-200 rounded w-32 mb-6"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            </div>
            <div className="w-[320px] flex-shrink-0 bg-white border border-gray-200 rounded-xl shadow-sm p-4">
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-32 bg-gray-200 rounded mb-4"></div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* LEFT SECTION — JOB DESCRIPTION */}
            <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm p-6">

              {/* Job Title + Company */}
              <h1 className="text-2xl font-bold text-gray-900">{jobData?.title || 'Job Title'}</h1>
              <p className="text-sm text-gray-500 mt-1">{jobData?.company || 'Company Name'}</p>

              {/* Location + Salary + Posted */}
              <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Image src="/location.png" width={15} height={15} alt="loc" />
                  {jobData?.location || 'Location'}
                </div>

                <div className="font-semibold text-gray-800">
                  {jobData?.salary || 'Salary not specified'}
                </div>

                <div className="text-gray-500">{jobData?.date || 'Recently posted'}</div>
              </div>

              {/* Apply Button */}
              <button 
                onClick={handleApplyJob}
                disabled={isApplying}
                className={`mt-4 px-6 py-2 rounded-full shadow transition ${
                  isApplying 
                    ? 'bg-gray-400 cursor-not-allowed text-white'
                    : 'bg-[#1C9D75] text-white hover:bg-[#178764]'
                }`}
              >
                {isApplying ? 'Applying...' : 'Apply →'}
              </button>

              {/* FULL DESCRIPTION BLOCK */}
              <div className="mt-6 text-sm text-gray-700 leading-6">
                {jobData?.description ? (
                  <div dangerouslySetInnerHTML={{ __html: jobData.description }} />
                ) : (
                  <p>No job description available.</p>
                )}

                {/* Requirements Section */}
                {jobData?.requirements && jobData.requirements.length > 0 && (
                  <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-3">Requirements</h2>
                    <ul className="list-disc ml-6 space-y-1">
                      {jobData.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Benefits Section */}
                {jobData?.benefits && jobData.benefits.length > 0 && (
                  <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-3">Benefits</h2>
                    <ul className="list-disc ml-6 space-y-1">
                      {jobData.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT SECTION — RELATED JOBS */}
            <div className="w-[320px] flex-shrink-0 bg-white border border-gray-200 rounded-xl shadow-sm p-4">
              <h3 className="text-lg font-semibold mb-4">Related Jobs</h3>

              {jobs.slice(0, 6).map((job) => (
                <Link
                  key={job.id}
                  href={`/explore-jobs/details/${job.id}`}
                  onClick={() => setSelectedJob(Number(job.id))}
                >
                  <div
                    className={`
                      relative rounded-2xl p-4 mb-4 cursor-pointer transition-all
                      shadow-[0px_2px_10px_rgba(0,0,0,0.05)]
                      ${
                        selectedJob === Number(job.id)
                          ? "border-2 border-[#1C9D75] shadow-md"
                          : "border border-gray-200"
                      }
                    `}
                  >
                    <div className="absolute top-4 right-4">
                      <div className="w-8 h-8 rounded-full bg-[#F2F2F2] flex items-center justify-center">
                        <Image src="/wish.png" alt="save" width={18} height={18} />
                      </div>
                    </div>

                    <h4 className="text-base font-semibold">{job.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {job.company}
                    </p>

                    <div className="mt-3">
                      <span
                        className="inline-block text-xs font-medium px-3 py-1 rounded-full"
                        style={{
                          background: "rgba(28,157,117,0.15)",
                          color: primary,
                        }}
                      >
                        {job.type}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Image src="/location.png" width={16} height={16} alt="loc" />
                        {job.location}
                      </div>
                      <div className="text-sm text-gray-500">{job.date}</div>
                    </div>

                    <div className="border-t border-gray-200 my-3"></div>

                    <div className="text-base font-bold text-black">
                      {job.salary}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
