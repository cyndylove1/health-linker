import React, { ReactNode } from "react";
import Sidebar from "@/components/sidebar/sidebar";
import Header from "@/components/ui/header";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar */}
      <div className="fixed top-0 left-0 h-screen overflow-y-auto z-50">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-[255px] w-full">
        <div className="fixed top-0 right-0 left-0 lg:left-[255px] z-20">
          <Header />
        </div>
        <main className="h-[calc(100vh-82px)] h-full pt-[5rem] bg-[#f9f9f9]">
          {children}
        </main>
      </div>
    </div>
  );
}
