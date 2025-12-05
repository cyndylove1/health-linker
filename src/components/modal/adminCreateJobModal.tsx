"use client";

declare global {
  interface Window {
    __lastCategoriesResponse?: any;
  }
}

import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import Label from "../form/label";
import Btn from "../button/btn";
import { useAdmin } from "@/context/adminContext";
import { useAdminCategory } from "@/context/adminCategoryContext";
import { toast } from "react-toastify";

interface AdminCreateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminCreateJobModal({ isOpen, onClose }: AdminCreateJobModalProps) {
  const { createJob, isCreatingJob } = useAdmin();
  const { categories, categoriesLoading, categoriesError } = useAdminCategory();
  
  // Debug log
  useEffect(() => {
    if (isOpen) {
      console.log("Categories in modal:", categories);
      console.log("Categories loading:", categoriesLoading);
    }
  }, [isOpen, categories, categoriesLoading]);
  
  // Visible debug output for troubleshooting
  const showDebug = true; // Set to true to show debug info in UI

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    companyLogo: "",
    type: "Full-Time",
    location: "",
    salary: "",
    description: "",
    requirements: "",
    benefits: "",
    experienceLevel: "Mid-Level",
    categoryId: "",
    applicationDeadline: "",
    isRemote: false,
    numberOfPositions: 1,
    contactEmail: "",
  });

  useEffect(() => {
    if (!isOpen) {
      // Reset form when modal closes
      setFormData({
        title: "",
        company: "",
        companyLogo: "",
        type: "Full-Time",
        location: "",
        salary: "",
        description: "",
        requirements: "",
        benefits: "",
        experienceLevel: "Mid-Level",
        categoryId: "",
        applicationDeadline: "",
        isRemote: false,
        numberOfPositions: 1,
        contactEmail: "",
      });
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === "number") {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || 1 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.company || !formData.location || !formData.description || !formData.categoryId) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      // Convert requirements and benefits from comma-separated strings to arrays
      const requirementsArray = formData.requirements
        .split(",")
        .map(r => r.trim())
        .filter(r => r.length > 0);
      
      const benefitsArray = formData.benefits
        .split(",")
        .map(b => b.trim())
        .filter(b => b.length > 0);

      await createJob({
        ...formData,
        requirements: requirementsArray,
        benefits: benefitsArray.length > 0 ? benefitsArray : undefined,
      });
      
      toast.success("Job created successfully!");
      onClose();
    } catch (error) {
      console.error("Error creating job:", error);
      toast.error("Failed to create job");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 dm-font p-4">
      <div className="bg-white w-full max-w-[700px] max-h-[90vh] overflow-y-auto rounded-[16px] relative">
        <div className="sticky top-0 bg-white border-b border-[var(--black-white-200)] p-6 z-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-xl text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <IoMdClose />
          </button>

          <h2 className="text-[24px] font-[700] text-[var(--black-white-1000)] leading-[100%]">
            Create New Job
          </h2>
          <p className="mt-1 text-[14px] font-[400] text-[var(--black-white-900)] leading-[100%]">
            Fill in the details to post a new job
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex flex-col gap-4">
            {/* Job Title */}
            <div>
              <Label text="Job Title *" />
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Senior Surgeon"
                className="w-full px-4 py-2 border border-[var(--black-white-200)] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[var(--primary-1200)] text-[14px]"
                required
              />
            </div>

            {/* Company */}
            <div>
              <Label text="Company Name *" />
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. City Hospital"
                className="w-full px-4 py-2 border border-[var(--black-white-200)] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[var(--primary-1200)] text-[14px]"
                required
              />
            </div>

            {/* Company Logo URL */}
            <div>
              <Label text="Company Logo URL (Optional)" />
              <input
                type="url"
                name="companyLogo"
                value={formData.companyLogo}
                onChange={handleChange}
                placeholder="https://example.com/logo.png"
                className="w-full px-4 py-2 border border-[var(--black-white-200)] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[var(--primary-1200)] text-[14px]"
              />
            </div>

            {/* Type and Experience Level */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label text="Job Type *" />
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[var(--black-white-200)] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[var(--primary-1200)] text-[14px]"
                  required
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Temporary">Temporary</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div>
                <Label text="Experience Level *" />
                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[var(--black-white-200)] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[var(--primary-1200)] text-[14px]"
                  required
                >
                  <option value="Entry-Level">Entry-Level</option>
                  <option value="Mid-Level">Mid-Level</option>
                  <option value="Senior-Level">Senior-Level</option>
                  <option value="Executive">Executive</option>
                </select>
              </div>
            </div>

            {/* Category */}
            <div>
              <Label text="Category *" />
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[var(--black-white-200)] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[var(--primary-1200)] text-[14px]"
                required
                disabled={categoriesLoading}
              >
                <option value="">
                  {categoriesLoading ? "Loading categories..." : "Select a category"}
                </option>
                {Array.isArray(categories) && categories.length > 0 && categories.map((category: any) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
                {Array.isArray(categories) && categories.length === 0 && !categoriesLoading && (
                  <option value="" disabled>No categories available</option>
                )}
              </select>
            </div>

            {/* Location and Remote */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label text="Location *" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. New York, USA"
                  className="w-full px-4 py-2 border border-[var(--black-white-200)] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[var(--primary-1200)] text-[14px]"
                  required
                />
              </div>

              <div className="flex items-end pb-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isRemote"
                    checked={formData.isRemote}
                    onChange={handleChange}
                    className="w-4 h-4 text-[var(--primary-1200)] border-[var(--black-white-200)] rounded focus:ring-2 focus:ring-[var(--primary-1200)]"
                  />
                  <span className="text-[14px] text-[var(--black-white-900)]">Remote Position</span>
                </label>
              </div>
            </div>

            {/* Salary and Number of Positions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label text="Salary Range (Optional)" />
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="e.g. $80,000 - $120,000"
                  className="w-full px-4 py-2 border border-[var(--black-white-200)] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[var(--primary-1200)] text-[14px]"
                />
              </div>

              <div>
                <Label text="Number of Positions" />
                <input
                  type="number"
                  name="numberOfPositions"
                  value={formData.numberOfPositions}
                  onChange={handleChange}
                  min="1"
                  className="w-full px-4 py-2 border border-[var(--black-white-200)] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[var(--primary-1200)] text-[14px]"
                />
              </div>
            </div>

            {/* Application Deadline and Contact Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label text="Application Deadline (Optional)" />
                <input
                  type="date"
                  name="applicationDeadline"
                  value={formData.applicationDeadline}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[var(--black-white-200)] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[var(--primary-1200)] text-[14px]"
                />
              </div>

              <div>
                <Label text="Contact Email (Optional)" />
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="hr@company.com"
                  className="w-full px-4 py-2 border border-[var(--black-white-200)] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[var(--primary-1200)] text-[14px]"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <Label text="Job Description *" />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the job responsibilities, qualifications, and what makes this position unique..."
                rows={5}
                className="w-full px-4 py-2 border border-[var(--black-white-200)] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[var(--primary-1200)] text-[14px] resize-none"
                required
              />
            </div>

            {/* Requirements */}
            <div>
              <Label text="Requirements * (comma-separated)" />
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                placeholder="e.g. Medical degree, 5+ years experience, Board certified, Excellent communication skills"
                rows={3}
                className="w-full px-4 py-2 border border-[var(--black-white-200)] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[var(--primary-1200)] text-[14px] resize-none"
                required
              />
              <p className="text-[12px] text-[var(--black-white-800)] mt-1">
                Separate each requirement with a comma
              </p>
            </div>

            {/* Benefits */}
            <div>
              <Label text="Benefits (Optional, comma-separated)" />
              <textarea
                name="benefits"
                value={formData.benefits}
                onChange={handleChange}
                placeholder="e.g. Health insurance, 401k, Paid time off, Professional development"
                rows={3}
                className="w-full px-4 py-2 border border-[var(--black-white-200)] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[var(--primary-1200)] text-[14px] resize-none"
              />
              <p className="text-[12px] text-[var(--black-white-800)] mt-1">
                Separate each benefit with a comma
              </p>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-[var(--black-white-200)] text-[var(--black-white-900)] rounded-[10px] hover:bg-[var(--black-white-100)] transition-colors text-[14px] font-[500]"
                disabled={isCreatingJob}
              >
                Cancel
              </button>
              <Btn
                type="submit"
                className="flex-1 h-[40px] rounded-[10px] bg-[var(--primary-1200)] text-white font-[600] hover:bg-[#078e63] disabled:opacity-50 disabled:cursor-not-allowed"
                text={isCreatingJob ? "Creating..." : "Create Job"}
                disabled={isCreatingJob}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
