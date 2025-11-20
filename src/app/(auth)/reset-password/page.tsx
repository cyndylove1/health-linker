"use client";
import { useState } from "react";
import InputPassword from "@/components/form/inputPassword";
import Label from "@/components/form/label";
import Btn from "@/components/button/btn";
import Cover from "@/components/ui/cover";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <div className="grid grid-cols-2">
        <div className="">
          <Cover />
        </div>
        <div className="px-14 dm-font leading-[100%] absolute right-0 top-0 w-1/2 h-full overflow-y-auto">
          <h2 className="font-[700] pt-10 text-[32px] text-[var(--black-white-1200)]">
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
