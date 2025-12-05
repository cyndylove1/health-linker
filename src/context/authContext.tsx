"use client";
import apiClient from "../config/axiosConfig";
import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
} from "react";
import {
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  role?: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export interface OTPData {
  channel: "email" | "sms";
  destination: string;
  purpose: "register" | "login_mfa" | "password_reset";
  otp?: string; // For verification
  otpId?: string; // For verification
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ResetPasswordData {
  token: string;
  email: string;
  newPassword: string;
  newPassword_confirmation: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginUser: (credentials: LoginData) => Promise<void>;
  registerUser: (userData: RegisterData) => Promise<void>;
  verifyOTP: (otpData: any) => Promise<void>;
  sendOTP: (otpData: OTPData) => Promise<any>;
  resetPassword: (data: ResetPasswordData) => Promise<void>;
  verifyResetToken: (token: string) => Promise<any>;
  forgotPassword: (details: { email: string }) => Promise<void>;
  logout: () => void;
  socialLogin: (
    provider: "google" | "facebook",
    token: string
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Create a client
const queryClient = new QueryClient();

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for token on mount
  useEffect(() => {
    // Ensure this only runs on client side
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      console.log("Stored user from localStorage:", storedUser);
      if (token && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          console.log("Parsed user object:", parsedUser);
          console.log("User role from storage:", parsedUser?.role);
          setIsAuthenticated(true);
          setUser(parsedUser);
        } catch (error) {
          console.error("Error parsing stored user:", error);
          // Clear invalid data
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }
    }
    setIsLoading(false);
  }, []);

  // register Mutation
  const registerMutation = useMutation({
    mutationFn: async (userData: RegisterData) => {
      try {
        const response = await apiClient.post("/api/auth/register", userData);
        return response.data;
      } catch (error: any) {
        if (error.code === "ECONNREFUSED" || error.request) {
          throw new Error(
            "Unable to connect to server. Please check your connection."
          );
        }
        throw error;
      }
    },
    onSuccess: async (data, variables) => {
      toast.success(data.message);
      // Store email for OTP verification
      if (typeof window !== "undefined") {
        localStorage.setItem("signupEmail", variables.email);
      }

      // Automatically send OTP after successful registration
      try {
        const otpResponse = await apiClient.post("/api/auth/send-otp", {
          destination: variables.email,
        });

        // Store request_id as otpId and expires_in
        if (typeof window !== "undefined") {
          if (otpResponse.data.request_id) {
            localStorage.setItem("otpId", otpResponse.data.request_id);
          }
          if (otpResponse.data.expires_in) {
            localStorage.setItem(
              "otpExpiresIn",
              String(otpResponse.data.expires_in)
            );
            localStorage.setItem("otpStartTime", String(Date.now()));
          }
        }

        toast.success("OTP sent to your email!");
        router.push("/otp-verify");
      } catch (otpError: any) {
        toast.error(otpError.response?.data?.message || "Failed to send OTP");
        // Still redirect to OTP page but let user resend manually
        router.push("/otp-verify");
      }
    },
    onError: (error: any) => {
      toast.error(
        error.message || error.response?.data?.message || "Signup failed"
      );
    },
  });

  const registerUser = async (userData: RegisterData) => {
    await registerMutation.mutateAsync(userData);
  };

  // Send OTP Mutation
  const sendOTPMutation = useMutation({
    mutationFn: async (otpData: OTPData) => {
      const response = await apiClient.post("/api/auth/send-otp", otpData);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      // Store request_id as otpId and expires_in for OTP verification
      if (typeof window !== "undefined") {
        if (data.request_id) {
          localStorage.setItem("otpId", data.request_id);
        }
        if (data.expires_in) {
          localStorage.setItem("otpExpiresIn", String(data.expires_in));
          localStorage.setItem("otpStartTime", String(Date.now()));
        }
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    },
  });

  const sendOTP = async (otpData: OTPData) => {
    return await sendOTPMutation.mutateAsync(otpData);
  };

  // OTP verification mutation
  const verifyOTPMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiClient.post("/api/auth/verify-otp", data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("OTP Verified Successfully");
      if (typeof window !== "undefined") {
        // Clear OTP data
        localStorage.removeItem("signupEmail");
        localStorage.removeItem("otpId");
        localStorage.removeItem("otpExpiresIn");
        localStorage.removeItem("otpStartTime");

        // Save authentication token and user info per the API spec
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("authToken", data.token); // Store with both keys for compatibility
        }

        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          setUser(data.user);
        }

        setIsAuthenticated(true);
      }

      // Redirect to dashboard after successful OTP verification
      router.push("/dashboard");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        (error.response?.data?.code
          ? error.response.data.code[0]
          : "Invalid OTP");
      console.error("OTP Verification Error:", {
        message: errorMessage,
        status: error.response?.status,
        data: error.response?.data,
      });
      toast.error(errorMessage);
    },
  });

  const verifyOTP = async (data: { otpId: string; code: string }) => {
    if (!data.otpId) {
      toast.error("OTP session not found. Please request a new OTP.");
      return;
    }
    if (!data.code || data.code.length !== 6) {
      toast.error("OTP must be exactly 6 digits");
      return;
    }
    await verifyOTPMutation.mutateAsync(data);
  };

  // login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      const response = await apiClient.post("/api/auth/login", credentials);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      
      // Debug: Log the response to see what we're getting
      console.log("Login response:", data);
      console.log("User object:", data.user);
      console.log("User role:", data.user?.role);
      console.log("User email:", data.user?.email);
      
      // Store everything in localStorage first
      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        // Store admin flag for immediate checking
        const userRole = data.user?.role;
        const userEmail = data.user?.email;
        const isAdmin = userRole === "admin" || userRole === "super_admin" || userEmail === "admin@healthlinker.com";
        localStorage.setItem("isAdmin", String(isAdmin));
        console.log("Setting isAdmin flag in localStorage:", isAdmin);
      }
      
      // Set state
      setUser(data.user);
      setIsAuthenticated(true);
      
      // Redirect based on user role or email (fallback for admin)
      const userRole = data.user?.role;
      const userEmail = data.user?.email;
      console.log("Redirecting user with role:", userRole, "email:", userEmail);
      
      // Check role first, then fallback to checking admin email
      if (userRole === "admin" || userRole === "super_admin" || userEmail === "admin@healthlinker.com") {
        console.log("🔴 ADMIN DETECTED - Redirecting to /admin/dashboard");
        // Use window.location for a hard redirect to ensure it works
        setTimeout(() => {
          window.location.href = "/admin/dashboard";
        }, 100);
      } else {
        console.log("Regular user - Redirecting to user dashboard");
        router.push("/dashboard");
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });

  const loginUser = async (credentials: LoginData) => {
    await loginMutation.mutateAsync(credentials);
  };

  // Forgot Password
  const forgotPasswordMutation = useMutation({
    mutationFn: async (details: { email: string }) => {
      const response = await apiClient.post(
        "/api/auth/forgot-password",
        details
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(
        data.message ||
          "If an account with this email exists, a password reset link has been sent"
      );
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Failed to send reset email";
      toast.error(errorMessage);
      console.error("Forgot password error:", error.response?.data);
    },
  });

  const forgotPassword = async (details: { email: string }) => {
    if (!details.email || !details.email.trim()) {
      toast.error("Please enter a valid email address");
      return;
    }
    await forgotPasswordMutation.mutateAsync(details);
  };

  // Verify Reset Token
  const verifyResetTokenMutation = useMutation({
    mutationFn: async (token: string) => {
      const response = await apiClient.post("/api/auth/verify-reset-token", {
        token,
      });
      return response.data;
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Invalid or expired reset token";
      console.error("Token verification error:", error.response?.data);
      throw error;
    },
  });

  const verifyResetToken = async (token: string) => {
    if (!token || !token.trim()) {
      toast.error("Reset token is missing");
      throw new Error("Reset token is missing");
    }
    try {
      const result = await verifyResetTokenMutation.mutateAsync(token);
      return result;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Invalid or expired reset token";
      toast.error(errorMessage);
      throw error;
    }
  };

  // Reset Password
  const resetPasswordMutation = useMutation({
    mutationFn: async (data: ResetPasswordData) => {
      const response = await apiClient.post("/api/auth/reset-password", data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Password has been reset successfully");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        (error.response?.data?.code
          ? error.response.data.code[0]
          : "Failed to reset password");
      toast.error(errorMessage);
      console.error("Reset password error:", error.response?.data);
    },
  });

  const resetPassword = async (data: ResetPasswordData) => {
    // Validation
    if (!data.token || !data.token.trim()) {
      toast.error("Reset token is missing");
      return;
    }
    if (!data.email || !data.email.trim()) {
      toast.error("Email is required");
      return;
    }
    if (!data.newPassword || data.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    if (data.newPassword !== data.newPassword_confirmation) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await resetPasswordMutation.mutateAsync(data);
      // Redirect to login after successful reset
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      console.error("Password reset failed:", error);
    }
  };

  // Social Login
  const socialLoginMutation = useMutation({
    mutationFn: async ({
      provider,
      token,
    }: {
      provider: string;
      token: string;
    }) => {
      const endpoint =
        provider === "google" ? "/api/auth/google" : "/api/auth/facebook";
      // Adjust payload based on provider if needed, assuming simple token pass for now
      const payload =
        provider === "google" ? { googleToken: token } : { accessToken: token };

      const response = await apiClient.post(endpoint, payload);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      setUser(data.user);
      setIsAuthenticated(true);
      router.push("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Social login failed");
    },
  });

  const socialLogin = async (
    provider: "google" | "facebook",
    token: string
  ) => {
    await socialLoginMutation.mutateAsync({ provider, token });
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("isAdmin");
    }
    setUser(null);
    setIsAuthenticated(false);
    router.push("/login");
    toast.info("Logged out successfully");
  };

  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    loginUser,
    registerUser,
    verifyOTP,
    sendOTP,
    resetPassword,
    verifyResetToken,
    forgotPassword,
    socialLogin,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
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
