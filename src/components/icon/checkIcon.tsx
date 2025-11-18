"use client";
import { useEffect, useState } from "react";
export default function CheckIcon() {
  const [animateCheck, setAnimateCheck] = useState(false);

  useEffect(() => {
    setAnimateCheck(true);
    const timer = setTimeout(() => {}, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="flex items-center justify-center pt-14">
        <div
          className={`${
            animateCheck ? "check-circle animate-check" : "check-circle"
          }`}
        >
          <svg className="check-icon" viewBox="0 0 52 52">
            <path
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
              fill="none"
              stroke="#fff"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          
        </div>
      </div>
    </>
  );
}
