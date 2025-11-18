interface InputValueProps{
  required?: boolean;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  type?: string;
  name?: string;
  id?: string;
}
export default function Input({
  placeholder,
  className,
  id,
  required,
  type,
  value,
  name,
  onChange,
}: InputValueProps) {
  return (
    <>
      <input
        type={type}
        value={value}
        id={id}
        name={name}
        required={required}
        onChange={onChange}
        className={`h-[48px] mt-[5px] border-[var(--black-white-300)] text-[var(--black-white-700)] rounded-[8px] outline-none w-full px-4 text-[16px] dm-font focus:border-[var(--primary-1200)] border-[1px] font-[400] leading-[100%] ${className}`}
        placeholder={placeholder}
      />
    </>
  );
}
