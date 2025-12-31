"use client";
import { useState } from "react";
import apiClient from "@/config/axiosConfig";
import { toast } from "react-toastify";
import Image from "next/image";
import Navbar from "../../components/Navbar.tsx";
import Footer from "@/components/Footer.jsx";


export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    agreePrivacy: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Enhanced validation
    if (!formData.firstName.trim()) {
      toast.error("First name is required");
      return;
    }
    if (!formData.lastName.trim()) {
      toast.error("Last name is required");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }
    if (!formData.message.trim()) {
      toast.error("Message is required");
      return;
    }
    if (!formData.agreePrivacy) {
      toast.error("Please agree to the privacy policy");
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        message: formData.message,
        agreePrivacy: formData.agreePrivacy,
      };

      const response = await apiClient.post("/api/contact", payload);
      toast.success(response.data.message || "Message sent successfully! We'll get back to you soon.");
      
      // Reset form after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
        agreePrivacy: false,
      });
    } catch (error) {
      console.error('Contact form error:', error);
      
      if (error.response) {
        // Server responded with error status
        toast.error(error.response.data?.message || "Failed to send message. Please try again.");
      } else if (error.request) {
        // Network error or no response
        toast.error("Unable to connect to server. Please check your internet connection.");
      } else {
        // Other error
        toast.error("Something went wrong. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full">
      <Navbar />

      {/* MAIN CONTACT SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        {/* LEFT IMAGE */}
        <div className="rounded-lg overflow-hidden h-full">
          <Image
            src="/Contact.jpg"
            alt="Contact agent"
            width={700}
            height={900}    // increased height
            className="w-full h-full object-cover object-top rounded-lg"
          />
        </div>


        {/* RIGHT SIDE FORM */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Get in Touch</h1>
          <p className="text-sm text-gray-600 mb-8">
            Have questions about HealthLinker or need support? We're here to help healthcare professionals and employers connect. Reach out to us and our team will respond promptly.
          </p>

          {/* FORM */}
          <form className="space-y-5" onSubmit={handleSubmit}>

            {/* NAME ROW */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name"
                required
                aria-label="First name"
                className="border border-gray-300 rounded-md px-4 py-2 text-sm outline-none focus:border-[#1C9D75] focus:ring-1 focus:ring-[#1C9D75] transition-colors"
              />

              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last name"
                required
                className="border border-gray-300 rounded-md px-4 py-2 text-sm outline-none"
              />
            </div>

            {/* EMAIL */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@company.com"
              required
              aria-label="Email address"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm outline-none focus:border-[#1C9D75] focus:ring-1 focus:ring-[#1C9D75] transition-colors"
            />

            {/* MESSAGE */}
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              rows={5}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm outline-none"
            />

            {/* CHECKBOX */}
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                name="agreePrivacy"
                checked={formData.agreePrivacy}
                onChange={handleChange}
              />
              You agree to our friendly privacy policy.
            </label>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#1C9D75] w-full text-white py-2 rounded-full hover:bg-[#178764] transition disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Submit"}
            </button>
          </form>

          {/* CONTACT ICON ROW */}
          <div className="flex md:items-center items-start flex-col md:flex-row gap-6 mt-6 text-sm text-gray-600">

            <div className="flex items-center gap-2">
              <Image src="/location3.png" width={20} height={20} alt="loc" />
              <span>123 Healthcare Ave, Medical District</span>
            </div>

            <div className="flex items-center gap-2">
              <Image src="/call.png" width={20} height={20} alt="phone" />
              <span>+1 (555) 123-HEALTH</span>
            </div>

            <div className="flex items-center gap-2">
              <Image src="/mail.png" width={20} height={20} alt="email" />
              <span>support@healthlinker.com</span>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
