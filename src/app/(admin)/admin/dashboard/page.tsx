'use client';
import { useAdmin } from "@/context/adminContext";
import AdminDashboardStats from "@/components/admin/AdminDashboardStats";
import Title from "@/components/ui/title";
import Link from "next/link";

export default function AdminDashboard() {
  const { dashboardStats, statsLoading } = useAdmin();

  if (statsLoading) {
    return (
      <div className="px-4 py-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  const overview = dashboardStats?.overview;
  const jobStats = dashboardStats?.jobStats;
  const applicationStats = dashboardStats?.applicationStats;
  const userStats = dashboardStats?.userStats;

  return (
    <div className="px-2 sm:px-4 dm-font leading-[100%]">
      <Title text="Admin Dashboard" />

      {/* Stats Overview */}
      <div>
        <AdminDashboardStats stats={overview || null} />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[10px] my-4">
        {/* Left Section - 2 columns */}
        <div className="lg:col-span-2 col-span-1 space-y-4">
          {/* Jobs Overview */}
          <div className="bg-white p-6 rounded-[16px] border-[1px] border-[var(--black-white-200)]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[18px] font-[600] text-[var(--black-white-1000)]">
                Jobs Overview
              </h2>
              <Link href="/admin/jobs">
                <button className="font-[500] text-[16px] text-[var(--primary-1200)]">
                  Manage Jobs
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-[var(--primary-200)] rounded-[10px]">
                <div className="text-[24px] font-[700] text-[var(--primary-1200)]">
                  {jobStats?.postedToday || 0}
                </div>
                <div className="text-[12px] text-[var(--black-white-800)] mt-1">
                  Posted Today
                </div>
              </div>
              <div className="text-center p-4 bg-[#F5F7FC] rounded-[10px]">
                <div className="text-[24px] font-[700] text-[var(--black-white-1000)]">
                  {jobStats?.postedThisWeek || 0}
                </div>
                <div className="text-[12px] text-[var(--black-white-800)] mt-1">
                  This Week
                </div>
              </div>
              <div className="text-center p-4 bg-[#FFF6FC] rounded-[10px]">
                <div className="text-[24px] font-[700] text-[var(--black-white-1000)]">
                  {jobStats?.postedThisMonth || 0}
                </div>
                <div className="text-[12px] text-[var(--black-white-800)] mt-1">
                  This Month
                </div>
              </div>
              <div className="text-center p-4 bg-[#FFF4E6] rounded-[10px]">
                <div className="text-[24px] font-[700] text-[var(--black-white-1000)]">
                  {jobStats?.expiringThisWeek || 0}
                </div>
                <div className="text-[12px] text-[var(--black-white-800)] mt-1">
                  Expiring
                </div>
              </div>
            </div>
          </div>

          {/* Applications Overview */}
          <div className="bg-white p-6 rounded-[16px] border-[1px] border-[var(--black-white-200)]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[18px] font-[600] text-[var(--black-white-1000)]">
                Applications Overview
              </h2>
              <Link href="/admin/applications">
                <button className="font-[500] text-[16px] text-[var(--primary-1200)]">
                  View All
                </button>
              </Link>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-3 border-b border-[var(--black-white-200)]">
                <span className="text-[14px] text-[var(--black-white-800)]">
                  Today
                </span>
                <span className="text-[16px] font-[600] text-[var(--black-white-1000)]">
                  {applicationStats?.todayApplications || 0}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-[var(--black-white-200)]">
                <span className="text-[14px] text-[var(--black-white-800)]">
                  This Week
                </span>
                <span className="text-[16px] font-[600] text-[var(--black-white-1000)]">
                  {applicationStats?.weekApplications || 0}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-[var(--black-white-200)]">
                <span className="text-[14px] text-[var(--black-white-800)]">
                  This Month
                </span>
                <span className="text-[16px] font-[600] text-[var(--black-white-1000)]">
                  {applicationStats?.monthApplications || 0}
                </span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-[14px] text-[var(--black-white-800)]">
                  Pending Review
                </span>
                <span className="text-[16px] font-[600] text-[var(--primary-1200)]">
                  {overview?.pendingApplications || 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - 1 column */}
        <div className="lg:col-span-1 col-span-1 space-y-4">
          {/* User Growth */}
          <div className="bg-white p-6 rounded-[16px] border-[1px] border-[var(--black-white-200)]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[18px] font-[600] text-[var(--black-white-1000)]">
                User Growth
              </h2>
              <Link href="/admin/users">
                <button className="font-[500] text-[16px] text-[var(--primary-1200)]">
                  View All
                </button>
              </Link>
            </div>

            <div className="space-y-3">
              <div className="text-center p-4 bg-[var(--primary-200)] rounded-[10px]">
                <div className="text-[28px] font-[700] text-[var(--primary-1200)]">
                  {userStats?.newUsersToday || 0}
                </div>
                <div className="text-[12px] text-[var(--black-white-800)] mt-1">
                  New Today
                </div>
              </div>
              <div className="text-center p-4 bg-[#F5F7FC] rounded-[10px]">
                <div className="text-[28px] font-[700] text-[var(--black-white-1000)]">
                  {userStats?.newUsersThisWeek || 0}
                </div>
                <div className="text-[12px] text-[var(--black-white-800)] mt-1">
                  New This Week
                </div>
              </div>
              <div className="text-center p-4 bg-[#FFF6FC] rounded-[10px]">
                <div className="text-[28px] font-[700] text-[var(--black-white-1000)]">
                  {userStats?.newUsersThisMonth || 0}
                </div>
                <div className="text-[12px] text-[var(--black-white-800)] mt-1">
                  New This Month
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-[16px] border-[1px] border-[var(--black-white-200)]">
            <h2 className="text-[18px] font-[600] text-[var(--black-white-1000)] mb-4">
              Quick Actions
            </h2>

            <div className="space-y-3">
              <Link href="/admin/jobs">
                <button className="w-full px-4 py-3 bg-[var(--primary-1200)] text-white rounded-[10px] hover:bg-[#078e63] transition-colors text-[14px] font-[500]">
                  Manage Jobs
                </button>
              </Link>
              <Link href="/admin/users">
                <button className="w-full px-4 py-3 bg-white border-[1px] border-[var(--primary-1200)] text-[var(--primary-1200)] rounded-[10px] hover:bg-[var(--primary-200)] transition-colors text-[14px] font-[500]">
                  Manage Users
                </button>
              </Link>
              <Link href="/admin/applications">
                <button className="w-full px-4 py-3 bg-white border-[1px] border-[var(--primary-1200)] text-[var(--primary-1200)] rounded-[10px] hover:bg-[var(--primary-200)] transition-colors text-[14px] font-[500]">
                  Review Applications
                </button>
              </Link>
              <Link href="/admin/categories">
                <button className="w-full px-4 py-3 bg-white border-[1px] border-[var(--primary-1200)] text-[var(--primary-1200)] rounded-[10px] hover:bg-[var(--primary-200)] transition-colors text-[14px] font-[500]">
                  Manage Categories
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
