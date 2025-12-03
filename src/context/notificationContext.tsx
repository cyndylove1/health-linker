"use client";
import { createContext, ReactNode, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../config/axiosConfig";
import { toast } from "react-toastify";

export interface Notification {
    id: string;
    title: string;
    message: string;
    createdAt: string;
    read: boolean;
}

interface NotificationContextType {
    notifications: Notification[];
    unreadCount: number;
    isLoading: boolean;
    markAsRead: (id: string) => Promise<void>;
    markAllAsRead: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
    undefined
);

export function NotificationProvider({ children }: { children: ReactNode }) {
    const queryClient = useQueryClient();

    // Fetch Notifications
    const { data, isLoading } = useQuery({
        queryKey: ["notifications"],
        queryFn: async () => {
            try {
                const response = await apiClient.get("/api/notifications");
                return response.data;
            } catch (error) {
                console.log("Notifications not available");
                return { data: [] };
            }
        },
        retry: false,
    });

    const notifications = Array.isArray(data?.data) ? data.data : [];
    const unreadCount = notifications.filter((n: Notification) => !n.read).length;

    // Mark as Read
    const markReadMutation = useMutation({
        mutationFn: async (id: string) => {
            const response = await apiClient.post(`/api/notifications/${id}/read`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
        },
    });

    const markAsRead = async (id: string) => {
        await markReadMutation.mutateAsync(id);
    };

    // Mark All as Read
    const markAllReadMutation = useMutation({
        mutationFn: async () => {
            const response = await apiClient.post("/api/notifications/read-all");
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
            toast.success("All notifications marked as read");
        },
    });

    const markAllAsRead = async () => {
        await markAllReadMutation.mutateAsync();
    };

    const contextValue: NotificationContextType = {
        notifications,
        unreadCount,
        isLoading,
        markAsRead,
        markAllAsRead,
    };

    return (
        <NotificationContext.Provider value={contextValue}>
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error(
            "useNotification must be used within a NotificationProvider"
        );
    }
    return context;
}
