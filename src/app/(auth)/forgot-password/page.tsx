import Link from "next/link";
import Input from "@/components/form/input";
import Label from "@/components/form/label";
import Btn from "@/components/button/btn";
import Cover from "@/components/ui/cover";

export default function ForgotPassword() {
  return (
    <div>
      <div className="grid grid-cols-2">
        <div className="">
          <Cover />
        </div>
        <div className="px-14 dm-font leading-[100%] absolute right-0 top-0 w-1/2 h-full overflow-y-auto">
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
          <form action="">
            <div className="mt-[10px]">
              <Label text="Email" />
              <Input
                type="text"
                placeholder="Enter your email address"
                required
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
