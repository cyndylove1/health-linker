"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/context/userContext";
import { toast } from "react-toastify";
import { HydrationSafeDiv } from "@/utils/hydrationUtils";
import Btn from "@/components/button/btn";
import CustomSelect from "@/components/form/customSelect";
import Label from "@/components/form/label";
import Title from "@/components/ui/title";

export default function Profile() {
  const { profile, updateProfile, uploadResume, isLoadingProfile } = useUser();

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    experience: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (!profile) return;

    setFormData({
      firstName: profile.firstName || "",
      lastName: profile.lastName || "",
      email: profile.email || "",
      phone: profile.phone || "",
      country: profile.country || "",
      experience: profile.experience || "",
    });
  }, [profile]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    try {
      await updateProfile(formData);

      if (selectedFile) {
        await uploadResume(selectedFile);
        setSelectedFile(null);
      }

      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    }
  };

  if (isLoadingProfile) {
    return (
      <HydrationSafeDiv className="px-4 md:px-6 dm-font leading-[100%]">
        <Title text="Profile" />
        <div className="bg-white border border-[var(--black-white-200)] rounded-[16px] px-6">
          <div className="py-6 text-center text-[var(--black-white-600)]">
            Loading profile...
          </div>
        </div>
      </HydrationSafeDiv>
    );
  }

  const CountryOptions = [{ value: "USA", label: "USA" }];
  const WorkOptions = [{ value: "Surgeon", label: "Surgeon" }];

  return (
    <HydrationSafeDiv className="md:px-6 px-4">
      <Title text="Profile" />

      <div className="w-full bg-white py-10 my-6 md:px-6 px-4 rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <img
                src="/Mask Group.png"
                alt="profile"
                className="h-[112px] w-[112px] rounded-full"
              />
            </div>

            {/* Form Fields */}
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6 w-full">
              {/* First Name */}
              <div className="flex flex-col h-[64px] bg-[#F5F5F5] rounded-[8px] px-4">
                <Label text="First Name" className="pt-2" />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  disabled={!isEditing}
                  onChange={handleInputChange}
                  className="rounded-md h-[48px] outline-none pt-[5px] bg-transparent"
                />
              </div>

              {/* Last Name */}
              <div className="flex flex-col h-[64px] bg-[#F5F5F5] rounded-[8px] px-4">
                <Label text="Last Name" className="pt-2" />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  disabled={!isEditing}
                  onChange={handleInputChange}
                  className="rounded-md h-[48px] outline-none pt-[5px] bg-transparent"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col h-[64px] bg-[#F5F5F5] rounded-[8px] px-4">
                <Label text="Email" className="pt-2" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled={!isEditing}
                  onChange={handleInputChange}
                  className="rounded-md h-[48px] outline-none pt-[5px] bg-transparent"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col h-[64px] bg-[#F5F5F5] rounded-[8px] px-4">
                <Label text="Phone Number" className="pt-2" />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  disabled={!isEditing}
                  onChange={handleInputChange}
                  className="rounded-md h-[48px] outline-none pt-[5px] bg-transparent"
                />
              </div>

              {/* Country */}
              <div className="flex flex-col h-[64px] bg-[#F5F5F5] rounded-[8px] px-4">
                <Label text="Country" className="pt-2" />
                <CustomSelect
                  options={CountryOptions}
                  placeholder="Select Country"
                  value={formData.country}
                  disabled={!isEditing}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, country: value }))
                  }
                />
              </div>

              {/* Job */}
              <div className="flex flex-col h-[64px] bg-[#F5F5F5] rounded-[8px] px-4">
                <Label text="What do you do?" className="pt-2" />
                <CustomSelect
                  options={WorkOptions}
                  placeholder="Your job"
                  value={formData.experience}
                  disabled={!isEditing}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, experience: value }))
                  }
                />
              </div>
            </div>
          </div>

          {/* Single Button */}
          <div className="flex justify-end gap-4 mt-6">
            <Btn
              type="submit"
              className="h-[40px] w-full md:w-[161px] rounded-[100px] bg-[var(--primary-1200)] text-white font-[600] hover:bg-[#078e63]"
              text={isEditing ? "Save Changes" : "Edit Profile"}
            />
          </div>
        </form>
      </div>
    </HydrationSafeDiv>
  );
}
