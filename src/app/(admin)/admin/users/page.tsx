'use client';
import { useState } from "react";
import { useAdminUser } from "@/context/adminUserContext";
import Title from "@/components/ui/title";
import Link from "next/link";
import UserDetailsModal from "@/components/modal/userDetailsModal";

export default function AdminUsersPage() {
  const { adminUsers, usersLoading } = useAdminUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const filteredUsers = adminUsers?.filter((user: any) => {
    const matchesSearch =
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  }) || [];

  const handleViewDetails = (user: any) => {
    setSelectedUser(user);
    setShowDetailsModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedUser(null);
  };

  if (usersLoading) {
    return (
      <div className="px-4 py-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading users...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-2 sm:px-4 dm-font leading-[100%]">
      <Title text="User Management" />

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
              placeholder="Search by name or email..."
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
            <option value="suspended">Suspended</option>
          </select>
        </div>

        <p className="text-[14px] text-[var(--black-white-800)] mt-4">
          Showing {filteredUsers.length} of {adminUsers?.length || 0} users
        </p>
      </div>

      {/* Users Table - Desktop */}
      <div className="bg-white rounded-[16px] border-[1px] border-[var(--black-white-200)] overflow-hidden hidden md:block">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[var(--black-white-200)]">
            <thead className="bg-[var(--black-white-100)]">
              <tr>
                <th className="px-6 py-3 text-left text-[12px] font-[600] text-[var(--black-white-900)] uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-[12px] font-[600] text-[var(--black-white-900)] uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-[12px] font-[600] text-[var(--black-white-900)] uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-[12px] font-[600] text-[var(--black-white-900)] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-[12px] font-[600] text-[var(--black-white-900)] uppercase tracking-wider">
                  Joined Date
                </th>
                <th className="px-6 py-3 text-left text-[12px] font-[600] text-[var(--black-white-900)] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[var(--black-white-200)]">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-[14px] text-[var(--black-white-800)]">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user: any) => (
                  <tr key={user.id} className="hover:bg-[var(--black-white-100)] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[var(--primary-200)] flex items-center justify-center">
                          <span className="text-[var(--primary-1200)] font-[600] text-[14px]">
                            {user.firstName?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="text-[14px] font-[600] text-[var(--black-white-1000)]">
                            {user.firstName} {user.lastName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[14px] text-[var(--black-white-900)]">
                      {user.email}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-[12px] font-[500] rounded-full bg-[var(--primary-200)] text-[var(--primary-1200)] capitalize">
                        {user.role || 'user'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={user.status || 'active'} />
                    </td>
                    <td className="px-6 py-4 text-[14px] text-[var(--black-white-800)]">
                      {(user.created_at || user.createdAt || user.registeredDate || user.joined_at || user.joinedDate)
                        ? new Date(user.created_at || user.createdAt || user.registeredDate || user.joined_at || user.joinedDate).toLocaleDateString()
                        : 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleViewDetails(user)}
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

      {/* Users Cards - Mobile */}
      <div className="md:hidden space-y-3">
        {filteredUsers.length === 0 ? (
          <div className="bg-white rounded-[16px] border-[1px] border-[var(--black-white-200)] p-6 text-center">
            <p className="text-[14px] text-[var(--black-white-800)]">No users found</p>
          </div>
        ) : (
          filteredUsers.map((user: any) => (
            <div key={user.id} className="bg-white rounded-[16px] border-[1px] border-[var(--black-white-200)] p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-[var(--primary-200)] flex items-center justify-center flex-shrink-0">
                  <span className="text-[var(--primary-1200)] font-[600] text-[16px]">
                    {user.firstName?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-[14px] font-[600] text-[var(--black-white-1000)] mb-1">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-[12px] text-[var(--black-white-800)] mb-2">
                    {user.email}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 text-[11px] font-[500] rounded-full bg-[var(--primary-200)] text-[var(--primary-1200)] capitalize">
                      {user.role || 'user'}
                    </span>
                    <StatusBadge status={user.status || 'active'} />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--black-white-200)] mb-3">
                <p className="text-[11px] text-[var(--black-white-800)] mb-1">Joined Date</p>
                <p className="text-[14px] font-[600] text-[var(--black-white-1000)]">
                  {(user.created_at || user.createdAt || user.registeredDate || user.joined_at || user.joinedDate)
                    ? new Date(user.created_at || user.createdAt || user.registeredDate || user.joined_at || user.joinedDate).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>

              <button
                onClick={() => handleViewDetails(user)}
                className="w-full px-4 py-2 bg-[var(--primary-1200)] text-white rounded-[10px] hover:bg-[#078e63] transition-colors text-[14px] font-[500] flex items-center justify-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.5 9C1.5 9 4.5 3 9 3C13.5 3 16.5 9 16.5 9C16.5 9 13.5 15 9 15C4.5 15 1.5 9 1.5 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                View Details
              </button>
            </div>
          ))
        )}
      </div>

      {/* User Details Modal */}
      <UserDetailsModal
        isOpen={showDetailsModal}
        onClose={handleCloseModal}
        user={selectedUser}
      />
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
    <span className={`px-2 py-1 text-[12px] font-[500] rounded-full ${styles[status] || styles.active}`}>
      {status?.charAt(0).toUpperCase() + status?.slice(1)}
    </span>
  );
}
