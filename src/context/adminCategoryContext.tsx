"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/config/axiosConfig";
import { toast } from "react-toastify";

// Types
interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  isActive: boolean;
  jobCount: number;
  createdAt: string;
}

interface CategoryInput {
  name: string;
  slug?: string;
  description?: string;
  icon?: string;
  isActive?: boolean;
}

interface AdminCategoryContextType {
  // Category data
  categories: Category[];
  categoriesLoading: boolean;
  categoriesError: any;
  
  // Category management (Admin)
  createCategory: (data: CategoryInput) => Promise<void>;
  updateCategory: (id: string, data: Partial<CategoryInput>) => Promise<void>;
  deleteCategory: (id: string, reassignTo?: string) => Promise<void>;
  
  // Loading states
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
}

const AdminCategoryContext = createContext<AdminCategoryContextType | undefined>(
  undefined
);

export const AdminCategoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  // Fetch categories query
  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await apiClient.get("/api/categories");
      // console.log("Categories API response:", response.data);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  // Create category mutation
  const createCategoryMutation = useMutation({
    mutationFn: async (data: CategoryInput) => {
      const response = await apiClient.post("/api/admin/categories", data);
      return response.data;
    },
    onSuccess: (response) => {
      toast.success(response.message || "Category created successfully!");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["adminDashboardStats"] });
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to create category";
      toast.error(message);
      console.error("Error creating category:", error);
    },
  });

  // Update category mutation
  const updateCategoryMutation = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CategoryInput>;
    }) => {
      const response = await apiClient.put(`/api/admin/categories/${id}`, data);
      return response.data;
    },
    onSuccess: (response) => {
      toast.success(response.message || "Category updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to update category";
      toast.error(message);
      console.error("Error updating category:", error);
    },
  });

  // Delete category mutation
  const deleteCategoryMutation = useMutation({
    mutationFn: async ({
      id,
      reassignTo,
    }: {
      id: string;
      reassignTo?: string;
    }) => {
      const url = reassignTo
        ? `/api/admin/categories/${id}?reassignTo=${reassignTo}`
        : `/api/admin/categories/${id}`;
      const response = await apiClient.delete(url);
      return response.data;
    },
    onSuccess: (response) => {
      toast.success(response.message || "Category deleted successfully!");
      if (response.data?.jobsReassigned) {
        toast.info(`${response.data.jobsReassigned} jobs reassigned`);
      }
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["adminJobs"] });
      queryClient.invalidateQueries({ queryKey: ["adminDashboardStats"] });
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to delete category";
      toast.error(message);
      console.error("Error deleting category:", error);
    },
  });

  // Wrapper functions
  const createCategory = async (data: CategoryInput) => {
    await createCategoryMutation.mutateAsync(data);
  };

  const updateCategory = async (id: string, data: Partial<CategoryInput>) => {
    await updateCategoryMutation.mutateAsync({ id, data });
  };

  const deleteCategory = async (id: string, reassignTo?: string) => {
    await deleteCategoryMutation.mutateAsync({ id, reassignTo });
  };

  // Handle different response structures from backend
  const categories = categoriesData?.data || categoriesData?.categories || categoriesData || [];
  
  // console.log("Processed categories:", categories);
  
  const value: AdminCategoryContextType = {
    categories: Array.isArray(categories) ? categories : [],
    categoriesLoading,
    categoriesError,
    createCategory,
    updateCategory,
    deleteCategory,
    isCreating: createCategoryMutation.isPending,
    isUpdating: updateCategoryMutation.isPending,
    isDeleting: deleteCategoryMutation.isPending,
  };

  return (
    <AdminCategoryContext.Provider value={value}>
      {children}
    </AdminCategoryContext.Provider>
  );
};

export const useAdminCategory = () => {
  const context = useContext(AdminCategoryContext);
  if (context === undefined) {
    throw new Error(
      "useAdminCategory must be used within an AdminCategoryProvider"
    );
  }
  return context;
};
