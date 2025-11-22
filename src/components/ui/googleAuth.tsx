interface GoogleProps {
  text?: string;
  title?: string;
}

export default function GoogleAuth({ text, title }: GoogleProps) {
  return (
    <>
      <div className="flex md:flex-row flex-col gap-[20px] dm-font">
        <div className="flex justify-center w-full">
          <button className="w-full cursor-pointer h-[58px] flex items-center justify-center hover:bg-[#f5f5f5] bg-transparent rounded-[8px] border-[1px] border-[var(--black-white-300)] gap-[10px]">
            <span>
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.7137 10.4599H21.8747V10.4167H12.4997V14.5834H18.3867C17.5278 17.0089 15.22 18.75 12.4997 18.75C9.04811 18.75 6.24967 15.9516 6.24967 12.5C6.24967 9.04846 9.04811 6.25003 12.4997 6.25003C14.0929 6.25003 15.5424 6.85107 16.646 7.83284L19.5924 4.88648C17.732 3.15263 15.2434 2.08336 12.4997 2.08336C6.74707 2.08336 2.08301 6.74742 2.08301 12.5C2.08301 18.2526 6.74707 22.9167 12.4997 22.9167C18.2523 22.9167 22.9163 18.2526 22.9163 12.5C22.9163 11.8016 22.8445 11.1198 22.7137 10.4599Z"
                  fill="#FFC107"
                />
                <path
                  d="M3.28418 7.65159L6.70658 10.1615C7.63262 7.86878 9.87533 6.25003 12.4998 6.25003C14.093 6.25003 15.5425 6.85107 16.6462 7.83284L19.5925 4.88648C17.7321 3.15263 15.2436 2.08336 12.4998 2.08336C8.49876 2.08336 5.02897 4.34221 3.28418 7.65159Z"
                  fill="#FF3D00"
                />
                <path
                  d="M12.5 22.9166C15.1906 22.9166 17.6354 21.8869 19.4839 20.2125L16.2599 17.4843C15.1789 18.3064 13.8581 18.751 12.5 18.75C9.79062 18.75 7.4901 17.0224 6.62344 14.6114L3.22656 17.2286C4.95052 20.602 8.45156 22.9166 12.5 22.9166Z"
                  fill="#4CAF50"
                />
                <path
                  d="M22.7141 10.4599H21.875V10.4166H12.5V14.5833H18.387C17.9762 15.7377 17.2361 16.7464 16.2583 17.4849L16.2599 17.4838L19.4839 20.212C19.2557 20.4192 22.9167 17.7083 22.9167 12.5C22.9167 11.8015 22.8448 11.1198 22.7141 10.4599Z"
                  fill="#1976D2"
                />
              </svg>
            </span>
            <h2
              className="text-[var(--black-white-1000)] transition-transform duration-300 ease-in-out transform
             text-[14px] leading-[100%] font-[600]"
            >
              {text}
            </h2>
          </button>
        </div>
        <div className="flex justify-center w-full">
          <button className="w-full cursor-pointer h-[58px] flex items-center justify-center hover:bg-[#f5f5f5] bg-transparent rounded-[8px] border-[1px] border-[var(--black-white-300)] gap-[10px]">
            <span>
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M25 12.5006C25 5.59669 19.4036 0 12.5 0C5.59644 0 0 5.59669 0 12.5006C0 18.7399 4.57106 23.9115 10.5469 24.8493V16.114H7.37305V12.5006H10.5469V9.74654C10.5469 6.61357 12.413 4.88304 15.2683 4.88304C16.6359 4.88304 18.0664 5.12718 18.0664 5.12718V8.20349H16.4902C14.9374 8.20349 14.4531 9.16709 14.4531 10.1557V12.5006H17.9199L17.3657 16.114H14.4531V24.8493C20.4289 23.9115 25 18.7399 25 12.5006Z"
                  fill="#1877F2"
                />
                <path
                  d="M17.3647 16.1129L17.9189 12.4995H14.4521V10.1545C14.4521 9.16598 14.9364 8.20238 16.4892 8.20238H18.0654V5.12607C18.0654 5.12607 16.6349 4.88193 15.2673 4.88193C12.412 4.88193 10.5459 6.61246 10.5459 9.74543V12.4995H7.37207V16.1129H10.5459V24.8482C11.192 24.9494 11.845 25.0002 12.499 25C13.1635 25 13.8157 24.948 14.4521 24.8482V16.1129H17.3647Z"
                  fill="white"
                />
              </svg>
            </span>
            <h2
              className="text-[var(--black-white-1000)] transition-transform duration-300 ease-in-out transform
             text-[14px] leading-[100%] font-[600]"
            >
              {title}
            </h2>
          </button>
        </div>
      </div>
    </>
  );
}
