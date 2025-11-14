import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white">
      <div className="max-w-[1440px] mx-auto px-[80px] py-[50px]">
        {/* Top area */}
        <div className="flex items-start gap-[100px] mb-[40px]">
          {/* Brand and intro */}
          <div className="flex flex-col w-[363px] gap-[50px]">
            <div className="flex flex-col gap-[20px]">
              <div className="flex items-center gap-[10px]">
                <img src="/file.svg" alt="Health Linker" className="w-[40px] h-[26px]" />
                <span className="text-[24px] font-semibold text-black">Health Linker</span>
              </div>
              <p className="text-[14px] text-black/80 w-[248px]">
                Hello, we are ABC. trying to make an effort to put the right people
                for you to get the best results. Just insight
              </p>
            </div>

            <div className="flex flex-col gap-[16px]">
              <div className="flex items-center gap-[16px]">
                <span className="text-black">X</span>
                <span className="text-black">Instagram</span>
                <span className="text-black">LinkedIn</span>
                <span className="text-black">YouTube</span>
              </div>
              <div className="flex flex-col gap-[16px]">
                <p className="text-[16px] text-black opacity-80">(123) 456-7890</p>
                <p className="text-[16px] text-black opacity-80">ABC@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Columns */}
          <div className="flex-1 grid grid-cols-3 gap-[60px] min-w-[817px]">
            {/* Company */}
            <div className="flex flex-col gap-[15px] w-[219px]">
              <p className="text-[16px] font-bold text-[#0a142f]">Company</p>
              <div className="flex flex-col gap-[10px]">
                <a className="text-[16px] text-black-white-1000 opacity-50" href="#">About</a>
                <a className="text-[16px] text-[#0a142f] opacity-50" href="#">Contact</a>
                <a className="text-[16px] text-[#0a142f] opacity-50" href="#">Jobs</a>
              </div>
            </div>
            {/* Link */}
            <div className="flex flex-col gap-[15px] w-[219px]">
              <p className="text-[16px] font-bold text-[#0a142f]">Link</p>
              <div className="flex flex-col gap-[11px]">
                <a className="text-[16px] text-black-white-1000 opacity-50" href="#">Terms and Conditions</a>
                <a className="text-[16px] text-black-white-1000 opacity-50" href="#">Privacy Policy</a>
                <a className="text-[16px] text-[#0a142f] opacity-50" href="#">YouTube</a>
              </div>
            </div>
            {/* Contact */}
            <div className="flex flex-col gap-[15px] w-[219px]">
              <p className="text-[16px] font-bold text-[#0a142f]">Contact</p>
              <div className="flex flex-col gap-[11px]">
                <p className="text-[16px] text-black-white-1000 opacity-50">welcome@healthlinker</p>
                <p className="text-[16px] text-black-white-1000 opacity-50">+44 000 000 00</p>
                <p className="text-[16px] text-black-white-1000 opacity-50">The office’s address here</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-black-white-200"></div>

        {/* Bottom */}
        <div className="flex items-center justify-center py-[10px]">
          <p className="text-[14px] text-[#0a142f] opacity-60">© 2025 Health Linker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;