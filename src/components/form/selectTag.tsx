"use client";

import { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

interface SelectProps {
  title: string;
  options: string[];
  onSelect?: (value: string) => void;
}

export default function SelectTag({ title, options, onSelect }: SelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (value: string) => {
    setOpen(false);
    onSelect?.(value);
  };

  return (
    <div className="relative w-full" ref={ref}>
      {/* Filter Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-4 h-[35px] rounded-full bg-[#F9F9F9] text-[13px] font-[500] dm-font text-[var(--black-white-1000)] border border-[var(--black-white-200)] gap-2"
      >
        {title}
        <FiChevronDown
          size={18}
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-2 w-full bg-[#f9f9f9] shadow-md rounded-lg border border-gray-200 z-20">
          <ul className="py-2">
            {options.map((item) => (
              <li
                key={item}
                onClick={() => handleSelect(item)}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
