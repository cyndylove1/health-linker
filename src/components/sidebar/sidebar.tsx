import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarItems } from "../sidebar/sidebarData";
import Logo from "../icon/logo";
import { IoClose } from "react-icons/io5";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({
  isSidebarOpen,
  toggleSidebar,
}: SidebarProps) {
  const pathname = usePathname();

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

        {/* Navigation Items */}
        <aside className="mt-10 lg:mt-6 dm-font leading-[100%] text-white h-full flex flex-col">
          <ul>
            {sidebarItems.map((item) => {
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

          {/* Logout */}
          <div className="flex items-center gap-[12px] px-6 pt-[10rem] pb-4 cursor-pointer mt-auto">
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
                  d="M17.5007 9.99999H8.33398M17.5007 9.99999C17.5007 9.41649 15.8387 8.32626 15.4173 7.91666M17.5007 9.99999C17.5007 10.5835 15.8387 11.6737 15.4173 12.0833"
                  stroke="#2E2E2E"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h2 className="text-[var(--black-white-1000)] font-[400] text-[14px]">
              Logout
            </h2>
          </div>
        </aside>
      </div>
    </>
  );
}
