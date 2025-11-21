// components/DashboardStats.tsx

import React from "react";

interface StatCardProps {
  title: string;
  value: number;
  bg: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, bg }) => {
  return (
    <div
      className={`h-[102px] rounded-[10px] w-full p-4 ${bg} border-[0.4px] border-[#F5F7FC] dm-font`}
    >
      <p className="text-[var(--black-white-900)] font-[500] text-[14px]">
        {title}
      </p>
      <p className="text-[var(--black-white-1000)] font-[700] text-[24px] mt-2">
        {value}
      </p>
    </div>
  );
};

export default function DashboardStats() {
  return (
    <div className="flex lg:flex-row flex-col gap-[20px] p-4 bg-white rounded-[16px] w-full">
      <StatCard
        title="Total Jobs Applied"
        value={35}
        bg="bg-[var(--primary-200)]"
      />

      <StatCard title="Total Saved Jobs" value={10} bg="bg-[#F5F7FC]" />

      <StatCard title="Total Job Alerts" value={5} bg="bg-[#FFF6FC]" />
    </div>
  );
}
