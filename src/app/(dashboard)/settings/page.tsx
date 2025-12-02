"use client";

import Security from "@/components/ui/security";
import TermsOfService from "@/components/ui/termsOf Service";
import Title from "@/components/ui/title";
import { useState } from "react";

export default function TabsSection() {
  const [activeTab, setActiveTab] = useState("security");
  const securityWidth = 90;
  const termsWidth = 116;

  return (
    <div className="md:px-6 px-4 dm-font">
      <Title text="Settings" />
      <div className="w-full bg-white md:p-8 p-4 rounded-xl">
        {/* ---- TABS ---- */}
        <div className="flex space-x-10 text-[14px] font-[400] text-[var(--black-white-1000)]">
          <button
            onClick={() => setActiveTab("security")}
            className={`pb-2 ${
              activeTab === "security"
                ? "font-[600]"
                : "text-[var(--black-white-1000)]"
            }`}
          >
            Security
          </button>

          <button
            onClick={() => setActiveTab("terms")}
            className={`pb-2 ${
              activeTab === "terms"
                ? "font-[600]"
                : "text-[var(--black-white-1000)]"
            }`}
          >
            Terms of Use
          </button>
        </div>

        {/* ---- UNDERLINE BAR ---- */}
        <div className="relative w-[250px] h-[3px] bg-[#e5e5e5] rounded">
          <div
            className="absolute top-0 h-full bg-[#1C9D75] rounded transition-all duration-300"
            style={{
              width: activeTab === "security" ? securityWidth : termsWidth,
              marginLeft: activeTab === "security" ? 0 : securityWidth + 40,
            }}
          ></div>
        </div>

        <div className="mt-6">
          {/* SECURITY CONTENT */}
          {activeTab === "security" && <Security />}

          {/* TERMS OF USE CONTENT */}
          {activeTab === "terms" && <TermsOfService />}
        </div>
      </div>
    </div>
  );
}
