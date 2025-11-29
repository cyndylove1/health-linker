"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRegistration } from "@/context/registrationContext";
import Input from "@/components/form/input";
import InputPassword from "@/components/form/inputPassword";
import Label from "@/components/form/label";
import GoogleAuth from "@/components/ui/googleAuth";
import Btn from "@/components/button/btn";
import Cover from "@/components/ui/cover";
import Line from "@/components/ui/line";
import Link from "next/link";
import Logo from "@/components/icon/logo";
import { useAuth } from "@/hooks/useAuth";

export default function SignUp() {
  const { registerUser } = useAuth();
  const { registrationData, setRegistrationData } = useRegistration();
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await registerUser(registrationData);
      // RESET
      setRegistrationData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };


  
  return (
    <div>
      <div className="grid lg:grid-cols-2 grid-cols-1">
        <div>
          <Cover />
        </div>

        <div className="flex lg:hidden px-4 mt-10 md:px-10">
          <Logo />
        </div>

        <div className="lg:px-14 px-4 md:px-10 dm-font leading-[100%] lg:absolute lg:right-0 lg:top-0 lg:w-1/2 w-full h-full overflow-y-auto">
          <h2 className="font-[700] pt-14 text-[32px] text-[var(--black-white-1200)]">
            Sign up with us
          </h2>

          <p className="font-[400] py-3 text-[16px] text-[var(--black-white-700)]">
            Already have an account?{" "}
            <Link href="/login">
              <span className="leading-[25px] poppins cursor-pointer font-[500] text-[var(--primary-1200)] hover:text-[#078e63]">
                Login
              </span>
            </Link>
          </p>

          <form onSubmit={handleSubmit}>
            <div className="flex items-center flex-col md:flex-row gap-[20px] mt-[10px]">
              <div className="w-full">
                <Label text="First Name" />
                <Input
                  type="text"
                  placeholder="Enter First Name"
                  required
                  value={registrationData.firstName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setRegistrationData({
                      ...registrationData,
                      firstName: e.target.value,
                    })
                  }
                />
              </div>

              <div className="w-full">
                <Label text="Last Name" />
                <Input
                  type="text"
                  placeholder="Enter Last Name"
                  required
                  value={registrationData.lastName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setRegistrationData({
                      ...registrationData,
                      lastName: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="mt-[10px]">
              <Label text="Email" />
              <Input
                type="text"
                placeholder="Enter your email address"
                required
                value={registrationData.email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setRegistrationData({
                    ...registrationData,
                    email: e.target.value,
                  })
                }
              />
            </div>

            <div className="mt-[10px]">
              <Label text="Password" />
              <InputPassword
                placeholder="Enter your Password"
                showVisibility={show}
                togglePasswordVisibility={() => setShow(!show)}
                value={registrationData.password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setRegistrationData({
                    ...registrationData,
                    password: e.target.value,
                  })
                }
              />
            </div>

            <div className="mt-[20px]">
              <Btn
                type="submit"
                disabled={isLoading}
                className="h-[40px] w-full rounded-[20px] text-[16px] text-white bg-[var(--primary-1200)] hover:bg-[#078e63]"
                text={isLoading ? "Signing Up..." : "Sign Up"}
              />
              <Line />
            </div>
          </form>
          <GoogleAuth
            text="Sign up with Google"
            title="Sign up with Facebook"
          />

          <p className="pt-6 pb-8 text-[16px] font-[400] text-[var(--black-white-600)]">
            By submitting, I accept Health Linker’s{" "}
            <span className="text-[var(--black-white-1200)] font-[500]">
              terms of use
            </span>{" "}
            and{" "}
            <span className="text-[var(--black-white-1200)] font-[500]">
              Privacy Policy
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
