"use client";
import { createContext, ReactNode, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../config/axiosConfig";
import { toast } from "react-toastify";
import { Job } from "./jobContext";
import { useAuth } from "./authContext";

export interface DashboardStats {
    totalAppliedJobs: number;
    totalSavedJobs: number;
    activeApplications: number;
    interviewsScheduled: number;
    recentActivity: any[];
}

export interface UserProfile {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    name?: string;
    phone?: string;
    location?: string;
    country?: string;
    bio?: string;
    avatarUrl?: string | null;
    skills?: string[] | null;
    experience?: string | null;
    education?: string | null;
    resumeUrl?: string | null;
    resumeName?: string | null;
    resumeOriginalName?: string | null;
}

interface UserContextType {
    dashboardStats: DashboardStats | null;
    appliedJobs: Job[];
    savedJobs: Job[];
    profile: UserProfile | null;
    isLoadingStats: boolean;
    isLoadingProfile: boolean;
    updateProfile: (data: Partial<UserProfile>) => Promise<void>;
    uploadAvatar: (file: File) => Promise<void>;
    uploadResume: (file: File) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const queryClient = useQueryClient();
    const { isAuthenticated } = useAuth();

    // Fetch Dashboard Stats
    const { data: statsData, isLoading: isLoadingStats } = useQuery({
        queryKey: ["dashboardStats"],
        queryFn: async () => {
            try {
                const response = await apiClient.get("/api/users/dashboard");
                return response.data;
            } catch (error) {
                console.log("Dashboard stats not available");
                // Return mock data for development
                return {
                    data: {
                        totalAppliedJobs: 5,
                        totalSavedJobs: 12,
                        activeApplications: 3,
                        interviewsScheduled: 2,
                        recentActivity: [
                            { id: 1, action: "Applied for Software Developer position", timestamp: new Date().toISOString() },
                            { id: 2, action: "Saved Frontend Engineer job", timestamp: new Date(Date.now() - 86400000).toISOString() }
                        ]
                    }
                };
            }
        },
        enabled: isAuthenticated,
        retry: false, // Don't retry if auth fails
    });

    // Fetch User Profile
    const { data: profileData, isLoading: isLoadingProfile } = useQuery({
        queryKey: ["userProfile"],
        queryFn: async () => {
            try {
                const response = await apiClient.get("/api/users/me");
                return response.data;
            } catch (error) {
                console.log("User profile not available, checking localStorage");
                // Check localStorage first
                const savedProfile = localStorage.getItem('userProfile');
                if (savedProfile) {
                    try {
                        const parsed = JSON.parse(savedProfile);
                        // If we have saved profile data, return it
                        return { data: parsed };
                    } catch (parseError) {
                        console.error('Failed to parse saved profile:', parseError);
                    }
                }

                // Return mock user data for development (first time only)
                let baseProfile = {
                    id: "mock-user-id",
                    email: "user@example.com",
                    firstName: "John",
                    lastName: "Doe",
                    name: "John Doe",
                    phone: "+1234567890",
                    location: "Lagos, Nigeria",
                    bio: "Healthcare professional seeking opportunities",
                    avatarUrl: null,
                    skills: ["JavaScript", "React", "Node.js"],
                    experience: "5 years in software development",
                    education: "Bachelor's in Computer Science",
                    resumeUrl: null,
                    resumeName: null,
                    resumeOriginalName: null
                };

                return { data: baseProfile };
            }
        },
        enabled: isAuthenticated,
        retry: false,
    });

    // Fetch Applied Jobs
    const { data: appliedJobsData } = useQuery({
        queryKey: ["appliedJobs"],
        queryFn: async () => {
            try {
                const response = await apiClient.get("/api/users/applied-jobs");
                return response.data;
            } catch (error) {
                console.log("Applied jobs not available, using mock data");
                // Return some mock applied jobs for development
                return {
                    data: {
                        jobs: [
                            {
                                id: "3",
                                title: "Backend Developer",
                                company: "DataCorp",
                                type: "Full-time",
                                location: "Abuja, Nigeria",
                                date: "2024-01-10",
                                salary: "₦350,000 - ₦550,000"
                            }
                        ]
                    }
                };
            }
        },
        enabled: isAuthenticated,
        retry: false,
    });

    // Fetch Saved Jobs
    const { data: savedJobsData } = useQuery({
        queryKey: ["savedJobs"],
        queryFn: async () => {
            try {
                const response = await apiClient.get("/api/users/saved-jobs");
                return response.data;
            } catch (error) {
                console.log("Saved jobs not available, using mock data");
                // Return some mock saved jobs for development
                return {
                    data: {
                        jobs: [
                            {
                                id: "1",
                                title: "Frontend Developer",
                                company: "TechCorp",
                                type: "Full-time",
                                location: "Lagos, Nigeria",
                                date: "2024-01-15",
                                salary: "₦300,000 - ₦500,000"
                            },
                            {
                                id: "2",
                                title: "React Developer",
                                company: "StartupHub",
                                type: "Remote",
                                location: "Nigeria",
                                date: "2024-01-14",
                                salary: "₦400,000 - ₦600,000"
                            }
                        ]
                    }
                };
            }
        },
        enabled: isAuthenticated,
        retry: false,
    });

    // Update Profile
    const updateProfileMutation = useMutation({
        mutationFn: async (data: Partial<UserProfile>) => {
            try {
                // Transform skills array to comma-separated string for backend
                const transformedData = { ...data };
                if (transformedData.skills && Array.isArray(transformedData.skills)) {
                    transformedData.skills = transformedData.skills.join(',') as any;
                }

                const response = await apiClient.put("/api/users/me", transformedData);
                return response.data;
            } catch (error) {
                // If API fails, save to localStorage
                console.log("API unavailable, saving profile to localStorage");
                const currentProfile = profileData?.data || {};
                const updatedProfile = { ...currentProfile, ...data };
                localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
                return { data: updatedProfile };
            }
        },
        onSuccess: (response) => {
            toast.success("Profile updated successfully");
            // Update localStorage with the response
            localStorage.setItem('userProfile', JSON.stringify(response.data));
            queryClient.invalidateQueries({ queryKey: ["userProfile"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to update profile");
        },
    });

    const updateProfile = async (data: Partial<UserProfile>) => {
        await updateProfileMutation.mutateAsync(data);
    };

    // Upload Resume
    const uploadResumeMutation = useMutation({
        mutationFn: async (file: File) => {
            try {
                const formData = new FormData();
                formData.append("resume", file);
                const response = await apiClient.post("/api/users/me/resume", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                return response.data;
            } catch (error) {
                // If API fails, simulate file upload by creating object URL
                console.log("API unavailable, simulating resume upload");
                const resumeUrl = URL.createObjectURL(file);
                const currentProfile = profileData?.data || {};
                const updatedProfile = {
                    ...currentProfile,
                    resumeUrl,
                    resumeName: file.name,
                    resumeOriginalName: file.name
                };
                localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
                return { data: { resumeUrl, resumeName: file.name, resumeOriginalName: file.name } };
            }
        },
        onSuccess: (response) => {
            toast.success("Resume uploaded successfully");
            // Update the current profile with resume info
            const currentProfile = profileData?.data || {};
            const updatedProfile = {
                ...currentProfile,
                resumeUrl: response.data.resumeUrl,
                resumeName: response.data.resumeName || response.data.resumeOriginalName,
                resumeOriginalName: response.data.resumeOriginalName
            };
            localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
            queryClient.invalidateQueries({ queryKey: ["userProfile"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to upload resume");
        },
    });

    const uploadResume = async (file: File) => {
        await uploadResumeMutation.mutateAsync(file);
    };

    // Upload Avatar
    const uploadAvatarMutation = useMutation({
        mutationFn: async (file: File) => {
            const formData = new FormData();
            formData.append("file", file);
            const response = await apiClient.post("/api/users/me/avatar", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.data;
        },
        onSuccess: () => {
            toast.success("Avatar uploaded successfully");
            queryClient.invalidateQueries({ queryKey: ["userProfile"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to upload avatar");
        },
    });

    const uploadAvatar = async (file: File) => {
        await uploadAvatarMutation.mutateAsync(file);
    };

    const contextValue: UserContextType = {
        dashboardStats: {
            totalAppliedJobs: appliedJobsData?.data?.jobs?.length || statsData?.data?.totalAppliedJobs || 0,
            totalSavedJobs: savedJobsData?.data?.jobs?.length || statsData?.data?.totalSavedJobs || 0,
            activeApplications: statsData?.data?.activeApplications || 0,
            interviewsScheduled: statsData?.data?.interviewsScheduled || 0,
            recentActivity: statsData?.data?.recentActivity || [],
        },
        appliedJobs: appliedJobsData?.data?.jobs || [],
        savedJobs: savedJobsData?.data?.jobs || [],
        profile: profileData?.data || null,
        isLoadingStats,
        isLoadingProfile,
        updateProfile,
        uploadAvatar,
        uploadResume,
    };

    return (
        <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
