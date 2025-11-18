"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <div
      className="text-[var(--black-white-900)] font-[400] text-[16px] leading-[100%] py-4 dm-font flex items-center gap-[10px] cursor-pointer"
      onClick={() => router.back()}
    >
      <span>
        <ChevronLeft size={18} />
      </span>
      <h6>Back</h6>
    </div>
  );
}
