# HealthLinker Admin Dashboard - API Specification for Backend

**Version**: 1.0  
**Last Updated**: 2025-12-04  
**Purpose**: Admin Dashboard & Job Management APIs  
**Frontend Integration**: Ready for Implementation ✅

---

## Table of Contents
1. [Overview](#overview)
2. [Authentication & Authorization](#authentication--authorization)
3. [Admin Dashboard APIs](#admin-dashboard-apis)
4. [Job Management APIs](#job-management-apis)
5. [Category Management APIs](#category-management-apis)
6. [User Management APIs](#user-management-apis)
7. [Job Alert Management APIs](#job-alert-management-apis)
8. [Analytics & Reporting APIs](#analytics--reporting-apis)
9. [Common Response Formats](#common-response-formats)
10. [Error Handling](#error-handling)

---

## Overview

This document outlines the additional APIs required for the **HealthLinker Admin Dashboard**. The admin dashboard allows administrators to:

- Manage job postings (Create, Read, Update, Delete)
- Manage categories
- View and manage users
- View analytics and statistics
- Manage job alerts
- Monitor applications
- Handle notifications

**Base URL**:
```
Production: https://api.healthlinker.com
Development: http://127.0.0.1:8000
```

---

## Authentication & Authorization

### Admin Authentication
All admin endpoints require:
1. Valid JWT token in Authorization header
2. Admin role/permission

**Authorization Header**:
```
Authorization: Bearer {admin_token}
```

### Role-Based Access Control (RBAC)

**Roles**:
- `super_admin` - Full access to all features
- `admin` - Standard admin access (job management, user viewing)
- `moderator` - Limited access (view-only, basic edits)
- `user` - Regular user (no admin access)

**Admin Check Endpoint**:
```
GET /api/admin/verify
```

**Response**:
```json
{
  "success": true,
  "data": {
    "isAdmin": true,
    "role": "admin",
    "permissions": ["job.create", "job.update", "job.delete", "user.view"]
  }
}
```

---

## Admin Dashboard APIs

### 1. Get Admin Dashboard Statistics
**Endpoint**: `GET /api/admin/dashboard/stats`  
**Authentication**: Required (Admin)  
**Description**: Get comprehensive admin dashboard statistics

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalJobs": 1250,
      "activeJobs": 980,
      "totalUsers": 15420,
      "activeUsers": 12340,
      "totalApplications": 45670,
      "pendingApplications": 3420,
      "totalCategories": 12,
      "jobAlertsActive": 8920
    },
    "recentActivity": [
      {
        "id": "string",
        "type": "job_posted | application_submitted | user_registered",
        "description": "New job posted: Senior Nurse",
        "timestamp": "2025-12-04T10:30:00Z",
        "user": {
          "id": "string",
          "name": "John Doe"
        }
      }
    ],
    "jobStats": {
      "postedToday": 15,
      "postedThisWeek": 89,
      "postedThisMonth": 342,
      "expiringThisWeek": 23
    },
    "applicationStats": {
      "todayApplications": 234,
      "weekApplications": 1567,
      "monthApplications": 6789,
      "averagePerJob": 36.5
    },
    "userStats": {
      "newUsersToday": 45,
      "newUsersThisWeek": 287,
      "newUsersThisMonth": 1203,
      "activeUsersPercentage": 78.5
    }
  }
}
```

---

### 2. Get Recent Activities
**Endpoint**: `GET /api/admin/dashboard/activities`  
**Authentication**: Required (Admin)  
**Description**: Get recent platform activities with pagination

**Query Parameters**:
```
page: number (default: 1)
limit: number (default: 20)
type: string (optional: "job" | "application" | "user" | "all")
```

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "activities": [
      {
        "id": "string",
        "type": "job_created",
        "title": "New Job Posted",
        "description": "Senior Surgeon position posted by HealthCare Inc.",
        "metadata": {
          "jobId": "string",
          "jobTitle": "Senior Surgeon",
          "company": "HealthCare Inc."
        },
        "performedBy": {
          "id": "string",
          "name": "Admin User",
          "role": "admin"
        },
        "timestamp": "2025-12-04T10:30:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 45,
      "totalItems": 890,
      "itemsPerPage": 20
    }
  }
}
```

---

## Job Management APIs

### 1. Create Job Posting
**Endpoint**: `POST /api/admin/jobs`  
**Authentication**: Required (Admin)  
**Description**: Create a new job posting

**Request Body**:
```json
{
  "title": "string (required)",
  "company": "string (required)",
  "companyLogo": "string (optional, URL)",
  "type": "Full-Time | Part-Time | Contract | Internship (required)",
  "location": "string (required)",
  "salary": "string (required, e.g., '$50,000 - $70,000')",
  "description": "string (required)",
  "requirements": ["string"] (required),
  "benefits": ["string"] (optional),
  "experienceLevel": "Entry | Mid-level | Senior | Executive (required)",
  "categoryId": "string (required)",
  "applicationDeadline": "string (ISO 8601 date, optional)",
  "isRemote": boolean (optional, default: false),
  "numberOfPositions": number (optional, default: 1),
  "contactEmail": "string (optional)",
  "applicationUrl": "string (optional)",
  "skills": ["string"] (optional),
  "industry": "string (optional)"
}
```

**Success Response** (201):
```json
{
  "success": true,
  "message": "Job posted successfully",
  "data": {
    "job": {
      "id": "string",
      "title": "string",
      "company": "string",
      "type": "string",
      "location": "string",
      "salary": "string",
      "status": "active",
      "postedDate": "2025-12-04T10:30:00Z",
      "viewCount": 0,
      "applicationCount": 0
    }
  }
}
```

**Notes**:
- Frontend uses this for admin job creation
- Categories must exist before job creation
- Job is automatically set to "active" status

---

### 2. Get All Jobs (Admin View)
**Endpoint**: `GET /api/admin/jobs`  
**Authentication**: Required (Admin)  
**Description**: Get all jobs with admin-specific data

**Query Parameters**:
```
page: number (default: 1)
limit: number (default: 20)
status: string (optional: "active" | "inactive" | "draft" | "expired" | "all")
category: string (optional)
company: string (optional)
search: string (optional)
sortBy: string (optional: "date" | "applications" | "views" | "title")
sortOrder: string (optional: "asc" | "desc", default: "desc")
```

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "jobs": [
      {
        "id": "string",
        "title": "string",
        "company": "string",
        "companyLogo": "string",
        "type": "string",
        "location": "string",
        "salary": "string",
        "status": "active | inactive | draft | expired",
        "category": {
          "id": "string",
          "name": "string",
          "slug": "string"
        },
        "postedDate": "2025-12-04T10:30:00Z",
        "applicationDeadline": "2025-12-31T23:59:59Z",
        "viewCount": 1234,
        "applicationCount": 45,
        "savedCount": 123,
        "createdBy": {
          "id": "string",
          "name": "Admin User"
        },
        "lastModified": "2025-12-04T15:30:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 50,
      "totalItems": 1000,
      "itemsPerPage": 20
    },
    "stats": {
      "totalActive": 980,
      "totalInactive": 150,
      "totalDraft": 70,
      "totalExpired": 200
    }
  }
}
```

---

### 3. Get Single Job (Admin View)
**Endpoint**: `GET /api/admin/jobs/:id`  
**Authentication**: Required (Admin)  
**Description**: Get detailed job information with admin stats

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "job": {
      "id": "string",
      "title": "string",
      "company": "string",
      "companyLogo": "string",
      "type": "string",
      "location": "string",
      "salary": "string",
      "description": "string",
      "requirements": ["string"],
      "benefits": ["string"],
      "experienceLevel": "string",
      "status": "active",
      "category": {
        "id": "string",
        "name": "string",
        "slug": "string"
      },
      "postedDate": "2025-12-04T10:30:00Z",
      "applicationDeadline": "2025-12-31T23:59:59Z",
      "isRemote": false,
      "numberOfPositions": 2,
      "contactEmail": "hr@company.com",
      "applicationUrl": "https://company.com/apply",
      "skills": ["string"],
      "industry": "Healthcare"
    },
    "stats": {
      "viewCount": 1234,
      "applicationCount": 45,
      "savedCount": 123,
      "shareCount": 23
    },
    "applications": {
      "total": 45,
      "pending": 20,
      "reviewed": 15,
      "accepted": 5,
      "rejected": 5
    },
    "createdBy": {
      "id": "string",
      "name": "Admin User",
      "email": "admin@healthlinker.com"
    },
    "metadata": {
      "createdAt": "2025-12-01T10:00:00Z",
      "updatedAt": "2025-12-04T15:30:00Z",
      "lastPublishedAt": "2025-12-01T10:00:00Z"
    }
  }
}
```

---

### 4. Update Job
**Endpoint**: `PUT /api/admin/jobs/:id`  
**Authentication**: Required (Admin)  
**Description**: Update an existing job posting

**Request Body** (all fields optional):
```json
{
  "title": "string",
  "company": "string",
  "companyLogo": "string",
  "type": "Full-Time | Part-Time | Contract | Internship",
  "location": "string",
  "salary": "string",
  "description": "string",
  "requirements": ["string"],
  "benefits": ["string"],
  "experienceLevel": "string",
  "categoryId": "string",
  "applicationDeadline": "string",
  "isRemote": boolean,
  "numberOfPositions": number,
  "contactEmail": "string",
  "applicationUrl": "string",
  "skills": ["string"],
  "industry": "string",
  "status": "active | inactive | draft"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Job updated successfully",
  "data": {
    "job": {
      "id": "string",
      "title": "string",
      /* ... updated job object ... */
      "lastModified": "2025-12-04T15:30:00Z"
    }
  }
}
```

---

### 5. Delete Job
**Endpoint**: `DELETE /api/admin/jobs/:id`  
**Authentication**: Required (Admin)  
**Description**: Delete a job posting (soft delete recommended)

**Success Response** (200):
```json
{
  "success": true,
  "message": "Job deleted successfully"
}
```

**Notes**:
- Recommend soft delete (status = "deleted")
- Keep application history
- Archive related data

---

### 6. Bulk Update Jobs Status
**Endpoint**: `PUT /api/admin/jobs/bulk-status`  
**Authentication**: Required (Admin)  
**Description**: Update status of multiple jobs at once

**Request Body**:
```json
{
  "jobIds": ["string", "string"],
  "status": "active | inactive | draft"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Jobs updated successfully",
  "data": {
    "updatedCount": 5,
    "failedIds": []
  }
}
```

---

### 7. Duplicate Job
**Endpoint**: `POST /api/admin/jobs/:id/duplicate`  
**Authentication**: Required (Admin)  
**Description**: Create a copy of an existing job

**Success Response** (201):
```json
{
  "success": true,
  "message": "Job duplicated successfully",
  "data": {
    "job": {
      "id": "string (new ID)",
      "title": "string (Copy)",
      /* ... duplicated job data ... */
      "status": "draft"
    }
  }
}
```

---

## Category Management APIs

### 1. Get All Categories
**Endpoint**: `GET /api/categories`  
**Authentication**: Optional  
**Description**: Get all job categories with job counts

**Success Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "name": "Nursing",
      "slug": "nursing",
      "description": "Nursing jobs including RN, LPN, CNA",
      "icon": "string (optional, icon name or URL)",
      "jobCount": 234,
      "isActive": true,
      "createdAt": "2025-01-01T00:00:00Z"
    }
  ]
}
```

**Notes**:
- Frontend uses this for job filtering
- Frontend displays in CategorySection component
- Shows on home page

---

### 2. Create Category (Admin)
**Endpoint**: `POST /api/admin/categories`  
**Authentication**: Required (Admin)  
**Description**: Create a new job category

**Request Body**:
```json
{
  "name": "string (required)",
  "slug": "string (optional, auto-generated if not provided)",
  "description": "string (optional)",
  "icon": "string (optional)",
  "isActive": boolean (optional, default: true)
}
```

**Success Response** (201):
```json
{
  "success": true,
  "message": "Category created successfully",
  "data": {
    "category": {
      "id": "string",
      "name": "string",
      "slug": "string",
      "description": "string",
      "icon": "string",
      "jobCount": 0,
      "isActive": true,
      "createdAt": "2025-12-04T10:30:00Z"
    }
  }
}
```

---

### 3. Update Category (Admin)
**Endpoint**: `PUT /api/admin/categories/:id`  
**Authentication**: Required (Admin)  
**Description**: Update a job category

**Request Body** (all fields optional):
```json
{
  "name": "string",
  "slug": "string",
  "description": "string",
  "icon": "string",
  "isActive": boolean
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Category updated successfully",
  "data": {
    "category": { /* updated category object */ }
  }
}
```

---

### 4. Delete Category (Admin)
**Endpoint**: `DELETE /api/admin/categories/:id`  
**Authentication**: Required (Admin)  
**Description**: Delete a job category

**Query Parameters**:
```
reassignTo: string (optional, category ID to reassign jobs to)
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Category deleted successfully",
  "data": {
    "jobsReassigned": 45
  }
}
```

**Notes**:
- Cannot delete category with jobs unless reassignTo is provided
- Recommend reassigning jobs before deletion

---

## User Management APIs

### 1. Get All Users (Admin)
**Endpoint**: `GET /api/admin/users`  
**Authentication**: Required (Admin)  
**Description**: Get all registered users with filtering

**Query Parameters**:
```
page: number (default: 1)
limit: number (default: 20)
role: string (optional: "user" | "admin" | "all")
status: string (optional: "active" | "inactive" | "suspended")
search: string (optional, search by name or email)
sortBy: string (optional: "date" | "name" | "applications")
sortOrder: string (optional: "asc" | "desc")
```

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "string",
        "email": "string",
        "firstName": "string",
        "lastName": "string",
        "phone": "string",
        "profilePicture": "string",
        "role": "user | admin",
        "status": "active | inactive | suspended",
        "registeredDate": "2025-01-15T10:30:00Z",
        "lastLogin": "2025-12-04T08:00:00Z",
        "stats": {
          "applicationsCount": 15,
          "savedJobsCount": 23,
          "jobAlertsCount": 5
        },
        "isEmailVerified": true
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 771,
      "totalItems": 15420,
      "itemsPerPage": 20
    },
    "stats": {
      "totalActive": 12340,
      "totalInactive": 2080,
      "totalSuspended": 1000
    }
  }
}
```

---

### 2. Get Single User (Admin)
**Endpoint**: `GET /api/admin/users/:id`  
**Authentication**: Required (Admin)  
**Description**: Get detailed user information

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "string",
      "email": "string",
      "firstName": "string",
      "lastName": "string",
      "phone": "string",
      "profilePicture": "string",
      "bio": "string",
      "role": "user",
      "status": "active",
      "registeredDate": "2025-01-15T10:30:00Z",
      "lastLogin": "2025-12-04T08:00:00Z",
      "isEmailVerified": true,
      "location": "string",
      "skills": ["string"]
    },
    "stats": {
      "totalApplications": 15,
      "pendingApplications": 5,
      "acceptedApplications": 2,
      "rejectedApplications": 3,
      "savedJobs": 23,
      "jobAlerts": 5
    },
    "recentActivity": [
      {
        "type": "application",
        "description": "Applied to Senior Nurse position",
        "timestamp": "2025-12-03T14:30:00Z"
      }
    ]
  }
}
```

---

### 3. Update User Status (Admin)
**Endpoint**: `PUT /api/admin/users/:id/status`  
**Authentication**: Required (Admin)  
**Description**: Update user account status

**Request Body**:
```json
{
  "status": "active | inactive | suspended (required)",
  "reason": "string (optional, reason for status change)"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "User status updated successfully"
}
```

---

### 4. Update User Role (Admin)
**Endpoint**: `PUT /api/admin/users/:id/role`  
**Authentication**: Required (Super Admin)  
**Description**: Change user role/permissions

**Request Body**:
```json
{
  "role": "user | admin | moderator (required)"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "User role updated successfully"
}
```

---

## Job Alert Management APIs

### 1. Get All Job Alerts (Admin)
**Endpoint**: `GET /api/admin/job-alerts`  
**Authentication**: Required (Admin)  
**Description**: Get all user job alerts with statistics

**Query Parameters**:
```
page: number (default: 1)
limit: number (default: 20)
userId: string (optional, filter by user)
status: string (optional: "active" | "inactive")
```

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "alerts": [
      {
        "id": "string",
        "user": {
          "id": "string",
          "name": "John Doe",
          "email": "john@example.com"
        },
        "criteria": {
          "jobTitle": "string",
          "experienceLevel": ["string"],
          "locations": ["string"],
          "jobType": ["Full-Time", "Part-Time"]
        },
        "status": "active | inactive",
        "createdAt": "2025-10-10T00:00:00Z",
        "lastTriggered": "2025-12-03T10:00:00Z",
        "matchCount": 45
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 446,
      "totalItems": 8920,
      "itemsPerPage": 20
    }
  }
}
```

---

### 2. Get User's Job Alerts
**Endpoint**: `GET /api/users/job-alerts`  
**Authentication**: Required (User)  
**Description**: Get current user's job alerts

**Success Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "jobTitle": "Surgeon",
      "experienceLevel": ["Mid-level", "Senior-level"],
      "locations": ["All locations"],
      "jobType": ["Full-Time", "Part-Time", "Contract"],
      "isActive": true,
      "createdAt": "2025-10-10T00:00:00Z",
      "note": "Kindly note that all job alerts are done via your email."
    }
  ]
}
```

**Notes**:
- Frontend displays this in `/job-alert` page
- Frontend shows count: "You have X job alerts"

---

### 3. Create Job Alert
**Endpoint**: `POST /api/users/job-alerts`  
**Authentication**: Required (User)  
**Description**: Create a new job alert

**Request Body**:
```json
{
  "jobTitle": "string (required)",
  "experienceLevel": ["string"] (optional),
  "locations": ["string"] (optional),
  "jobType": ["Full-Time", "Part-Time", "Contract"] (optional)
}
```

**Success Response** (201):
```json
{
  "success": true,
  "message": "Job alert created successfully",
  "data": {
    "alert": {
      "id": "string",
      "jobTitle": "string",
      "experienceLevel": ["string"],
      "locations": ["string"],
      "jobType": ["string"],
      "isActive": true,
      "createdAt": "2025-12-04T10:30:00Z"
    }
  }
}
```

**Notes**:
- Frontend uses CreateJobModal component
- Frontend shows success toast notification

---

### 4. Update Job Alert
**Endpoint**: `PUT /api/users/job-alerts/:id`  
**Authentication**: Required (User)  
**Description**: Update an existing job alert

**Request Body** (all fields optional):
```json
{
  "jobTitle": "string",
  "experienceLevel": ["string"],
  "locations": ["string"],
  "jobType": ["string"],
  "isActive": boolean
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Job alert updated successfully",
  "data": {
    "alert": { /* updated alert object */ }
  }
}
```

**Notes**:
- Frontend uses EditJobModal component

---

### 5. Delete Job Alert
**Endpoint**: `DELETE /api/users/job-alerts/:id`  
**Authentication**: Required (User)  
**Description**: Delete a job alert

**Success Response** (200):
```json
{
  "success": true,
  "message": "Job alert deleted successfully"
}
```

**Notes**:
- Frontend shows DeleteModal for confirmation
- Frontend updates list after deletion

---

### 6. Get Matching Jobs for Alert
**Endpoint**: `GET /api/users/job-alerts/:id/matches`  
**Authentication**: Required (User)  
**Description**: Get jobs matching this alert's criteria

**Query Parameters**:
```
page: number (default: 1)
limit: number (default: 12)
```

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "jobs": [
      {
        "id": "string",
        "title": "string",
        "company": "string",
        "type": "string",
        "location": "string",
        "date": "string",
        "salary": "string"
      }
    ],
    "total": 45,
    "currentPage": 1,
    "totalPages": 4
  }
}
```

**Notes**:
- Frontend "View Jobs" button uses this endpoint

---

## Analytics & Reporting APIs

### 1. Get Platform Analytics
**Endpoint**: `GET /api/admin/analytics`  
**Authentication**: Required (Admin)  
**Description**: Get comprehensive platform analytics

**Query Parameters**:
```
period: string (optional: "today" | "week" | "month" | "year", default: "month")
startDate: string (optional, ISO 8601)
endDate: string (optional, ISO 8601)
```

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "period": {
      "start": "2025-11-01T00:00:00Z",
      "end": "2025-12-01T00:00:00Z"
    },
    "jobs": {
      "totalPosted": 342,
      "totalViews": 125680,
      "averageViewsPerJob": 367,
      "mostViewedCategory": "Nursing"
    },
    "applications": {
      "total": 6789,
      "averagePerJob": 19.8,
      "acceptanceRate": 12.5,
      "averageResponseTime": "3.2 days"
    },
    "users": {
      "newRegistrations": 1203,
      "activeUsers": 12340,
      "retentionRate": 78.5,
      "averageSessionDuration": "8.5 minutes"
    },
    "topPerformingJobs": [
      {
        "id": "string",
        "title": "Senior Nurse",
        "company": "HealthCare Inc.",
        "views": 5678,
        "applications": 234
      }
    ],
    "topCategories": [
      {
        "id": "string",
        "name": "Nursing",
        "jobCount": 234,
        "applicationCount": 1234
      }
    ]
  }
}
```

---

### 2. Get Job Performance Analytics
**Endpoint**: `GET /api/admin/analytics/jobs/:id`  
**Authentication**: Required (Admin)  
**Description**: Get detailed analytics for a specific job

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "job": {
      "id": "string",
      "title": "string",
      "company": "string"
    },
    "performance": {
      "totalViews": 1234,
      "uniqueViews": 987,
      "totalApplications": 45,
      "conversionRate": 3.6,
      "averageTimeToApply": "2.3 days",
      "savedCount": 123,
      "shareCount": 23
    },
    "viewsOverTime": [
      {
        "date": "2025-12-01",
        "views": 89,
        "applications": 3
      }
    ],
    "applicationsBySource": {
      "direct": 20,
      "jobAlert": 15,
      "search": 10
    },
    "demographicBreakdown": {
      "experienceLevel": {
        "entry": 10,
        "mid": 25,
        "senior": 10
      }
    }
  }
}
```

---

### 3. Export Analytics Report
**Endpoint**: `GET /api/admin/analytics/export`  
**Authentication**: Required (Admin)  
**Description**: Export analytics data as CSV or PDF

**Query Parameters**:
```
format: string (required: "csv" | "pdf" | "excel")
type: string (required: "jobs" | "users" | "applications" | "overview")
period: string (optional: "today" | "week" | "month" | "year")
startDate: string (optional)
endDate: string (optional)
```

**Success Response** (200):
```
Content-Type: application/csv | application/pdf | application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
Content-Disposition: attachment; filename="analytics_report_2025-12-04.csv"

[File download]
```

---

## Application Management APIs (Admin)

### 1. Get All Applications (Admin)
**Endpoint**: `GET /api/admin/applications`  
**Authentication**: Required (Admin)  
**Description**: Get all job applications with filtering

**Query Parameters**:
```
page: number (default: 1)
limit: number (default: 20)
status: string (optional: "pending" | "reviewed" | "accepted" | "rejected")
jobId: string (optional)
userId: string (optional)
dateFrom: string (optional)
dateTo: string (optional)
```

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "applications": [
      {
        "id": "string",
        "job": {
          "id": "string",
          "title": "Senior Nurse",
          "company": "HealthCare Inc."
        },
        "applicant": {
          "id": "string",
          "name": "John Doe",
          "email": "john@example.com",
          "phone": "string"
        },
        "status": "pending",
        "appliedAt": "2025-12-01T10:30:00Z",
        "reviewedAt": null,
        "resume": "string (URL)",
        "coverLetter": "string"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 2284,
      "totalItems": 45670,
      "itemsPerPage": 20
    },
    "stats": {
      "pending": 3420,
      "reviewed": 15230,
      "accepted": 5780,
      "rejected": 21240
    }
  }
}
```

---

### 2. Update Application Status (Admin)
**Endpoint**: `PUT /api/admin/applications/:id/status`  
**Authentication**: Required (Admin)  
**Description**: Update application status

**Request Body**:
```json
{
  "status": "pending | reviewed | accepted | rejected (required)",
  "notes": "string (optional, admin notes)",
  "notifyApplicant": boolean (optional, default: true)
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Application status updated successfully"
}
```

**Notes**:
- If notifyApplicant is true, send email to applicant
- Log status change in activity log

---

### 3. Get Application Details (Admin)
**Endpoint**: `GET /api/admin/applications/:id`  
**Authentication**: Required (Admin)  
**Description**: Get detailed application information

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "application": {
      "id": "string",
      "job": {
        "id": "string",
        "title": "Senior Nurse",
        "company": "HealthCare Inc.",
        "type": "Full-Time",
        "location": "New York, USA"
      },
      "applicant": {
        "id": "string",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com",
        "phone": "+1234567890",
        "profilePicture": "string",
        "location": "New York, USA",
        "skills": ["Nursing", "Patient Care"]
      },
      "status": "pending",
      "appliedAt": "2025-12-01T10:30:00Z",
      "reviewedAt": null,
      "reviewedBy": null,
      "resume": "string (URL)",
      "coverLetter": "string",
      "additionalDocuments": [
        {
          "name": "Certificate",
          "url": "string"
        }
      ],
      "notes": [
        {
          "id": "string",
          "text": "Good candidate",
          "createdBy": "Admin User",
          "createdAt": "2025-12-02T14:00:00Z"
        }
      ]
    },
    "applicantHistory": {
      "totalApplications": 8,
      "acceptedApplications": 2,
      "rejectedApplications": 3
    }
  }
}
```

---

## Common Response Formats

### Success Response Structure
```json
{
  "success": true,
  "message": "string (optional)",
  "data": {} | []
}
```

### Error Response Structure
```json
{
  "success": false,
  "message": "Error description",
  "errors": {
    "field": ["error message"]
  } (optional, for validation errors),
  "code": "ERROR_CODE" (optional)
}
```

---

## Error Handling

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `422` - Unprocessable Entity
- `429` - Too Many Requests (rate limit)
- `500` - Internal Server Error

### Admin-Specific Error Codes
```json
{
  "success": false,
  "message": "Insufficient permissions",
  "code": "ADMIN_PERMISSION_DENIED"
}
```

**Error Codes**:
- `ADMIN_PERMISSION_DENIED` - User is not an admin
- `INVALID_ROLE` - Invalid role specified
- `CATEGORY_HAS_JOBS` - Cannot delete category with jobs
- `JOB_NOT_FOUND` - Job does not exist
- `USER_NOT_FOUND` - User does not exist
- `CANNOT_MODIFY_SUPER_ADMIN` - Cannot change super admin settings

---

## Rate Limiting

### Admin Endpoints
- **Dashboard stats**: 10 requests per minute
- **Job creation**: 30 requests per hour
- **Job listing**: 60 requests per minute
- **User management**: 30 requests per minute
- **Analytics export**: 5 requests per hour

---

## Security Considerations

### Admin API Security
1. **Role-Based Access Control**: Verify admin role on every request
2. **Audit Logging**: Log all admin actions
3. **IP Whitelisting**: Optional IP restriction for admin access
4. **Two-Factor Authentication**: Recommend 2FA for admin accounts
5. **Session Management**: Shorter session timeout for admin users
6. **Activity Monitoring**: Track suspicious admin activity

### Audit Log Format
```json
{
  "id": "string",
  "action": "job.create | job.update | user.suspend",
  "performedBy": {
    "id": "string",
    "name": "Admin User",
    "role": "admin"
  },
  "targetType": "job | user | category",
  "targetId": "string",
  "details": {
    "changes": {}
  },
  "ipAddress": "string",
  "userAgent": "string",
  "timestamp": "2025-12-04T10:30:00Z"
}
```

---

## Testing Checklist

### Admin Dashboard
- [ ] Dashboard statistics load correctly
- [ ] Recent activities display properly
- [ ] All metrics calculate accurately

### Job Management
- [ ] Create job with all fields works
- [ ] Update job works correctly
- [ ] Delete job (soft delete) works
- [ ] Bulk operations work
- [ ] Job duplication works
- [ ] Job filtering and search work

### Category Management
- [ ] Create category works
- [ ] Update category works
- [ ] Delete category with job reassignment works
- [ ] Category listing with job counts works

### User Management
- [ ] User listing with filters works
- [ ] User details load correctly
- [ ] Update user status works
- [ ] Update user role works (super admin only)
- [ ] User search works

### Job Alerts
- [ ] User can create job alert
- [ ] User can edit job alert
- [ ] User can delete job alert
- [ ] View matching jobs works
- [ ] Admin can view all alerts

### Analytics
- [ ] Dashboard analytics load correctly
- [ ] Job performance analytics work
- [ ] Export reports work (CSV/PDF)
- [ ] Date filtering works

### Application Management
- [ ] Application listing works
- [ ] Update application status works
- [ ] Email notifications sent correctly
- [ ] Application details load correctly

---

## Implementation Priority

### Phase 1 (High Priority)
1. Admin authentication & authorization
2. Job management CRUD operations
3. Category management
4. Dashboard statistics

### Phase 2 (Medium Priority)
1. User management
2. Job alerts CRUD
3. Application management
4. Basic analytics

### Phase 3 (Low Priority)
1. Advanced analytics
2. Export reports
3. Audit logging
4. Advanced filters

---

## Notes for Backend Team

### Database Considerations
1. **Indexes**: Create indexes on frequently queried fields (status, createdAt, userId)
2. **Soft Delete**: Implement soft delete for jobs, users, applications
3. **Audit Trail**: Maintain change history for critical operations
4. **Performance**: Use pagination for all list endpoints
5. **Caching**: Cache dashboard stats, category counts

### Email Notifications
1. **Job Alert Matches**: Send daily/weekly digest of matching jobs
2. **Application Status**: Notify users when status changes
3. **Job Posted**: Notify relevant job alert subscribers
4. **Admin Actions**: Notify users of account status changes

### File Storage
1. **Resume/Documents**: Store in cloud storage (S3, Google Cloud Storage)
2. **Company Logos**: CDN for fast delivery
3. **Export Reports**: Temporary storage with expiration

### Background Jobs
1. **Job Alert Matching**: Run daily to match new jobs with alerts
2. **Email Sending**: Queue for bulk email sending
3. **Analytics Calculation**: Run hourly/daily for stats
4. **Data Cleanup**: Archive old applications, expired jobs

---

## API Versioning

Current Version: `v1`

**URL Format**:
```
/api/v1/admin/*
/api/v1/users/*
/api/v1/jobs/*
```

**Version Header** (optional):
```
API-Version: 1
```

---

## Contact & Support

For questions or clarifications about these admin APIs, please contact:
- **Frontend Team**: For integration questions
- **Product Team**: For feature clarifications
- **DevOps Team**: For deployment and infrastructure

---

**Last Updated**: 2025-12-04  
**Document Version**: 1.0  
**Status**: Ready for Implementation ✅

---

## Appendix

### A. Admin Dashboard UI Components Mapping

| Frontend Component | API Endpoint |
|-------------------|-------------|
| Dashboard Stats | `GET /api/admin/dashboard/stats` |
| Recent Activities | `GET /api/admin/dashboard/activities` |
| Job Listing (Admin) | `GET /api/admin/jobs` |
| Create Job Modal | `POST /api/admin/jobs` |
| Edit Job Modal | `PUT /api/admin/jobs/:id` |
| Delete Job Modal | `DELETE /api/admin/jobs/:id` |
| User Listing | `GET /api/admin/users` |
| Job Alert Listing | `GET /api/users/job-alerts` |
| Create Job Alert | `POST /api/users/job-alerts` |
| Edit Job Alert | `PUT /api/users/job-alerts/:id` |
| Delete Job Alert | `DELETE /api/users/job-alerts/:id` |
| View Alert Jobs | `GET /api/users/job-alerts/:id/matches` |
| Category Section | `GET /api/categories` |

### B. Existing vs New Endpoints

**Existing (from API_SPECIFICATION_FOR_BACKEND.md)**:
- User authentication
- Job listing (public)
- Job details (public)
- User dashboard
- Saved jobs
- Applied jobs
- Notifications
- Contact form

**New (Admin Dashboard)**:
- Admin authentication
- Job management CRUD
- Category management CRUD
- User management
- Job alerts CRUD
- Analytics & reporting
- Application management (admin view)
- Audit logging

### C. Database Schema Recommendations

**Admin Users Table**:
```sql
admins:
  - id (primary key)
  - user_id (foreign key to users)
  - role (enum: super_admin, admin, moderator)
  - permissions (json)
  - created_at
  - updated_at
```

**Job Alerts Table**:
```sql
job_alerts:
  - id (primary key)
  - user_id (foreign key)
  - job_title (string)
  - experience_level (json array)
  - locations (json array)
  - job_type (json array)
  - is_active (boolean)
  - created_at
  - updated_at
```

**Categories Table**:
```sql
categories:
  - id (primary key)
  - name (string, unique)
  - slug (string, unique)
  - description (text)
  - icon (string)
  - is_active (boolean)
  - created_at
  - updated_at
```

**Audit Logs Table**:
```sql
audit_logs:
  - id (primary key)
  - admin_id (foreign key)
  - action (string)
  - target_type (string)
  - target_id (string)
  - details (json)
  - ip_address (string)
  - user_agent (string)
  - created_at
```

---

**END OF DOCUMENT**
