"use client";

import { useState } from "react";
import { VscClose } from "react-icons/vsc";
import NotificationIcon from "@/components/icon/nofiticationIcon";
import WarningIcon from "@/components/icon/warningIcon";
import Title from "@/components/ui/title";

type NotificationItem = {
  id: number;
  title: string;
  description: string;
};

export default function Notifications() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 1,
      title: "Insert your alert title here!",
      description:
        "Insert the alert description here. It would look better as two lines of text.",
    },
    {
      id: 2,
      title: "Insert your alert title here!",
      description:
        "Insert the alert description here. It would look better as two lines of text.",
    },
    {
      id: 3,
      title: "Insert your alert title here!",
      description:
        "Insert the alert description here. It would look better as two lines of text.",
    },
    {
      id: 4,
      title: "Insert your alert title here!",
      description:
        "Insert the alert description here. It would look better as two lines of text.",
    },
    {
      id: 5,
      title: "Insert your alert title here!",
      description:
        "Insert the alert description here. It would look better as two lines of text.",
    },
  ]);

  const closeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="md:px-6 px-4 pb-6">
      <Title text="Notification" />
      <div className="space-y-4 bg-white md:p-6 p-4 rounded-[16px]">
        {notifications.map((item, index) => (
          <div
            key={item.id}
            className="flex gap-[4px] md:gap-4 bg-white p-4 rounded-xl border-[1px] border-[#E2E4E8] relative"
          >
            {/* ICON */}
            <div className="">
              {index < 3 ? <WarningIcon /> : <NotificationIcon />}
            </div>

            {/* TEXT CONTENT */}
            <div className="flex-1">
              <p className="text-[16px] font-[600] leading-[100%] text-[#20232C]">
                {item.title}
              </p>

              <p className="text-[14px] font-[400] leading-[100%] pt-[5px] text-[var(--black-white-700)]">
                {item.description}
              </p>

              <button className="text-[14px] font-[500] leading-[100%] cursor-pointer pt-2 underline text-[var(--black-white-1000)]">
                Apply
              </button>
            </div>

            {/* CLOSE BUTTON */}
            <button
              onClick={() => closeNotification(item.id)}
              className="absolute right-4 top-4 text-[var(--black-white-800)]"
            >
              <VscClose />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
