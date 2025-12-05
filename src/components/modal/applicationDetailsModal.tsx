"use client";
import { IoMdClose } from "react-icons/io";

interface ApplicationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: any;
}

export default function ApplicationDetailsModal({ isOpen, onClose, application }: ApplicationDetailsModalProps) {
  if (!isOpen || !application) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 dm-font p-4">
      <div className="bg-white w-full max-w-[800px] max-h-[90vh] overflow-y-auto rounded-[16px] relative">
        <div className="sticky top-0 bg-white border-b border-[var(--black-white-200)] p-6 z-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-xl text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <IoMdClose />
          </button>

          <h2 className="text-[24px] font-[700] text-[var(--black-white-1000)] leading-[100%]">
            Application Details
          </h2>
          <p className="mt-1 text-[14px] font-[400] text-[var(--black-white-900)] leading-[100%]">
            Review candidate information and application
          </p>
        </div>

        <div className="p-6">
          {/* Applicant Information */}
          <div className="mb-6">
            <h3 className="text-[18px] font-[600] text-[var(--black-white-1000)] mb-4 flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 10C12.0711 10 13.75 8.32107 13.75 6.25C13.75 4.17893 12.0711 2.5 10 2.5C7.92893 2.5 6.25 4.17893 6.25 6.25C6.25 8.32107 7.92893 10 10 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.5 17.5C17.5 14.7386 14.1421 12.5 10 12.5C5.85786 12.5 2.5 14.7386 2.5 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Applicant Information
            </h3>
            <div className="bg-[var(--black-white-100)] rounded-[12px] p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-[var(--primary-200)] flex items-center justify-center">
                  <span className="text-[var(--primary-1200)] font-[600] text-[24px]">
                    {(application.applicant?.name || application.applicantName)?.charAt(0).toUpperCase() || 'A'}
                  </span>
                </div>
                <div>
                  <p className="text-[16px] font-[600] text-[var(--black-white-1000)]">
                    {application.applicant?.name || application.applicantName || 'N/A'}
                  </p>
                  <p className="text-[14px] text-[var(--black-white-800)]">
                    {application.applicant?.email || application.applicantEmail || 'N/A'}
                  </p>
                </div>
              </div>
              
              {application.phone && (
                <div className="flex items-center gap-2 text-[14px]">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.6667 11.28V13.28C14.6675 13.4657 14.6294 13.6494 14.555 13.8195C14.4807 13.9897 14.3716 14.1424 14.2348 14.2679C14.0979 14.3934 13.9364 14.489 13.7605 14.5485C13.5847 14.608 13.3983 14.63 13.2134 14.6133C11.1619 14.3904 9.19137 13.6893 7.46004 12.5667C5.84926 11.5431 4.48359 10.1774 3.46004 8.56666C2.33336 6.82745 1.63215 4.84731 1.41337 2.78666C1.39671 2.60231 1.41862 2.41649 1.4777 2.24107C1.53679 2.06564 1.63175 1.90444 1.75655 1.76773C1.88134 1.63102 2.03324 1.52179 2.20256 1.44697C2.37189 1.37216 2.55493 1.33349 2.74004 1.33333H4.74004C5.06357 1.33013 5.37723 1.4447 5.62254 1.65568C5.86786 1.86666 6.02809 2.15963 6.07337 2.48C6.15779 3.12004 6.31434 3.74848 6.54004 4.35333C6.62973 4.59193 6.64915 4.85126 6.59597 5.10057C6.5428 5.34988 6.41928 5.57872 6.24004 5.76L5.39337 6.60666C6.34241 8.27571 7.72432 9.65762 9.39337 10.6067L10.24 9.76C10.4213 9.58075 10.6501 9.45724 10.8994 9.40406C11.1488 9.35089 11.4081 9.37031 11.6467 9.46C12.2516 9.68569 12.88 9.84225 13.52 9.92666C13.8439 9.97234 14.1396 10.1355 14.3511 10.385C14.5625 10.6345 14.6748 10.953 14.6667 11.28Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-[var(--black-white-900)]">{application.phone}</span>
                </div>
              )}
            </div>
          </div>

          {/* Job Information */}
          <div className="mb-6">
            <h3 className="text-[18px] font-[600] text-[var(--black-white-1000)] mb-4 flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.6667 5.83333H3.33333C2.8731 5.83333 2.5 6.20643 2.5 6.66667V15.8333C2.5 16.2936 2.8731 16.6667 3.33333 16.6667H16.6667C17.1269 16.6667 17.5 16.2936 17.5 15.8333V6.66667C17.5 6.20643 17.1269 5.83333 16.6667 5.83333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.3333 16.6667V4.16667C13.3333 3.72464 13.1577 3.30072 12.8452 2.98816C12.5326 2.67559 12.1087 2.5 11.6667 2.5H8.33333C7.8913 2.5 7.46738 2.67559 7.15482 2.98816C6.84226 3.30072 6.66667 3.72464 6.66667 4.16667V16.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Job Information
            </h3>
            <div className="bg-[var(--black-white-100)] rounded-[12px] p-4 space-y-2">
              <div>
                <p className="text-[12px] text-[var(--black-white-800)] uppercase">Job Title</p>
                <p className="text-[14px] font-[600] text-[var(--black-white-1000)]">
                  {application.job?.title || application.jobTitle || 'N/A'}
                </p>
              </div>
              {(application.job?.company || application.company) && (
                <div>
                  <p className="text-[12px] text-[var(--black-white-800)] uppercase">Company</p>
                  <p className="text-[14px] text-[var(--black-white-900)]">
                    {application.job?.company || application.company}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Application Status & Date */}
          <div className="mb-6">
            <h3 className="text-[18px] font-[600] text-[var(--black-white-1000)] mb-4 flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 5V10L13.3333 11.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Application Status
            </h3>
            <div className="bg-[var(--black-white-100)] rounded-[12px] p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-[var(--black-white-800)]">Status</span>
                <StatusBadge status={application.status} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-[var(--black-white-800)]">Applied Date</span>
                <span className="text-[14px] font-[600] text-[var(--black-white-1000)]">
                  {(application.appliedAt || application.appliedDate) ? new Date(application.appliedAt || application.appliedDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  }) : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Cover Letter */}
          {application.coverLetter && (
            <div className="mb-6">
              <h3 className="text-[18px] font-[600] text-[var(--black-white-1000)] mb-4 flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.6667 1.66667H5C4.55797 1.66667 4.13405 1.84226 3.82149 2.15482C3.50893 2.46738 3.33333 2.8913 3.33333 3.33333V16.6667C3.33333 17.1087 3.50893 17.5326 3.82149 17.8452C4.13405 18.1577 4.55797 18.3333 5 18.3333H15C15.442 18.3333 15.866 18.1577 16.1785 17.8452C16.4911 17.5326 16.6667 17.1087 16.6667 16.6667V6.66667L11.6667 1.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11.6667 1.66667V6.66667H16.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.3333 10.8333H6.66667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.3333 14.1667H6.66667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.33333 7.5H7.5H6.66667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Cover Letter
              </h3>
              <div className="bg-[var(--black-white-100)] rounded-[12px] p-4">
                <p className="text-[14px] text-[var(--black-white-900)] whitespace-pre-wrap">
                  {application.coverLetter}
                </p>
              </div>
            </div>
          )}

          {/* Resume/CV */}
          <div className="mb-6">
            <h3 className="text-[18px] font-[600] text-[var(--black-white-1000)] mb-4 flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.6667 1.66667H5C4.55797 1.66667 4.13405 1.84226 3.82149 2.15482C3.50893 2.46738 3.33333 2.8913 3.33333 3.33333V16.6667C3.33333 17.1087 3.50893 17.5326 3.82149 17.8452C4.13405 18.1577 4.55797 18.3333 5 18.3333H15C15.442 18.3333 15.866 18.1577 16.1785 17.8452C16.4911 17.5326 16.6667 17.1087 16.6667 16.6667V6.66667L11.6667 1.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.6667 1.66667V6.66667H16.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Resume / CV
            </h3>
            {(application.resume || application.resumeUrl || application.cv) ? (
              <a
                href={application.resume || application.resumeUrl || application.cv}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[var(--primary-100)] border-2 border-[var(--primary-1200)] rounded-[12px] p-4 hover:bg-[var(--primary-200)] transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-[var(--primary-1200)] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 10L12 15L17 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 15V3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-[16px] font-[700] text-[var(--primary-1200)]">
                    📄 Download Resume / CV
                  </p>
                  <p className="text-[12px] text-[var(--black-white-800)]">
                    Click to download or view the applicant's resume
                  </p>
                </div>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[var(--primary-1200)] group-hover:translate-x-1 transition-transform">
                  <path d="M15 10.8333V16.1667C15 16.5203 14.8595 16.8594 14.6095 17.1095C14.3594 17.3595 14.0203 17.5 13.6667 17.5H4.16667C3.81304 17.5 3.47391 17.3595 3.22386 17.1095C2.97381 16.8594 2.83333 16.5203 2.83333 16.1667V6.66667C2.83333 6.31304 2.97381 5.97391 3.22386 5.72386C3.47391 5.47381 3.81304 5.33333 4.16667 5.33333H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12.5 2.5H17.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.33333 11.6667L17.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            ) : (
              <div className="flex items-center gap-3 bg-[var(--black-white-100)] rounded-[12px] p-4 border-2 border-dashed border-[var(--black-white-300)]">
                <div className="w-12 h-12 rounded-lg bg-[var(--black-white-200)] flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 18V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 15L12 12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-[14px] font-[600] text-[var(--black-white-800)]">
                    No Resume Uploaded
                  </p>
                  <p className="text-[12px] text-[var(--black-white-700)]">
                    The applicant has not uploaded a resume
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-[var(--black-white-200)]">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-[var(--black-white-200)] text-[var(--black-white-900)] rounded-[10px] hover:bg-[var(--black-white-100)] transition-colors text-[14px] font-[500]"
            >
              Close
            </button>
            {(application.applicant?.email || application.applicantEmail) && (
              <a
                href={`mailto:${application.applicant?.email || application.applicantEmail}`}
                className="flex-1 px-4 py-2 bg-[var(--primary-1200)] text-white rounded-[10px] hover:bg-[#078e63] transition-colors text-[14px] font-[500] text-center"
              >
                Contact Applicant
              </a>
            )}
          </div>
        </div>
      </div>
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
    <span className={`px-3 py-1 text-[12px] font-[600] rounded-full ${styles[status] || styles.pending}`}>
      {status?.charAt(0).toUpperCase() + status?.slice(1)}
    </span>
  );
}
