# HealthLinker Frontend API Documentation

This document outlines all the API endpoints required for the HealthLinker application frontend. The backend developer should implement these endpoints to sync with the frontend components.

## 🔐 Authentication Endpoints

### 1. User Registration
- **Endpoint:** `POST /api/auth/register`
- **Frontend File:** `src/app/(auth)/sign-up/page.tsx`
- **Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string", 
  "email": "string (email format)",
  "password": "string (min 8 characters)"
}
```
- **Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "userId": "string",
  "token": "string (JWT token)"
}
```

### 2. User Login
- **Endpoint:** `POST /api/auth/login`
- **Frontend File:** `src/app/(auth)/login/page.tsx`
- **Request Body:**
```json
{
  "email": "string (email format)",
  "password": "string"
}
```
- **Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "userId": "string",
  "token": "string (JWT token)",
  "user": {
    "id": "string",
    "email": "string",
    "firstName": "string",
    "lastName": "string"
  }
}
```

### 3. Google OAuth
- **Endpoint:** `POST /api/auth/google`
- **Frontend File:** `src/app/(auth)/sign-up/page.tsx` and `src/app/(auth)/login/page.tsx`
- **Request Body:**
```json
{
  "googleToken": "string (Google ID token)",
  "accessToken": "string (Google access token)"
}
```
- **Response:**
```json
{
  "success": true,
  "message": "Google authentication successful",
  "userId": "string",
  "token": "string (JWT token)",
  "user": {
    "id": "string",
    "email": "string",
    "firstName": "string",
    "lastName": "string",
    "profilePicture": "string (URL)"
  }
}
```

—

Facebook OAuth (alternative)
- **Endpoint:** `POST /api/auth/facebook`
- **Frontend File:** `src/app/(auth)/sign-up/page.tsx`, `src/app/(auth)/login/page.tsx`, and `src/components/ui/googleAuth.tsx`
- **Request Body:**
```json
{
  "accessToken": "string (Facebook access token)",
  "userId": "string (optional, Facebook user id)"
}
```
- **Response:**
```json
{
  "success": true,
  "message": "Facebook authentication successful",
  "userId": "string",
  "token": "string (JWT token)",
  "user": {
    "id": "string",
    "email": "string",
    "firstName": "string",
    "lastName": "string",
    "profilePicture": "string (URL)"
  }
}
```

### 4. Password Reset Request
- **Endpoint:** `POST /api/auth/forgot-password`
- **Frontend File:** `src/app/(auth)/forgot-password/page.tsx`
- **Request Body:**
```json
{
  "email": "string (email format)"
}
```
- **Response:**
```json
{
  "success": true,
  "message": "Password reset email sent"
}
```

### 5. Password Reset Confirmation
- **Endpoint:** `POST /api/auth/reset-password`
- **Frontend File:** `src/app/(auth)/reset-password/page.tsx`
- **Request Body:**
```json
{
  "token": "string (reset token from email)",
  "newPassword": "string (min 8 characters)"
}
```
- **Response:**
```json
{
  "success": true,
  "message": "Password reset successful"
}
```

### 6. Verify Email (optional, recommended)
- **Endpoint:** `POST /api/auth/verify-email`
- **Purpose:** Confirm user email with verification token
- **Request Body:**
```json
{
  "token": "string (email verification token)"
}
```
- **Response:**
```json
{
  "success": true,
  "message": "Email verified"
}
```

—

OTP Verification (optional)
- Use for: email verification via code, login MFA, or password reset.
- Social logins (Google/Facebook) do not require OTP unless MFA is enabled.

- **Endpoint:** `POST /api/auth/send-otp`
- **Frontend Files:** `src/app/(auth)/sign-up/page.tsx`, `src/app/(auth)/login/page.tsx`, `src/app/(auth)/reset-password/page.tsx`
- **Request Body:**
```json
{
  "channel": "string (email|sms)",
  "destination": "string (email address or E.164 phone)",
  "purpose": "string (registration|login_mfa|password_reset)"
}
```
- **Response:**
```json
{
  "success": true,
  "message": "OTP sent",
  "otpId": "string (server identifier for this OTP)"
}
```

- **Endpoint:** `POST /api/auth/verify-otp`
- **Request Body:**
```json
{
  "otpId": "string",
  "code": "string (e.g., 6 digits)"
}
```
- **Response:**
```json
{
  "success": true,
  "message": "OTP verified",
  "emailVerified": true,
  "token": "string (JWT, only returned for login_mfa)"
}
```

### 7. Refresh Token (optional, recommended)
- **Endpoint:** `POST /api/auth/refresh-token`
- **Purpose:** Exchange refresh token for a new access token
- **Request Body:**
```json
{
  "refreshToken": "string"
}
```
- **Response:**
```json
{
  "success": true,
  "token": "string (new JWT)",
  "refreshToken": "string (new refresh token)"
}
```

### 8. Logout (optional)
- **Endpoint:** `POST /api/auth/logout`
- **Purpose:** Invalidate refresh token or server session
- **Request Headers:** Authorization: Bearer {token}
- **Response:**
```json
{
  "success": true
}
```

## 💼 Job Management Endpoints

### 9. Get All Jobs (with filtering)
- **Endpoint:** `GET /api/jobs`
- **Frontend File:** `src/app/(dashboard)/explore-jobs/page.tsx`
- **Query Parameters:**
  - `page`: number (default: 1)
  - `limit`: number (default: 12)
  - `location`: string (optional) - Filter by job location
  - `industry`: string (optional) - Filter by industry
  - `workType`: string (optional) - Filter by work type (Full-Time, Part-Time, Contract)
  - `experienceLevel`: string (optional) - Filter by experience level
  - `datePosted`: string (optional) - Filter by date posted
  - `remoteOnly`: boolean (optional) - Filter remote jobs only

- **Response:**
```json
{
  "success": true,
  "data": {
    "jobs": [
      {
        "id": "string",
        "title": "string",
        "company": "string",
        "type": "string (Full-Time, Part-Time, Contract)",
        "location": "string",
        "date": "string (relative time)",
        "salary": "string (e.g., '$50.00 – $70.00')",
        "description": "string",
        "requirements": ["string array"],
        "benefits": ["string array"],
        "postedDate": "ISO date string",
        "applicationDeadline": "ISO date string"
      }
    ],
    "total": 10000,
    "currentPage": 1,
    "totalPages": 834
  }
}
```

### 10. Get Job Details
- **Endpoint:** `GET /api/jobs/:id`
- **Frontend File:** `src/app/(dashboard)/explore-jobs/details/[id]/page.tsx`
- **Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "company": "string",
    "type": "string",
    "location": "string",
    "salary": "string",
    "description": "string (HTML/markdown)",
    "requirements": ["string array"],
    "benefits": ["string array"],
    "postedDate": "ISO date string",
    "applicationDeadline": "ISO date string",
    "companyLogo": "string (URL)",
    "companyWebsite": "string (URL)",
    "contactEmail": "string (email)"
  }
}
```

### 11. Apply for Job
- **Endpoint:** `POST /api/jobs/:id/apply`
- **Frontend File:** `src/app/(dashboard)/explore-jobs/details/[id]/page.tsx`
- **Request Headers:** Authorization: Bearer {token}
- **Request Body:**
```json
{
  "coverLetter": "string (optional)",
  "resume": "string (file URL or base64)",
  "portfolio": "string (optional, URL)",
  "additionalDocuments": ["string array (optional)"]
}
```
- **Response:**
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "applicationId": "string"
}
```

### 12. Get User's Applied Jobs
- **Endpoint:** `GET /api/users/applied-jobs`
- **Frontend File:** `src/app/(dashboard)/applied-jobs/page.tsx`
- **Request Headers:** Authorization: Bearer {token}
- **Query Parameters:**
  - `page`: number (default: 1)
  - `limit`: number (default: 12)
  - `dateFilter`: string (optional) - Filter by application date

- **Response:**
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
        "salary": "string",
        "appliedDate": "ISO date string",
        "applicationStatus": "string (Pending, Reviewed, Rejected, Accepted)"
      }
    ],
    "total": 47,
    "currentPage": 1,
    "totalPages": 4
  }
}
```

### 13. Get User's Saved Jobs
- **Endpoint:** `GET /api/users/saved-jobs`
- **Frontend File:** `src/app/(dashboard)/saved-jobs/page.tsx`
- **Request Headers:** Authorization: Bearer {token}
- **Response:**
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
        "salary": "string",
        "savedDate": "ISO date string"
      }
    ],
    "total": number
  }
}
```

### 14. Save/Unsave Job
- **Endpoint:** `POST /api/jobs/:id/save`
- **Frontend File:** `src/components/ui/jobCards.tsx`
- **Request Headers:** Authorization: Bearer {token}
- **Response:**
```json
{
  "success": true,
  "message": "Job saved successfully",
  "saved": true
}
```

- **Endpoint:** `DELETE /api/jobs/:id/save`
- **Response:**
```json
{
  "success": true,
  "message": "Job unsaved successfully",
  "saved": false
}
```

### 15. Delete Job Application
- **Endpoint:** `DELETE /api/users/applied-jobs/:id`
- **Frontend File:** `src/components/ui/jobCards.tsx`
- **Request Headers:** Authorization: Bearer {token}
- **Response:**
```json
{
  "success": true,
  "message": "Application withdrawn successfully"
}
```

## 🏢 Company/Industry Data

### 16. Get Industries List
- **Endpoint:** `GET /api/data/industries`
- **Frontend File:** `src/components/ui/jobFilter.tsx`
- **Response:**
```json
{
  "success": true,
  "data": {
    "industries": ["Tech", "Health", "Finance", "Education", "Manufacturing"]
  }
}
```

### 17. Get Job Locations
- **Endpoint:** `GET /api/data/locations`
- **Frontend File:** `src/components/ui/jobFilter.tsx`
- **Response:**
```json
{
  "success": true,
  "data": {
    "locations": ["USA", "Canada", "Remote", "UK", "Australia"]
  }
}
```

### 18. Get Work Types
- **Endpoint:** `GET /api/data/work-types`
- **Frontend File:** `src/components/ui/jobFilter.tsx`
- **Response:**
```json
{
  "success": true,
  "data": {
    "workTypes": ["Full-Time", "Part-Time", "Contract", "Internship"]
  }
}
```

## 📊 Dashboard Data

### 19. Get User Dashboard Stats
- **Endpoint:** `GET /api/users/dashboard`
- **Frontend File:** `src/app/(dashboard)/dashboard/page.tsx`
- **Request Headers:** Authorization: Bearer {token}
- **Response:**
```json
{
  "success": true,
  "data": {
    "totalAppliedJobs": 47,
    "totalSavedJobs": 23,
    "activeApplications": 12,
    "interviewsScheduled": 3,
    "recentActivity": [
      {
        "type": "application",
        "message": "Applied to Dental Surgeon position",
        "date": "ISO date string"
      }
    ]
  }
}
```

## 👤 User Profile Endpoints

The sidebar includes a Profile link (`/profile`). To support this, implement:

### 20. Get Current User Profile
- **Endpoint:** `GET /api/users/me`
- **Request Headers:** Authorization: Bearer {token}
- **Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "email": "string",
    "firstName": "string",
    "lastName": "string",
    "phone": "string",
    "location": "string",
    "bio": "string",
    "avatarUrl": "string"
  }
}
```

### 21. Update User Profile
- **Endpoint:** `PUT /api/users/me`
- **Request Headers:** Authorization: Bearer {token}
- **Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "phone": "string",
  "location": "string",
  "bio": "string"
}
```
- **Response:**
```json
{
  "success": true,
  "message": "Profile updated",
  "data": { /* updated profile */ }
}
```

### 22. Upload Avatar
- **Endpoint:** `POST /api/users/me/avatar`
- **Request Headers:** Authorization: Bearer {token}
- **Request:** `multipart/form-data` with field `file`
- **Response:**
```json
{
  "success": true,
  "avatarUrl": "string"
}
```

## 🔔 Job Alerts Endpoints

The sidebar includes a Job Alerts link (`/job-alert`). To support saved searches/alerts:

### 23. Create Job Alert
- **Endpoint:** `POST /api/job-alerts`
- **Request Headers:** Authorization: Bearer {token}
- **Request Body:**
```json
{
  "query": "string",
  "location": "string",
  "industry": "string",
  "workType": "string",
  "frequency": "string (daily|weekly)",
  "email": "string"
}
```
- **Response:**
```json
{
  "success": true,
  "id": "string"
}
```

### 24. List Job Alerts
- **Endpoint:** `GET /api/job-alerts`
- **Request Headers:** Authorization: Bearer {token}
- **Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "query": "string",
      "location": "string",
      "industry": "string",
      "workType": "string",
      "frequency": "string",
      "createdAt": "ISO date"
    }
  ]
}
```

### 25. Update Job Alert
- **Endpoint:** `PUT /api/job-alerts/:id`
- **Request Headers:** Authorization: Bearer {token}
- **Request Body:** partial fields from Create
- **Response:** `{ "success": true }`

### 26. Delete Job Alert
- **Endpoint:** `DELETE /api/job-alerts/:id`
- **Request Headers:** Authorization: Bearer {token}
- **Response:** `{ "success": true }`

## 🛎️ Notifications Endpoints

Dashboard shows notifications. Implement:

### 27. List Notifications
- **Endpoint:** `GET /api/notifications`
- **Request Headers:** Authorization: Bearer {token}
- **Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "title": "string",
      "message": "string",
      "createdAt": "ISO date",
      "read": false
    }
  ]
}
```

### 28. Mark Notification Read
- **Endpoint:** `POST /api/notifications/:id/read`
- **Request Headers:** Authorization: Bearer {token}
- **Response:** `{ "success": true }`

### 29. Mark All Notifications Read
- **Endpoint:** `POST /api/notifications/read-all`
- **Request Headers:** Authorization: Bearer {token}
- **Response:** `{ "success": true }`

## 📬 Contact Endpoint

The Contact page (`src/app/contact/page.jsx`) contains a form.

### 30. Submit Contact Form
- **Endpoint:** `POST /api/contact`
- **Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "message": "string",
  "agreePrivacy": true
}
```
- **Response:** `{ "success": true, "message": "Message received" }`

## 📁 File Uploads Endpoint (optional)

If you prefer separate uploads before applying:

### 31. Upload File
- **Endpoint:** `POST /api/files`
- **Request:** `multipart/form-data` with field `file`
- **Response:**
```json
{
  "success": true,
  "url": "string"
}
```

## 🔧 Technical Requirements

### Authentication
- All protected endpoints require JWT token in Authorization header
- Token format: `Authorization: Bearer {token}`
- Token should be validated on every protected request

### Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "string (e.g., 'VALIDATION_ERROR', 'AUTHENTICATION_FAILED')",
    "message": "string",
    "details": "object (optional, additional error details)"
  }
}
```

### Pagination
- All list endpoints support pagination
- Default limit: 12 items per page
- Response should include: `total`, `currentPage`, `totalPages`

### Date Format
- All dates should be in ISO 8601 format
- Display dates can be relative (e.g., "2 days ago")

### File Uploads
- Resume and document uploads should support common formats (PDF, DOC, DOCX)
- Maximum file size: 10MB
- Files should be stored securely with unique identifiers

## 🚀 Implementation Priority

**Phase 1 (Critical):**
1. User Registration (Endpoint #1)
2. User Login (Endpoint #2)
3. Get All Jobs (Endpoint #9)
4. Get Job Details (Endpoint #10)

**Phase 2 (Important):**
5. Apply for Job (Endpoint #11)
6. Get User's Applied Jobs (Endpoint #12)
7. Save/Unsave Job (Endpoints #14)
8. User Profile (Endpoints #20–22)

**Phase 3 (Nice to have):**
9. Google OAuth (Endpoint #3)
10. Password Reset + Verify Email (Endpoints #4, #5, #6)
11. Token Refresh + Logout (Endpoints #7, #8)
12. Dashboard Stats (Endpoint #19)
13. Job Alerts (Endpoints #23–26)
14. Notifications (Endpoints #27–29)
15. Contact Form (Endpoint #30)
16. File Uploads (Endpoint #31)

## 📋 Frontend Components Reference

- **Authentication Pages:** `src/app/(auth)/`
- **Dashboard Pages:** `src/app/(dashboard)/`
- **Job Components:** `src/components/ui/jobCards.tsx`, `src/components/ui/jobFilter.tsx`
- **Form Components:** `src/components/form/`
- **Shared Components:** `src/components/ui/`

---

**Note:** This API documentation is based on the current frontend implementation. Some endpoints may need adjustments based on actual backend implementation and business logic requirements.