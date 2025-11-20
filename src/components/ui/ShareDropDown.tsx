"use client";

interface ShareDropdownProps {
  isOpen: boolean;
}

export default function ShareDropdown({ isOpen }: ShareDropdownProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute right-[-20px] mt-2  bg-[#f9f9f9] rounded-[8px] p-2 z-50">
      <div>
        {/* <h2>Share this Job with your friends and family</h2> */}
      </div>
    </div>
  );
}
