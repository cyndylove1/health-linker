"use client";
import { useState, FormEvent, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import InputPassword from "@/components/form/inputPassword";
import Input from "@/components/form/input";
import Label from "@/components/form/label";
import Btn from "@/components/button/btn";
import Cover from "@/components/ui/cover";
import Logo from "@/components/icon/logo";
import { toast } from "react-toastify";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const { resetPassword, verifyResetToken } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    // Get token from URL query params
    const tokenParam = searchParams.get("token");
    if (tokenParam) {
      setToken(tokenParam);
      verifyTokenFromUrl(tokenParam);
    } else {
      setIsVerifying(false);
      toast.error("Invalid or missing reset token. Please request a new password reset link.");
    }
  }, [searchParams]);

  const verifyTokenFromUrl = async (resetToken: string) => {
    try {
      // Call verifyResetToken to validate the token
      await verifyResetToken(resetToken);
      setTokenValid(true);
      setIsVerifying(false);
    } catch (error) {
      console.error("Token verification failed:", error);
      setIsVerifying(false);
      toast.error("Reset link is invalid or has expired. Please request a new password reset link.");
    }
  };

  // VALIDATION FUNCTIONS
  const validatePassword = (value: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&._-])[A-Za-z\d@$!%*#?&._-]{8,}$/;

    if (!regex.test(value)) {
      return "Password must be at least 8 characters, include uppercase, lowercase, number, and symbol.";
    }
    return "";
  };

  const validateConfirmPassword = (pwd: string, confirm: string) => {
    if (pwd !== confirm) {
      return "Passwords do not match";
    }
    return "";
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPassword(newValue);
    setPasswordError(validatePassword(newValue));
    
    // Update confirmation error if confirm password exists
    if (confirmPassword) {
      setConfirmPasswordError(validateConfirmPassword(newValue, confirmPassword));
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setConfirmPassword(newValue);
    setConfirmPasswordError(validateConfirmPassword(password, newValue));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate all fields
    if (passwordError || !password) {
      toast.error("Please enter a valid password");
      return;
    }

    if (confirmPasswordError || !confirmPassword) {
      toast.error("Please confirm your password");
      return;
    }

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    if (!token || !tokenValid) {
      toast.error("Invalid or missing reset token. Please request a new password reset link.");
      return;
    }

    setIsLoading(true);
    try {
      await resetPassword({ 
        token, 
        email,
        newPassword: password,
        newPassword_confirmation: confirmPassword
      });
      // Success handled by AuthContext (redirects to login)
    } catch (error) {
      console.error("Reset password failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="grid lg:grid-cols-2 grid-cols-1">
        <div className="">
          <Cover />
        </div>
        <div className="flex lg:hidden px-4 mt-10 md:px-10">
          <Link href="/">
            <Logo />
          </Link>
        </div>

        <div className="lg:px-14 px-4 md:px-10 dm-font leading-[100%] lg:absolute lg:right-0 lg:top-0 lg:w-1/2 w-full h-full overflow-y-auto">
          <h2 className="font-[700] pt-14 text-[32px] text-[var(--black-white-1200)]">
            Reset Password
          </h2>

          <p className="font-[400] py-3 text-[16px] text-[var(--black-white-700)]">
            Kindly enter your email and new password
          </p>

          {isVerifying ? (
            <div className="flex items-center justify-center py-10">
              <p className="text-[16px] text-[var(--black-white-700)]">Verifying reset link...</p>
            </div>
          ) : !tokenValid ? (
            <div className="flex items-center justify-center py-10">
              <p className="text-[16px] text-red-500">Invalid or expired reset link</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mt-[10px]">
                <Label text="Email Address" />
                <Input
                  placeholder="Enter your email address"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>

              <div className="mt-[20px]">
                <Label text="New Password" />
                <InputPassword
                  placeholder="Enter your new password"
                  value={password}
                  onChange={handlePasswordChange}
                  showVisibility={showPassword}
                  togglePasswordVisibility={() => setShowPassword(!showPassword)}
                  error={passwordError}
                />
              </div>

              <div className="mt-[20px]">
                <Label text="Confirm Password" />
                <InputPassword
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  showVisibility={showConfirmPassword}
                  togglePasswordVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
                  error={confirmPasswordError}
                />
              </div>

              <div className="mt-[20px]">
                <Btn
                  type="submit"
                  disabled={passwordError !== "" || confirmPasswordError !== "" || !password || !confirmPassword || !email || isLoading}
                  className="h-[40px] w-full bg-[var(--primary-1200)] hover:bg-[#078e63] text-white rounded-[20px] text-[16px]"
                  text={isLoading ? "Resetting..." : "Proceed"}
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResetPassword() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
