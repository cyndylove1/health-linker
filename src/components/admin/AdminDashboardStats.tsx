import React from "react";

interface AdminStatCardProps {
  title: string;
  value: number;
  bg: string;
  icon?: React.ReactNode;
}

const AdminStatCard: React.FC<AdminStatCardProps> = ({ title, value, bg, icon }) => {
  return (
    <div
      className={`h-[102px] rounded-[10px] w-full p-4 ${bg} border-[0.4px] border-[#F5F7FC] dm-font flex items-center justify-between`}
    >
      <div>
        <p className="text-[var(--black-white-900)] font-[500] text-[14px]">
          {title}
        </p>
        <p className="text-[var(--black-white-1000)] font-[700] text-[24px] mt-2">
          {value}
        </p>
      </div>
      {icon && (
        <div className="text-[var(--primary-1200)] opacity-60">
          {icon}
        </div>
      )}
    </div>
  );
};

interface AdminDashboardStatsProps {
  stats: {
    totalJobs?: number;
    activeJobs?: number;
    totalUsers?: number;
    totalApplications?: number;
    pendingApplications?: number;
    activeUsers?: number;
  } | null;
}

export default function AdminDashboardStats({ stats }: AdminDashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px] p-4 bg-white rounded-[16px] w-full">
      <AdminStatCard
        title="Total Jobs"
        value={stats?.totalJobs || 0}
        bg="bg-[var(--primary-200)]"
        icon={
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 9V7C11 5.34315 12.3431 4 14 4H18C19.6569 4 21 5.34315 21 7V9M16 18V22M4 16C4 12.5987 4 10.8981 4.95491 9.94318C5.90983 8.98826 7.61041 8.98826 11.0116 8.98826H20.9884C24.3896 8.98826 26.0902 8.98826 27.0451 9.94318C28 10.8981 28 12.5987 28 16V20C28 23.4013 28 25.1019 27.0451 26.0568C26.0902 27.0117 24.3896 27.0117 20.9884 27.0117H11.0116C7.61041 27.0117 5.90983 27.0117 4.95491 26.0568C4 25.1019 4 23.4013 4 20V16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        }
      />

      <AdminStatCard 
        title="Total Users" 
        value={stats?.totalUsers || 0} 
        bg="bg-[#F5F7FC]"
        icon={
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 14C15.3137 14 18 11.3137 18 8C18 4.68629 15.3137 2 12 2C8.68629 2 6 4.68629 6 8C6 11.3137 8.68629 14 12 14Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M4 24.9091C4 21.0909 6.62857 18 9.85714 18H14.1429C17.3714 18 20 21.0909 20 24.9091C20 26.5673 18.6571 27.9091 17 27.9091H7C5.34286 27.9091 4 26.5673 4 24.9091Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M22 3C24.0571 3.82286 25.5 5.78286 25.5 8.08571C25.5 10.3886 24.0571 12.3486 22 13.1714" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M22 19C25.6143 19.3429 28.5 22.5429 28.5 26.4V27.0857C28.5 28.0914 27.6571 28.9143 26.6286 28.9143H24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        }
      />

      <AdminStatCard 
        title="Applications" 
        value={stats?.totalApplications || 0} 
        bg="bg-[#FFF6FC]"
        icon={
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M26 9V23C26 25.2091 24.2091 27 22 27H10C7.79086 27 6 25.2091 6 23V9C6 6.79086 7.79086 5 10 5H22C24.2091 5 26 6.79086 26 9Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 14H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M12 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        }
      />

      <AdminStatCard 
        title="Active Jobs" 
        value={stats?.activeJobs || 0} 
        bg="bg-[#FFF4E6]"
        icon={
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 16L15 19L21 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        }
      />
    </div>
  );
}
