'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Plus, Edit3, Trash2, X, Mail, Clock, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-toastify';

// Components
import Title from '@/components/ui/title';
import Input from '@/components/form/input';
import Label from '@/components/form/label';
import SelectTag from '@/components/form/selectTag';
import { HydrationSafeDiv } from '@/utils/hydrationUtils';

// Types
interface JobAlert {
  id: string;
  title: string;
  keywords: string[];
  location: string;
  jobType: string;
  experienceLevel: string;
  salaryMin?: number;
  salaryMax?: number;
  category: string;
  frequency: 'daily' | 'weekly' | 'instant';
  active: boolean;
  createdAt: string;
  lastNotified?: string;
}

// Mock data - replace with actual API calls
const mockJobAlerts: JobAlert[] = [
  {
    id: '1',
    title: 'Senior React Developer',
    keywords: ['React', 'TypeScript', 'Frontend'],
    location: 'San Francisco, CA',
    jobType: 'Full-time',
    experienceLevel: 'Senior',
    salaryMin: 120000,
    salaryMax: 180000,
    category: 'Software Development',
    frequency: 'instant',
    active: true,
    createdAt: '2024-01-15',
    lastNotified: '2024-01-28'
  },
  {
    id: '2',
    title: 'UI/UX Designer',
    keywords: ['UI Design', 'UX Research', 'Figma'],
    location: 'Remote',
    jobType: 'Full-time',
    experienceLevel: 'Mid-level',
    salaryMin: 80000,
    salaryMax: 120000,
    category: 'Design',
    frequency: 'daily',
    active: false,
    createdAt: '2024-01-10',
    lastNotified: '2024-01-25'
  }
];

export default function JobAlert() {
  const [jobAlerts, setJobAlerts] = useState<JobAlert[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingAlert, setEditingAlert] = useState<JobAlert | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    keywords: '',
    location: '',
    jobType: 'Full-time',
    experienceLevel: 'Entry-level',
    salaryMin: '',
    salaryMax: '',
    category: '',
    frequency: 'daily' as 'daily' | 'weekly' | 'instant'
  });

  // Stats
  const activeAlerts = jobAlerts.filter(alert => alert.active).length;
  const totalAlerts = jobAlerts.length;
  const recentNotifications = jobAlerts.filter(alert => 
    alert.lastNotified && new Date(alert.lastNotified) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length;

  useEffect(() => {
    // Load job alerts from localStorage first, fallback to mock data
    const savedAlerts = localStorage.getItem('jobAlerts');
    if (savedAlerts) {
      try {
        setJobAlerts(JSON.parse(savedAlerts));
      } catch (error) {
        console.error('Failed to parse saved job alerts:', error);
        setJobAlerts(mockJobAlerts);
      }
    } else {
      // First time loading, use mock data
      setJobAlerts(mockJobAlerts);
    }
  }, []);

  // Save to localStorage whenever jobAlerts changes
  useEffect(() => {
    if (jobAlerts.length > 0) {
      localStorage.setItem('jobAlerts', JSON.stringify(jobAlerts));
    }
  }, [jobAlerts]);

  // Save to localStorage whenever jobAlerts changes
  useEffect(() => {
    if (jobAlerts.length > 0) {
      try {
        localStorage.setItem('jobAlerts', JSON.stringify(jobAlerts));
      } catch (error) {
        console.error('Failed to save job alerts to localStorage:', error);
        toast.error('Failed to save job alerts locally');
      }
    }
  }, [jobAlerts]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.category.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const alertData: JobAlert = {
        id: editingAlert?.id || Date.now().toString(),
        title: formData.title,
        keywords: formData.keywords.split(',').map(k => k.trim()).filter(k => k),
        location: formData.location || 'Any Location',
        jobType: formData.jobType,
        experienceLevel: formData.experienceLevel,
        salaryMin: formData.salaryMin ? parseInt(formData.salaryMin) : undefined,
        salaryMax: formData.salaryMax ? parseInt(formData.salaryMax) : undefined,
        category: formData.category,
        frequency: formData.frequency,
        active: true,
        createdAt: editingAlert?.createdAt || new Date().toISOString().split('T')[0]
      };

      let updatedAlerts: JobAlert[];
      if (editingAlert) {
        updatedAlerts = jobAlerts.map(alert => 
          alert.id === editingAlert.id ? alertData : alert
        );
        toast.success('Job alert updated successfully');
      } else {
        updatedAlerts = [alertData, ...jobAlerts];
        toast.success('Job alert created successfully');
      }

      setJobAlerts(updatedAlerts);
      resetForm();
      setShowModal(false);
    } catch (error) {
      toast.error('Failed to save job alert');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (alert: JobAlert) => {
    setEditingAlert(alert);
    setFormData({
      title: alert.title,
      keywords: alert.keywords.join(', '),
      location: alert.location,
      jobType: alert.jobType,
      experienceLevel: alert.experienceLevel,
      salaryMin: alert.salaryMin?.toString() || '',
      salaryMax: alert.salaryMax?.toString() || '',
      category: alert.category,
      frequency: alert.frequency
    });
    setShowModal(true);
  };

  const handleDelete = async (alertId: string) => {
    if (!confirm('Are you sure you want to delete this job alert?')) return;
    
    try {
      const updatedAlerts = jobAlerts.filter(alert => alert.id !== alertId);
      setJobAlerts(updatedAlerts);
      toast.success('Job alert deleted successfully');
    } catch (error) {
      toast.error('Failed to delete job alert');
    }
  };

  const toggleAlert = async (alertId: string) => {
    try {
      const updatedAlerts = jobAlerts.map(alert => 
        alert.id === alertId ? { ...alert, active: !alert.active } : alert
      );
      setJobAlerts(updatedAlerts);
      toast.success('Job alert status updated');
    } catch (error) {
      toast.error('Failed to update alert status');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      keywords: '',
      location: '',
      jobType: 'Full-time',
      experienceLevel: 'Entry-level',
      salaryMin: '',
      salaryMax: '',
      category: '',
      frequency: 'daily'
    });
    setEditingAlert(null);
  };

  const handleCancel = () => {
    resetForm();
    setShowModal(false);
  };

  return (
    <HydrationSafeDiv className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <Title text="Job Alerts" />
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--primary-1200)] text-white rounded-lg hover:bg-[var(--primary-1000)] font-[500]"
        >
          <Plus size={20} />
          Create Alert
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-[var(--black-white-200)]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[var(--primary-100)] rounded-lg flex items-center justify-center">
              <CheckCircle2 className="text-[var(--primary-1200)]" size={24} />
            </div>
            <div>
              <p className="text-[var(--black-white-700)] text-[14px]">Active Alerts</p>
              <p className="text-[28px] font-[600] text-[var(--black-white-900)]">{activeAlerts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-[var(--black-white-200)]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[var(--primary-100)] rounded-lg flex items-center justify-center">
              <Mail className="text-[var(--primary-1200)]" size={24} />
            </div>
            <div>
              <p className="text-[var(--black-white-700)] text-[14px]">Total Alerts</p>
              <p className="text-[28px] font-[600] text-[var(--black-white-900)]">{totalAlerts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-[var(--black-white-200)]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[var(--primary-100)] rounded-lg flex items-center justify-center">
              <Clock className="text-[var(--primary-1200)]" size={24} />
            </div>
            <div>
              <p className="text-[var(--black-white-700)] text-[14px]">Recent Notifications</p>
              <p className="text-[28px] font-[600] text-[var(--black-white-900)]">{recentNotifications}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Job Alerts List */}
      <div className="bg-white rounded-lg border border-[var(--black-white-200)]">
        <div className="p-6 border-b border-[var(--black-white-200)]">
          <h2 className="text-[20px] font-[600] text-[var(--black-white-900)]">Your Job Alerts</h2>
        </div>

        {jobAlerts.length === 0 ? (
          <div className="p-12 text-center">
            <Mail size={48} className="text-[var(--black-white-400)] mx-auto mb-4" />
            <h3 className="text-[18px] font-[500] text-[var(--black-white-700)] mb-2">No Job Alerts Yet</h3>
            <p className="text-[var(--black-white-600)] mb-6">Create your first job alert to get notified about relevant opportunities</p>
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-2 bg-[var(--primary-1200)] text-white rounded-lg hover:bg-[var(--primary-1000)] font-[500]"
            >
              Create Your First Alert
            </button>
          </div>
        ) : (
          <div className="divide-y divide-[var(--black-white-200)]">
            {jobAlerts.map((alert) => (
              <div key={alert.id} className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-[18px] font-[600] text-[var(--black-white-900)]">{alert.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-[12px] font-[500] ${
                        alert.active 
                          ? 'bg-[var(--success-100)] text-[var(--success-700)]' 
                          : 'bg-[var(--black-white-200)] text-[var(--black-white-600)]'
                      }`}>
                        {alert.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-3">
                      <div className="flex items-center gap-2 text-[14px] text-[var(--black-white-700)]">
                        <MapPin size={16} />
                        <span>{alert.location}</span>
                      </div>
                      <span className="text-[14px] text-[var(--black-white-700)]">
                        <strong>Type:</strong> {alert.jobType}
                      </span>
                      <span className="text-[14px] text-[var(--black-white-700)]">
                        <strong>Level:</strong> {alert.experienceLevel}
                      </span>
                      <span className="text-[14px] text-[var(--black-white-700)]">
                        <strong>Category:</strong> {alert.category}
                      </span>
                    </div>

                    {alert.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {alert.keywords.map((keyword, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-[var(--primary-100)] text-[var(--primary-700)] rounded text-[12px] font-[500]"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    )}

                    {(alert.salaryMin || alert.salaryMax) && (
                      <div className="text-[14px] text-[var(--black-white-700)] mb-3">
                        <strong>Salary:</strong> $
                        {alert.salaryMin?.toLocaleString() || '0'} - $
                        {alert.salaryMax?.toLocaleString() || 'No limit'}
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-[14px] text-[var(--black-white-600)]">
                      <span>Frequency: {alert.frequency}</span>
                      <span>Created: {new Date(alert.createdAt).toLocaleDateString()}</span>
                      {alert.lastNotified && (
                        <span>Last notified: {new Date(alert.lastNotified).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => toggleAlert(alert.id)}
                      className={`px-3 py-1 rounded text-[14px] font-[500] ${
                        alert.active 
                          ? 'bg-[var(--warning-100)] text-[var(--warning-700)] hover:bg-[var(--warning-200)]' 
                          : 'bg-[var(--success-100)] text-[var(--success-700)] hover:bg-[var(--success-200)]'
                      }`}
                    >
                      {alert.active ? 'Pause' : 'Activate'}
                    </button>
                    <button
                      onClick={() => handleEdit(alert)}
                      className="p-2 text-[var(--black-white-600)] hover:text-[var(--primary-1200)] hover:bg-[var(--primary-100)] rounded"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(alert.id)}
                      className="p-2 text-[var(--black-white-600)] hover:text-[var(--error-700)] hover:bg-[var(--error-100)] rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[var(--black-white-200)]">
              <div className="flex justify-between items-center">
                <h2 className="text-[20px] font-[600] text-[var(--black-white-900)]">
                  {editingAlert ? 'Edit Job Alert' : 'Create New Job Alert'}
                </h2>
                <button
                  onClick={handleCancel}
                  className="p-2 text-[var(--black-white-600)] hover:text-[var(--black-white-900)]"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label text="Alert Title *" />
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. Senior React Developer"
                    required
                  />
                </div>

                <div>
                  <Label text="Keywords (comma separated)" />
                  <Input
                    value={formData.keywords}
                    onChange={(e) => setFormData(prev => ({ ...prev, keywords: e.target.value }))}
                    placeholder="e.g. React, TypeScript, Frontend"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label text="Location" />
                    <Input
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="e.g. San Francisco, CA or Remote"
                    />
                  </div>

                  <div>
                    <Label text="Category *" />
                    <Input
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      placeholder="e.g. Software Development"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label text="Job Type" />
                    <SelectTag
                      value={formData.jobType}
                      onChange={(value) => setFormData(prev => ({ ...prev, jobType: value }))}
                      options={[
                        { label: 'Full-time', value: 'Full-time' },
                        { label: 'Part-time', value: 'Part-time' },
                        { label: 'Contract', value: 'Contract' },
                        { label: 'Freelance', value: 'Freelance' },
                        { label: 'Internship', value: 'Internship' }
                      ]}
                    />
                  </div>

                  <div>
                    <Label text="Experience Level" />
                    <SelectTag
                      value={formData.experienceLevel}
                      onChange={(value) => setFormData(prev => ({ ...prev, experienceLevel: value }))}
                      options={[
                        { label: 'Entry-level', value: 'Entry-level' },
                        { label: 'Mid-level', value: 'Mid-level' },
                        { label: 'Senior', value: 'Senior' },
                        { label: 'Executive', value: 'Executive' }
                      ]}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label text="Minimum Salary" />
                    <Input
                      type="number"
                      value={formData.salaryMin}
                      onChange={(e) => setFormData(prev => ({ ...prev, salaryMin: e.target.value }))}
                      placeholder="e.g. 80000"
                    />
                  </div>

                  <div>
                    <Label text="Maximum Salary" />
                    <Input
                      type="number"
                      value={formData.salaryMax}
                      onChange={(e) => setFormData(prev => ({ ...prev, salaryMax: e.target.value }))}
                      placeholder="e.g. 120000"
                    />
                  </div>
                </div>

                <div>
                  <Label text="Notification Frequency" />
                  <SelectTag
                    value={formData.frequency}
                    onChange={(value) => setFormData(prev => ({ ...prev, frequency: value as 'daily' | 'weekly' | 'instant' }))}
                    options={[
                      { label: 'Instant', value: 'instant' },
                      { label: 'Daily', value: 'daily' },
                      { label: 'Weekly', value: 'weekly' }
                    ]}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-6">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-2 border border-[var(--black-white-300)] text-[var(--black-white-700)] rounded-lg hover:bg-[var(--black-white-50)] font-[500]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-[var(--primary-1200)] text-white rounded-lg hover:bg-[var(--primary-1000)] font-[500] disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : (editingAlert ? 'Update Alert' : 'Create Alert')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </HydrationSafeDiv>
  );
}