'use client';
import { ReactNode, useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import ClientOnly from "@/components/ClientOnly";
import { HydrationSafeDiv, useHydrationFix } from "@/utils/hydrationUtils";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  
  // Use hydration fix
  useHydrationFix();

  useEffect(() => {
    // Don't do anything while loading
    if (isLoading) {
      console.log("Admin Layout - Still loading, skipping checks");
      return;
    }

    console.log("Admin Layout - isLoading:", isLoading);
    console.log("Admin Layout - isAuthenticated:", isAuthenticated);
    console.log("Admin Layout - user:", user);
    console.log("Admin Layout - user.role:", user?.role);
    console.log("Admin Layout - user.email:", user?.email);
    
    // Check localStorage isAdmin flag first
    const isAdminFromStorage = typeof window !== "undefined" ? localStorage.getItem("isAdmin") : null;
    console.log("Admin Layout - isAdmin from localStorage:", isAdminFromStorage);
    
    // Only redirect if not authenticated
    if (!isAuthenticated) {
      console.log("Admin Layout - Not authenticated, redirecting to login");
      router.push('/login');
      return;
    }
    
    // Check if user is admin - check localStorage flag first, then user object
    if (user) {
      const userRole = user.role;
      const userEmail = user.email;
      const isAdmin = isAdminFromStorage === "true" || userRole === 'admin' || userRole === 'super_admin' || userEmail === 'admin@healthlinker.com';
      
      console.log("Admin Layout - isAdmin check:", isAdmin, "role:", userRole, "email:", userEmail, "fromStorage:", isAdminFromStorage);
      
      if (!isAdmin) {
        console.log("🔴 Admin Layout - Not admin, redirecting to dashboard");
        router.push('/dashboard');
      } else {
        console.log("✅ Admin Layout - User is admin, allowing access");
      }
    } else {
      console.log("⚠️ Admin Layout - No user object yet");
    }
  }, [isAuthenticated, isLoading, router, user]);

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

  // Don't render if not authenticated or not admin
  const isAdminFromStorage = typeof window !== "undefined" ? localStorage.getItem("isAdmin") === "true" : false;
  const isAdmin = user && (isAdminFromStorage || user.role === 'admin' || user.role === 'super_admin' || user.email === 'admin@healthlinker.com');
  
  if (!isAuthenticated || !isAdmin) {
    console.log("Admin Layout - Blocking render. isAuthenticated:", isAuthenticated, "isAdmin:", isAdmin);
    return null;
  }

  return (
    <ClientOnly fallback={
      <HydrationSafeDiv className="flex items-center justify-center min-h-screen">
        <HydrationSafeDiv className="text-lg">Loading admin panel...</HydrationSafeDiv>
      </HydrationSafeDiv>
    }>
      <HydrationSafeDiv className="flex min-h-screen">
        <AdminSidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />

        {/* Main Content Area */}
        <HydrationSafeDiv className="flex-1 flex flex-col lg:ml-[240px] bg-[var(--black-white-100)]">
          <AdminHeader onMenuClick={toggleSidebar} />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </HydrationSafeDiv>
      </HydrationSafeDiv>
    </ClientOnly>
  );
}
