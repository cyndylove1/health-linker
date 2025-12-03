"use client";
import { useRef, useState, useEffect } from "react";
import Btn from "../button/btn";

export default function OTPVerification() {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const [timer, setTimer] = useState<number>(1800); // 30 minutes in seconds

  // Timer countdown
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Handle typing
  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Move to next input
    if (element.value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // Handle Backspace
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // Resend OTP
  const handleResend = () => {
    setOtp(new Array(6).fill(""));
    setTimer(1800); // Reset to 30 minutes
    inputsRef.current[0]?.focus();
  };

  return (
    <div>
      <div className="w-[500px] h-[400px] mx-auto bg-white rounded-[24px] shadow-md px-10 py-14 text-center dm-font leading-[100%]">
        <h1 className="text-[32px] font-[700] text-[var(--black-white-1200)] mb-10">
          Verification
        </h1>

        {/* OTP Inputs */}
        <div className="flex gap-[16px] justify-center mb-4">
          {otp.map((value, index) => (
            <input
              key={index}
              ref={(el) => {
                if (el) inputsRef.current[index] = el;
              }}
              type="text"
              maxLength={1}
              value={value}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-[39px] h-[39px] border-[1px] border-[var(--black-white-300)] rounded-[8px] text-center text-[16px] outline-none focus:border-[var(--primary-1200)]"
            />
          ))}
        </div>

        <div className="text-[var(--secondary-1200)] font-[400] text-[14px] mb-6">
          {timer > 0 ? (
            <span>{Math.floor(timer / 60)}:{(timer % 60) < 10 ? `0${timer % 60}` : timer % 60}</span>
          ) : (
            <span className="">0:00</span>
          )}
        </div>

        <p className="text-[var(--black-white-600)] text-[14px] font-[400] mb-8">
          We have sent a 6-digit verification pin to your mail/phone number.
          Please provide the digits to continue!
        </p>

        <Btn
          className="h-[40px] w-[314px] bg-[var(--primary-1200)] hover:bg-[#078e63] text-white rounded-[20px] text-[16px]"
          text="Confirm"
        />

        <p className="mt-4 text-[16px] font-[400] text-[var(--black-white-1700)]">
          Didn’t get pin?{" "}
          <button
            onClick={handleResend}
            className="text-[var(--primary-1200)] hover:text-[#078e63]"
          >
            Resend
          </button>
        </p>
      </div>
    </div>
  );
}
