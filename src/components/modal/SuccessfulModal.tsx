import { VscClose } from "react-icons/vsc";
import CheckIcon from "../icon/checkIcon";
import Btn from "../button/btn";

interface SuccessModalProps {
  onClose: () => void;
}
export default function SuccessfulModal({ onClose }: SuccessModalProps) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-[448px] rounded-[24px] p-6 relative leading-[100%] dm-font">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-[var(--black-white-1000)] "
        >
          <VscClose size={20} />
        </button>

        {/* Green Check */}
        <div className="flex justify-center mb-4">
          <CheckIcon />
        </div>
        <div className="">
          <h2 className="text-center text-[24px] font-[700] text-[var(--black-white-1000)]">
            {/* Title */}
            Successful!
          </h2>
          {/* Subtext */}
          <h2 className="text-[16px] py-4 font-[400] text-[var(--black-white-800)] text-center">
            Congratulations!🎉
            <br />
            <p className="pt-2">
              You’ve successfully signed up to Agentic AI Stock Trading.
            </p>
          </h2>
        </div>

        {/* Button */}
        <Btn
          className="h-[40px] mb-6 w-full bg-[var(--primary-1200)] hover:bg-[#078e63] text-white rounded-[100px] text-[16px]"
          text="Okay"
        />
      </div>
    </div>
  );
}
