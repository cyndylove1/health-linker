"use client";
import { useState, useRef, useEffect } from "react";
import { IoHeartOutline } from "react-icons/io5";
import { MapPin } from "lucide-react";
import { RxDotsVertical } from "react-icons/rx";
import Menu from "../dropDown.tsx/menu";
import DeleteModal from "../modal/deleteModal";
interface JobItem {
  id: number;
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
  const [openModalId, setOpenModalId] = useState<number | null>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (id: number) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
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

            {/* Heart Icon */}
            {!hideIcon && (
              <div className="bg-[#bbbbbb] w-[25px] h-[25px] rounded-full flex items-center justify-center">
                <IoHeartOutline size={20} className="text-white" />
              </div>
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
              setOpenModalId(null);
            }}
          />
        </div>
      ))}
    </div>
  );
}
