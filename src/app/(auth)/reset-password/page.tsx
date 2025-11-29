"use client";
import { useState, FormEvent } from "react";
import Link from "next/link";
import InputPassword from "@/components/form/inputPassword";
import Label from "@/components/form/label";
import Btn from "@/components/button/btn";
import Cover from "@/components/ui/cover";
import Logo from "@/components/icon/logo";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // VALIDATION FUNCTION
  const validatePassword = (value: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&._-])[A-Za-z\d@$!%*#?&._-]{8,}$/;

    if (!regex.test(value)) {
      return "Password must be at least 8 characters, include uppercase, lowercase, number, and symbol.";
    }
    return "";
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPassword(newValue);
    setPasswordError(validatePassword(newValue));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (passwordError || !password) return;

    console.log("Password reset:", password)
  };

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

          <form onSubmit={handleSubmit}>
            <div className="mt-[10px]">
              <Label text="Password" />
              <InputPassword
                placeholder="Enter your Password"
                value={password}
                onChange={handlePasswordChange}
                showVisibility={showPassword}
                togglePasswordVisibility={() => setShowPassword(!showPassword)}
                error={passwordError} 
              />
            </div>

            <div className="mt-[20px]">
              <Btn
                type="submit"
                disabled={passwordError !== "" || !password}
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
