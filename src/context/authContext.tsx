"use client";
import apiClient from "../config/axiosConfig";
import { createContext, ReactNode } from "react";
import {
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export interface OTPData {
  channel: "email";
  destination: string;
  purpose: "register";
  otp: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ResetPasswordData {
  hashed_password: string;
  confirm_password: string;
}

interface AuthContextType {
  loginUser: (credentials: LoginData) => Promise<void>;
  registerUser: (userData: RegisterData) => Promise<void>;
  verifyOTP: (otpData: OTPData) => Promise<void>;
  //   resetPassword: (data: ResetPasswordData) => Promise<void>;
  forgotPassword: (details: { email: string }) => Promise<void>;
  //   resendEmail: () => Promise<void>;
  //   socialLogin: (provider: "google" | "facebook") => Promise<void>;
  //   userEmail: string;
  //   setUserEmail: (email: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Create a client
const queryClient = new QueryClient();

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();

  // register Mutation
  const registerMutation = useMutation({
    mutationFn: async (userData: RegisterData) => {
      const response = await apiClient.post("/api/auth/register", userData);
      return response.data;
    },
    onSuccess: (data, variables) => {
      toast.success(data.message);

      // Store email
      localStorage.setItem("signupEmail", variables.email);
      router.push("/otp-verify");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Signup failed");
    },
  });

  const registerUser = async (userData: RegisterData) => {
    await registerMutation.mutateAsync(userData);
  };

  // OTP verification mutation
  const otpMutation = useMutation({
    mutationFn: async (otpData: OTPData) => {
      const response = await apiClient.post("/api/auth/send-otp", otpData);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Otp Verified Successfully");
      localStorage.removeItem("signupEmail");
      router.push("/successful");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });

  const verifyOTP = async (otpData: OTPData) => {
    await otpMutation.mutateAsync(otpData);
  };

  // login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: Partial<LoginData>) => {
      const response = await apiClient.post("/api/auth/login", credentials);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      router.push("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });

  const loginUser = async (credentials: LoginData) => {
    await loginMutation.mutateAsync(credentials);
  };

  // ResetPassword mutation
  //   const ResetPasswordMutation = useMutation({
  //     mutationFn: async (data: Partial<ResetPasswordData>) => {
  //       const response = await apiClient.patch(
  //         "/api/v1/user/password/reset/new_password",
  //         data
  //       );
  //       return response.data;
  //     },
  //     onSuccess: (data) => {
  //       toast.success(data.message);
  //       router.push("/login");
  //     },
  //     onError: (error: any) => {
  //       toast.error(error.response?.data?.detail);
  //     },
  //   });
  //   const resetPassword = async (data: Partial<ResetPasswordData>) => {
  //     await ResetPasswordMutation.mutateAsync(data);
  //   };

  //   // resend email mutation
  //   const ResendEmailMutation = useMutation({
  //     mutationFn: async (email: string) => {
  //       const response = await apiClient.post(
  //         "/api/v1/auth/resend_verification_email",
  //         { email }
  //       );
  //       return response.data;
  //     },
  //     onSuccess: (data) => {
  //       toast.success(data.message);
  //     },
  //     onError: (error: any) => {
  //       toast.error(error.response?.data?.detail);
  //     },
  //   });
  //   const resendEmail = async () => {
  //     if (!userEmail) {
  //       toast.error("Email not found. Please");
  //       return;
  //     }
  //     await ResendEmailMutation.mutateAsync(userEmail);
  //   };

  // forgotPassword mutation
  const forgotPasswordMutation = useMutation({
    mutationFn: async (details: { email: string }) => {
      const response = await apiClient.post(
        `/api/auth/password/forgot?email=${encodeURIComponent(details.email)}`
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      router.push("/reset-password");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });

  const forgotPassword = async (details: { email: string }) => {
    await forgotPasswordMutation.mutateAsync(details);
  };

  const contextValue: AuthContextType = {
    loginUser,
    registerUser,
    verifyOTP,
    // resetPassword,
    forgotPassword,
    // socialLogin,
    // resendEmail,
    // userEmail,
    // setUserEmail,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

// Create a wrapper component that provides the QueryClient
export function AuthProviderWithQueryClient({ children }: AuthProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
}

export { AuthContext };
