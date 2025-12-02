// components/ui/CustomSelect.tsx
"use client";
import React from "react";

type Option = { value: string; label: string };

type Props = {
  id?: string;
  value?: string;
  onChange?: (v: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
  disabled?: boolean; 
};

export default function CustomSelect({
  id,
  value,
  onChange,
  options,
  placeholder,
   disabled ,
  className = "",
}: Props) {
  return (
    <div className="relative w-full">
      <select
        id={id}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        className={`w-full h-[48px] appearance-none rounded-[6px]  px-3 pr-12 text-[14px] outline-none  ${className}`}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Custom arrow icon - placed with space from the right */}
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-gray-500"
          aria-hidden
        >
          <path
            d="M7 10l5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
