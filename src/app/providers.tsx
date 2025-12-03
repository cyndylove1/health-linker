"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/authContext";
import { JobProvider } from "@/context/jobContext";
import { UserProvider } from "@/context/userContext";
import { NotificationProvider } from "@/context/notificationContext";
import { RegistrationProvider } from "@/context/registrationContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <ToastContainer position="top-right" autoClose={3000} />
            <AuthProvider>
                <RegistrationProvider>
                    <UserProvider>
                        <JobProvider>
                            <NotificationProvider>{children}</NotificationProvider>
                        </JobProvider>
                    </UserProvider>
                </RegistrationProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
}
