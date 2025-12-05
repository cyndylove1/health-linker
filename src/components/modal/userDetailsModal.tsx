"use client";
import { IoMdClose } from "react-icons/io";

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

export default function UserDetailsModal({ isOpen, onClose, user }: UserDetailsModalProps) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 dm-font p-4">
      <div className="bg-white w-full max-w-[700px] max-h-[90vh] overflow-y-auto rounded-[16px] relative">
        <div className="sticky top-0 bg-white border-b border-[var(--black-white-200)] p-6 z-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-xl text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <IoMdClose />
          </button>

          <h2 className="text-[24px] font-[700] text-[var(--black-white-1000)] leading-[100%]">
            User Details
          </h2>
          <p className="mt-1 text-[14px] font-[400] text-[var(--black-white-900)] leading-[100%]">
            View user information and statistics
          </p>
        </div>

        <div className="p-6">
          {/* User Information */}
          <div className="mb-6">
            <h3 className="text-[18px] font-[600] text-[var(--black-white-1000)] mb-4 flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 10C12.0711 10 13.75 8.32107 13.75 6.25C13.75 4.17893 12.0711 2.5 10 2.5C7.92893 2.5 6.25 4.17893 6.25 6.25C6.25 8.32107 7.92893 10 10 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.5 17.5C17.5 14.7386 14.1421 12.5 10 12.5C5.85786 12.5 2.5 14.7386 2.5 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Personal Information
            </h3>
            <div className="bg-[var(--black-white-100)] rounded-[12px] p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-[var(--primary-200)] flex items-center justify-center">
                  <span className="text-[var(--primary-1200)] font-[600] text-[24px]">
                    {user.firstName?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div>
                  <p className="text-[16px] font-[600] text-[var(--black-white-1000)]">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-[14px] text-[var(--black-white-800)]">
                    {user.email}
                  </p>
                </div>
              </div>
              
              {user.phone && (
                <div className="flex items-center gap-2 text-[14px]">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.6667 11.28V13.28C14.6675 13.4657 14.6294 13.6494 14.555 13.8195C14.4807 13.9897 14.3716 14.1424 14.2348 14.2679C14.0979 14.3934 13.9364 14.489 13.7605 14.5485C13.5847 14.608 13.3983 14.63 13.2134 14.6133C11.1619 14.3904 9.19137 13.6893 7.46004 12.5667C5.84926 11.5431 4.48359 10.1774 3.46004 8.56666C2.33336 6.82745 1.63215 4.84731 1.41337 2.78666C1.39671 2.60231 1.41862 2.41649 1.4777 2.24107C1.53679 2.06564 1.63175 1.90444 1.75655 1.76773C1.88134 1.63102 2.03324 1.52179 2.20256 1.44697C2.37189 1.37216 2.55493 1.33349 2.74004 1.33333H4.74004C5.06357 1.33013 5.37723 1.4447 5.62254 1.65568C5.86786 1.86666 6.02809 2.15963 6.07337 2.48C6.15779 3.12004 6.31434 3.74848 6.54004 4.35333C6.62973 4.59193 6.64915 4.85126 6.59597 5.10057C6.5428 5.34988 6.41928 5.57872 6.24004 5.76L5.39337 6.60666C6.34241 8.27571 7.72432 9.65762 9.39337 10.6067L10.24 9.76C10.4213 9.58075 10.6501 9.45724 10.8994 9.40406C11.1488 9.35089 11.4081 9.37031 11.6467 9.46C12.2516 9.68569 12.88 9.84225 13.52 9.92666C13.8439 9.97234 14.1396 10.1355 14.3511 10.385C14.5625 10.6345 14.6748 10.953 14.6667 11.28Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-[var(--black-white-900)]">{user.phone}</span>
                </div>
              )}
            </div>
          </div>

          {/* Account Status */}
          <div className="mb-6">
            <h3 className="text-[18px] font-[600] text-[var(--black-white-1000)] mb-4 flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 5V10L13.3333 11.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Account Status
            </h3>
            <div className="bg-[var(--black-white-100)] rounded-[12px] p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-[var(--black-white-800)]">Role</span>
                <span className="px-3 py-1 text-[12px] font-[600] rounded-full bg-[var(--primary-200)] text-[var(--primary-1200)] capitalize">
                  {user.role || 'user'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-[var(--black-white-800)]">Status</span>
                <StatusBadge status={user.status || 'active'} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-[var(--black-white-800)]">Email Verified</span>
                <span className={`px-3 py-1 text-[12px] font-[600] rounded-full ${
                  user.isEmailVerified 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {user.isEmailVerified ? 'Verified' : 'Not Verified'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-[var(--black-white-800)]">Joined Date</span>
                <span className="text-[14px] font-[600] text-[var(--black-white-1000)]">
                  {(user.created_at || user.createdAt || user.registeredDate || user.joined_at || user.joinedDate) 
                    ? new Date(user.created_at || user.createdAt || user.registeredDate || user.joined_at || user.joinedDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    }) : 'N/A'}
                </span>
              </div>
              {user.lastLogin && (
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-[var(--black-white-800)]">Last Login</span>
                  <span className="text-[14px] font-[600] text-[var(--black-white-1000)]">
                    {new Date(user.lastLogin).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* User Statistics */}
          {user.stats && (
            <div className="mb-6">
              <h3 className="text-[18px] font-[600] text-[var(--black-white-1000)] mb-4 flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.6667 17.5V8.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 17.5V2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3.33333 17.5V12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Activity Statistics
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[var(--black-white-100)] rounded-[12px] p-4 text-center">
                  <p className="text-[24px] font-[700] text-[var(--primary-1200)]">
                    {user.stats.applicationsCount || 0}
                  </p>
                  <p className="text-[12px] text-[var(--black-white-800)] mt-1">Applications</p>
                </div>
                <div className="bg-[var(--black-white-100)] rounded-[12px] p-4 text-center">
                  <p className="text-[24px] font-[700] text-[var(--primary-1200)]">
                    {user.stats.savedJobsCount || 0}
                  </p>
                  <p className="text-[12px] text-[var(--black-white-800)] mt-1">Saved Jobs</p>
                </div>
                <div className="bg-[var(--black-white-100)] rounded-[12px] p-4 text-center">
                  <p className="text-[24px] font-[700] text-[var(--primary-1200)]">
                    {user.stats.jobAlertsCount || 0}
                  </p>
                  <p className="text-[12px] text-[var(--black-white-800)] mt-1">Job Alerts</p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-[var(--black-white-200)]">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-[var(--black-white-200)] text-[var(--black-white-900)] rounded-[10px] hover:bg-[var(--black-white-100)] transition-colors text-[14px] font-[500]"
            >
              Close
            </button>
            {user.email && (
              <a
                href={`mailto:${user.email}`}
                className="flex-1 px-4 py-2 bg-[var(--primary-1200)] text-white rounded-[10px] hover:bg-[#078e63] transition-colors text-[14px] font-[500] text-center"
              >
                Contact User
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
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800",
    suspended: "bg-red-100 text-red-800",
  };

  return (
    <span className={`px-3 py-1 text-[12px] font-[600] rounded-full ${styles[status] || styles.active}`}>
      {status?.charAt(0).toUpperCase() + status?.slice(1)}
    </span>
  );
}
