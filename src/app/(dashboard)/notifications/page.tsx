"use client";

import { useRouter } from "next/navigation";
import { VscClose } from "react-icons/vsc";
import NotificationIcon from "@/components/icon/nofiticationIcon";
import WarningIcon from "@/components/icon/warningIcon";
import Title from "@/components/ui/title";
import { useNotification } from "@/context/notificationContext";

export default function Notifications() {
  const router = useRouter();
  const { notifications, isLoading, markAsRead, markAllAsRead } = useNotification();

  const handleClose = async (id: string) => {
    await markAsRead(id);
  };

  const handleApply = async (notification: any) => {
    // Mark as read
    await markAsRead(notification.id);
    
    // If notification has a job ID or link, navigate to it
    // Otherwise, navigate to explore jobs page
    router.push("/explore-jobs");
  };

  if (isLoading) {
    return (
      <div className="md:px-6 px-4 pb-6">
        <Title text="Notification" />
        <div className="bg-white md:p-6 p-4 rounded-[16px]">
          <p className="text-center text-gray-500">Loading notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="md:px-6 px-4 pb-6">
      <Title text="Notification" />
      
      {notifications.length > 0 && (
        <div className="mb-4">
          <button
            onClick={markAllAsRead}
            className="text-[14px] font-[500] text-[var(--primary-1200)] hover:text-[#078e63] underline"
          >
            Mark all as read
          </button>
        </div>
      )}

      <div className="space-y-4 bg-white md:p-6 p-4 rounded-[16px]">
        {notifications.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-2">No notifications</p>
            <p className="text-sm text-gray-400">You're all caught up!</p>
          </div>
        ) : (
          notifications.map((item, index) => (
            <div
              key={item.id}
              className={`flex gap-[4px] md:gap-4 bg-white p-4 rounded-xl border-[1px] relative ${
                item.read 
                  ? "border-[#E2E4E8] opacity-70" 
                  : "border-[var(--primary-1200)] bg-[var(--primary-50)]"
              }`}
            >
              {/* ICON */}
              <div className="">
                {!item.read ? <WarningIcon /> : <NotificationIcon />}
              </div>

              {/* TEXT CONTENT */}
              <div className="flex-1">
                <p className="text-[16px] font-[600] leading-[100%] text-[#20232C]">
                  {item.title}
                </p>

                <p className="text-[14px] font-[400] leading-[100%] pt-[5px] text-[var(--black-white-700)]">
                  {item.message}
                </p>

                <p className="text-[12px] text-gray-400 mt-2">
                  {new Date(item.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>

                <button
                  onClick={() => handleApply(item)}
                  className="text-[14px] font-[500] leading-[100%] cursor-pointer pt-2 underline text-[var(--primary-1200)] hover:text-[#078e63]"
                >
                  View Job
                </button>
              </div>

              {/* CLOSE BUTTON */}
              <button
                onClick={() => handleClose(item.id)}
                className="absolute right-4 top-4 text-[var(--black-white-800)] hover:text-[var(--black-white-1000)]"
                title="Mark as read"
              >
                <VscClose />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
