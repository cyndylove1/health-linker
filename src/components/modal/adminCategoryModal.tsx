"use client";
import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import Label from "../form/label";
import Btn from "../button/btn";
import { useAdminCategory } from "@/context/adminCategoryContext";
import { toast } from "react-toastify";

interface AdminCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: {
    id: string;
    name: string;
    description?: string;
    slug?: string;
    icon?: string;
  } | null;
}

export default function AdminCategoryModal({ isOpen, onClose, category }: AdminCategoryModalProps) {
  const { createCategory, updateCategory, isCreating, isUpdating } = useAdminCategory();
  const isEditMode = !!category;
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    slug: "",
    icon: "",
  });

  useEffect(() => {
    if (isOpen && category) {
      // Populate form with category data for editing
      setFormData({
        name: category.name || "",
        description: category.description || "",
        slug: category.slug || "",
        icon: category.icon || "",
      });
    } else if (!isOpen) {
      // Reset form when modal closes
      setFormData({
        name: "",
        description: "",
        slug: "",
        icon: "",
      });
    }
  }, [isOpen, category]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Auto-generate slug from name if slug is empty
    if (name === "name" && !formData.slug) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      if (isEditMode && category) {
        await updateCategory(category.id, formData);
        toast.success("Category updated successfully!");
      } else {
        await createCategory(formData);
        toast.success("Category created successfully!");
      }
      onClose();
    } catch (error) {
      console.error("Error saving category:", error);
      toast.error(isEditMode ? "Failed to update category" : "Failed to create category");
    }
  };

  if (!isOpen) return null;

  const isLoading = isCreating || isUpdating;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 dm-font p-4">
      <div className="bg-white w-full max-w-[500px] rounded-[16px] relative">
        <div className="border-b border-[var(--black-white-200)] p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-xl text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <IoMdClose />
          </button>

          <h2 className="text-[24px] font-[700] text-[var(--black-white-1000)] leading-[100%]">
            {isEditMode ? "Edit Category" : "Create New Category"}
          </h2>
          <p className="mt-1 text-[14px] font-[400] text-[var(--black-white-900)] leading-[100%]">
            {isEditMode ? "Update the category details" : "Fill in the details to add a new category"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex flex-col gap-4">
            {/* Category Name */}
            <div>
              <Label text="Category Name *" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Nursing"
                className="w-full px-4 py-2 border border-[var(--black-white-200)] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[var(--primary-1200)] text-[14px]"
                required
              />
            </div>

            {/* Slug */}
            <div>
              <Label text="Slug (URL-friendly name)" />
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="e.g. nursing"
                className="w-full px-4 py-2 border border-[var(--black-white-200)] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[var(--primary-1200)] text-[14px]"
              />
              <p className="text-[12px] text-[var(--black-white-800)] mt-1">
                Auto-generated from name if left empty
              </p>
            </div>

            {/* Description */}
            <div>
              <Label text="Description (Optional)" />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe this category..."
                rows={3}
                className="w-full px-4 py-2 border border-[var(--black-white-200)] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[var(--primary-1200)] text-[14px] resize-none"
              />
            </div>

            {/* Icon URL */}
            <div>
              <Label text="Icon URL (Optional)" />
              <input
                type="url"
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                placeholder="https://example.com/icon.png"
                className="w-full px-4 py-2 border border-[var(--black-white-200)] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[var(--primary-1200)] text-[14px]"
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-[var(--black-white-200)] text-[var(--black-white-900)] rounded-[10px] hover:bg-[var(--black-white-100)] transition-colors text-[14px] font-[500]"
                disabled={isLoading}
              >
                Cancel
              </button>
              <Btn
                type="submit"
                className="flex-1 h-[40px] rounded-[10px] bg-[var(--primary-1200)] text-white font-[600] hover:bg-[#078e63] disabled:opacity-50 disabled:cursor-not-allowed"
                text={isLoading ? (isEditMode ? "Updating..." : "Creating...") : (isEditMode ? "Update Category" : "Create Category")}
                disabled={isLoading}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
