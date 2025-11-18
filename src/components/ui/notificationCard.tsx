export default function  NotificationCard  ()  {
  return (
    <div className="flex items-start gap-3 p-4 border-[1px] border-[var(--black-white-200)] rounded-[16px] bg-[#f9f9f9] dm-font leading-[100%]">
      <div className="">
        {/* icon */}
        <span className="">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="32" height="32" rx="16" fill="#1C9D75" />
            <path
              d="M7.66602 14.3333L11.8327 9.33331M11.8327 9.33331L16.3445 13.8452C16.5853 14.086 16.7058 14.2064 16.8589 14.2699C17.0121 14.3333 17.1824 14.3333 17.523 14.3333H24.3327L21.1655 10.5327C20.674 9.94291 20.4283 9.64801 20.0923 9.49066C19.7563 9.33331 19.3725 9.33331 18.6048 9.33331H11.8327Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.1667 12.6667V22.6667H8.5V13.381"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.166 22.6667H23.4993V13.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.33398 12.25V9.33331"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.8415 16H11.834"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.834 22.6666V19.3333"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.5 17.6667H20.1667"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
      <div>
        <p className="text-[16px] font-[500] text-[var(--black-white-800)]">
          Finish setting up your profile
        </p>
        <p className="text-[var(--black-white-700)] text-[14px] font-[400] pt-[5px]">
          Last Wednesday at 9:42 AM
        </p>
      </div>
    </div>
  );
};
