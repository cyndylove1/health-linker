interface LabelProps {
  text?: string;
  hideIcon?: boolean;
  className?: string;
}
export default function Label({ text, className }: LabelProps) {
  return (
    <>
      <label
        htmlFor=""
        className={`dm-font text-[16px] leading-[100%] text-[var(--black-white-800)] font-[500] ${className}`}
      >
        {text}
      </label>
    </>
  );
}
