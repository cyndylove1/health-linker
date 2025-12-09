import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000, // 10 second timeout
  withCredentials: true, // Always send cookies for Sanctum
});

// Setup interceptors
const setupInterceptors = () => {
  apiClient.interceptors.request.use(
    (config) => {
      // Only access localStorage on client side
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor for toasts handling
  apiClient.interceptors.response.use(
    (response) => {
      const showToast = response.config.headers["x-show-toast"] === "true";
      if (showToast && response.data?.message) {
        toast.dismiss();
        toast.success(response.data.message);
      }
      return response;
    },
    (error) => {
      const showToast = error.config?.headers?.["x-show-toast"] === "true";
      
      // Handle different types of errors
      let errorMessage = "An error occurred";
      
      if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND' || !error.response) {
        errorMessage = "Backend server is not available. Please check if the server is running.";
      } else if (error.response?.status === 401) {
        errorMessage = "Authentication required. Please login again.";
        // Clear invalid token
        if (typeof window !== 'undefined') {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      } else if (error.response?.status >= 500) {
        errorMessage = "Server error. Please try again later.";
      } else {
        errorMessage = error.response?.data?.message || error.message || "Network error occurred";
      }

      if (showToast) {
        toast.dismiss();
        toast.error(errorMessage);
      }

      return Promise.reject(error);
    }
  );

  return apiClient;
};

const configuredClient = setupInterceptors();
export default configuredClient;
