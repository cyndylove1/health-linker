"use client";
import { useState } from "react";
import Link from "next/link";
import InputPassword from "@/components/form/inputPassword";
import Label from "@/components/form/label";
import Btn from "@/components/button/btn";
import Cover from "@/components/ui/cover";
import Logo from "@/components/icon/logo";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
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
            Kindly enter your new password
          </p>
          <form action="">
            <div className="mt-[10px]">
              <Label text="Password" />
              <InputPassword
                placeholder="Enter your Password"
                showVisibility={showPassword}
                togglePasswordVisibility={() => setShowPassword(!showPassword)}
              />
            </div>
            <div className="mt-[20px]">
              <Btn
                className="h-[40px] w-full bg-[var(--primary-1200)] hover:bg-[#078e63] text-white rounded-[20px] text-[16px]"
                text="Proceed"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
