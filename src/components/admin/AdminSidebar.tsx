import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminSidebarItems } from "./adminSidebarData";
import Logo from "../icon/logo";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import LogOutModal from "../modal/logoutModal";

interface AdminSidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function AdminSidebar({
  isSidebarOpen,
  toggleSidebar,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(false);
    console.log("Logged out!");
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity ${
          isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleSidebar}
      />
      <div
        className={`
          fixed top-0 left-0 h-full w-[240px] bg-white z-50 overflow-y-auto
          transition-transform duration-300 lg:translate-x-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          
        `}
      >
        <div className="pt-6 px-4 flex justify-between lg:block">
          <Link href="/">
            <Logo />
          </Link>
          {/* close icon */}
          <button
            className="lg:hidden text-xl text-black"
            onClick={toggleSidebar}
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Badge for Admin */}
        <div className="mx-4 mt-4 mb-2">
          <div className="bg-[var(--primary-200)] px-3 py-1.5 rounded-lg">
            <p className="text-[12px] font-[600] text-[var(--primary-1200)] text-center">
              ADMIN PANEL
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <aside className="mt-6 dm-font leading-[100%] text-white h-full flex flex-col">
          <ul>
            {adminSidebarItems.map((item) => {
              const isActive = pathname.startsWith(item.path);
              return (
                <li key={item.id}>
                  <Link href={item.path} onClick={toggleSidebar}>
                    <div className="relative flex items-center w-full mt-2">
                      <div
                        className={`flex items-center gap-[10px] font-[500] rounded-[50px] mx-[10px] px-4 w-full h-[44px] ${
                          isActive
                            ? "bg-[var(--primary-1200)]"
                            : "text-[var(--black-white-900)]"
                        }`}
                      >
                        <span>{item.icon(isActive)}</span>
                        <h2 className="text-[14px]">{item.Label}</h2>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Back to User Dashboard */}
          <div className="mt-6 px-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-[10px] px-4 py-3 text-[var(--black-white-900)] hover:bg-gray-100 rounded-[50px] transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 5L2.5 10L7.5 15"
                  stroke="#737373"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.5 10H17.5"
                  stroke="#737373"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h2 className="text-[14px] font-[500]">User View</h2>
            </Link>
          </div>

          {/* Logout */}
          <div
            className="flex items-center gap-[12px] px-6 pt-[10rem] pb-4 cursor-pointer mt-auto"
            onClick={() => setShowLogoutModal(true)}
          >
            <span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5 14.6875C12.4387 16.2307 11.1526 17.5412 9.42967 17.499C9.02883 17.4892 8.53342 17.3495 7.5426 17.07C5.15801 16.3973 3.08796 15.2669 2.5913 12.7346C2.5 12.2692 2.5 11.7453 2.5 10.6977V9.30225C2.5 8.25467 2.5 7.73087 2.5913 7.26538C3.08796 4.73304 5.15801 3.60263 7.5426 2.93002C8.53342 2.65053 9.02883 2.51079 9.42967 2.50099C11.1526 2.45884 12.4387 3.76922 12.5 5.31251"
                  stroke="#2E2E2E"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                />
                <path
                  d="M16.7344 10H8.125"
                  stroke="#2E2E2E"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                />
                <path
                  d="M14.375 7.5L16.875 10L14.375 12.5"
                  stroke="#2E2E2E"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h2 className="text-[14px] font-[500] text-[var(--black-white-900)]">
              Logout
            </h2>
          </div>
        </aside>
      </div>

      {showLogoutModal && (
        <LogOutModal
          open={showLogoutModal}
          onConfirm={handleLogout}
          onClose={() => setShowLogoutModal(false)}
        />
      )}
    </>
  );
}
