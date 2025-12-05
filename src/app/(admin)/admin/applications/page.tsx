'use client';
import { useState, useEffect, useRef } from "react";
import { useAdminUser } from "@/context/adminUserContext";
import Title from "@/components/ui/title";
import ApplicationDetailsModal from "@/components/modal/applicationDetailsModal";

export default function AdminApplicationsPage() {
  const { applications, applicationsLoading, updateApplicationStatus, isUpdatingApplication } = useAdminUser();
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const filteredApplications = applications?.filter((app: any) => {
    if (statusFilter === "all") return true;
    // Make comparison case-insensitive and trim whitespace
    const appStatus = (app.status || '').toLowerCase().trim();
    const filterStatus = statusFilter.toLowerCase().trim();
    return appStatus === filterStatus;
  }) || [];

  // Close status menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowStatusMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleViewDetails = (application: any) => {
    setSelectedApplication(application);
    setShowDetailsModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedApplication(null);
  };

  const handleStatusChange = async (applicationId: string, newStatus: string) => {
    try {
      await updateApplicationStatus(applicationId, newStatus);
      setShowStatusMenu(null);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (applicationsLoading) {
    return (
      <div className="px-4 py-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading applications...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-2 sm:px-4 dm-font leading-[100%]">
      <Title text="Application Management" />

      {/* Filter Section */}
      <div className="bg-white rounded-[16px] border-[1px] border-[var(--black-white-200)] p-4 mb-4">
        <div className="flex justify-between items-center">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-[var(--black-white-200)] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[var(--primary-1200)] text-[14px]"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>

          <p className="text-[14px] text-[var(--black-white-800)]">
            Showing {filteredApplications.length} of {applications?.length || 0} applications
          </p>
        </div>
      </div>

      {/* Applications Table - Desktop */}
      <div className="bg-white rounded-[16px] border-[1px] border-[var(--black-white-200)] overflow-hidden hidden md:block">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[var(--black-white-200)]">
            <thead className="bg-[var(--black-white-100)]">
              <tr>
                <th className="px-6 py-3 text-left text-[12px] font-[600] text-[var(--black-white-900)] uppercase tracking-wider">
                  Applicant
                </th>
                <th className="px-6 py-3 text-left text-[12px] font-[600] text-[var(--black-white-900)] uppercase tracking-wider">
                  Job Title
                </th>
                <th className="px-6 py-3 text-left text-[12px] font-[600] text-[var(--black-white-900)] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-[12px] font-[600] text-[var(--black-white-900)] uppercase tracking-wider">
                  Applied Date
                </th>
                <th className="px-6 py-3 text-left text-[12px] font-[600] text-[var(--black-white-900)] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[var(--black-white-200)]">
              {filteredApplications.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-[14px] text-[var(--black-white-800)]">
                    No applications found
                  </td>
                </tr>
              ) : (
                filteredApplications.map((application: any) => (
                  <tr key={application.id} className="hover:bg-[var(--black-white-100)] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[var(--primary-200)] flex items-center justify-center">
                          <span className="text-[var(--primary-1200)] font-[600] text-[14px]">
                            {(application.applicant?.name || application.applicantName)?.charAt(0).toUpperCase() || 'A'}
                          </span>
                        </div>
                        <div>
                          <div className="text-[14px] font-[600] text-[var(--black-white-1000)]">
                            {application.applicant?.name || application.applicantName || 'N/A'}
                          </div>
                          <div className="text-[12px] text-[var(--black-white-800)]">
                            {application.applicant?.email || application.applicantEmail || 'N/A'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[14px] text-[var(--black-white-900)]">
                      {application.job?.title || application.jobTitle || 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative" ref={showStatusMenu === application.id ? menuRef : null}>
                        <button
                          onClick={() => setShowStatusMenu(showStatusMenu === application.id ? null : application.id)}
                          className="flex items-center gap-1 hover:opacity-80 transition-opacity"
                          disabled={isUpdatingApplication}
                        >
                          <StatusBadge status={application.status} />
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-[var(--black-white-800)]"
                          >
                            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>

                        {showStatusMenu === application.id && (
                          <div className="absolute top-full left-0 mt-1 bg-white border border-[var(--black-white-200)] rounded-[8px] shadow-lg z-10 min-w-[140px]">
                            <button
                              onClick={() => handleStatusChange(application.id, 'pending')}
                              className="w-full text-left px-3 py-2 text-[12px] text-[var(--black-white-900)] hover:bg-[var(--black-white-100)] first:rounded-t-[8px] transition-colors"
                              disabled={isUpdatingApplication}
                            >
                              ⏳ Pending
                            </button>
                            <button
                              onClick={() => handleStatusChange(application.id, 'reviewed')}
                              className="w-full text-left px-3 py-2 text-[12px] text-[var(--black-white-900)] hover:bg-[var(--black-white-100)] transition-colors"
                              disabled={isUpdatingApplication}
                            >
                              👁️ Reviewed
                            </button>
                            <button
                              onClick={() => handleStatusChange(application.id, 'accepted')}
                              className="w-full text-left px-3 py-2 text-[12px] text-[var(--black-white-900)] hover:bg-[var(--black-white-100)] transition-colors"
                              disabled={isUpdatingApplication}
                            >
                              ✅ Accepted
                            </button>
                            <button
                              onClick={() => handleStatusChange(application.id, 'rejected')}
                              className="w-full text-left px-3 py-2 text-[12px] text-[var(--black-white-900)] hover:bg-[var(--black-white-100)] last:rounded-b-[8px] transition-colors"
                              disabled={isUpdatingApplication}
                            >
                              ❌ Rejected
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[14px] text-[var(--black-white-800)]">
                      {(application.appliedAt || application.appliedDate) ? new Date(application.appliedAt || application.appliedDate).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleViewDetails(application)}
                        className="p-2 text-[var(--primary-1200)] hover:bg-[var(--primary-200)] rounded-lg transition-colors"
                        title="View Details"
                      >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1.5 9C1.5 9 4.5 3 9 3C13.5 3 16.5 9 16.5 9C16.5 9 13.5 15 9 15C4.5 15 1.5 9 1.5 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Applications Cards - Mobile */}
      <div className="md:hidden space-y-3">
        {filteredApplications.length === 0 ? (
          <div className="bg-white rounded-[16px] border-[1px] border-[var(--black-white-200)] p-6 text-center">
            <p className="text-[14px] text-[var(--black-white-800)]">No applications found</p>
          </div>
        ) : (
          filteredApplications.map((application: any) => (
            <div key={application.id} className="bg-white rounded-[16px] border-[1px] border-[var(--black-white-200)] p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-[var(--primary-200)] flex items-center justify-center flex-shrink-0">
                  <span className="text-[var(--primary-1200)] font-[600] text-[16px]">
                    {(application.applicant?.name || application.applicantName)?.charAt(0).toUpperCase() || 'A'}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-[14px] font-[600] text-[var(--black-white-1000)] mb-1">
                    {application.applicant?.name || application.applicantName || 'N/A'}
                  </h3>
                  <p className="text-[12px] text-[var(--black-white-800)] mb-2">
                    {application.applicant?.email || application.applicantEmail || 'N/A'}
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-3 pt-3 border-t border-[var(--black-white-200)]">
                <div>
                  <p className="text-[11px] text-[var(--black-white-800)] mb-1">Job Title</p>
                  <p className="text-[14px] font-[600] text-[var(--black-white-1000)]">
                    {application.job?.title || application.jobTitle || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-[var(--black-white-800)] mb-1">Applied Date</p>
                  <p className="text-[14px] font-[600] text-[var(--black-white-1000)]">
                    {(application.appliedAt || application.appliedDate) ? new Date(application.appliedAt || application.appliedDate).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-[var(--black-white-800)] mb-1">Status</p>
                  <div className="relative" ref={showStatusMenu === application.id ? menuRef : null}>
                    <button
                      onClick={() => setShowStatusMenu(showStatusMenu === application.id ? null : application.id)}
                      className="flex items-center gap-1 hover:opacity-80 transition-opacity"
                      disabled={isUpdatingApplication}
                    >
                      <StatusBadge status={application.status} />
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-[var(--black-white-800)]"
                      >
                        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    {showStatusMenu === application.id && (
                      <div className="absolute top-full left-0 mt-1 bg-white border border-[var(--black-white-200)] rounded-[8px] shadow-lg z-10 min-w-[140px]">
                        <button
                          onClick={() => handleStatusChange(application.id, 'pending')}
                          className="w-full text-left px-3 py-2 text-[12px] text-[var(--black-white-900)] hover:bg-[var(--black-white-100)] first:rounded-t-[8px] transition-colors"
                          disabled={isUpdatingApplication}
                        >
                          ⏳ Pending
                        </button>
                        <button
                          onClick={() => handleStatusChange(application.id, 'reviewed')}
                          className="w-full text-left px-3 py-2 text-[12px] text-[var(--black-white-900)] hover:bg-[var(--black-white-100)] transition-colors"
                          disabled={isUpdatingApplication}
                        >
                          👁️ Reviewed
                        </button>
                        <button
                          onClick={() => handleStatusChange(application.id, 'accepted')}
                          className="w-full text-left px-3 py-2 text-[12px] text-[var(--black-white-900)] hover:bg-[var(--black-white-100)] transition-colors"
                          disabled={isUpdatingApplication}
                        >
                          ✅ Accepted
                        </button>
                        <button
                          onClick={() => handleStatusChange(application.id, 'rejected')}
                          className="w-full text-left px-3 py-2 text-[12px] text-[var(--black-white-900)] hover:bg-[var(--black-white-100)] last:rounded-b-[8px] transition-colors"
                          disabled={isUpdatingApplication}
                        >
                          ❌ Rejected
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleViewDetails(application)}
                className="w-full px-3 py-2 bg-[var(--primary-1200)] text-white rounded-[10px] hover:bg-[#078e63] transition-colors text-[13px] font-[500] flex items-center justify-center gap-1"
              >
                <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.5 9C1.5 9 4.5 3 9 3C13.5 3 16.5 9 16.5 9C16.5 9 13.5 15 9 15C4.5 15 1.5 9 1.5 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                View Details
              </button>
            </div>
          ))
        )}
      </div>

      {/* Application Details Modal */}
      <ApplicationDetailsModal
        isOpen={showDetailsModal}
        onClose={handleCloseModal}
        application={selectedApplication}
      />
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    reviewed: "bg-blue-100 text-blue-800",
    accepted: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <span className={`px-2 py-1 text-[12px] font-[500] rounded-full ${styles[status] || styles.pending}`}>
      {status?.charAt(0).toUpperCase() + status?.slice(1)}
    </span>
  );
}
