"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import apiClient from "@/config/axiosConfig";

const primary = "#1C9D75"; // brand green

function Card({ title, jobs, dark, slug }) {
  // two gradient variants: light (default), dark variant for some cards
  const light = "bg-gradient-to-b from-[#20b07b] to-[#198258]"; // greener
  const darkBg = "bg-gradient-to-b from-[#0e5b3f] to-[#137352]"; // darker
  const chosen = dark ? darkBg : light;

  // Use category slug for filtering
  const queryParam = `category=${encodeURIComponent(slug)}`;

  return (
    <div
      className={`rounded-2xl ${chosen} text-white p-5 min-h-[110px] flex flex-col justify-between shadow-md`}
      role="group"
    >
      <div>
        <div className="text-sm">{title}</div>
        <div className="text-xs mt-2 opacity-90">{jobs} {jobs === 1 ? "Job" : "Jobs"}</div>
      </div>

      <div className="mt-3">
        <Link
          href={`/jobs?${queryParam}`}
          className="text-sm underline underline-offset-4 decoration-white/80 decoration-2 inline-flex items-center gap-2 hover:opacity-80 transition"
        >
          Explore
          <svg
            className="w-3 h-3"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M5 12h14M13 5l7 7-7 7"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default function CategorySection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/api/categories");
        
        if (response.data && response.data.data) {
          setCategories(response.data.data);
        } else if (Array.isArray(response.data)) {
          setCategories(response.data);
        }
        setError(null);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setError("Failed to load categories");
        // Fallback to empty array or default categories
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Loading state
  if (loading) {
    return (
      <section className="w-full bg-[#F3FCF9] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h3 className="text-3xl sm:text-4xl font-extrabold">
              <span style={{ color: primary }}>Explore</span>{" "}
              <span className="text-gray-900">by Category</span>
            </h3>
          </div>
          <div className="flex justify-center items-center py-12">
            <div className="text-gray-500">Loading categories...</div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="w-full bg-[#F3FCF9] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h3 className="text-3xl sm:text-4xl font-extrabold">
              <span style={{ color: primary }}>Explore</span>{" "}
              <span className="text-gray-900">by Category</span>
            </h3>
          </div>
          <div className="flex justify-center items-center py-12">
            <div className="text-red-500">{error}</div>
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (!categories || categories.length === 0) {
    return (
      <section className="w-full bg-[#F3FCF9] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h3 className="text-3xl sm:text-4xl font-extrabold">
              <span style={{ color: primary }}>Explore</span>{" "}
              <span className="text-gray-900">by Category</span>
            </h3>
          </div>
          <div className="flex justify-center items-center py-12">
            <div className="text-gray-500">No categories available</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#F3FCF9] py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-3xl sm:text-4xl font-extrabold">
            <span style={{ color: primary }}>Explore</span>{" "}
            <span className="text-gray-900">by Category</span>
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Browse job opportunities across different categories
          </p>
        </div>

        {/* Categories Grid */}
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((category, idx) => (
              <Card
                key={category.id || category.slug || idx}
                title={category.name || category.title}
                jobs={category.job_count || category.jobCount || 0}
                dark={idx % 3 === 1} // Alternate dark background for visual variety
                slug={category.slug}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
