import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Setup interceptors
const setupInterceptors = () => {
  apiClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
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
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Network error occurred";

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
