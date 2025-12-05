import { FiSearch } from "react-icons/fi";
import Btn from "./button/btn";
import Image from "next/image";
export default function HeroSection() {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 md:p-6 px-4 dm-font mt-10">
      {/* LEFT CARD */}
      <div className="flex-1 bg-gradient-to-br from-[#1C9D75] to-[#0A3729] rounded-xl md:p-10 p-4 text-white shadow-xl relative w-full h-[600px]">
        <h1 className="text-[60px] font-[600] leading-[100%]">
          <h2 className="text-white/70">Discover.</h2>
          <h3 className="text-white/85">Search.</h3>
          <h4>Get a job.</h4>
        </h1>

        <p className="mt-4 text-white max-w-lg text-[16px] font-[400] leading-[100%]">
          Great platform for job seekers that searching for new career heights
          and passionate about startups.
        </p>

        {/* Search Card */}
        <div className="mt-8 bg-white rounded-[20px] p-4 flex items-center gap-4">
          {/* Input 1 */}
          <div className="flex flex-col flex-1 h-[80px] bg-[#F5F5F5] rounded-[20px] p-4">
            <label className="text-[12px] leading-[100%] text-[#171717] font-[600]">
              Job Title, Keywords, or Company
            </label>
            <input
              type="text"
              placeholder="Enter job title, keyword..."
              className=" w-full p-2 text-sm text-black outline-none"
            />
          </div>

          {/* Input 2 */}
          <div className="md:flex flex-col flex-1  h-[80px] bg-[#F5F5F5] rounded-[20px] p-4 hidden ">
            <label className="text-[12px] leading-[100%] text-[#171717] font-[600]">
              Location
            </label>
            <input
              type="text"
              placeholder="City, state, zip..."
              className="w-full rounded-lg p-2 text-sm text-black outline-none"
            />
          </div>

          {/* Search Button */}
          <button className="bg-[#1C9D75] text-white h-[44px] flex items-center justify-center w-[44px] rounded-full">
            <FiSearch size={20} />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-[16px] py-10">
          <Btn
            text=" Sign up"
            className="bg-white rounded-[99px] w-[124px] h-[53px] font-[600] text-[14px] text-black leading-[100%]"
          />
          <Btn
            text=" Explore Job search"
            className="bg-[#2b5047] rounded-[99px] w-[225px] h-[53px] font-[600] text-[14px] text-white leading-[100%]"
          />
        </div>
      </div>

      {/* RIGHT CARD */}
      <div className="lg:w-[40%] w-full rounded-2xl relative overflow-hidden">
        {/* Background Image */}
        <Image
          src="/Property.png"
          alt="Nurse"
          width={340}
          height={691}
          className="w-full h-[600px] object-cover rounded-2xl"
        />

        {/* Top Text Overlay */}
        <div className="absolute top-6 left-6 z-20">
          <p className="text-[48px] font-[600] text-white/75 drop-shadow-lg leading-[100%]">
            <h3> You search</h3>
            <h2> You get.</h2>
          </p>
        </div>

        {/* Bottom Logo + Text */}
        <div className="absolute bottom-6 left-6 flex flex-col z-20">
          <img src="/logo.png" className="w-7 h-7 pb-2 drop-shadow-lg" />
          <span className="font-[600] text-black text-[24px] leading-[100%]">
            Health Linker
          </span>
        </div>

        {/* Optional Overlay Tint */}
        <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>
      </div>
    </div>
  );
}
