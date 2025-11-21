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

export default function SignUp() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className="grid grid-cols-2">
        <div className="">
          <Cover />
        </div>
        <div className="px-14 dm-font leading-[100%] absolute right-0 top-0 w-1/2 h-full overflow-y-auto">
          <h2 className="font-[700] pt-14 text-[32px] text-[var(--black-white-1200)]">
            Sign up with us
          </h2>
          <p className="font-[400] py-3 text-[16px] text-[var(--black-white-700)]">
            Already have an account?&nbsp;
            <Link href="/login">
              <span className="leading-[25px] poppins cursor-pointer font-[500] text-[var(--primary-1200)] hover:text-[#078e63]">
                Login
              </span>
            </Link>
          </p>
          <form action="">
            <div className="flex items-center gap-[20px] mt-[10px]">
              <div className="w-full">
                <Label text="First Name" />
                <Input type="text" placeholder="Enter First Name" required />
              </div>
              <div className="w-full">
                <Label text="Last Name" />
                <Input type="text" placeholder="Enter Last Name" required />
              </div>
            </div>
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
                showVisibility={show}
                togglePasswordVisibility={() => setShow(!show)}
              />
            </div>
            <div className="mt-[20px]">
              <Btn
                className="h-[40px] w-full bg-[var(--primary-1200)] hover:bg-[#078e63] text-white rounded-[20px] text-[16px]"
                text="Sign Up"
              />
              <Line />
            </div>

            <GoogleAuth
              text="Sign up with Google"
              title="Sign up with Facebook"
            />
            <p className="pt-6 pb-8 text-[16px] font-[400 text-[var(--black-white-600)]">
              By submitting, I accept Health Linker’s&nbsp;
              <span className="text-[var(--black-white-1200)] font-[500]">
                terms of use&nbsp;
              </span>
              and&nbsp;
              <span className="text-[var(--black-white-1200)] font-[500]">
                Privacy Policy
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
