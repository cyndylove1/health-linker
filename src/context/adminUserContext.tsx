"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/config/axiosConfig";
import { toast } from "react-toastify";

// Types
interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "user" | "admin" | "super_admin";
  status: "active" | "inactive" | "suspended";
  registeredDate: string;
  lastLogin?: string;
  isEmailVerified: boolean;
  stats?: {
    applicationsCount: number;
    savedJobsCount: number;
    jobAlertsCount: number;
  };
}

interface Application {
  id: string;
  job: {
    id: string;
    title: string;
    company: string;
  };
  applicant: {
    id: string;
    name: string;
    email: string;
  };
  status: "pending" | "reviewed" | "accepted" | "rejected";
  appliedAt: string;
  resume?: string;
}

interface AdminUserContextType {
  // User management
  adminUsers: AdminUser[];
  usersLoading: boolean;
  usersError: any;
  getUserById: (id: string) => Promise<any>;
  updateUserStatus: (id: string, status: string, reason?: string) => Promise<void>;
  updateUserRole: (id: string, role: string) => Promise<void>;
  
  // Application management
  applications: Application[];
  applicationsLoading: boolean;
  applicationsError: any;
  getApplicationById: (id: string) => Promise<any>;
  updateApplicationStatus: (
    id: string,
    status: string,
    notes?: string,
    notifyApplicant?: boolean
  ) => Promise<void>;
  fetchApplications: () => Promise<void>; // <-- Add this line
  
  // Loading states
  isUpdatingStatus: boolean;
  isUpdatingRole: boolean;
  isUpdatingApplication: boolean;
}

const AdminUserContext = createContext<AdminUserContextType | undefined>(
  undefined
);

export const AdminUserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    
    // Check admin status from adminContext if available
    const checkAdmin = async () => {
      try {
        const response = await apiClient.get("/api/admin/verify");
        setIsAdmin(response.data.data.isAdmin);
      } catch (error) {
        setIsAdmin(false);
      }
    };
    
    if (token) {
      checkAdmin();
    }
  }, []);

  // Get all users (admin view)
  const {
    data: usersData,
    isLoading: usersLoading,
    error: usersError,
  } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: async () => {
      try {
        const response = await apiClient.get("/api/admin/users?limit=100");
        return response.data.data.users;
      } catch (error: any) {
        console.error("Error fetching admin users:", error);
        throw error;
      }
    },
    enabled: isAuthenticated && isAdmin,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const adminUsers: AdminUser[] = usersData || [];

  // Get all applications (admin view)
  const {
    data: applicationsData,
    isLoading: applicationsLoading,
    error: applicationsError,
  } = useQuery({
    queryKey: ["adminApplications"],
    queryFn: async () => {
      try {
        const response = await apiClient.get("/api/admin/applications?limit=100");
        return response.data.data.applications;
      } catch (error: any) {
        console.error("Error fetching applications:", error);
        throw error;
      }
    },
    enabled: isAuthenticated && isAdmin,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const applications: Application[] = applicationsData || [];

  // Get single user by ID
  const getUserById = async (id: string) => {
    try {
      const response = await apiClient.get(`/api/admin/users/${id}`);
      return response.data.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to fetch user details";
      toast.error(message);
      console.error("Error fetching user:", error);
      throw error;
    }
  };

  // Get single application by ID
  const getApplicationById = async (id: string) => {
    try {
      const response = await apiClient.get(`/api/admin/applications/${id}`);
      return response.data.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to fetch application details";
      toast.error(message);
      console.error("Error fetching application:", error);
      throw error;
    }
  };

  // Update user status mutation
  const updateUserStatusMutation = useMutation({
    mutationFn: async ({
      id,
      status,
      reason,
    }: {
      id: string;
      status: string;
      reason?: string;
    }) => {
      const response = await apiClient.put(`/api/admin/users/${id}/status`, {
        status,
        reason,
      });
      return response.data;
    },
    onSuccess: (response) => {
      toast.success(response.message || "User status updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
      queryClient.invalidateQueries({ queryKey: ["adminDashboardStats"] });
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to update user status";
      toast.error(message);
      console.error("Error updating user status:", error);
    },
  });

  // Update user role mutation
  const updateUserRoleMutation = useMutation({
    mutationFn: async ({ id, role }: { id: string; role: string }) => {
      const response = await apiClient.put(`/api/admin/users/${id}/role`, {
        role,
      });
      return response.data;
    },
    onSuccess: (response) => {
      toast.success(response.message || "User role updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to update user role";
      toast.error(message);
      console.error("Error updating user role:", error);
    },
  });

  // Update application status mutation
  const updateApplicationStatusMutation = useMutation({
    mutationFn: async ({
      id,
      status,
      notes,
      notifyApplicant,
    }: {
      id: string;
      status: string;
      notes?: string;
      notifyApplicant?: boolean;
    }) => {
      const response = await apiClient.put(
        `/api/admin/applications/${id}/status`,
        {
          status,
          notes,
          notifyApplicant,
        }
      );
      return response.data;
    },
    onSuccess: (response) => {
      toast.success(
        response.message || "Application status updated successfully!"
      );
      queryClient.invalidateQueries({ queryKey: ["adminApplications"] });
      queryClient.invalidateQueries({ queryKey: ["adminDashboardStats"] });
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to update application status";
      toast.error(message);
      console.error("Error updating application status:", error);
    },
  });

  // Wrapper functions
  const updateUserStatus = async (
    id: string,
    status: string,
    reason?: string
  ) => {
    await updateUserStatusMutation.mutateAsync({ id, status, reason });
  };

  const updateUserRole = async (id: string, role: string) => {
    await updateUserRoleMutation.mutateAsync({ id, role });
  };

  const updateApplicationStatus = async (
    id: string,
    status: string,
    notes?: string,
    notifyApplicant?: boolean
  ) => {
    await updateApplicationStatusMutation.mutateAsync({
      id,
      status,
      notes,
      notifyApplicant,
    });
  };

  // Add fetchApplications implementation
  const fetchApplications = async () => {
    try {
      await queryClient.invalidateQueries({ queryKey: ["adminApplications"] });
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const value: AdminUserContextType = {
    adminUsers,
    usersLoading,
    usersError,
    getUserById,
    updateUserStatus,
    updateUserRole,
    applications,
    applicationsLoading,
    applicationsError,
    getApplicationById,
    updateApplicationStatus,
    fetchApplications,
    isUpdatingStatus: updateUserStatusMutation.isPending,
    isUpdatingRole: updateUserRoleMutation.isPending,
    isUpdatingApplication: updateApplicationStatusMutation.isPending,
  };

  return (
    <AdminUserContext.Provider value={value}>
      {children}
    </AdminUserContext.Provider>
  );
};

export const useAdminUser = () => {
  const context = useContext(AdminUserContext);
  if (context === undefined) {
    throw new Error("useAdminUser must be used within an AdminUserProvider");
  }
  return context;
};
