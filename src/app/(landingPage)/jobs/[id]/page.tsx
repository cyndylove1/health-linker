"use client";

import Image from "next/image";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import { useJob } from "@/context/jobContext";
import { useAuth } from "@/context/authContext";
import { useUser } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { IoHeartOutline, IoHeart } from "react-icons/io5";

const primary = "#1C9D75";

export default function PublicJobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const jobId = resolvedParams.id;
  const router = useRouter();
  const { jobs, fetchJobs, getJobDetails, applyForJob, saveJob, unsaveJob } = useJob();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const { savedJobs } = useUser();
  const [selectedJob, setSelectedJob] = useState(Number(jobId));
  const [currentJob, setCurrentJob] = useState<any>(null);
  const [isJobLoading, setIsJobLoading] = useState(true);
  const [jobError, setJobError] = useState<string | null>(null);
  const [savingJobId, setSavingJobId] = useState<string | null>(null);

  // Search state
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [activeFilters, setActiveFilters] = useState<{ [key: string]: string }>({});
  const [showFilterDropdown, setShowFilterDropdown] = useState<string | null>(null);

  // Get related jobs (exclude current job)
  const relatedJobs = jobs.filter(job => String(job.id) !== String(jobId)).slice(0, 6);

  // Handle search functionality
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTitle.trim()) params.set('search', searchTitle.trim());
    if (searchLocation.trim()) params.set('location', searchLocation.trim());

    const queryString = params.toString();
    const searchUrl = queryString ? `/jobs?${queryString}` : '/jobs';
    router.push(searchUrl);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Handle filter functionality
  const handleFilterClick = (filterType: string) => {
    setShowFilterDropdown(showFilterDropdown === filterType ? null : filterType);
  };

  const handleFilterSelect = (filterType: string, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setShowFilterDropdown(null);

    // Apply the filter search
    const params = new URLSearchParams();
    if (searchTitle.trim()) params.set('search', searchTitle.trim());
    if (searchLocation.trim()) params.set('location', searchLocation.trim());

    // Add active filters to search
    const newFilters = { ...activeFilters, [filterType]: value };
    Object.entries(newFilters).forEach(([key, val]) => {
      if (val) params.set(key.toLowerCase().replace(' ', ''), val);
    });

    const queryString = params.toString();
    const searchUrl = queryString ? `/jobs?${queryString}` : '/jobs';
    router.push(searchUrl);
  };

  const clearFilter = (filterType: string) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[filterType];
      return newFilters;
    });
  };

  const handleSaveJob = async (jobId: string, e: React.MouseEvent) => {
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

  // Filter options for dropdowns
  const filterOptions = {
    "Job Location": ["Remote", "New York, NY", "San Francisco, CA", "Los Angeles, CA", "Chicago, IL", "Austin, TX"],
    "Industry": ["Technology", "Healthcare", "Finance", "Education", "Marketing", "Sales"],
    "Work Type": ["Full-Time", "Part-Time", "Contract", "Freelance", "Internship"],
    "Experience level": ["Entry Level", "Mid Level", "Senior Level", "Executive"],
    "Date Posted": ["Last 24 hours", "Last 7 days", "Last 30 days", "Any time"],
    "Remote Only": ["Remote Only", "Hybrid", "On-site"],
    "Job Sector": ["Healthcare", "Technology", "Finance", "Education", "Government"]
  };

  useEffect(() => {
    const loadJobDetails = async () => {
      try {
        setIsJobLoading(true);
        setJobError(null);

        // First try to get job details from API
        const jobDetails = await getJobDetails(jobId);
        setCurrentJob(jobDetails);

        // Also fetch jobs list for related jobs if not already loaded
        if (jobs.length === 0) {
          fetchJobs();
        }
      } catch (error) {
        console.error('Error loading job details:', error);

        // If API fails, try to find in existing jobs array
        if (jobs.length > 0) {
          const foundJob = jobs.find(job => String(job.id) === String(jobId));
          if (foundJob) {
            setCurrentJob(foundJob);
          } else {
            setJobError('Job not found');
          }
        } else {
          setJobError('Job not found');
        }
      } finally {
        setIsJobLoading(false);
      }
    };

    loadJobDetails();
  }, [jobId, getJobDetails, jobs, fetchJobs]);

  if (isJobLoading) {
    return (
      <main className="w-full bg-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg">Loading job details...</div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!currentJob || jobError) {
    return (
      <main className="w-full bg-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Job Not Found</h1>
            <p className="text-gray-600 mb-4">The job you're looking for doesn't exist or has been removed.</p>
            <Link href="/jobs" className="text-[#1C9D75] hover:underline">
              Back to Jobs
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="w-full bg-white">
      <Navbar />

      {/* HERO BANNER */}
      <section className="relative w-full">
        <Image
          src="/About1.png"
          alt="Jobs hero"
          width={1920}
          height={600}
          className="w-full h-[350px] object-cover object-top"
        />
      </section>

      {/* SEARCH BAR */}
      <div className="max-w-3xl mx-auto mt-[-52px] px-4 relative z-20">
        <div className="w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-4 flex items-center gap-4">
          <div className="flex-1 bg-[#F5F5F5] rounded-2xl px-5 py-4">
            <div className="text-sm font-semibold text-gray-800 mb-2">
              Job Title, Keywords, or Company
            </div>
            <input
              type="text"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter job title, keywords, or company"
              className="w-full bg-transparent text-sm text-gray-700 placeholder-gray-500 outline-none"
            />
          </div>

          <div className="flex-1 bg-[#F5F5F5] rounded-2xl px-5 py-4">
            <div className="text-sm font-semibold text-gray-800 mb-2">Location</div>
            <input
              type="text"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="City, state, zip code, remote"
              className="w-full bg-transparent text-sm text-gray-700 placeholder-gray-500 outline-none"
            />
          </div>

          <button
            onClick={handleSearch}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-[#1C9D75] hover:bg-[#178764] transition shadow-md"
          >
            <Image src="/search.png" width={22} height={22} alt="search" />
          </button>
        </div>
      </div>

      {/* FILTER BAR */}
      <section className="max-w-7xl mx-auto px-6 pt-10">
        <div className="flex flex-wrap justify-center gap-3">
          {[
            "Job Location",
            "Industry",
            "Work Type",
            "Experience level",
            "Date Posted",
            "Remote Only",
            "Job Sector",
          ].map((item) => (
            <button
              key={item}
              onClick={() => handleFilterClick(item)}
              className="px-4 py-2 text-xs rounded-full border border-gray-200 bg-white shadow-sm flex items-center gap-2 hover:bg-gray-50 hover:border-gray-300 transition-colors cursor-pointer"
            >
              {item}
              <Image src="/drop-down.png" width={10} height={10} alt="arrow" />
            </button>
          ))}
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-7xl mx-auto px-6 mt-8 mb-20 flex gap-6">

        {/* LEFT SECTION — JOB DESCRIPTION */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm p-6">

          {/* Job Title + Company */}
          <h1 className="text-2xl font-bold text-gray-900">{currentJob.title}</h1>
          <p className="text-sm text-gray-500 mt-1">{currentJob.company}</p>

          {/* Location + Salary + Posted */}
          <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Image src="/location.png" width={15} height={15} alt="loc" />
              {currentJob.location}
            </div>

            <div className="font-semibold text-gray-800">
              {currentJob.salary}
            </div>

            <div className="text-gray-500">{currentJob.date}</div>
          </div>

          {/* Apply Button */}
          {isAuthLoading ? (
            <button
              disabled
              className="mt-4 bg-gray-300 text-gray-500 px-6 py-2 rounded-full shadow cursor-not-allowed"
            >
              Loading...
            </button>
          ) : isAuthenticated ? (
            <button
              onClick={() => applyForJob(String(jobId), {})}
              className="mt-4 bg-[#1C9D75] text-white px-6 py-2 rounded-full shadow hover:bg-[#178764] transition"
            >
              Apply Now →
            </button>
          ) : (
            <Link href="/login">
              <button className="mt-4 bg-[#1C9D75] text-white px-6 py-2 rounded-full shadow hover:bg-[#178764] transition">
                Login to Apply →
              </button>
            </Link>
          )}

          {/* FULL DESCRIPTION BLOCK */}
          <div className="mt-6 text-sm text-gray-700 leading-6">

            <p>
              {currentJob.description || `We are seeking a qualified ${currentJob.title} to join ${currentJob.company}. This is an excellent opportunity for a dedicated professional to contribute to our team and advance their career in a dynamic work environment.`}
            </p>

            <h2 className="text-lg font-semibold mt-6">Job Details</h2>

            <div className="mt-4 space-y-2">
              <div><strong>Position:</strong> {currentJob.title}</div>
              <div><strong>Company:</strong> {currentJob.company}</div>
              <div><strong>Location:</strong> {currentJob.location}</div>
              <div><strong>Job Type:</strong> {currentJob.type}</div>
              <div><strong>Salary:</strong> {currentJob.salary}</div>
              <div><strong>Posted:</strong> {currentJob.date}</div>
            </div>

            <h2 className="text-lg font-semibold mt-6">Key Responsibilities</h2>

            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Execute core responsibilities related to the {currentJob.title} position</li>
              <li>Collaborate effectively with team members and stakeholders</li>
              <li>Maintain high standards of quality and professionalism</li>
              <li>Contribute to continuous improvement initiatives</li>
              <li>Adhere to company policies and industry best practices</li>
              <li>Support business objectives and organizational goals</li>
            </ul>

            <h2 className="text-lg font-semibold mt-6">Qualifications & Skills</h2>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Relevant education and/or experience in the field</li>
              <li>Strong communication and interpersonal skills</li>
              <li>Ability to work independently and as part of a team</li>
              <li>Problem-solving and analytical thinking capabilities</li>
              <li>Commitment to continuous learning and professional development</li>
              <li>Attention to detail and ability to meet deadlines</li>
            </ul>

            <h2 className="text-lg font-semibold mt-6">How to Apply</h2>
            <p className="mt-2">
              To apply for this {currentJob.title} position at {currentJob.company}, please click the "{isAuthenticated ? 'Apply Now' : 'Login to Apply'}" button below.
              {isAuthenticated ? ' You can submit your application directly.' : " You'll need to create an account or log in to submit your application."}
            </p>

          </div>
        </div>

        {/* RIGHT SECTION — RELATED JOBS */}
        <div className="w-[320px] flex-shrink-0 bg-white border border-gray-200 rounded-xl shadow-sm p-4">
          <h3 className="text-lg font-semibold mb-4">Related Jobs</h3>

          {[1, 2, 3, 4, 5, 6].map((job) => (
            <Link
              key={job}
              href={`/jobs/${job}`}
              onClick={() => setSelectedJob(job)}
            >
              <div
                className={`
                  relative rounded-2xl p-4 mb-4 cursor-pointer transition-all
                  shadow-[0px_2px_10px_rgba(0,0,0,0.05)]
                  ${selectedJob === job
                    ? "border-2 border-[#1C9D75] shadow-md"
                    : "border border-gray-200"
                  }
                `}
              >
                <div className="absolute top-4 right-4">
                  <button
                    onClick={(e) => handleSaveJob(String(job), e)}
                    disabled={savingJobId === String(job)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${savedJobs.some(saved => String(saved.id) === String(job))
                        ? 'bg-[var(--primary-1200)] hover:bg-[var(--primary-1000)]'
                        : 'bg-[#F2F2F2] hover:bg-[#e0e0e0]'
                      } ${savingJobId === String(job) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {savedJobs.some(saved => String(saved.id) === String(job)) ? (
                      <IoHeart size={18} className="text-white" />
                    ) : (
                      <IoHeartOutline size={18} className="text-gray-400" />
                    )}
                  </button>
                </div>

                <h4 className="text-base font-semibold">Dental Surgeon</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Reddington Multi Specialist Hospital
                </p>

                <div className="mt-3">
                  <span
                    className="inline-block text-xs font-medium px-3 py-1 rounded-full"
                    style={{
                      background: "rgba(28,157,117,0.15)",
                      color: primary,
                    }}
                  >
                    Full-Time
                  </span>
                </div>

                <div className="flex items-center justify-between mt-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Image src="/location.png" width={16} height={16} alt="loc" />
                    Lagos
                  </div>
                  <div className="text-sm text-gray-500">2 days ago</div>
                </div>

                <div className="border-t border-gray-200 my-3"></div>

                <div className="text-base font-bold text-black">
                  $50.00 – $70.00{" "}
                  <span className="text-sm text-gray-500 font-normal">per hour</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}