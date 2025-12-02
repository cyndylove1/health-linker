import { useState } from "react";
import InputPassword from "../form/inputPassword";
import Label from "../form/label";
import Btn from "../button/btn";

export default function Security() {
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="dm-font">
      <h2 className="text-[20px] font-[500] text-[var(--black-white-1000)] leading-[100%] mb-2">
        Change Password
      </h2>
      <p className="text-[16px] font-[400] text-[var(--black-white-1000)] leading-[100%] mb-6">
        Kindly enter your current password and your new password to proceed.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <Label text="Current Password" />
          <InputPassword
            placeholder="Enter your Password"
            showVisibility={show}
            togglePasswordVisibility={() => setShow(!show)}
          />
        </div>

        <div className="flex flex-col">
          <Label text="Current Password" />
          <InputPassword
            placeholder="Enter your Password"
            showVisibility={showPassword}
            togglePasswordVisibility={() => setShowPassword(!showPassword)}
          />
        </div>
      </div>
      <div className="flex justify-end my-6">
        <Btn
          type="submit"
          text="Change Password"
          className="h-[40px] md:w-[177px] w-full rounded-[100px] text-[16px] text-white bg-[var(--primary-1200)] hover:bg-[#078e63]"
        />
      </div>
    </div>
  );
}
