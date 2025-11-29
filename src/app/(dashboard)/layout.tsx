'use client';
import { ReactNode, useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Sidebar from "@/components/sidebar/sidebar";
import Header from "@/components/ui/header";
import ClientOnly from "@/components/ClientOnly";
import { HydrationSafeDiv, useHydrationFix } from "@/utils/hydrationUtils";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  
  // Use hydration fix
  useHydrationFix();

  useEffect(() => {
    // Only redirect if not loading and not authenticated
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <ClientOnly fallback={
        <HydrationSafeDiv className="flex items-center justify-center min-h-screen">
          <HydrationSafeDiv className="text-lg">Loading...</HydrationSafeDiv>
        </HydrationSafeDiv>
      }>
        <HydrationSafeDiv className="flex items-center justify-center min-h-screen">
          <HydrationSafeDiv className="text-lg">Loading...</HydrationSafeDiv>
        </HydrationSafeDiv>
      </ClientOnly>
    );
  }

  // Don't render dashboard if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <ClientOnly fallback={
      <HydrationSafeDiv className="flex items-center justify-center min-h-screen">
        <HydrationSafeDiv className="text-lg">Loading dashboard...</HydrationSafeDiv>
      </HydrationSafeDiv>
    }>
      <HydrationSafeDiv className="flex min-h-screen">
        {/* Left Sidebar */}
        <HydrationSafeDiv className="fixed top-0 left-0 h-screen overflow-y-auto z-50">
          <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </HydrationSafeDiv>

        {/* Main Content */}
        <HydrationSafeDiv className="flex-1 lg:ml-[255px] w-full">
          <HydrationSafeDiv className="fixed top-0 right-0 left-0 lg:left-[255px] z-20">
            <Header onMenuClick={toggleSidebar} />
          </HydrationSafeDiv>
          <main className="h-[calc(100vh-82px)] h-full pt-[5rem] bg-[#f9f9f9]" suppressHydrationWarning={true}>
            {children}
          </main>
        </HydrationSafeDiv>
      </HydrationSafeDiv>
    </ClientOnly>
  );
}
