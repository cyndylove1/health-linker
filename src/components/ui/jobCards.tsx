"use client";
import Link from "next/link";
import { IoHeartOutline } from "react-icons/io5";
import { MapPin } from "lucide-react";

interface JobProps {
  job: {
    id: number;
    title: string;
    company: string;
    type: string;
    location: string;
    date: string;
    salary: string;
  };
}

export default function JobCard({ job }: JobProps) {
  return (
    <div className="border border-[var(--black-white-200)] rounded-[16px] p-4 transition dm-font leading-[100%] bg-[#f9f9f9] hover:shadow-md">
      <div className="flex justify-between items-center">
        <h3 className="text-[16px] font-[600]">{job.title}</h3>
        <div className="bg-[#bbbbbb] w-[25px] h-[25px] rounded-full flex items-center justify-center">
          <IoHeartOutline size={20} className="text-white" />
        </div>
      </div>

      <p className="font-[400] text-[14px] text-[var(--black-white-1100)] pt-2">
        {job.company}
      </p>

      <span className="inline-block mt-3 px-3 py-1 text-[14px] font-[500] bg-[var(--primary-200)] text-[var(--primary-1200)] rounded-full">
        {job.type}
      </span>

      <div className="flex items-center justify-between text-[var(--black-white-1100)] py-2 border-b border-[var(--black-white-200)]">
        <div className="flex items-center gap-[7px] font-[400] text-[14px]">
          <MapPin size={16} />
          <span>{job.location}</span>
        </div>
        <div className="font-[400] text-[14px]">{job.date}</div>
      </div>

      <div className="flex items-center gap-[5px] py-2">
        <p className="text-[16px] font-[700]">{job.salary}</p>
        <h2 className="text-[12px] font-[500] text-[var(--black-white-700)]">
          per hour
        </h2>
      </div>
    </div>
  );
}
