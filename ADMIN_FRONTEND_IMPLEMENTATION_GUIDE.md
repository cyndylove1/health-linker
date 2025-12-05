# Admin Frontend Implementation Guide

**Project**: HealthLinker Frontend  
**Date**: 2025-12-04  
**Priority**: HIGH  
**Estimated Time**: 1-2 weeks

---

## 🎯 OVERVIEW

The admin API contexts are **already implemented** on the frontend, but the **admin UI pages are missing**. When admins login, they currently see the regular user dashboard instead of admin features.

**Your Task**: Create admin dashboard pages and update the login flow to redirect admins properly.

---

## 📋 WHAT'S ALREADY DONE

### ✅ Admin API Contexts (Fully Implemented)

1. **`src/context/adminContext.tsx`** - Admin core features
   - `GET /api/admin/verify` - Check admin access
   - `GET /api/admin/dashboard/stats` - Dashboard statistics
   - `GET /api/admin/jobs` - Get all jobs
   - `GET /api/admin/jobs/:id` - Get job details
   - `POST /api/admin/jobs` - Create job
   - `PUT /api/admin/jobs/:id` - Update job
   - `DELETE /api/admin/jobs/:id` - Delete job

2. **`src/context/adminCategoryContext.tsx`** - Category management
   - `POST /api/admin/categories` - Create category
   - `PUT /api/admin/categories/:id` - Update category
   - `DELETE /api/admin/categories/:id` - Delete category

3. **`src/context/adminUserContext.tsx`** - User & application management
   - `GET /api/admin/users` - Get all users
   - `GET /api/admin/users/:id` - Get user details
   - `PUT /api/admin/users/:id/status` - Update user status
   - `PUT /api/admin/users/:id/role` - Update user role
   - `GET /api/admin/applications` - Get all applications
   - `PUT /api/admin/applications/:id/status` - Update application status

4. **`src/context/jobAlertContext.tsx`** - Job alerts (also for users)
   - `GET /api/users/job-alerts` - Get user's alerts
   - `POST /api/users/job-alerts` - Create alert
   - `PUT /api/users/job-alerts/:id` - Update alert
   - `DELETE /api/users/job-alerts/:id` - Delete alert

### ✅ Providers Added
All contexts are already added to `src/app/providers.tsx` and ready to use.

---

## ❌ WHAT'S MISSING

### 1. Admin Dashboard Pages (Need to Create)
- `/admin/dashboard` - Main admin dashboard
- `/admin/jobs` - Job management page
- `/admin/jobs/create` - Create new job page
- `/admin/jobs/[id]/edit` - Edit job page
- `/admin/users` - User management page
- `/admin/categories` - Category management page
- `/admin/applications` - Application review page

### 2. Admin Layout Component
- Admin sidebar with navigation
- Admin header
- Route protection (redirect non-admins)

### 3. Login Redirect Logic
- Currently sends everyone to `/dashboard`
- Should send admins to `/admin/dashboard`

---

## 🛠️ IMPLEMENTATION TASKS

### **TASK 1: Update Login Redirect (30 minutes)**

**File**: `src/context/authContext.tsx`  
**Line**: ~265 (in `loginMutation.onSuccess`)

**Current Code**:
```typescript
onSuccess: (data) => {
  toast.success(data.message);
  if (typeof window !== "undefined") {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  }
  setUser(data.user);
  setIsAuthenticated(true);
  router.push("/dashboard"); // ← Everyone goes here
}
```

**Update To**:
```typescript
onSuccess: (data) => {
  toast.success(data.message);
  if (typeof window !== "undefined") {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  }
  setUser(data.user);
  setIsAuthenticated(true);
  
  // Redirect based on user role
  const userRole = data.user?.role;
  if (userRole === "admin" || userRole === "super_admin") {
    router.push("/admin/dashboard");
  } else {
    router.push("/dashboard");
  }
}
```

---

### **TASK 2: Create Admin Layout (2 hours)**

**Create**: `src/app/(admin)/layout.tsx`

```typescript
'use client';
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/context/adminContext";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { isAuthenticated, user } = useAuth();
  const { isAdmin, isAdminLoading } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    // Redirect if not admin
    if (!isAdminLoading && !isAdmin) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isAdmin, isAdminLoading, router]);

  if (isAdminLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
```

---

### **TASK 3: Create Admin Dashboard Page (3 hours)**

**Create**: `src/app/(admin)/admin/dashboard/page.tsx`

```typescript
'use client';
import { useAdmin } from "@/context/adminContext";
import { 
  Users, 
  Briefcase, 
  FileText, 
  Bell,
  TrendingUp,
  Calendar
} from "lucide-react";

export default function AdminDashboard() {
  const { dashboardStats, statsLoading } = useAdmin();

  if (statsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  const stats = dashboardStats?.overview;
  const jobStats = dashboardStats?.jobStats;
  const applicationStats = dashboardStats?.applicationStats;
  const userStats = dashboardStats?.userStats;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome to HealthLinker Admin Panel</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Jobs"
          value={stats?.totalJobs || 0}
          subtitle={`${stats?.activeJobs || 0} active`}
          icon={<Briefcase className="w-6 h-6" />}
          color="blue"
        />
        <StatCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          subtitle={`${stats?.activeUsers || 0} active`}
          icon={<Users className="w-6 h-6" />}
          color="green"
        />
        <StatCard
          title="Applications"
          value={stats?.totalApplications || 0}
          subtitle={`${stats?.pendingApplications || 0} pending`}
          icon={<FileText className="w-6 h-6" />}
          color="purple"
        />
        <StatCard
          title="Job Alerts"
          value={stats?.jobAlertsActive || 0}
          subtitle="Active alerts"
          icon={<Bell className="w-6 h-6" />}
          color="orange"
        />
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Jobs Overview */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Jobs Overview
          </h2>
          <div className="space-y-3">
            <StatRow label="Posted Today" value={jobStats?.postedToday || 0} />
            <StatRow label="Posted This Week" value={jobStats?.postedThisWeek || 0} />
            <StatRow label="Posted This Month" value={jobStats?.postedThisMonth || 0} />
            <StatRow label="Expiring This Week" value={jobStats?.expiringThisWeek || 0} color="red" />
          </div>
        </div>

        {/* Applications Overview */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Applications Overview
          </h2>
          <div className="space-y-3">
            <StatRow label="Today" value={applicationStats?.todayApplications || 0} />
            <StatRow label="This Week" value={applicationStats?.weekApplications || 0} />
            <StatRow label="This Month" value={applicationStats?.monthApplications || 0} />
          </div>
        </div>
      </div>

      {/* User Growth */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">User Growth</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">
              {userStats?.newUsersToday || 0}
            </div>
            <div className="text-sm text-gray-600 mt-1">New Today</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600">
              {userStats?.newUsersThisWeek || 0}
            </div>
            <div className="text-sm text-gray-600 mt-1">New This Week</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600">
              {userStats?.newUsersThisMonth || 0}
            </div>
            <div className="text-sm text-gray-600 mt-1">New This Month</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickActionButton href="/admin/jobs/create" label="Create Job" />
          <QuickActionButton href="/admin/jobs" label="Manage Jobs" />
          <QuickActionButton href="/admin/users" label="Manage Users" />
          <QuickActionButton href="/admin/applications" label="Review Applications" />
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ title, value, subtitle, icon, color }: any) {
  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    orange: "bg-orange-500",
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        </div>
        <div className={`${colorClasses[color]} text-white p-3 rounded-lg`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

// Stat Row Component
function StatRow({ label, value, color = "gray" }: any) {
  const textColor = color === "red" ? "text-red-600" : "text-gray-900";
  return (
    <div className="flex justify-between items-center py-2 border-b last:border-0">
      <span className="text-gray-600">{label}</span>
      <span className={`font-semibold ${textColor}`}>{value}</span>
    </div>
  );
}

// Quick Action Button
function QuickActionButton({ href, label }: any) {
  return (
    <a
      href={href}
      className="flex items-center justify-center px-4 py-3 bg-[var(--primary-1200)] text-white rounded-lg hover:bg-[#078e63] transition-colors"
    >
      {label}
    </a>
  );
}
```

---

### **TASK 4: Create Admin Jobs Page (4 hours)**

**Create**: `src/app/(admin)/admin/jobs/page.tsx`

```typescript
'use client';
import { useState } from "react";
import { useAdmin } from "@/context/adminContext";
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";
import Link from "next/link";

export default function AdminJobsPage() {
  const { adminJobs, jobsLoading, deleteJob, isDeletingJob } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredJobs = adminJobs.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      await deleteJob(id);
    }
  };

  if (jobsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading jobs...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Job Management</h1>
          <p className="text-gray-600 mt-1">Manage all job postings</p>
        </div>
        <Link
          href="/admin/jobs/create"
          className="flex items-center gap-2 px-4 py-2 bg-[var(--primary-1200)] text-white rounded-lg hover:bg-[#078e63]"
        >
          <Plus className="w-5 h-5" />
          Create Job
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by title or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-1200)] focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-1200)] focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="draft">Draft</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applications
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Posted Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No jobs found
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{job.title}</div>
                      <div className="text-sm text-gray-500">{job.location}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {job.company}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={job.status} />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {job.applicationCount} applications
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(job.postedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/jobs/${job.id}`}
                          className="text-blue-600 hover:text-blue-900"
                          title="View"
                        >
                          <Eye className="w-5 h-5" />
                        </Link>
                        <Link
                          href={`/admin/jobs/${job.id}/edit`}
                          className="text-green-600 hover:text-green-900"
                          title="Edit"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(job.id, job.title)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                          disabled={isDeletingJob}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="text-sm text-gray-600">
        Showing {filteredJobs.length} of {adminJobs.length} jobs
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800",
    draft: "bg-yellow-100 text-yellow-800",
    expired: "bg-red-100 text-red-800",
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status as keyof typeof styles]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
```

---

### **TASK 5: Create Admin Sidebar Component (1 hour)**

**Create**: `src/components/admin/AdminSidebar.tsx`

```typescript
'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  FileText,
  FolderOpen,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/jobs", label: "Jobs", icon: Briefcase },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/applications", label: "Applications", icon: FileText },
    { href: "/admin/categories", label: "Categories", icon: FolderOpen },
    { href: "/admin/job-alerts", label: "Job Alerts", icon: Bell },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-[var(--primary-1200)]">
          HealthLinker
        </h1>
        <p className="text-sm text-gray-600 mt-1">Admin Panel</p>
      </div>

      <nav className="px-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-[var(--primary-1200)] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
        >
          <LogOut className="w-5 h-5" />
          <span>Exit Admin</span>
        </Link>
      </div>
    </aside>
  );
}
```

---

### **TASK 6: Create Admin Header Component (30 minutes)**

**Create**: `src/components/admin/AdminHeader.tsx`

```typescript
'use client';
import { useAuth } from "@/hooks/useAuth";
import { Bell, User } from "lucide-react";

export default function AdminHeader() {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Welcome back, {user?.firstName || "Admin"}
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[var(--primary-1200)] rounded-full flex items-center justify-center text-white">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-500">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
```

---

## 📊 SUMMARY OF TASKS

| Task | File | Time | Priority |
|------|------|------|----------|
| 1. Update login redirect | `authContext.tsx` | 30 min | HIGH |
| 2. Create admin layout | `(admin)/layout.tsx` | 2 hrs | HIGH |
| 3. Create dashboard page | `admin/dashboard/page.tsx` | 3 hrs | HIGH |
| 4. Create jobs page | `admin/jobs/page.tsx` | 4 hrs | HIGH |
| 5. Create sidebar | `AdminSidebar.tsx` | 1 hr | HIGH |
| 6. Create header | `AdminHeader.tsx` | 30 min | HIGH |
| 7. Create users page | `admin/users/page.tsx` | 3 hrs | MEDIUM |
| 8. Create categories page | `admin/categories/page.tsx` | 2 hrs | MEDIUM |
| 9. Create applications page | `admin/applications/page.tsx` | 3 hrs | MEDIUM |
| 10. Create job create/edit forms | `admin/jobs/create/page.tsx` | 4 hrs | MEDIUM |

**Total Estimated Time**: 1-2 weeks

---

## 🎨 DESIGN GUIDELINES

### Colors
- Primary: `var(--primary-1200)` (#10B981 green)
- Hover: `#078e63`
- Background: `#F9FAFB` (gray-50)
- White: `#FFFFFF`
- Text: `#111827` (gray-900)

### Components to Reuse
- Use existing `Btn` component from `@/components/button/btn`
- Use existing modals from `@/components/modal/`
- Use Tailwind CSS classes consistently

### Icons
Install Lucide React if not installed:
```bash
npm install lucide-react
```

---

## 🧪 TESTING CHECKLIST

After implementation, test:

- [ ] Admin can login and is redirected to `/admin/dashboard`
- [ ] Regular user is redirected to `/dashboard` (not admin)
- [ ] Admin dashboard shows statistics correctly
- [ ] Admin can view all jobs in table format
- [ ] Admin can create new jobs
- [ ] Admin can edit existing jobs
- [ ] Admin can delete jobs
- [ ] Admin sidebar navigation works
- [ ] Non-admin users cannot access `/admin/*` routes
- [ ] All API calls use the existing contexts

---

## 🔧 ADDITIONAL PAGES NEEDED (Lower Priority)

After completing the above, create:

1. **Create Job Page** - `/admin/jobs/create/page.tsx`
2. **Edit Job Page** - `/admin/jobs/[id]/edit/page.tsx`
3. **Users Management** - `/admin/users/page.tsx`
4. **User Details** - `/admin/users/[id]/page.tsx`
5. **Categories Management** - `/admin/categories/page.tsx`
6. **Applications Review** - `/admin/applications/page.tsx`
7. **Application Details** - `/admin/applications/[id]/page.tsx`

---

## 📞 SUPPORT

If you have questions:
1. Check the existing context files for available hooks
2. Look at `BACKEND_TODO_APIS.md` for API specifications
3. Review existing user pages for component patterns

---

**Document Version**: 1.0  
**Last Updated**: 2025-12-04  
**Status**: Ready for Implementation 🚀

---

## 🎯 QUICK START

1. Start with **TASK 1** (login redirect) - quickest win
2. Then do **TASK 2-6** (basic admin UI) - admin can see something
3. Test that admin login → admin dashboard works
4. Then implement remaining pages as needed

**Result**: Admin will see their own dashboard with stats and job management!
