"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/config/axiosConfig";
import { toast } from "react-toastify";

// Types
interface JobAlert {
  id: string;
  jobTitle: string;
  experienceLevel: string[];
  locations: string[];
  jobType: string[];
  isActive: boolean;
  createdAt: string;
}

interface JobAlertInput {
  jobTitle: string;
  experienceLevel: string[];
  locations: string[];
  jobType: string[];
}

interface JobMatch {
  id: string;
  title: string;
  company: string;
  type: string;
  location: string;
  date: string;
  salary?: string;
}

interface JobAlertContextType {
  // Data
  alerts: JobAlert[];
  isLoading: boolean;
  error: any;
  
  // Mutations
  createAlert: (data: JobAlertInput) => Promise<void>;
  updateAlert: (id: string, data: Partial<JobAlertInput>) => Promise<void>;
  deleteAlert: (id: string) => Promise<void>;
  getMatches: (id: string, page?: number) => Promise<any>;
  
  // State
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
}

const JobAlertContext = createContext<JobAlertContextType | undefined>(undefined);

export const JobAlertProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  // Get all job alerts for user
  const {
    data: alertsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["jobAlerts"],
    queryFn: async () => {
      try {
        const response = await apiClient.get("/api/users/job-alerts");
        return response.data.data;
      } catch (error: any) {
        console.error("Error fetching job alerts:", error);
        throw error;
      }
    },
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const alerts: JobAlert[] = alertsData || [];

  // Create job alert mutation
  const createAlertMutation = useMutation({
    mutationFn: async (data: JobAlertInput) => {
      const response = await apiClient.post("/api/users/job-alerts", data);
      return response.data;
    },
    onSuccess: (response) => {
      toast.success(response.message || "Job alert created successfully!");
      queryClient.invalidateQueries({ queryKey: ["jobAlerts"] });
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to create job alert";
      toast.error(message);
      console.error("Error creating job alert:", error);
    },
  });

  // Update job alert mutation
  const updateAlertMutation = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<JobAlertInput>;
    }) => {
      const response = await apiClient.put(`/api/users/job-alerts/${id}`, data);
      return response.data;
    },
    onSuccess: (response) => {
      toast.success(response.message || "Job alert updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["jobAlerts"] });
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to update job alert";
      toast.error(message);
      console.error("Error updating job alert:", error);
    },
  });

  // Delete job alert mutation
  const deleteAlertMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete(`/api/users/job-alerts/${id}`);
      return response.data;
    },
    onSuccess: (response) => {
      toast.success(response.message || "Job alert deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["jobAlerts"] });
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to delete job alert";
      toast.error(message);
      console.error("Error deleting job alert:", error);
    },
  });

  // Get matching jobs for alert
  const getMatches = async (id: string, page: number = 1) => {
    try {
      const response = await apiClient.get(
        `/api/users/job-alerts/${id}/matches?page=${page}&limit=12`
      );
      return response.data.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to fetch matching jobs";
      toast.error(message);
      console.error("Error fetching job matches:", error);
      throw error;
    }
  };

  // Wrapper functions
  const createAlert = async (data: JobAlertInput) => {
    await createAlertMutation.mutateAsync(data);
  };

  const updateAlert = async (id: string, data: Partial<JobAlertInput>) => {
    await updateAlertMutation.mutateAsync({ id, data });
  };

  const deleteAlert = async (id: string) => {
    await deleteAlertMutation.mutateAsync(id);
  };

  const value: JobAlertContextType = {
    alerts,
    isLoading,
    error,
    createAlert,
    updateAlert,
    deleteAlert,
    getMatches,
    isCreating: createAlertMutation.isPending,
    isUpdating: updateAlertMutation.isPending,
    isDeleting: deleteAlertMutation.isPending,
  };

  return (
    <JobAlertContext.Provider value={value}>
      {children}
    </JobAlertContext.Provider>
  );
};

export const useJobAlert = () => {
  const context = useContext(JobAlertContext);
  if (context === undefined) {
    throw new Error("useJobAlert must be used within a JobAlertProvider");
  }
  return context;
};
