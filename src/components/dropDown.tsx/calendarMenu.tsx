"use client";
import { useState } from "react";
import Btn from "../button/btn";

interface CalendarProps {
  isOpen: boolean;
  openModal: () => void;
}

export default function CalendarMenu({ isOpen }: CalendarProps) {
  const [active, setActive] = useState<string>("");

  if (!isOpen) return null;

  const options = ["1 Month", "3 Month", "6 Month", "1 Year", "All Time"];

  return (
    <div className="fixed inset-0 bg-black/30 z-50">
      <div className="absolute top-[5rem] right-6 mt-2 w-[122px] bg-white rounded-[8px] z-50 p-2 dm-font leading-[100%]">
        <div className="space-y-2 py-2">
          {options.map((item) => (
            <Btn
              key={item}
              onClick={() => setActive(item)}
              className={`h-[36px] text-start px-3 w-full rounded-[8px] text-[14px] font-[400]
                ${
                  active === item
                    ? "bg-[var(--primary-1200)] text-white" 
                    : "bg-[#F5F5F5] hover:bg-[#f9f9f9] text-[var(--black-white-900)]"
                }
              `}
              text={item}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
