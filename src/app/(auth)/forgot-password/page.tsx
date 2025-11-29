"use client";
import { useState, FormEvent } from "react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import Input from "@/components/form/input";
import Label from "@/components/form/label";
import Btn from "@/components/button/btn";
import Cover from "@/components/ui/cover";
import Logo from "@/components/icon/logo";

export default function ForgotPassword() {
  const { forgotPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
   const [formData, setFormData] = useState({
     email: "",
   });

  const handleForgotPassword = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await forgotPassword(formData);
      setFormData({
        email: "",
      });
    } catch (error) {
      console.error("failed:", error);
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
          <Logo />
        </div>

        <div className="lg:px-14 md:px-10 px-4 dm-font lg:leading-[100%] lg:absolute lg:right-0 lg:top-0 lg:w-1/2 w-full h-full overflow-y-auto">
          <h2 className="font-[700] pt-14 text-[32px] text-[var(--black-white-1200)]">
            Forgot Password
          </h2>
          <p className="font-[400] py-3 text-[16px] text-[var(--black-white-700)]">
            Remember password?&nbsp;
            <Link href="/login">
              <span className="leading-[25px] poppins cursor-pointer font-[500] text-[var(--primary-1200)] hover:text-[#078e63]">
                Login
              </span>
            </Link>
          </p>
          <form action="" onSubmit={handleForgotPassword}>
            <div className="mt-[10px]">
              <Label text="Email" />
              <Input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                required
                placeholder="Enter your email address"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="mt-[20px]">
              <Btn
                disabled={isLoading}
                className="h-[40px] w-full bg-[var(--primary-1200)] hover:bg-[#078e63] text-white rounded-[20px] text-[16px]"
                text={isLoading ? "Proceeding..." : "Proceed"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
