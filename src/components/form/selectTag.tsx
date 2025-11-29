"use client";

import { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  title?: string;
  value?: string;
  onChange?: (value: string) => void;
  options: string[] | Option[];
  onSelect?: (value: string) => void;
}

export default function SelectTag({ title, value, onChange, options, onSelect }: SelectProps) {
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

  const handleSelect = (selectedValue: string) => {
    setOpen(false);
    onSelect?.(selectedValue);
    onChange?.(selectedValue);
  };

  // Helper function to get display text and value from option
  const getOptionProps = (item: string | Option) => {
    if (typeof item === 'string') {
      return { label: item, value: item };
    }
    return item;
  };

  // Get display text for current selection
  const getDisplayText = () => {
    if (title) return title;
    if (value) {
      const option = options.find(opt => {
        const { value: optValue } = getOptionProps(opt);
        return optValue === value;
      });
      if (option) {
        return getOptionProps(option).label;
      }
    }
    return 'Select...';
  };

  return (
    <div className="relative w-full" ref={ref}>
      {/* Filter Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-4 h-[35px] rounded-full bg-[#F9F9F9] text-[13px] font-[500] dm-font text-[var(--black-white-1000)] border border-[var(--black-white-200)] gap-2"
      >
        {getDisplayText()}
        <FiChevronDown
          size={18}
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-2 w-full bg-[#f9f9f9] shadow-md rounded-lg border border-gray-200 z-20">
          <ul className="py-2">
            {options.map((item, index) => {
              const { label, value: optValue } = getOptionProps(item);
              return (
                <li
                  key={`${optValue}-${index}`}
                  onClick={() => handleSelect(optValue)}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  {label}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
