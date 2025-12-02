import { VscClose } from "react-icons/vsc";
import CheckIcon from "../../../components/icon/checkIcon";
import Btn from "../../../components/button/btn";
import Link from "next/link";



export default function SuccessfulModal() {
  return (
    <div className="bg-white flex h-full items-center justify-center">
      <div className="bg-[#f9f9f9] my-[5rem] w-[448px] rounded-[24px] p-6 relative dm-font leading-[100%] shadow-md">
        {/* Close button */}
        {/* <button
          onClick={onClose}
          className="absolute right-4 top-4 text-[var(--black-white-1000)]"
        >
          <VscClose size={20} />
        </button> */}

        {/* Green Check Icon */}
        <div className="flex justify-center mb-4">
          <CheckIcon />
        </div>

        {/* Title and Subtext */}
        <div className="text-center">
          <h2 className="text-[24px] font-[700] text-[var(--black-white-1000)]">
            Successful!
          </h2>
          <p className="text-[16px] font-[400] text-[var(--black-white-800)] py-4">
            Congratulations! 🎉
            <br />
            You’ve successfully signed up to Agentic AI Stock Trading.
          </p>
        </div>

        {/* Okay Button */}
        <Link href="/login">
          <Btn
            className="h-[40px] w-full bg-[var(--primary-1200)] hover:bg-[#078e63] text-white rounded-[100px] text-[16px] mt-4"
            text="Okay"
          />
        </Link>
      </div>
    </div>
  );
}
