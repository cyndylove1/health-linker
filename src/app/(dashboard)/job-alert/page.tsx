"use client";
import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import Btn from "@/components/button/btn";
import Title from "@/components/ui/title";

import CreateJobModal from "@/components/modal/createJobModal";
import DeleteModal from "@/components/modal/deleteModal";
import EditJobModal from "@/components/modal/editJobModal";

export default function AppliedJobs() {
  const [openCreate, setOpenCreate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const alerts = Array.from({ length: 6 }).map((_, i) => ({
    id: i + 1,
    title: "Surgeon",
    level: "Mid-level",
    levels: "Senior-level",
    locations: ["All locations"],
    types: ["Full-Time", "Part-Time", "Contract"],
    createdAt: "Created 10th Oct, 2025",
    note: "Kindly note that all job alerts are done via your email.",
  }));

  return (
    <>
      <div className="md:px-6 px-4 dm-font leading-[100%] relative dm-font">
        <Title text="Job Alerts" />
        <div className="bg-white border-[1px] border-[var(--black-white-200)] rounded-[16px] md:px-6 px-4 mb-6">
          <div className="flex flex-col md:flex-row pt-4 md:items-center items-start justify-between">
            <h2 className="text-[20px] font-[400] text-[var(--black-white-900)] pt-2 md:pt-0">
              You have 6 job alerts.
            </h2>
            <Btn
              type="button"
              className="h-[40px] md:w-[173px] w-full rounded-[50px] text-[16px] text-white bg-[var(--primary-1200)] hover:bg-[#078e63] my-4 md:mt-0"
              text="Create Job Alert"
              onClick={() => setOpenCreate(true)}
            />
          </div>
          {/* Grid of jobs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="border-[1px] border-[#E7E7E7] rounded-[16px] p-4 bg-white"
              >
                {/* TITLE + DATE */}
                <div className="flex items-start justify-between">
                  <h2 className="text-[16px] font-[600] leading-[100%]">
                    {alert.title}
                  </h2>
                </div>
                {/* LEVEL TAGS */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="h-[30px] w-[82px] bg-[var(--primary-100)] flex justify-center text-[#178261] items-center rounded-[80px] text-[14px]">
                    {alert.level}
                  </div>
                  <div className="h-[30px] w-[100px] bg-[#F5F2ED] flex justify-center text-[#A89C1C] items-center rounded-[80px] text-[14px]">
                    {alert.levels}
                  </div>
                </div>
                {/* LOCATIONS */}
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-[7px]">
                    <MapPin size={16} />
                    <p className="text-[var(--black-white-1000)] text-[14px] font-[400] leading-[100%]">
                      {alert.locations[0]}
                    </p>
                  </div>
                  <p className="text-[var(--black-white-1000)] text-[14px] font-[400] leading-[100%]">
                    {alert.createdAt}
                  </p>
                </div>
                {/* JOB TYPES */}
                <div className="flex gap-2 mt-3">
                  {alert.types.map((type, idx) => (
                    <span
                      key={idx}
                      className="h-[30px] md:w-[82px] w-full bg-[var(--primary-200)] text-[#178261] text-[14px] rounded-[80px] font-[500] flex items-center justify-center"
                    >
                      {type}
                    </span>
                  ))}
                </div>
                {/* NOTE */}
                <div className="flex items-center gap-[7px] mt-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.9173 10.5719V9.42806C17.9173 8.06557 17.9173 7.38431 17.6636 6.77175C17.4098 6.15918 16.9282 5.67745 15.9647 4.71402L15.2866 4.03594C14.3232 3.0725 13.8415 2.59078 13.2289 2.33705C12.6163 2.08331 11.9351 2.08331 10.5726 2.08331H9.42873C8.06624 2.08331 7.38498 2.08331 6.77242 2.33705C6.15985 2.59078 5.67813 3.0725 4.71469 4.03594L4.03661 4.71402C3.07317 5.67746 2.59145 6.15918 2.33772 6.77175C2.08398 7.38431 2.08398 8.06557 2.08398 9.42806V10.5719C2.08398 11.9344 2.08398 12.6156 2.33772 13.2282C2.59145 13.8408 3.07317 14.3225 4.03661 15.2859L4.71469 15.9641C5.67813 16.9275 6.15985 17.4091 6.77242 17.6629C7.38498 17.9166 8.06624 17.9166 9.42873 17.9166H10.5726C11.9351 17.9166 12.6163 17.9166 13.2289 17.6629C13.8415 17.4091 14.3232 16.9275 15.2866 15.9641L15.9647 15.2859C16.9282 14.3225 17.4098 13.8408 17.6636 13.2282C17.9173 12.6156 17.9173 11.9344 17.9173 10.5719Z"
                      stroke="#737373"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 6.66669V10.4167"
                      stroke="#737373"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 13.3235V13.3319"
                      stroke="#737373"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-[var(--black-white-800)] text-[13px] font-[400] leading-[100%]">
                    {alert.note}
                  </p>
                </div>
                {/* ACTION BUTTONS */}
                <div className="flex md:flex-row flex-col items-center justify-between md:mt-4 mt-6 md:border-0 border-t-[1px] border-[#E7E7E7]">
                  <Btn
                    type="button"
                    className="text-[var(--primary-1200)] md:my-0 my-4 text-[14px] font-[600] leading-[100%]"
                    text=" Delete Alert"
                    onClick={() => setOpenDelete(true)}
                  />
                  <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                    <Btn
                      type="button"
                      className="h-[40px] md:mb-0 mb-4 md:w-[100px] w-full border-[1px] border-[var(--primary-1200)] rounded-[100px] text-[var(--primary-1200)] font-[600] text-[14px] hover:text-[#078e63]"
                      text=" Edit Alert"
                      onClick={() => setOpenEdit(true)}
                    />
                    <Btn
                      type="button"
                      className="h-[40px] md:w-[100px] md:mb-0 mb-4 w-full border-[1px] bg-[var(--primary-1200)] rounded-[100px] text-white font-[600] text-[14px] hover:bg-[#078e63]"
                      text="View Jobs"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODALS */}
      <CreateJobModal
        isOpen={openCreate}
        onClose={() => setOpenCreate(false)}
      />
      <DeleteModal
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={() => {
          setOpenDelete(false);
        }}
      />
      <EditJobModal isOpen={openEdit} onClose={() => setOpenEdit(false)} />
    </>
  );
}
