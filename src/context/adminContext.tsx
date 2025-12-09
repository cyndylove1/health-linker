"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/config/axiosConfig";
import { toast } from "react-toastify";

// Types
interface DashboardStats {
  overview: {
    totalJobs: number;
    activeJobs: number;
    totalUsers: number;
    activeUsers: number;
    totalApplications: number;
    pendingApplications: number;
    totalCategories: number;
    jobAlertsActive: number;
  };
  jobStats: {
    postedToday: number;
    postedThisWeek: number;
    postedThisMonth: number;
    expiringThisWeek: number;
  };
  applicationStats: {
    todayApplications: number;
    weekApplications: number;
    monthApplications: number;
  };
  userStats: {
    newUsersToday: number;
    newUsersThisWeek: number;
    newUsersThisMonth: number;
  };
}

interface AdminJob {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  type: string;
  location: string;
  salary?: string;
  status: "active" | "inactive" | "draft" | "expired";
  category: {
    id: string;
    name: string;
  };
  postedDate: string;
  applicationDeadline?: string;
  viewCount: number;
  applicationCount: number;
  savedCount: number;
  createdBy?: {
    id: string;
    name: string;
  };
}

interface JobInput {
  title: string;
  company: string;
  companyLogo?: string;
  type: string;
  location: string;
  salary?: string;
  description: string;
  requirements: string[];
  benefits?: string[];
  experienceLevel: string;
  categoryId: string;
  applicationDeadline?: string;
  isRemote?: boolean;
  numberOfPositions?: number;
  contactEmail?: string;
}

interface AdminContextType {
  // Admin verification
  isAdmin: boolean;
  isAdminLoading: boolean;
  adminError: any;
  
  // Dashboard stats
  dashboardStats: DashboardStats | null;
  statsLoading: boolean;
  statsError: any;
  
  // Job management
  adminJobs: AdminJob[];
  jobsLoading: boolean;
  jobsError: any;
  createJob: (data: JobInput) => Promise<void>;
  updateJob: (id: string, data: Partial<JobInput>) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
  getJobById: (id: string) => Promise<any>;
  
  // Loading states
  isCreatingJob: boolean;
  isUpdatingJob: boolean;
  isDeletingJob: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  // Verify admin access
  const {
    data: adminData,
    isLoading: isAdminLoading,
    error: adminError,
  } = useQuery({
    queryKey: ["adminVerify"],
    queryFn: async () => {
      try {
        const response = await apiClient.get("/api/admin/verify");
        return response.data.data;
      } catch (error: any) {
        console.error("Admin verification failed:", error);
        return { isAdmin: false };
      }
    },
    enabled: isAuthenticated,
    retry: false,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  const isAdmin = adminData?.isAdmin || false;

  // Get dashboard statistics
  const {
    data: dashboardStats,
    isLoading: statsLoading,
    error: statsError,
  } = useQuery({
    queryKey: ["adminDashboardStats"],
    queryFn: async () => {
      try {
        const response = await apiClient.get("/api/admin/dashboard/stats");
        return response.data.data;
      } catch (error: any) {
        console.error("Error fetching dashboard stats:", error);
        throw error;
      }
    },
    enabled: isAuthenticated && isAdmin,
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });

  // Get all jobs (admin view)
  const {
    data: jobsData,
    isLoading: jobsLoading,
    error: jobsError,
  } = useQuery({
    queryKey: ["adminJobs"],
    queryFn: async () => {
      try {
        const response = await apiClient.get("/api/admin/jobs?limit=100");
        return response.data.data.jobs;
      } catch (error: any) {
        console.error("Error fetching admin jobs:", error);
        throw error;
      }
    },
    enabled: isAuthenticated && isAdmin,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const adminJobs: AdminJob[] = jobsData || [];

  // Get single job by ID
  const getJobById = async (id: string) => {
    try {
      const response = await apiClient.get(`/api/admin/jobs/${id}`);
      return response.data.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to fetch job details";
      toast.error(message);
      console.error("Error fetching job:", error);
      throw error;
    }
  };

  // Create job mutation
  const createJobMutation = useMutation({
    mutationFn: async (data: JobInput) => {
      const response = await apiClient.post("/api/admin/jobs", data);
      return response.data;
    },
    onSuccess: (response) => {
      toast.success(response.message || "Job created successfully!");
      queryClient.invalidateQueries({ queryKey: ["adminJobs"] });
      queryClient.invalidateQueries({ queryKey: ["adminDashboardStats"] });
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Failed to create job";
      toast.error(message);
      console.error("Error creating job:", error);
    },
  });

  // Update job mutation
  const updateJobMutation = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<JobInput>;
    }) => {
      const response = await apiClient.put(`/api/admin/jobs/${id}`, data);
      return response.data;
    },
    onSuccess: (response) => {
      toast.success(response.message || "Job updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["adminJobs"] });
      queryClient.invalidateQueries({ queryKey: ["adminDashboardStats"] });
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Failed to update job";
      toast.error(message);
      console.error("Error updating job:", error);
    },
  });

  // Delete job mutation
  const deleteJobMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete(`/api/admin/jobs/${id}`);
      return response.data;
    },
    onSuccess: (response) => {
      toast.success(response.message || "Job deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["adminJobs"] });
      queryClient.invalidateQueries({ queryKey: ["adminDashboardStats"] });
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Failed to delete job";
      toast.error(message);
      console.error("Error deleting job:", error);
    },
  });

  // Wrapper functions
  const createJob = async (data: JobInput) => {
    await createJobMutation.mutateAsync(data);
  };

  const updateJob = async (id: string, data: Partial<JobInput>) => {
    await updateJobMutation.mutateAsync({ id, data });
  };

  const deleteJob = async (id: string) => {
    await deleteJobMutation.mutateAsync(id);
  };

  const value: AdminContextType = {
    isAdmin,
    isAdminLoading,
    adminError,
    dashboardStats: dashboardStats || null,
    statsLoading,
    statsError,
    adminJobs,
    jobsLoading,
    jobsError,
    createJob,
    updateJob,
    deleteJob,
    getJobById,
    isCreatingJob: createJobMutation.isPending,
    isUpdatingJob: updateJobMutation.isPending,
    isDeletingJob: deleteJobMutation.isPending,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
