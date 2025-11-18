interface LabelProps {
  text?: string;
  hideIcon?: boolean;
}
export default function Label({ text, hideIcon }: LabelProps) {
  return (
    <>
      <label
        htmlFor=""
        className="dm-font text-[16px] leading-[100%] text-[var(--black-white-700)] font-[500]"
      >
        {text}
      </label>
    </>
  );
}
