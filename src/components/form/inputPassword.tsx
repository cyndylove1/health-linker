import { FiEye, FiEyeOff } from "react-icons/fi";

interface InputPasswordProps {
  id?: string;
  placeholder: string;
  className?: string;
  showVisibility?: boolean;
  value?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  togglePasswordVisibility?: () => void;
  hideIcon?: boolean;
}

export default function InputPassword({
  id,
  placeholder,
  className = "",
  showVisibility,
  onChange,
  value,
  hideIcon,
  name,
  togglePasswordVisibility,
}: InputPasswordProps) {
  return (
    <div className="">
      <div
        className={`focus-within:border-[var(--primary-1200)] h-[48px] flex mt-[5px] items-center dm-font rounded-[8px] border-[1px] border-[var(--black-white-300)] px-2 justify-between leading-[100%] ${className}`}
      >
        <input
          id={id}
          value={value}
          name={name}
          onChange={onChange}
          required
          type={showVisibility ? "text" : "password"}
          placeholder={placeholder}
          className="text-[var(--black-white-700)] font-[400] w-full bg-transparent dm-font px-2 text-[16px] outline-none"
        />

        {!hideIcon && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="text-[#888D93]"
          >
            {showVisibility ? (
              <FiEyeOff className="w-5 h-5" />
            ) : (
              <FiEye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
