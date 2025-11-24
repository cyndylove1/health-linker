'use client';
import { ReactNode } from "react";
import { useState } from "react";
import Sidebar from "@/components/sidebar/sidebar";
import Header from "@/components/ui/header";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };
  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar */}
      <div className="fixed top-0 left-0 h-screen overflow-y-auto z-50">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-[255px] w-full">
        <div className="fixed top-0 right-0 left-0 lg:left-[255px] z-20">
          <Header onMenuClick={toggleSidebar} />
        </div>
        <main className="h-[calc(100vh-82px)] h-full pt-[5rem] bg-[#f9f9f9]">
          {children}
        </main>
      </div>
    </div>
  );
}
