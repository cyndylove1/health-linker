"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../config/axiosConfig";
import { toast } from "react-toastify";

export interface Job {
    id: string;
    title: string;
    company: string;
    type: string;
    location: string;
    date: string;
    salary: string;
    description?: string;
    requirements?: string[];
    benefits?: string[];
    postedDate?: string;
    applicationDeadline?: string;
    companyLogo?: string;
}

export interface JobFilters {
    page?: number;
    limit?: number;
    search?: string;
    location?: string;
    category?: string; // Can be category ID or slug
    industry?: string;
    workType?: string;
    experienceLevel?: string;
    datePosted?: string;
    remoteOnly?: boolean;
}

interface JobContextType {
    jobs: Job[];
    totalJobs: number;
    currentPage: number;
    totalPages: number;
    isLoading: boolean;
    filters: JobFilters;
    setFilters: (filters: JobFilters) => void;
    fetchJobs: (newFilters?: JobFilters) => void;
    getJobDetails: (id: string) => Promise<Job>;
    applyForJob: (id: string, data: any) => Promise<void>;
    saveJob: (id: string) => Promise<void>;
    unsaveJob: (id: string) => Promise<void>;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export function JobProvider({ children }: { children: ReactNode }) {
    const queryClient = useQueryClient();
    const [filters, setFilters] = useState<JobFilters>({ page: 1, limit: 12 });

    // Fetch Jobs Query
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["jobs", filters],
        queryFn: async () => {
            const params = new URLSearchParams();
            Object.entries(filters).forEach(([key, value]) => {
                if (value) params.append(key, String(value));
            });
            const response = await apiClient.get(`/api/jobs?${params.toString()}`);
            return response.data;
        },
    });

    const fetchJobs = (newFilters?: JobFilters) => {
        if (newFilters) {
            setFilters((prev) => ({ ...prev, ...newFilters }));
        } else {
            refetch();
        }
    };

    // Get Job Details
    const getJobDetails = async (id: string) => {
        const response = await apiClient.get(`/api/jobs/${id}`);
        return response.data.data;
    };

    // Apply for Job
    const applyMutation = useMutation({
        mutationFn: async ({ id, data }: { id: string; data: any }) => {
            const response = await apiClient.post(`/api/jobs/${id}/apply`, data);
            return response.data;
        },
        onSuccess: () => {
            toast.success("Application submitted successfully!");
            queryClient.invalidateQueries({ queryKey: ["appliedJobs"] });
            queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to apply");
        },
    });

    const applyForJob = async (id: string, data: any) => {
        await applyMutation.mutateAsync({ id, data });
    };

    // Save Job
    const saveJobMutation = useMutation({
        mutationFn: async (id: string) => {
            const response = await apiClient.post(`/api/jobs/${id}/save`);
            return response.data;
        },
        onSuccess: () => {
            toast.success("Job saved!");
            queryClient.invalidateQueries({ queryKey: ["savedJobs"] });
            queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to save job");
        },
    });

    const saveJob = async (id: string) => {
        await saveJobMutation.mutateAsync(id);
    };

    // Unsave Job
    const unsaveJobMutation = useMutation({
        mutationFn: async (id: string) => {
            const response = await apiClient.delete(`/api/jobs/${id}/save`);
            return response.data;
        },
        onSuccess: () => {
            toast.success("Job removed from saved!");
            queryClient.invalidateQueries({ queryKey: ["savedJobs"] });
            queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to unsave job");
        },
    });

    const unsaveJob = async (id: string) => {
        await unsaveJobMutation.mutateAsync(id);
    };

    const contextValue: JobContextType = {
        jobs: data?.data?.jobs || [],
        totalJobs: data?.data?.total || 0,
        currentPage: data?.data?.currentPage || 1,
        totalPages: data?.data?.totalPages || 1,
        isLoading,
        filters,
        setFilters,
        fetchJobs,
        getJobDetails,
        applyForJob,
        saveJob,
        unsaveJob,
    };

    return (
        <JobContext.Provider value={contextValue}>{children}</JobContext.Provider>
    );
}

export function useJob() {
    const context = useContext(JobContext);
    if (context === undefined) {
        throw new Error("useJob must be used within a JobProvider");
    }
    return context;
}
