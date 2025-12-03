# Backend API Requirements

This document outlines the API endpoints, data structures, and logic required for the HealthLinker backend to support the frontend application.

> [!IMPORTANT]
> This document is the source of truth for backend implementation. All endpoints must strictly adhere to the request/response formats defined here.

## 🔐 Authentication Endpoints

### 1. User Registration
- **Endpoint:** `POST /api/auth/register`
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

### 4. Password Reset Request
- **Endpoint:** `POST /api/auth/forgot-password`
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

### 6. OTP Verification
- **Endpoint:** `POST /api/auth/send-otp`
- **Request Body:**
```json
{
  "channel": "string (email|sms)",
  "destination": "string",
  "purpose": "string (registration|login_mfa|password_reset)"
}
```
- **Response:**
```json
{
  "success": true,
  "message": "OTP sent",
  "otpId": "string"
}
```

- **Endpoint:** `POST /api/auth/verify-otp`
- **Request Body:**
```json
{
  "otpId": "string",
  "code": "string"
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

## 💼 Job Management Endpoints

### 7. Get All Jobs
- **Endpoint:** `GET /api/jobs`
- **Query Parameters:** `page`, `limit`, `location`, `industry`, `workType`, `experienceLevel`, `datePosted`, `remoteOnly`
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
        "description": "string",
        "requirements": ["string"],
        "benefits": ["string"],
        "postedDate": "ISO date",
        "applicationDeadline": "ISO date"
      }
    ],
    "total": 100,
    "currentPage": 1,
    "totalPages": 10
  }
}
```

### 8. Get Job Details
- **Endpoint:** `GET /api/jobs/:id`
- **Response:** Detailed job object.

### 9. Apply for Job
- **Endpoint:** `POST /api/jobs/:id/apply`
- **Headers:** `Authorization: Bearer {token}`
- **Request Body:**
```json
{
  "coverLetter": "string",
  "resume": "string (URL)",
  "portfolio": "string (URL)",
  "additionalDocuments": ["string"]
}
```

### 10. Save/Unsave Job
- **Endpoint:** `POST /api/jobs/:id/save`
- **Endpoint:** `DELETE /api/jobs/:id/save`
- **Headers:** `Authorization: Bearer {token}`

### 11. Get User's Applied Jobs
- **Endpoint:** `GET /api/users/applied-jobs`
- **Headers:** `Authorization: Bearer {token}`

### 12. Get User's Saved Jobs
- **Endpoint:** `GET /api/users/saved-jobs`
- **Headers:** `Authorization: Bearer {token}`

## 👤 User Profile & Dashboard

### 13. Get User Profile
- **Endpoint:** `GET /api/users/me`
- **Headers:** `Authorization: Bearer {token}`

### 14. Update User Profile
- **Endpoint:** `PUT /api/users/me`
- **Headers:** `Authorization: Bearer {token}`
- **Request Body:** Profile fields (firstName, lastName, etc.)

### 15. Get Dashboard Stats
- **Endpoint:** `GET /api/users/dashboard`
- **Headers:** `Authorization: Bearer {token}`
- **Response:**
```json
{
  "success": true,
  "data": {
    "totalAppliedJobs": 10,
    "totalSavedJobs": 5,
    "activeApplications": 2,
    "interviewsScheduled": 1,
    "recentActivity": []
  }
}
```

## 🔔 Notifications & Alerts

### 16. Job Alerts
- **POST** `/api/job-alerts` (Create)
- **GET** `/api/job-alerts` (List)
- **DELETE** `/api/job-alerts/:id` (Delete)

### 17. Notifications
- **GET** `/api/notifications`
- **POST** `/api/notifications/:id/read`
- **POST** `/api/notifications/read-all`

## 🔧 Technical Requirements

- **Authentication**: JWT in `Authorization: Bearer <token>` header.
- **Pagination**: Standard `page` and `limit` query params.
- **Date Format**: ISO 8601.
- **Error Handling**: Standard error object with `code` and `message`.
