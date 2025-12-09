'use client';
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/config/axiosConfig";
import { useAdminCategory } from "@/context/adminCategoryContext";
import Title from "@/components/ui/title";
import DeleteModal from "@/components/modal/deleteModal";
import AdminCategoryModal from "@/components/modal/adminCategoryModal";

export default function AdminCategoriesPage() {
  const { deleteCategory } = useAdminCategory();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{ id: string; name: string; description?: string; slug?: string; icon?: string } | null>(null);

  // Fetch categories
  const { data: categoriesData, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await apiClient.get("/api/categories");
      return response.data;
    },
  });

  const categories = categoriesData?.data || [];

  const handleDeleteClick = (id: string, name: string) => {
    setSelectedCategory({ id, name });
    setShowDeleteModal(true);
  };

  const handleEditClick = (category: any) => {
    setSelectedCategory(category);
    setShowCategoryModal(true);
  };

  const handleAddClick = () => {
    setSelectedCategory(null);
    setShowCategoryModal(true);
  };

  const handleCloseModal = () => {
    setShowCategoryModal(false);
    setSelectedCategory(null);
  };

  const handleDeleteConfirm = async () => {
    if (selectedCategory) {
      // TODO: Add logic to reassign jobs to another category
      await deleteCategory(selectedCategory.id, undefined); // Pass undefined for reassignment category
      setShowDeleteModal(false);
      setSelectedCategory(null);
    }
  };

  if (isLoadingCategories) {
    return (
      <div className="px-4 py-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading categories...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-2 sm:px-4 dm-font leading-[100%]">
      <Title text="Category Management" />

      {/* Header with Add Button */}
      <div className="bg-white rounded-[16px] border-[1px] border-[var(--black-white-200)] p-4 mb-4">
        <div className="flex justify-between items-center">
          <p className="text-[14px] text-[var(--black-white-800)]">
            Total Categories: {categories?.length || 0}
          </p>
          <button
            onClick={handleAddClick}
            className="px-4 py-2 bg-[var(--primary-1200)] text-white rounded-[10px] hover:bg-[#078e63] transition-colors text-[14px] font-[500]"
          >
            + Add Category
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories && categories.length === 0 ? (
          <div className="col-span-full bg-white rounded-[16px] border-[1px] border-[var(--black-white-200)] p-8 text-center">
            <p className="text-[14px] text-[var(--black-white-800)]">No categories found</p>
          </div>
        ) : (
          categories?.map((category: any) => (
            <div
              key={category.id}
              className="bg-white rounded-[16px] border-[1px] border-[var(--black-white-200)] p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-[16px] font-[600] text-[var(--black-white-1000)] mb-2">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="text-[12px] text-[var(--black-white-800)] line-clamp-2">
                      {category.description}
                    </p>
                  )}
                </div>
                <div className="w-12 h-12 rounded-full bg-[var(--primary-200)] flex items-center justify-center flex-shrink-0 ml-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 6H6H9M3 6C3 4.89543 3.89543 4 5 4H7C8.10457 4 9 4.89543 9 6M3 6V8C3 9.10457 3.89543 10 5 10H7C8.10457 10 9 9.10457 9 8V6M15 6H18H21M15 6C15 4.89543 15.8954 4 17 4H19C20.1046 4 21 4.89543 21 6M15 6V8C15 9.10457 15.8954 10 17 10H19C20.1046 10 21 9.10457 21 8V6M3 18H6H9M3 18C3 16.8954 3.89543 16 5 16H7C8.10457 16 9 16.8954 9 18M3 18V20C3 21.1046 3.89543 22 5 22H7C8.10457 22 9 21.1046 9 20V18M15 18H18H21M15 18C15 16.8954 15.8954 16 17 16H19C20.1046 16 21 16.8954 21 18M15 18V20C15 21.1046 15.8954 22 17 22H19C20.1046 22 21 21.1046 21 20V18" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[var(--black-white-200)]">
                <div className="text-[12px] text-[var(--black-white-800)]">
                  <span className="font-[600] text-[var(--black-white-1000)]">
                    {category.jobCount || 0}
                  </span> jobs
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditClick(category)}
                    className="p-2 text-[var(--primary-1200)] hover:bg-[var(--primary-200)] rounded-lg transition-colors"
                    title="Edit"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.3333 2.00004C11.5084 1.82494 11.716 1.686 11.9438 1.59129C12.1716 1.49657 12.4153 1.44775 12.6613 1.44775C12.9073 1.44775 13.151 1.49657 13.3788 1.59129C13.6066 1.686 13.8142 1.82494 13.9893 2.00004C14.1644 2.17513 14.3034 2.38274 14.3981 2.61052C14.4928 2.83831 14.5416 3.08199 14.5416 3.32804C14.5416 3.57409 14.4928 3.81777 14.3981 4.04556C14.3034 4.27334 14.1644 4.48095 13.9893 4.65604L5.24935 13.396L1.83268 14.1667L2.60335 10.75L11.3333 2.00004Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteClick(category.id, category.name)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 4H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M6 6.66667V10.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M10 6.66667V10.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M3.33333 4L4 12C4 12.7364 4.59695 13.3333 5.33333 13.3333H10.6667C11.403 13.3333 12 12.7364 12 12L12.6667 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M6 4V3.33333C6 2.96514 6.29848 2.66667 6.66667 2.66667H9.33333C9.70152 2.66667 10 2.96514 10 3.33333V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Category Modal */}
      <AdminCategoryModal
        isOpen={showCategoryModal}
        onClose={handleCloseModal}
        category={selectedCategory}
      />

      {/* Delete Modal */}
      {showDeleteModal && selectedCategory && (
        <DeleteModal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedCategory(null);
          }}
          onConfirm={handleDeleteConfirm}
          title="Delete Category"
          message={`Are you sure you want to delete "${selectedCategory.name}"? Jobs in this category will need to be reassigned.`}
        />
      )}
    </div>
  );
}
