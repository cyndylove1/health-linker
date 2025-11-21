import { useEffect, useRef, useState } from "react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { TbBrandFacebook } from "react-icons/tb";
import { RiTwitterXLine } from "react-icons/ri";
import { TbCopy } from "react-icons/tb";


interface ShareMenuProps {
  menuOpen: boolean;
  closeMenu: () => void;
}

export default function ShareMenu({ menuOpen, closeMenu }: ShareMenuProps) {
  const [copied, setCopied] = useState(false);

  const jobLink = "https://healthlinkerjoblinksample";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(jobLink);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen, closeMenu]);

  if (!menuOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-50">
      <div
        ref={menuRef}
        className="absolute top-[5rem] right-6 mt-2 w-[387px] bg-white rounded-[8px] px-4 dm-font leading-[100%]"
      >
        <h2 className="text-[14px] font-[600] dm-font leading-[100%] text-[var(--black-white-1000)] my-4 text-center">
          Share this Job with your friends and family
        </h2>

        {/* Link + Copy */}
        <div className=" bg-[var(--primary-100)] flex items-center justify-between rounded-[8px] h-[54px] my-5 px-2">
          <div className="w-[220px]">
            <input
              type="text"
              readOnly
              value={jobLink}
              className=" text-[12px] font-[600] leading-[100%] text-[var(--black-white-900)] bg-white w-full px-2 rounded-[4px] h-[35px] bg-transparent outline-none text-[14px]"
            />
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center dm-font gap-[10px] bg-[var(--primary-1200)] h-[34px] w-[110px] hover:bg-[#078e63] text-white justify-center py-2 rounded-full text-[12px] font-[600] leading-[100%]"
          >
            {copied ? "Copied!" : "Copy Link"}
            <TbCopy size={18} />
          </button>
        </div>

        {/* Social Buttons */}
        <div className="space-y-3 pb-5 dm-font">
          <button className="w-full flex items-center gap-[10px] border-[1px] border-[#D0D0D0] rounded-[50px] px-4 h-[40px] text-[14px] font-[500] leading-[100%] text-[var(--black-white-900)] hover:bg-[#F7F7F7]">
            <FaWhatsapp size={20} className="" /> Whatsapp
          </button>

          <button className="w-full flex items-center gap-3 border-[1px] border-[#D0D0D0] rounded-[50px] px-4 h-[40px] text-[14px] font-[500] leading-[100%] text-[var(--black-white-900)] hover:bg-[#F7F7F7]">
            <TbBrandFacebook size={20} className="" /> Facebook
          </button>

          <button className="w-full flex items-center gap-3 border-[1px] border-[#D0D0D0] rounded-[50px] px-4 h-[40px] text-[14px] font-[500] leading-[100%] text-[var(--black-white-900)] hover:bg-[#F7F7F7]">
            <FaInstagram size={20} className="" /> Instagram
          </button>

          <button className="w-full flex items-center gap-3 border-[1px] border-[#D0D0D0] rounded-[50px] px-4 h-[40px] text-[14px] font-[500] leading-[100%] text-[var(--black-white-900)] hover:bg-[#F7F7F7]">
            <RiTwitterXLine size={20} /> X
          </button>
        </div>
      </div>
    </div>
  );
}
