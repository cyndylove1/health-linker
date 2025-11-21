import Btn from "../button/btn";

interface MenuProps {
  isOpen: boolean;
  openModal: () => void;
}

export default function Menu({ isOpen, openModal }: MenuProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-8 right-0 w-[148px] bg-white rounded-[8px] shadow-lg p-2 z-50 dm-font">
      <div className="space-y-2 py-2">
        <Btn
          className="h-[36px] text-start px-3 w-full bg-[#F5F5F5] hover:bg-[#f9f9f9] 
          text-[var(--black-white-900)] rounded-[8px] text-[14px]"
          text="View Details"
        />

        <Btn
          onClick={openModal}
          className="h-[36px] text-start px-3 w-full border border-[var(--black-white-400)] 
          bg-[var(--primary-1200)] hover:bg-[#078e63] text-white rounded-[8px] text-[14px]"
          text="Delete"
        />
      </div>
    </div>
  );
}
