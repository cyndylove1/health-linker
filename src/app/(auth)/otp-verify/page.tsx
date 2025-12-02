"use client";
import { useRef, useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import Btn from "@/components/button/btn";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function OTPVerification() {
  const { verifyOTP } = useAuth();
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const [timer, setTimer] = useState<number>(20);
  const [isLoading, setIsLoading] = useState(false);

  // Retrieve email from localStorage
  const email =
    typeof window !== "undefined" ? localStorage.getItem("signupEmail") : "";

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
    if (!email) return;
    setIsLoading(true);
    try {
      const otpData = {
        channel: "email" as "email",
        destination: email,
        purpose: "register" as "register",
        otp: otp.join(""),
      };
      await verifyOTP(otpData);
      // reset
      setOtp(new Array(6).fill(""));
      router.push("/successful"); 
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle resend OTP
  const handleResend = () => {
    setOtp(new Array(6).fill(""));
    setTimer(20);
    inputsRef.current[0]?.focus();
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
        {timer > 0 ? `0:${timer < 10 ? `0${timer}` : timer}` : "0:00"}
      </div>

      <Btn
        disabled={isLoading}
        className="w-[314px] h-[40px] bg-[var(--primary-1200)] text-white rounded-[20px]"
        text={isLoading ? "Confirming..." : "Confirm"}
        onClick={handleConfirm}
      />

      <p className="mt-4">
        Didn’t get pin?{" "}
        <button onClick={handleResend} className="text-[var(--primary-1200)]">
          Resend
        </button>
      </p>
    </div>
  );
}
