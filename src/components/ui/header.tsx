import { IoSettingsOutline } from "react-icons/io5";
import Image from "next/image";
import profile from "../../../public/images/Mask Group.png";
import SearchBar from "../form/searchBar";

export default function Header() {
  return (
    <>
      <div className="bg-white h-[70px] flex justify-between items-center px-6 dm-font leading-[100%]">
        <div>
          <h2 className="text-[16px] font-[600] text-[var(--black-white-1000)]">
            Hello Elizabeth Kafaru.
          </h2>
          <p className="text-[14px] font-[400] text-[var(--black-white-800)] pt-[5px]">
            You are welcome!
          </p>
        </div>
        <div className="flex items-center gap-[15px]">
          <SearchBar
            placeholder="Search anything here"
            className=" h-[38px] w-[213px]"
          />
          {/* notification */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.0015 22C13.3066 22 14.3745 21.0769 14.3745 19.9487H9.62843C9.62843 20.4928 9.87845 21.0145 10.3235 21.3992C10.7685 21.7839 11.3721 22 12.0015 22ZM19.1205 15.8462V10.7179C19.1205 7.56923 17.1747 4.93333 13.7812 4.2359V3.53846C13.7812 2.68718 12.9863 2 12.0015 2C11.0167 2 10.2217 2.68718 10.2217 3.53846V4.2359C6.8164 4.93333 4.88238 7.55897 4.88238 10.7179V15.8462L3.35177 17.1692C2.60427 17.8154 3.12634 18.9231 4.18233 18.9231H19.8087C20.8647 18.9231 21.3987 17.8154 20.6512 17.1692L19.1205 15.8462Z"
              fill="#B9B9B9"
            />
            <circle cx="17" cy="7" r="4.5" fill="#FF5151" stroke="white" />
          </svg>
          {/* setting */}
          <IoSettingsOutline size={20} />
          {/* profile */}
          <div className="flex gap-[10px]">
            <Image
              src={profile}
              alt="profile-pic"
              width={35}
              height={35}
              className="h-[35px] w-[35px]"
            />
            <div className="">
              <h2 className="text-[14px] font-[500] text-[var(--black-white-2100)]">
                Elizabeth Kafaru
              </h2>
              <div className="flex items-center gap-[4px] pt-[5px]">
                <h2 className="h-[7px] w-[7px] rounded-full bg-[#08733C]"></h2>
                <h6 className="text-[12px] font-[400] text-[var(--black-white-700)] ">
                  Online
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
