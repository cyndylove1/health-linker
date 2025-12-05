'use client';
import React, { useEffect, useState } from 'react';
import { useAdminUser } from '@/context/adminUserContext';
import ApplicationDetailsModal from './applicationDetailsModal';

interface JobApplicationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: any;
}

export default function JobApplicationsModal({ isOpen, onClose, job }: JobApplicationsModalProps) {
  const { applications, fetchApplications } = useAdminUser();
  const [jobApplications, setJobApplications] = useState<any[]>([]);
  const [showApplicationDetails, setShowApplicationDetails] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && job) {
      setLoading(true);
      // Fetch applications if not already loaded
      if (!applications || applications.length === 0) {
        fetchApplications?.();
      }

      // Filter applications for this specific job
      if (applications) {
        const filtered = applications.filter(
          (app: any) => app.job?.id === job.id || app.jobId === job.id
        );
        setJobApplications(filtered);
      }
      setLoading(false);
    }
  }, [isOpen, job, applications, fetchApplications]);

  const handleViewApplication = (application: any) => {
    setSelectedApplication(application);
    setShowApplicationDetails(true);
  };

  if (!isOpen) return null;

  return (
    <React.Fragment>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-[20px] max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 p-4 sm:p-6 border-b border-[var(--black-white-200)]">
            <div className="flex-1 w-full">
              <h2 className="text-[20px] sm:text-[24px] font-[700] text-[var(--black-white-1000)] mb-2">
                Applications for {job?.title || 'Job'}
              </h2>
              <div className="space-y-1 text-[12px] sm:text-[14px]">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[var(--black-white-600)]">Company:</span>
                  <span className="text-[var(--black-white-900)] font-[500]">
                    {typeof job?.company === 'object' ? job.company?.name : job?.company || 'N/A'}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[var(--black-white-600)]">Category:</span>
                  <span className="px-3 py-1 bg-[var(--primary-200)] text-[var(--primary-1200)] rounded-full text-[12px] font-[500]">
                    {job?.category?.name || job?.categoryName || 'Uncategorized'}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[var(--black-white-600)]">Location:</span>
                  <span className="text-[var(--black-white-900)]">
                    {job?.location || 'N/A'}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[var(--black-white-600)]">Total Applications:</span>
                  <span className="text-[var(--black-white-1000)] font-[600]">
                    {jobApplications.length}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-[var(--black-white-600)] hover:text-[var(--black-white-1000)] transition-colors self-start sm:self-auto"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-[var(--black-white-600)]">Loading applications...</div>
              </div>
            ) : jobApplications.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[var(--black-white-400)] mb-4"
                >
                  <path
                    d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-[var(--black-white-800)] text-[16px] font-[500]">
                  No applications yet
                </p>
                <p className="text-[var(--black-white-600)] text-[14px] mt-1">
                  This job hasn't received any applications
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {jobApplications.map((application) => (
                  <div
                    key={application.id}
                    className="bg-white border border-[var(--black-white-200)] rounded-[12px] p-4 hover:border-[var(--primary-1200)] transition-all cursor-pointer group"
                    onClick={() => handleViewApplication(application)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      {/* Applicant Info */}
                      <div className="flex items-start gap-3 flex-1">
                        {/* Avatar */}
                        <div className="w-12 h-12 rounded-full bg-[var(--primary-200)] flex items-center justify-center text-[var(--primary-1200)] font-[600] text-[16px] flex-shrink-0">
                          {(
                            application.applicant?.name?.[0] ||
                            application.applicant?.firstName?.[0] ||
                            application.applicantName?.[0] ||
                            application.applicant?.lastName?.[0] ||
                            'U'
                          ).toUpperCase()}
                        </div>

                        {/* Details */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-[16px] font-[600] text-[var(--black-white-1000)]">
                              {application.applicant?.name ||
                                (application.applicant?.firstName && application.applicant?.lastName ? `${application.applicant.firstName} ${application.applicant.lastName}` : null) ||
                                application.applicantName ||
                                application.applicant?.lastName ||
                                'Unknown Applicant'}
                            </h4>
                            <StatusBadge status={application.status} />
                          </div>

                          <div className="text-[14px] text-[var(--black-white-700)] mb-2">
                            <span className="font-semibold">Email:</span> {application.applicant?.email || application.applicantEmail || 'No email'}
                          </div>
                          <div className="text-[14px] text-[var(--black-white-700)] mb-2">
                            <span className="font-semibold">Phone:</span> {application.applicant?.phone || application.applicantPhone || 'No phone'}
                          </div>
                          <div className="text-[14px] text-[var(--black-white-700)] mb-2">
                            <span className="font-semibold">Address:</span> {application.applicant?.address || application.applicantAddress || 'No address'}
                          </div>
                          <div className="text-[14px] text-[var(--black-white-700)] mb-2">
                            <span className="font-semibold">City:</span> {application.applicant?.city || application.applicantCity || 'No city'}
                          </div>
                          <div className="text-[14px] text-[var(--black-white-700)] mb-2">
                            <span className="font-semibold">State:</span> {application.applicant?.state || application.applicantState || 'No state'}
                          </div>
                          <div className="text-[14px] text-[var(--black-white-700)] mb-2">
                            <span className="font-semibold">Country:</span> {application.applicant?.country || application.applicantCountry || 'No country'}
                          </div>
                          <div className="flex items-center gap-4 text-[12px] text-[var(--black-white-600)]">
                            <div className="flex items-center gap-1">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              <span>
                                Applied {application.appliedAt ? new Date(application.appliedAt).toLocaleDateString() : 'N/A'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <button
                        className="p-2 text-[var(--primary-1200)] hover:bg-[var(--primary-200)] rounded-lg transition-colors group-hover:scale-110 transition-transform"
                        title="View Details"
                      >
                        <svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1.5 9C1.5 9 4.5 3 9 3C13.5 3 16.5 9 16.5 9C16.5 9 13.5 15 9 15C4.5 15 1.5 9 1.5 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>

                    {/* Cover Letter Preview (if available) */}
                    {application.coverLetter && (
                      <div className="mt-3 pt-3 border-t border-[var(--black-white-200)]">
                        <p className="text-[12px] text-[var(--black-white-600)] mb-1 font-[500]">
                          Cover Letter Preview:
                        </p>
                        <p className="text-[13px] text-[var(--black-white-800)] line-clamp-2">
                          {application.coverLetter}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-4 sm:p-6 border-t border-[var(--black-white-200)]">
            <button
              onClick={onClose}
              className="px-6 py-2 border-[1px] border-[var(--black-white-200)] text-[var(--black-white-1000)] rounded-[10px] font-[500] text-[16px] hover:bg-[var(--black-white-100)] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Application Details Modal */}
      {showApplicationDetails && selectedApplication && (
        <ApplicationDetailsModal
          isOpen={showApplicationDetails}
          onClose={() => {
            setShowApplicationDetails(false);
            setSelectedApplication(null);
          }}
          application={selectedApplication}
        />
      )}
    </React.Fragment>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, { bg: string; text: string; label: string }> = {
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: '⏳ Pending' },
    reviewed: { bg: 'bg-blue-100', text: 'text-blue-800', label: '👁️ Reviewed' },
    accepted: { bg: 'bg-green-100', text: 'text-green-800', label: '✅ Accepted' },
    rejected: { bg: 'bg-red-100', text: 'text-red-800', label: '❌ Rejected' },
  };

  const style = styles[status?.toLowerCase()] || styles.pending;

  return (
    <span className={`px-2 py-1 text-[11px] font-[500] rounded-full ${style.bg} ${style.text}`}>
      {style.label}
    </span>
  );
}
