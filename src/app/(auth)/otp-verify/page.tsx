"use client";
import { useRef, useState, useEffect } from "react";
import { useAuth } from "@/context/authContext";
import Btn from "@/components/button/btn";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function OTPVerification() {
  const { verifyOTP, sendOTP } = useAuth();
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const [timer, setTimer] = useState<number>(1800); // Default 30 minutes in seconds
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // Retrieve email and otpId from localStorage
  const email =
    typeof window !== "undefined" ? localStorage.getItem("signupEmail") : "";
  const otpId =
    typeof window !== "undefined" ? localStorage.getItem("otpId") : "";

  // Initialize timer from stored expiration info
  useEffect(() => {
    if (typeof window !== "undefined") {
      const expiresInStr = localStorage.getItem("otpExpiresIn");
      const startTimeStr = localStorage.getItem("otpStartTime");
      
      if (expiresInStr && startTimeStr) {
        const expiresIn = parseInt(expiresInStr, 10);
        const startTime = parseInt(startTimeStr, 10);
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const remaining = Math.max(0, expiresIn - elapsed);
        setTimer(remaining);
      }
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Handle OTP input change
  const handleChange = (el: HTMLInputElement, idx: number) => {
    if (isNaN(Number(el.value))) return;
    const newOtp = [...otp];
    newOtp[idx] = el.value;
    setOtp(newOtp);
    if (el.value && idx < 5) inputsRef.current[idx + 1]?.focus();
  };

  // Handle backspace navigation
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0)
      inputsRef.current[idx - 1]?.focus();
  };

  // Handle OTP confirmation
  const handleConfirm = async () => {
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }

    if (!otpId) {
      toast.error("OTP session expired or not found. Please request a new OTP and try again.");
      setTimeout(() => {
        router.push("/sign-up");
      }, 2000);
      return;
    }

    setIsLoading(true);
    try {
      console.log("Verifying OTP with otpId:", otpId); // Debug log
      await verifyOTP({
        otpId: otpId,
        code: otpCode,
      });
      // reset
      setOtp(new Array(6).fill(""));
      // The verifyOTP function handles the redirect
    } catch (error: any) {
      console.error("OTP verification error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle resend OTP
  const handleResend = async () => {
    if (!email) {
      toast.error("Email not found. Please sign up again.");
      router.push("/sign-up");
      return;
    }

    setIsResending(true);
    try {
      const response = await sendOTP({
        channel: "email",
        destination: email,
        purpose: "register"
      });

      // Reset OTP inputs and timer
      setOtp(new Array(6).fill(""));
      setTimer(response.expires_in || 1800); // Use response expires_in or default to 30 minutes
      inputsRef.current[0]?.focus();
      
      toast.success("OTP has been resent to your email!");
    } catch (error: any) {
      toast.error(error.message || "Failed to resend OTP");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="w-[500px] h-[400px] mx-auto mt-[5rem] bg-[#f9f9f9] rounded-[24px] shadow-md px-10 py-14 text-center">
      <h1 className="text-[32px] font-[700] mb-10">Verification</h1>

      <div className="flex gap-[16px] justify-center mb-4">
        {otp.map((v, i) => (
          <input
            key={i}
            ref={(el) => {
              if (el) inputsRef.current[i] = el;
            }}
            type="text"
            maxLength={1}
            value={v}
            onChange={(e) => handleChange(e.target, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className="w-[39px] h-[39px] border-[1px] border-[var(--black-white-300)] rounded-[8px] text-center outline-none"
          />
        ))}
      </div>

      <div className="mb-6">
        {timer > 0 
          ? `${Math.floor(timer / 60)}:${(timer % 60) < 10 ? `0${timer % 60}` : timer % 60}`
          : "0:00"}
      </div>

      <Btn
        disabled={isLoading}
        className="w-[314px] h-[40px] bg-[var(--primary-1200)] text-white rounded-[20px]"
        text={isLoading ? "Confirming..." : "Confirm"}
        onClick={handleConfirm}
      />

      <p className="mt-4">
        Didn't get pin?{" "}
        <button 
          onClick={handleResend} 
          disabled={isResending || timer > 1770} // Can't resend within first 30 seconds
          className={`font-medium transition ${
            isResending || timer > 1770
              ? "text-gray-400 cursor-not-allowed"
              : "text-[var(--primary-1200)] hover:underline"
          }`}
        >
          {isResending ? "Resending..." : "Resend"}
        </button>
      </p>
    </div>
  );
}
