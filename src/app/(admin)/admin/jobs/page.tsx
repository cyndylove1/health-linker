'use client';
import { useState } from "react";
import { useAdmin } from "@/context/adminContext";
import Title from "@/components/ui/title";
import Link from "next/link";
import DeleteModal from "@/components/modal/deleteModal";
import AdminCreateJobModal from "@/components/modal/adminCreateJobModal";
import JobApplicationsModal from "@/components/modal/jobApplicationsModal";
import { toast } from "react-toastify";

export default function AdminJobsPage() {
  const { adminJobs, jobsLoading, jobsError, deleteJob, isDeletingJob } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showApplicationsModal, setShowApplicationsModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  const filteredJobs = adminJobs?.filter((job: any) => {
    const companyName = typeof job.company === 'object' ? job.company?.name : job.company;
    const matchesSearch =
      job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      companyName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  }) || [];

  const handleDeleteClick = (id: string, title: string) => {
    setSelectedJob({ id, title });
    setShowDeleteModal(true);
  };

  const handleViewApplications = (job: any) => {
    setSelectedJob(job);
    setShowApplicationsModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedJob) {
      await deleteJob(selectedJob.id);
      setShowDeleteModal(false);
      setSelectedJob(null);
    }
  };

  if (jobsLoading) {
    return (
      <div className="px-4 py-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading jobs...</div>
        </div>
      </div>
    );
  }

  if (jobsError) {
    return (
      <div className="px-4 py-6">
        <div className="flex flex-col items-center justify-center h-64">
          <div className="text-lg text-red-600 mb-2">Failed to load jobs</div>
          <div className="text-sm text-gray-600">{jobsError?.message || 'An error occurred'}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-2 sm:px-4 dm-font leading-[100%]">
      <Title text="Job Management" />

      {/* Filters Section */}
      <div className="bg-white rounded-[16px] border-[1px] border-[var(--black-white-200)] p-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
                stroke="currentColor"
                strokeWidth="1.67"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="text"
              placeholder="Search by title or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[var(--black-white-200)] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[var(--primary-1200)] text-[14px]"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-[var(--black-white-200)] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[var(--primary-1200)] text-[14px]"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="draft">Draft</option>
            <option value="expired">Expired</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-4">
          <p className="text-[12px] sm:text-[14px] text-[var(--black-white-800)]">
            Showing {filteredJobs.length} of {adminJobs?.length || 0} jobs
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-[var(--primary-1200)] text-white rounded-[10px] hover:bg-[#078e63] transition-colors text-[14px] font-[500]"
          >
            + Add New Job
          </button>
        </div>
      </div>

      {/* Jobs Table - Desktop */}
      <div className="bg-white rounded-[16px] border-[1px] border-[var(--black-white-200)] overflow-hidden hidden md:block">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[var(--black-white-200)]">
            <thead className="bg-[var(--black-white-100)]">
              <tr>
                <th className="px-6 py-3 text-left text-[12px] font-[600] text-[var(--black-white-900)] uppercase tracking-wider">
                  Job Title
                </th>
                <th className="px-6 py-3 text-left text-[12px] font-[600] text-[var(--black-white-900)] uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-[12px] font-[600] text-[var(--black-white-900)] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-[12px] font-[600] text-[var(--black-white-900)] uppercase tracking-wider">
                  Applications
                </th>
                <th className="px-6 py-3 text-left text-[12px] font-[600] text-[var(--black-white-900)] uppercase tracking-wider">
                  Posted Date
                </th>
                <th className="px-6 py-3 text-left text-[12px] font-[600] text-[var(--black-white-900)] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[var(--black-white-200)]">
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-[14px] text-[var(--black-white-800)]">
                    No jobs found
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job: any) => (
                  <tr key={job.id} className="hover:bg-[var(--black-white-100)] transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-[14px] font-[600] text-[var(--black-white-1000)]">
                        {job.title}
                      </div>
                      <div className="text-[12px] text-[var(--black-white-800)]">
                        {job.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[14px] text-[var(--black-white-900)]">
                      {typeof job.company === 'object' && job.company?.name ? job.company.name : job.company || 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={job.status} />
                    </td>
                    <td className="px-6 py-4 text-[14px] text-[var(--black-white-900)]">
                      <button
                        onClick={() => handleViewApplications(job)}
                        className="text-[var(--primary-1200)] hover:text-[var(--primary-1400)] font-[600] hover:underline transition-colors"
                        title="View applications"
                      >
                        {job.applicationCount || 0}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-[14px] text-[var(--black-white-800)]">
                      {job.postedDate ? new Date(job.postedDate).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewApplications(job)}
                          className="p-2 text-[var(--primary-1200)] hover:bg-[var(--primary-200)] rounded-lg transition-colors"
                          title="View Applications"
                        >
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.5 9C1.5 9 4.5 3 9 3C13.5 3 16.5 9 16.5 9C16.5 9 13.5 15 9 15C4.5 15 1.5 9 1.5 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteClick(job.id, job.title)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          title="Delete"
                          disabled={isDeletingJob}
                        >
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.75 4.5H14.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M7.5 7.5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10.5 7.5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4.5 4.5L5.25 13.5C5.25 14.3284 5.92157 15 6.75 15H11.25C12.0784 15 12.75 14.3284 12.75 13.5L13.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M7.5 4.5V3.75C7.5 3.33579 7.83579 3 8.25 3H9.75C10.1642 3 10.5 3.33579 10.5 3.75V4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Jobs Cards - Mobile */}
      <div className="md:hidden space-y-3">
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-[16px] border-[1px] border-[var(--black-white-200)] p-6 text-center">
            <p className="text-[14px] text-[var(--black-white-800)]">No jobs found</p>
          </div>
        ) : (
          filteredJobs.map((job: any) => (
            <div key={job.id} className="bg-white rounded-[16px] border-[1px] border-[var(--black-white-200)] p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="text-[14px] font-[600] text-[var(--black-white-1000)] mb-1">
                    {job.title}
                  </h3>
                  <p className="text-[12px] text-[var(--black-white-800)]">
                    {typeof job.company === 'object' && job.company?.name ? job.company.name : job.company || 'N/A'}
                  </p>
                  <p className="text-[12px] text-[var(--black-white-800)]">
                    {job.location}
                  </p>
                </div>
                <StatusBadge status={job.status} />
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3 pt-3 border-t border-[var(--black-white-200)]">
                <div>
                  <p className="text-[11px] text-[var(--black-white-800)] mb-1">Applications</p>
                  <button
                    onClick={() => handleViewApplications(job)}
                    className="text-[14px] font-[600] text-[var(--primary-1200)] hover:underline"
                  >
                    {job.applicationCount || 0}
                  </button>
                </div>
                <div>
                  <p className="text-[11px] text-[var(--black-white-800)] mb-1">Posted</p>
                  <p className="text-[14px] font-[600] text-[var(--black-white-1000)]">
                    {job.postedDate ? new Date(job.postedDate).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-[var(--black-white-200)]">
                <Link href={`/jobs/${job.id}`} className="flex-1">
                  <button className="w-full px-3 py-2 bg-[var(--primary-1200)] text-white rounded-[10px] hover:bg-[#078e63] transition-colors text-[13px] font-[500] flex items-center justify-center gap-1">
                    <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.5 9C1.5 9 4.5 3 9 3C13.5 3 16.5 9 16.5 9C16.5 9 13.5 15 9 15C4.5 15 1.5 9 1.5 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    View
                  </button>
                </Link>
                <button
                  onClick={() => handleDeleteClick(job.id, job.title)}
                  className="px-3 py-2 border-[1px] border-red-600 text-red-600 rounded-[10px] hover:bg-red-50 transition-colors text-[13px] font-[500] flex items-center justify-center gap-1"
                  disabled={isDeletingJob}
                >
                  <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.75 4.5H14.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7.5 7.5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10.5 7.5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4.5 4.5L5.25 13.5C5.25 14.3284 5.92157 15 6.75 15H11.25C12.0784 15 12.75 14.3284 12.75 13.5L13.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7.5 4.5V3.75C7.5 3.33579 7.83579 3 8.25 3H9.75C10.1642 3 10.5 3.33579 10.5 3.75V4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Job Modal */}
      <AdminCreateJobModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />

      {/* Job Applications Modal */}
      {showApplicationsModal && selectedJob && (
        <JobApplicationsModal
          isOpen={showApplicationsModal}
          onClose={() => {
            setShowApplicationsModal(false);
            setSelectedJob(null);
          }}
          job={selectedJob}
        />
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedJob && (
        <DeleteModal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedJob(null);
          }}
          onConfirm={handleDeleteConfirm}
          title="Delete Job"
          message={`Are you sure you want to delete "${selectedJob.title}"? This action cannot be undone.`}
          isDeleting={isDeletingJob}
        />
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800",
    draft: "bg-yellow-100 text-yellow-800",
    expired: "bg-red-100 text-red-800",
  };

  return (
    <span className={`px-2 py-1 text-[12px] font-[500] rounded-full ${styles[status] || styles.inactive}`}>
      {status?.charAt(0).toUpperCase() + status?.slice(1)}
    </span>
  );
}
