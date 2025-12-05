import { IoSettingsOutline } from "react-icons/io5";
import { FiChevronDown } from "react-icons/fi";
import { SlMenu } from "react-icons/sl";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  // Get user's first name and full name
  const firstName = user?.firstName || "Admin";
  const fullName = user ? `${user.firstName} ${user.lastName}` : "Admin User";

  // Format greeting message
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <>
      <div className="bg-white h-[70px] flex justify-between items-center px-6 dm-font leading-[100%] border-b border-[var(--black-white-200)]">
        <div className="">
          <h2 className="text-[16px] font-[600] text-[var(--black-white-1000)] hidden lg:flex">
            {`${getGreeting()}, ${firstName}!`}
          </h2>
          <p className="text-[14px] font-[400] text-[var(--black-white-800)] pt-[5px] hidden lg:flex">
            Admin Dashboard
          </p>
          <button className="flex lg:hidden" onClick={onMenuClick}>
            <SlMenu />
          </button>
        </div>
        {/* menu icon */}

        <div className="flex items-center gap-[15px]">
          {/* profile only */}
          <div className="flex items-center gap-[10px]">
            <div className="w-[40px] h-[40px] rounded-full overflow-hidden bg-[var(--primary-200)] flex items-center justify-center">
              <span className="text-[var(--primary-1200)] font-[600] text-[16px]">
                {firstName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="lg:flex flex-col hidden">
              <h3 className="font-[600] text-[14px] text-[var(--black-white-1000)]">
                {fullName}
              </h3>
              <p className="font-[400] text-[12px] text-[var(--black-white-800)] capitalize">
                {user?.role || "Admin"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
