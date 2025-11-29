"use client";
import { useState, useEffect } from "react";
import { useUser } from "@/context/userContext";
import { toast } from "react-toastify";
import Title from "@/components/ui/title";
import { HydrationSafeDiv } from "@/utils/hydrationUtils";

export default function ProfilePage() {
  const { profile, updateProfile, uploadResume, isLoadingProfile } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    skills: "",
    experience: "",
    education: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || "",
        email: profile.email || "",
        phone: profile.phone || "",
        location: profile.location || "",
        bio: profile.bio || "",
        skills: Array.isArray(profile.skills) ? profile.skills.join(", ") : "",
        experience: profile.experience || "",
        education: profile.education || "",
      });
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Split name into firstName and lastName
      const nameParts = formData.name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      const profileData = {
        ...formData,
        name: formData.name,
        firstName,
        lastName,
        skills: formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0)
      };
      
      await updateProfile(profileData);
      
      // Upload resume if a file was selected
      if (selectedFile) {
        await uploadResume(selectedFile);
        setSelectedFile(null);
      }
      
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedFile(null);
    if (profile) {
      setFormData({
        name: profile.name || `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || "",
        email: profile.email || "",
        phone: profile.phone || "",
        location: profile.location || "",
        bio: profile.bio || "",
        skills: Array.isArray(profile.skills) ? profile.skills.join(", ") : "",
        experience: profile.experience || "",
        education: profile.education || "",
      });
    }
  };

  if (isLoadingProfile) {
    return (
      <HydrationSafeDiv className="px-4 md:px-6 dm-font leading-[100%]">
        <Title text="Profile" />
        <div className="bg-white border-[1px] border-[var(--black-white-200)] rounded-[16px] px-6">
          <div className="py-6">
            <div className="h-40 flex items-center justify-center">
              <div className="text-[var(--black-white-600)]">Loading profile...</div>
            </div>
          </div>
        </div>
      </HydrationSafeDiv>
    );
  }

  return (
    <HydrationSafeDiv className="px-4 md:px-6 dm-font leading-[100%]">
      <Title text="Profile" />
      
      <div className="bg-white border-[1px] border-[var(--black-white-200)] rounded-[16px] px-6 mb-6">
        {/* Header */}
        <div className="py-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-[20px] font-[600] text-[var(--black-white-1000)]">
                Personal Information
              </h2>
              <p className="text-[14px] text-[var(--black-white-700)] mt-1">
                Update your profile information
              </p>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-[var(--primary-1200)] text-white rounded-lg hover:bg-[var(--primary-1000)] font-[500]"
              >
                Edit Profile
              </button>
            )}
            <div className="space-x-3">
              {isEditing && (
                <>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 border border-[var(--black-white-300)] text-[var(--black-white-700)] rounded-lg hover:bg-[var(--black-white-50)] font-[500]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-[var(--primary-1200)] text-white rounded-lg hover:bg-[var(--primary-1000)] font-[500]"
                  >
                    Save Changes
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                    placeholder="Enter your location"
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Professional Information</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                    placeholder="Tell us about yourself..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skills (comma separated)
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                    placeholder="e.g., React, TypeScript, Node.js"
                  />
                  {formData.skills && !isEditing && (
                    <div className="py-2">
                      <p className="text-sm text-gray-600 mb-2">Your skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {formData.skills.split(',').map((skill, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experience
                    </label>
                    <textarea
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                      placeholder="Describe your work experience..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Education
                    </label>
                    <textarea
                      name="education"
                      value={formData.education}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                      placeholder="Describe your educational background..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Resume Upload */}
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Resume</h3>
              {isEditing ? (
                <div className="border-dashed border-2 border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <div className="text-gray-600">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <p className="mt-2">Click to upload your resume</p>
                      <p className="text-sm text-gray-400">PDF, DOC, or DOCX up to 10MB</p>
                    </div>
                  </label>
                  {selectedFile && (
                    <p className="mt-2 text-sm text-green-600">
                      Selected: {selectedFile.name}
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  {profile?.resumeUrl ? (
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                      <span>{profile.resumeName || 'Resume uploaded'}</span>
                      <a 
                        href={profile.resumeUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700 text-sm"
                      >
                        View
                      </a>
                    </div>
                  ) : (
                    <p className="text-gray-500">No resume uploaded</p>
                  )}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </HydrationSafeDiv>
  );
}