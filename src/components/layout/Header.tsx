"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header: React.FC = () => {
  const pathname = usePathname();
  const baseNav = "text-[14px] leading-[20px] tracking-[0]";
  const activeNav = "font-semibold text-primary-1200";
  const inactiveNav = "text-black-white-800";

  return (
    <header className="fixed left-0 w-full ">
      <div className="py-[24px]">
        <div className="max-w-[1440px] mx-auto px-[80px] flex items-center justify-between">
          <div className="flex items-center gap-[240px]">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img 
                src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=HealthLinker%20logo%2C%20medical%20cross%20symbol%2C%20green%20color%2C%20clean%20modern%20design&image_size=landscape_16_9" 
                alt="HealthLinker" 
                className="w-[120px] h-[16px]"
              />
            </div>
            
            {/* Navigation */}
            <nav className="flex items-center gap-[60px] min-w-[906px] h-[24px]">
              <Link href="/" className={`${baseNav} ${pathname === '/' ? activeNav : inactiveNav}`}>
                Home
              </Link>
              <Link href="/about" className={`${baseNav} ${pathname?.startsWith('/about') ? activeNav : inactiveNav}`}>
                About
              </Link>
              <Link href="/contact" className={`${baseNav} ${pathname?.startsWith('/contact') ? activeNav : inactiveNav}`}>
                Contact
              </Link>
            </nav>
          </div>
          
          {/* Right Actions */}
          <div className="flex items-center gap-[16px]">
            <button className="text-[14px] font-semibold leading-[20px] tracking-[0] text-primary-1200 px-[24px] py-[10px] w-[107px] h-[40px]">
              Login
            </button>
            <button className="bg-primary-1200 text-white text-[14px] font-semibold leading-[20px] tracking-[0] px-[24px] py-[12px] rounded-[80px] h-[40px] flex items-center justify-center">
              Sign up
            </button>
          </div>
        </div>
      </div>
      
      {/* Divider Line */}
      <div className="h-[2px] bg-secondary-200"></div>
    </header>
  );
};

export default Header;