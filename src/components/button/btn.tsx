export interface ButtonProps {
  text?: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  iconColor?: string;
  hideIcon?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
}

export default function Btn({
  text,
  className,
  type,
  iconColor,
  hideIcon,
  disabled,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`cursor-pointer dm-font font-[600] leading-[100%] ${className}`}
    >
      {text}
    </button>
  );
}
