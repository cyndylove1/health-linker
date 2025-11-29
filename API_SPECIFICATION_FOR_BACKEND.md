# HealthLinker API Specification for Backend Implementation

**Version**: 1.0  
**Last Updated**: 2025-11-29  
**Frontend Integration**: Complete ✅

---

## Table of Contents
1. [Authentication Endpoints](#authentication-endpoints)
2. [Job Endpoints](#job-endpoints)
3. [User Endpoints](#user-endpoints)
4. [Notification Endpoints](#notification-endpoints)
5. [Contact Endpoint](#contact-endpoint)
6. [Common Response Formats](#common-response-formats)
7. [Error Handling](#error-handling)

---

## Base URL
```
Production: https://api.healthlinker.com
Development: http://localhost:8000
```

## Authentication
All authenticated endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer {token}
```

---

## Authentication Endpoints

### 1. Register User
**Endpoint**: `POST /api/auth/register`  
**Authentication**: None  
**Description**: Register a new user account

**Request Body**:
```json
{
  "firstName": "string (required)",
  "lastName": "string (required)",
  "email": "string (required, valid email)",
  "password": "string (required, min 8 chars, must include uppercase, lowercase, number, symbol)"
}
```

**Success Response** (201):
```json
{
  "success": true,
  "message": "Registration successful. Please verify your email.",
  "data": {
    "email": "user@example.com"
  }
}
```

**Notes**:
- Frontend stores email in localStorage as "signupEmail"
- Frontend redirects to `/otp-verify` after success
- Send OTP to user's email automatically

---

### 2. Verify OTP
**Endpoint**: `POST /api/auth/verify-otp`  
**Authentication**: None  
**Description**: Verify OTP code sent to user's email/phone

**Request Body**:
```json
{
  "channel": "email | sms",
  "destination": "user@example.com",
  "purpose": "register | login_mfa | password_reset",
  "otp": "123456"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "OTP verified successfully",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "string",
      "email": "string",
      "firstName": "string",
      "lastName": "string"
    }
  }
}
```

**Notes**:
- Frontend stores token in localStorage
- Frontend redirects to `/login` after verification
- Token is optional (only for auto-login scenarios)

---

### 3. Login
**Endpoint**: `POST /api/auth/login`  
**Authentication**: None  
**Description**: Authenticate user and return JWT token

**Request Body**:
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "string",
      "email": "string",
      "firstName": "string",
      "lastName": "string",
      "profilePicture": "string (optional)"
    }
  }
}
```

**Notes**:
- Frontend stores token and user in localStorage
- Frontend redirects to `/dashboard` after success

---

### 4. Forgot Password
**Endpoint**: `POST /api/auth/forgot-password`  
**Authentication**: None  
**Description**: Request password reset link

**Request Body**:
```json
{
  "email": "string (required)"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Password reset link sent to your email"
}
```

**Notes**:
- Send email with reset link containing token
- Frontend redirects to `/reset-password` after success

---

### 5. Reset Password
**Endpoint**: `POST /api/auth/reset-password`  
**Authentication**: None  
**Description**: Reset user password using token from email

**Request Body**:
```json
{
  "token": "string (required, from email link)",
  "newPassword": "string (required, min 8 chars)"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Password reset successful"
}
```

**Notes**:
- Frontend gets token from URL query parameter
- Frontend redirects to `/login` after success

---

### 6. Send OTP
**Endpoint**: `POST /api/auth/send-otp`  
**Authentication**: None  
**Description**: Send OTP to user's email/phone

**Request Body**:
```json
{
  "channel": "email | sms",
  "destination": "user@example.com",
  "purpose": "register | login_mfa | password_reset"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "OTP sent successfully",
  "data": {
    "otpId": "string (for verification)"
  }
}
```

---

### 7. Google OAuth
**Endpoint**: `POST /api/auth/google`  
**Authentication**: None  
**Description**: Authenticate using Google OAuth

**Request Body**:
```json
{
  "googleToken": "string (Google OAuth token)"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "string",
      "email": "string",
      "firstName": "string",
      "lastName": "string",
      "profilePicture": "string"
    }
  }
}
```

---

### 8. Facebook OAuth
**Endpoint**: `POST /api/auth/facebook`  
**Authentication**: None  
**Description**: Authenticate using Facebook OAuth

**Request Body**:
```json
{
  "accessToken": "string (Facebook access token)"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "string",
      "email": "string",
      "firstName": "string",
      "lastName": "string",
      "profilePicture": "string"
    }
  }
}
```

---

## Job Endpoints

### 1. Get All Jobs
**Endpoint**: `GET /api/jobs`  
**Authentication**: Optional (for personalized results)  
**Description**: Get paginated list of jobs with filters

**Query Parameters**:
```
page: number (default: 1)
limit: number (default: 12)
location: string (optional)
industry: string (optional)
workType: string (optional, e.g., "Full-Time", "Part-Time")
experienceLevel: string (optional)
datePosted: string (optional)
remoteOnly: boolean (optional)
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
        "type": "string (Full-Time, Part-Time, Contract)",
        "location": "string",
        "date": "string (e.g., '2 days ago')",
        "salary": "string (e.g., '$50.00 - $70.00')",
        "description": "string (optional)",
        "requirements": ["string"] (optional),
        "benefits": ["string"] (optional),
        "companyLogo": "string (optional)"
      }
    ],
    "total": 1000,
    "currentPage": 1,
    "totalPages": 84
  }
}
```

**Notes**:
- Frontend uses this for `/jobs` and `/explore-jobs` pages
- Frontend displays 12 jobs per page
- Frontend uses first 8 jobs for "Latest Jobs" on home page

---

### 2. Get Job Details
**Endpoint**: `GET /api/jobs/:id`  
**Authentication**: Optional  
**Description**: Get detailed information about a specific job

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "company": "string",
    "type": "string",
    "location": "string",
    "date": "string",
    "salary": "string",
    "description": "string",
    "requirements": ["string"],
    "benefits": ["string"],
    "companyLogo": "string",
    "applicationDeadline": "string (optional)"
  }
}
```

**Notes**:
- Used in `/explore-jobs/details/[id]` and `/saved-jobs/details/[id]`

---

### 3. Apply for Job
**Endpoint**: `POST /api/jobs/:id/apply`  
**Authentication**: Required  
**Description**: Submit job application

**Request Body**:
```json
{
  "coverLetter": "string (optional)",
  "resume": "string (optional, file URL or base64)"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "data": {
    "applicationId": "string",
    "jobId": "string",
    "status": "pending"
  }
}
```

**Notes**:
- Frontend shows toast notification on success
- Frontend may send empty object `{}` if no additional data

---

### 4. Save Job
**Endpoint**: `POST /api/jobs/:id/save`  
**Authentication**: Required  
**Description**: Save job to user's saved jobs list

**Request Body**: None (empty)

**Success Response** (200):
```json
{
  "success": true,
  "message": "Job saved successfully"
}
```

**Notes**:
- Frontend invalidates "savedJobs" query cache after success
- Frontend shows toast notification

---

### 5. Unsave Job
**Endpoint**: `DELETE /api/jobs/:id/save`  
**Authentication**: Required  
**Description**: Remove job from user's saved jobs list

**Request Body**: None

**Success Response** (200):
```json
{
  "success": true,
  "message": "Job removed from saved list"
}
```

**Notes**:
- Frontend invalidates "savedJobs" query cache after success

---

## User Endpoints

### 1. Get Dashboard Statistics
**Endpoint**: `GET /api/users/dashboard`  
**Authentication**: Required  
**Description**: Get user's dashboard statistics

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "totalJobsApplied": 15,
    "totalSavedJobs": 8,
    "activeApplications": 12
  }
}
```

**Notes**:
- Used in `/dashboard` page
- Frontend displays these stats in dashboard cards

---

### 2. Get Applied Jobs
**Endpoint**: `GET /api/users/applied-jobs`  
**Authentication**: Required  
**Description**: Get list of jobs user has applied to

**Success Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "title": "string",
      "company": "string",
      "type": "string",
      "location": "string",
      "date": "string",
      "salary": "string",
      "appliedDate": "string (e.g., 'Applied on October 20th')",
      "status": "pending | reviewed | accepted | rejected"
    }
  ]
}
```

**Notes**:
- Used in `/applied-jobs` page
- Frontend implements client-side pagination (12 per page)

---

### 3. Get Saved Jobs
**Endpoint**: `GET /api/users/saved-jobs`  
**Authentication**: Required  
**Description**: Get list of jobs user has saved

**Success Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "title": "string",
      "company": "string",
      "type": "string",
      "location": "string",
      "date": "string",
      "salary": "string"
    }
  ]
}
```

**Notes**:
- Used in `/saved-jobs` page and dashboard
- Frontend implements client-side pagination (12 per page)

---

### 4. Get User Profile
**Endpoint**: `GET /api/users/profile`  
**Authentication**: Required  
**Description**: Get current user's profile information

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "id": "string",
    "email": "string",
    "firstName": "string",
    "lastName": "string",
    "phone": "string (optional)",
    "profilePicture": "string (optional)",
    "bio": "string (optional)",
    "skills": ["string"] (optional),
    "experience": ["object"] (optional)
  }
}
```

---

### 5. Update User Profile
**Endpoint**: `PUT /api/users/profile`  
**Authentication**: Required  
**Description**: Update user profile information

**Request Body**:
```json
{
  "firstName": "string (optional)",
  "lastName": "string (optional)",
  "phone": "string (optional)",
  "bio": "string (optional)",
  "skills": ["string"] (optional)
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": { /* updated user object */ }
  }
}
```

---

### 6. Upload Avatar
**Endpoint**: `POST /api/users/avatar`  
**Authentication**: Required  
**Description**: Upload user profile picture

**Request Body** (multipart/form-data):
```
avatar: File (image file)
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Avatar uploaded successfully",
  "data": {
    "avatarUrl": "string (URL to uploaded image)"
  }
}
```

---

## Notification Endpoints

### 1. Get Notifications
**Endpoint**: `GET /api/notifications`  
**Authentication**: Required  
**Description**: Get user's notifications

**Success Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "title": "string",
      "message": "string (optional)",
      "type": "info | success | warning | error",
      "read": false,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

**Notes**:
- Frontend displays in dashboard
- Frontend calculates unread count client-side
- Frontend formats dates as relative time (e.g., "2 hours ago")

---

### 2. Mark Notification as Read
**Endpoint**: `PUT /api/notifications/:id/read`  
**Authentication**: Required  
**Description**: Mark a notification as read

**Request Body**: None

**Success Response** (200):
```json
{
  "success": true,
  "message": "Notification marked as read"
}
```

**Notes**:
- Frontend invalidates notifications query cache

---

## Contact Endpoint

### Submit Contact Form
**Endpoint**: `POST /api/contact`  
**Authentication**: None  
**Description**: Submit contact form message

**Request Body**:
```json
{
  "name": "string (required)",
  "email": "string (required, valid email)",
  "message": "string (required)",
  "agreePrivacy": true (required, must be true)
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Message sent successfully. We'll get back to you soon!"
}
```

**Notes**:
- Frontend combines firstName + lastName into name field
- Frontend shows toast notification on success
- Frontend clears form after successful submission

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
  } (optional, for validation errors)
}
```

---

## Error Handling

### HTTP Status Codes
- `200` - Success
- `201` - Created (for registration, etc.)
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (valid token but insufficient permissions)
- `404` - Not Found
- `422` - Unprocessable Entity (validation errors)
- `500` - Internal Server Error

### Frontend Error Handling
- Frontend displays error messages via toast notifications
- Frontend uses `error.response?.data?.message` for error text
- Frontend has fallback messages for each endpoint

---

## CORS Configuration

**Required Headers**:
```
Access-Control-Allow-Origin: https://healthlinker.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
```

---

## Rate Limiting Recommendations

- **Authentication endpoints**: 5 requests per minute per IP
- **Job search**: 30 requests per minute per user
- **Apply for job**: 10 requests per hour per user
- **General endpoints**: 100 requests per minute per user

---

## Testing Checklist

### Authentication Flow
- [ ] Register → OTP → Login flow works
- [ ] Forgot password → Reset password works
- [ ] Social login (Google/Facebook) works
- [ ] Token expiration handled correctly

### Job Features
- [ ] Job listing with pagination works
- [ ] Job search and filters work
- [ ] Job details page loads correctly
- [ ] Apply for job works
- [ ] Save/unsave job works

### User Dashboard
- [ ] Dashboard stats display correctly
- [ ] Saved jobs list works
- [ ] Applied jobs list works
- [ ] Notifications display and mark as read

### Contact
- [ ] Contact form submission works
- [ ] Email notification sent to admin

---

## Notes for Backend Team

1. **Token Management**:
   - Frontend stores token in localStorage
   - Frontend sends token in Authorization header as `Bearer {token}`
   - Token should expire after reasonable time (e.g., 24 hours)

2. **Data Formatting**:
   - Dates should be ISO 8601 format (frontend will format for display)
   - IDs should be strings (frontend uses string comparison)
   - Boolean values should be actual booleans, not strings

3. **Pagination**:
   - Frontend expects `currentPage`, `totalPages`, and `total` in responses
   - Default limit is 12 items per page for jobs

4. **File Uploads**:
   - Accept multipart/form-data for avatar uploads
   - Return URL to uploaded file in response

5. **Error Messages**:
   - Provide clear, user-friendly error messages
   - Frontend will display these directly to users

6. **Performance**:
   - Job listing endpoint is heavily used - optimize for speed
   - Consider caching for frequently accessed data

---

## Contact for Questions

If you have any questions about the API requirements or need clarification on any endpoint, please reach out to the frontend team.

**Last Updated**: 2025-11-29  
**Frontend Version**: 1.0  
**Status**: Production Ready ✅
