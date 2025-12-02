import { VscClose } from "react-icons/vsc";
import Btn from "../button/btn";

interface LogoutModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogOutModal({
  open,
  onClose,
  onConfirm,
}: LogoutModalProps) {
  if (!open) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
        <div className="bg-white w-[354px] rounded-[24px] p-6 relative leading-[100%] dm-font">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-[var(--black-white-1000)] "
          >
            <VscClose size={20} />
          </button>

          {/* logout icon */}
          <div className="flex justify-center mb-4">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30 35.25C29.8528 38.9538 26.7662 42.0988 22.6312 41.9976C21.6692 41.974 20.4802 41.6388 18.1022 40.968C12.3792 39.3536 7.4111 36.6406 6.21912 30.563C6 29.446 6 28.1888 6 25.6746V22.3254C6 19.8112 6 18.5541 6.21912 17.4369C7.4111 11.3593 12.3792 8.64631 18.1022 7.03205C20.4802 6.36127 21.6692 6.02589 22.6312 6.00237C26.7662 5.90121 29.8528 9.04613 30 12.75"
                stroke="#EC221F"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <path
                d="M42 24H20M42 24C42 22.5996 38.0114 19.9831 37 19M42 24C42 25.4004 38.0114 28.017 37 29"
                stroke="#EC221F"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="text-center">
            <h2 className="text-[24px] font-[700] text-[var(--black-white-1000)]">
              {/* Title */}
              Logout
            </h2>
            <p className="text-[16px] py-4 font-[400] text-[var(--black-white-900)]">
              Are you sure you want to logout?
            </p>
          </div>

          {/* Button */}
          <div className="mt-3">
            <Btn
              className="h-[40px] mb-2 w-full bg-[var(--primary-1200)] hover:bg-[#078e63] text-white rounded-[100px] text-[16px]"
              text="Logout"
              onClick={onClose}
            />
          </div>

          <Btn
            className="h-[40px] w-full border-[1px] border-[var(--primary-1200)] bg-transparent hover:text-[#078e63] text-[var(--primary-1200)}] rounded-[100px] text-[16px]"
            text="Cancel"
            onClick={onConfirm}
          />
        </div>
      </div>
    </>
  );
}
