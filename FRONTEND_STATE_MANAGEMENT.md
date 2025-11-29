# Password Reset Frontend Integration Guide

This guide provides complete implementation details for integrating the password reset functionality in your frontend application.

## API Endpoints Overview

The password reset flow consists of three endpoints:

1. **POST** `/api/auth/forgot-password` - Request password reset
2. **POST** `/api/auth/verify-reset-token` - Verify reset token (optional)
3. **POST** `/api/auth/reset-password` - Reset password with token

## Complete Password Reset Flow

### Step 1: Request Password Reset

**Endpoint:** `POST /api/auth/forgot-password`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "If an account with this email exists, a password reset link has been sent"
}
```

**Error Responses:**
- **422 Validation Error:** Invalid email format

### Step 2: Verify Reset Token (Optional)

**Endpoint:** `POST /api/auth/verify-reset-token`

**Request Body:**
```json
{
  "token": "reset-token-from-email-link"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Token is valid",
  "email": "user@example.com"
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid or expired reset token"
}
```

### Step 3: Reset Password

**Endpoint:** `POST /api/auth/reset-password`

**Request Body:**
```json
{
  "token": "reset-token-from-email-link",
  "email": "user@example.com",
  "newPassword": "NewPassword123",
  "newPassword_confirmation": "NewPassword123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Password has been reset successfully. Please log in with your new password."
}
```

**Error Responses:**
- **401 Unauthorized:** Invalid or expired token
- **404 Not Found:** User not found
- **422 Validation Error:** Password validation failed

## React TypeScript Implementation

### 1. Custom Hook for Password Reset

```typescript
// hooks/usePasswordReset.ts
import { useState } from 'react';
import { apiClient } from '../utils/api';

interface ForgotPasswordData {
  email: string;
}

interface ResetPasswordData {
  token: string;
  email: string;
  newPassword: string;
  newPassword_confirmation: string;
}

interface VerifyTokenData {
  token: string;
}

export const usePasswordReset = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const forgotPassword = async (data: ForgotPasswordData) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await apiClient.post('/auth/forgot-password', data);
      setSuccessMessage(response.data.message);
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to send reset email';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyResetToken = async (data: VerifyTokenData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.post('/auth/verify-reset-token', data);
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Invalid or expired token';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (data: ResetPasswordData) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await apiClient.post('/auth/reset-password', data);
      setSuccessMessage(response.data.message);
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to reset password';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    forgotPassword,
    verifyResetToken,
    resetPassword,
    isLoading,
    error,
    successMessage,
    clearError: () => setError(null),
    clearSuccessMessage: () => setSuccessMessage(null)
  };
};
```

### 2. Forgot Password Component

```typescript
// components/ForgotPassword.tsx
import React, { useState } from 'react';
import { usePasswordReset } from '../hooks/usePasswordReset';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const { forgotPassword, isLoading, error, successMessage } = usePasswordReset();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await forgotPassword({ email });
    } catch (error) {
      // Error is handled by the hook
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h2>Reset Your Password</h2>
        <p>Enter your email address and we'll send you a link to reset your password.</p>
        
        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}
        
        {successMessage && (
          <div className="alert alert-success">
            {successMessage}
          </div>
        )}
        
        {!successMessage && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </div>
            
            <button 
              type="submit" 
              disabled={isLoading || !email.trim()}
              className="btn btn-primary"
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        )}
        
        <div className="links">
          <a href="/login">Back to Login</a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
```

### 3. Reset Password Component

```typescript
// components/ResetPassword.tsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { usePasswordReset } from '../hooks/usePasswordReset';

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const emailFromUrl = searchParams.get('email');
  
  const [formData, setFormData] = useState({
    email: emailFromUrl || '',
    newPassword: '',
    newPassword_confirmation: ''
  });
  
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const { verifyResetToken, resetPassword, isLoading, error, successMessage } = usePasswordReset();

  useEffect(() => {
    if (!token) {
      navigate('/forgot-password');
      return;
    }

    // Verify token when component mounts
    const verifyToken = async () => {
      try {
        const response = await verifyResetToken({ token });
        setTokenValid(true);
        setFormData(prev => ({ ...prev, email: response.email }));
      } catch (error) {
        setTokenValid(false);
      }
    };

    verifyToken();
  }, [token, verifyResetToken, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.newPassword_confirmation) {
      return;
    }

    try {
      await resetPassword({
        token: token!,
        email: formData.email,
        newPassword: formData.newPassword,
        newPassword_confirmation: formData.newPassword_confirmation
      });
      
      // Redirect to login after successful reset
      setTimeout(() => {
        navigate('/login', { 
          state: { message: 'Password reset successful. Please log in with your new password.' }
        });
      }, 2000);
    } catch (error) {
      // Error is handled by the hook
    }
  };

  // Show loading while verifying token
  if (tokenValid === null) {
    return (
      <div className="reset-password-container">
        <div className="loading">
          <p>Verifying reset link...</p>
        </div>
      </div>
    );
  }

  // Show error if token is invalid
  if (tokenValid === false) {
    return (
      <div className="reset-password-container">
        <div className="reset-password-card">
          <h2>Invalid Reset Link</h2>
          <p>This password reset link is invalid or has expired.</p>
          <div className="links">
            <a href="/forgot-password">Request New Reset Link</a>
          </div>
        </div>
      </div>
    );
  }

  // Show success message
  if (successMessage) {
    return (
      <div className="reset-password-container">
        <div className="reset-password-card">
          <h2>Password Reset Successful</h2>
          <div className="alert alert-success">
            {successMessage}
          </div>
          <p>Redirecting to login page...</p>
        </div>
      </div>
    );
  }

  const passwordsMatch = formData.newPassword === formData.newPassword_confirmation;
  const isFormValid = formData.newPassword.length >= 8 && passwordsMatch;

  return (
    <div className="reset-password-container">
      <div className="reset-password-card">
        <h2>Set New Password</h2>
        <p>Enter your new password below.</p>
        
        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              disabled
              className="form-control"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              placeholder="Enter new password"
              minLength={8}
              required
              disabled={isLoading}
              className="form-control"
            />
            <small className="form-text">Minimum 8 characters</small>
          </div>
          
          <div className="form-group">
            <label htmlFor="newPassword_confirmation">Confirm New Password</label>
            <input
              type="password"
              id="newPassword_confirmation"
              name="newPassword_confirmation"
              value={formData.newPassword_confirmation}
              onChange={handleInputChange}
              placeholder="Confirm new password"
              minLength={8}
              required
              disabled={isLoading}
              className="form-control"
            />
            {formData.newPassword_confirmation && !passwordsMatch && (
              <small className="form-text text-danger">Passwords do not match</small>
            )}
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading || !isFormValid}
            className="btn btn-primary"
          >
            {isLoading ? 'Resetting Password...' : 'Reset Password'}
          </button>
        </form>
        
        <div className="links">
          <a href="/login">Back to Login</a>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
```

### 4. Routing Setup

```typescript
// App.tsx or routes configuration
import { Routes, Route } from 'react-router-dom';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

function App() {
  return (
    <Routes>
      {/* Other routes */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}
```

## CSS Styling

```css
/* styles/password-reset.css */
.forgot-password-container,
.reset-password-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8fafc;
  padding: 20px;
}

.forgot-password-card,
.reset-password-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.forgot-password-card h2,
.reset-password-card h2 {
  margin-bottom: 0.5rem;
  color: #1f2937;
  text-align: center;
}

.forgot-password-card p,
.reset-password-card p {
  margin-bottom: 1.5rem;
  color: #6b7280;
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #374151;
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
}

.form-control:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.form-control:disabled {
  background-color: #f9fafb;
  color: #6b7280;
}

.form-text {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.form-text.text-danger {
  color: #dc2626;
}

.btn {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-primary {
  background-color: #2563eb;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #1d4ed8;
}

.btn:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

.alert {
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.alert-success {
  background-color: #dcfce7;
  color: #166534;
  border: 1px solid #bbf7d0;
}

.alert-error {
  background-color: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.links {
  margin-top: 1.5rem;
  text-align: center;
}

.links a {
  color: #2563eb;
  text-decoration: none;
  font-size: 0.875rem;
}

.links a:hover {
  text-decoration: underline;
}

.loading {
  text-align: center;
  padding: 2rem;
}
```

## Error Handling

### Common Error Scenarios

1. **Network Errors**: Handle connection issues
2. **Validation Errors**: Invalid email format or password requirements
3. **Token Errors**: Invalid or expired reset tokens
4. **Rate Limiting**: Too many requests

### Example Error Handler

```typescript
// utils/errorHandler.ts
export const handlePasswordResetError = (error: any) => {
  if (error.response?.status === 422) {
    return 'Please check your input and try again';
  }
  if (error.response?.status === 401) {
    return 'Invalid or expired reset link';
  }
  if (error.response?.status === 404) {
    return 'Account not found';
  }
  if (error.response?.status === 429) {
    return 'Too many requests. Please try again later';
  }
  return 'Something went wrong. Please try again';
};
```

## Security Considerations

1. **Token Expiration**: Reset tokens expire after 1 hour
2. **Rate Limiting**: Implement rate limiting on frontend
3. **HTTPS Only**: Always use HTTPS in production
4. **Input Validation**: Validate all inputs on frontend
5. **Password Strength**: Enforce strong password requirements

## Testing Checklist

### Unit Tests
- [ ] Test forgot password form submission
- [ ] Test reset password form validation
- [ ] Test token verification logic
- [ ] Test error handling scenarios

### Integration Tests
- [ ] Test complete password reset flow
- [ ] Test expired token handling
- [ ] Test invalid token handling
- [ ] Test network error scenarios

### Manual Testing
- [ ] Request reset email with valid email
- [ ] Request reset email with invalid email
- [ ] Click reset link from email
- [ ] Reset password with valid token
- [ ] Try reset with expired token
- [ ] Try reset with invalid token
- [ ] Test password confirmation validation

## Configuration

Add these environment variables to your frontend:

```env
# .env
REACT_APP_API_BASE_URL=http://127.0.0.1:8000/api
REACT_APP_FRONTEND_URL=http://localhost:3000
```

## API Client Configuration

```typescript
// utils/api.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add request interceptor for auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
```

This documentation provides a complete implementation guide for integrating password reset functionality in your React TypeScript frontend application with the HealthLinker API.