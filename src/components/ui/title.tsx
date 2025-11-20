interface TitleProps {
  text: string;
}
export default function Title({ text }: TitleProps) {
  return (
    <>
      <h2 className="text-[24px] font-[700] leading-[100%] dm-font text-[var(--black-white-1000)] py-4">
        {text}
      </h2>
    </>
  );
}
