// CreateJobModal.tsx
"use client";
import { IoMdClose } from "react-icons/io";
import CustomSelect from "@/components/form/customSelect";
import Label from "../form/label";
import Btn from "../button/btn";

export default function CreateJobModal({ isOpen, onClose }: any) {
  if (!isOpen) return null;

  const jobOptions = [
    { value: "surgeon", label: "Surgeon" },
    { value: "nurse", label: "Nurse" },
  ];

  const levelOptions = [
    { value: "mid_senior", label: "Mid-level, Senior level" },
  ];

  const locationOptions = [{ value: "all", label: "All" }];

  const typeOptions = [
    { value: "full_part_contract", label: "Full Time, Part Time, Contract" },
  ];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 dm-font">
      <div className="bg-white w-[480px] p-6 rounded-[16px] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-gray-500"
          aria-label="Close"
        >
          <IoMdClose />
        </button>

        <h2 className="text-[24px] font-[700] text-[var(--black-white-1000)] leading-[100%]">
          Create Job Alert
        </h2>
        <p className="mt-1 text-[14px] font-[400] text-[var(--black-white-900)] leading-[100%]">
          Kindly enter your correct details
        </p>

        {/* FORM */}
        <div className="mt-4 flex flex-col gap-2">
          <div>
            <Label text="Job Title" />
            <CustomSelect
              options={jobOptions}
              placeholder="Select job title"
              className="border-[1px] border-[#D0D0D0]"
            />
          </div>
          <div>
            <Label text="Experience level" />
            <CustomSelect
              className="border-[1px] border-[#D0D0D0]"
              options={levelOptions}
              placeholder="Experience level"
            />
          </div>
          <div>
            <Label text="Locations" />
            <CustomSelect
              options={locationOptions}
              placeholder="Locations"
              className="border-[1px] border-[#D0D0D0]"
            />
          </div>
          <div>
            <Label text="Work Type" />
            <CustomSelect
              options={typeOptions}
              placeholder="Work Type"
              className="border-[1px] border-[#D0D0D0]"
            />
          </div>

          <div className="flex items-start gap-[7px]">
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
            <p className="text-[14px] font-[400] text-[var(--black-white-800)]">
              Kindly note that all Job alerts are done via your email.
            </p>
          </div>

          <Btn
            className="h-[40px] rounded-[50px] bg-[var(--primary-1200)] text-white font-[600] hover:bg-[#078e63]"
            text="Create Job Alert"
          />
        </div>
      </div>
    </div>
  );
}
