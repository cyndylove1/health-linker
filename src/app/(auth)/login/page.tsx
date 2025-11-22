"use client";
import { useState } from "react";
import Input from "@/components/form/input";
import InputPassword from "@/components/form/inputPassword";
import Label from "@/components/form/label";
import GoogleAuth from "@/components/ui/googleAuth";
import Btn from "@/components/button/btn";
import Cover from "@/components/ui/cover";
import Line from "@/components/ui/line";
import Link from "next/link";
import Logo from "@/components/icon/logo";

export default function Login() {
  const [showVisible, setShowVisible] = useState(false);
  return (
    <div>
      <div className="grid lg:grid-cols-2 grid-cols-1">
        <div className="">
          <Cover />
        </div>
        <div className="flex lg:hidden px-4 mt-10 md:px-10">
          <Logo/>
        </div>

        <div className="lg:px-14 px-4 md:px-10 dm-font leading-[100%] lg:absolute lg:right-0 lg:top-0 lg:w-1/2 w-full h-full overflow-y-auto">
          <h2 className="font-[700] pt-14 text-[32px] text-[var(--black-white-1200)]">
            Login
          </h2>
          <p className="font-[400] py-3 text-[16px] text-[var(--black-white-700)]">
            Don’t have an account?&nbsp;
            <Link href="/sign-up">
              <span className="leading-[25px] poppins cursor-pointer font-[500] text-[var(--primary-1200)] hover:text-[#078e63]">
                Sign Up
              </span>
            </Link>
          </p>
          <form action="">
            <div className="mt-[10px]">
              <Label text="Email" />
              <Input
                type="text"
                placeholder="Enter your email address"
                required
              />
            </div>
            <div className="mt-[10px]">
              <Label text="Password" />
              <InputPassword
                placeholder="Enter your Password"
                showVisibility={showVisible}
                togglePasswordVisibility={() => setShowVisible(!showVisible)}
              />
            </div>
            <div className="mt-[20px]">
              <Btn
                className="h-[40px] w-full bg-[var(--primary-1200)] hover:bg-[#078e63] text-white rounded-[20px] text-[16px]"
                text="Login"
              />
              <Link href="/forgot-password">
                <p className="font-[400] py-2 flex justify-end text-[16px] text-[var(--primary-1200)] hover:text-[#078e63]">
                  Forgotten Password?
                </p>
              </Link>
              <Line />
            </div>
            <GoogleAuth text="Login with Google" title="Login with Facebook" />
          </form>
        </div>
      </div>
    </div>
  );
}
