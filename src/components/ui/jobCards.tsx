"use client";
import { useState, useRef, useEffect } from "react";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import { MapPin } from "lucide-react";
import { RxDotsVertical } from "react-icons/rx";
import Menu from "../dropDown.tsx/menu";
import DeleteModal from "../modal/deleteModal";
import { useJob } from "@/context/jobContext";
import { useUser } from "@/context/userContext";
import { toast } from "react-toastify";

export interface JobItem {
  id: string;
  title: string;
  company: string;
  type: string;
  location: string;
  date: string;
  salary: string;
  applied?: string;
}

interface JobProps {
  hideIcon?: boolean;
  hideText?: boolean;
  icon?: boolean;
  job: JobItem[] | JobItem;
}
export default function JobCard({ job, hideIcon, icon, hideText }: JobProps) {
  const [openModalId, setOpenModalId] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [savingJobId, setSavingJobId] = useState<string | null>(null);

  const { saveJob, unsaveJob } = useJob();
  const { savedJobs } = useUser();
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (id: string) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  const handleSaveJob = async (jobId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setSavingJobId(jobId);
    const isSaved = savedJobs.some(job => job.id === jobId);
    
    try {
      if (isSaved) {
        await unsaveJob(jobId);
      } else {
        await saveJob(jobId);
      }
    } catch (error) {
      console.error('Save job failed:', error);
    } finally {
      setSavingJobId(null);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const jobList = Array.isArray(job) ? job : [job];

  return (
    <div>
      {jobList.map((item) => (
        <div
          className="relative border-[1px] border-[var(--black-white-200)] rounded-[16px] p-4 transition dm-font leading-[100%] bg-[#f9f9f9] hover:shadow-md"
          key={item.id}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-[16px] font-[600]">{item.title}</h3>

            {/* Heart Icon - Save Job */}
            {!hideIcon && (
              <button
                onClick={(e) => handleSaveJob(item.id, e)}
                disabled={savingJobId === item.id}
                className={`w-[25px] h-[25px] rounded-full flex items-center justify-center transition-all duration-200 ${
                  savedJobs.some(job => job.id === item.id)
                    ? 'bg-[var(--primary-1200)] hover:bg-[var(--primary-1000)]' 
                    : 'bg-[#bbbbbb] hover:bg-[#999999]'
                } ${savingJobId === item.id ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {savedJobs.some(job => job.id === item.id) ? (
                  <IoHeart size={20} className="text-white" />
                ) : (
                  <IoHeartOutline size={20} className="text-white" />
                )}
              </button>
            )}

            {/* Menu Button + Menu */}
            {!icon && (
              <div ref={menuRef} className="relative">
                <button onClick={() => toggleMenu(item.id)}>
                  <RxDotsVertical size={20} className="text-[#5C5C5C]" />
                </button>
                {openMenuId === item.id && (
                  <div className="inset-0 bg-black/40 z-40">
                    <Menu
                      isOpen={openMenuId === item.id}
                      openModal={() => setOpenModalId(item.id)}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          <p className="font-[400] text-[14px] text-[var(--black-white-1100)] pt-2">
            {item.company}
          </p>

          <span className="inline-block mt-3 px-3 py-1 text-[14px] font-[500] bg-[var(--primary-200)] text-[var(--primary-1200)] rounded-full">
            {item.type}
          </span>

          <div className="flex items-center justify-between text-[var(--black-white-1100)] py-2 border-b border-[var(--black-white-200)]">
            <div className="flex items-center gap-[7px] font-[400] text-[14px]">
              <MapPin size={16} />
              <span>{item.location}</span>
            </div>
            <div className="font-[400] text-[14px]">{item.date}</div>
          </div>

          <div className="flex items-center gap-[5px] py-2">
            <p className="text-[16px] font-[700]">{item.salary}</p>
            <h2 className="text-[12px] font-[500] text-[var(--black-white-700)]">
              per hour
            </h2>
          </div>
          {!hideText && (
            <div className="border-t-[1px] border-[var(--black-white-200)] text-[14px] font-[400] text-[var(--primary-1200)] pt-2">
              {item.applied}
            </div>
          )}

          {/* DELETE MODAL */}
          <DeleteModal
            isOpen={openModalId === item.id}
            onClose={() => setOpenModalId(null)}
            onConfirm={() => {
              console.log("Deleting job with ID:", item.id);
              setOpenModalId(null);
            }}
          />
        </div>
      ))}
    </div>
  );
}
