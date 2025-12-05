import type { JSX } from "react";

export interface AdminSidebarItem {
  id: number;
  Label: string;
  path: string;
  icon: (isActive: boolean) => JSX.Element;
}

export const adminSidebarItems: AdminSidebarItem[] = [
  {
    id: 1,
    Label: "Dashboard",
    path: "/admin/dashboard",
    icon: (isActive) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.5 5.625C17.5 3.89911 16.1009 2.5 14.375 2.5C12.6491 2.5 11.25 3.89911 11.25 5.625C11.25 7.35089 12.6491 8.75 14.375 8.75C16.1009 8.75 17.5 7.35089 17.5 5.625Z"
          stroke={isActive ? "#ffff" : "#737373"}
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
        <path
          d="M8.75 5.625C8.75 3.89911 7.35089 2.5 5.625 2.5C3.89911 2.5 2.5 3.89911 2.5 5.625C2.5 7.35089 3.89911 8.75 5.625 8.75C7.35089 8.75 8.75 7.35089 8.75 5.625Z"
          stroke={isActive ? "#ffff" : "#737373"}
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
        <path
          d="M17.5 14.375C17.5 12.6491 16.1009 11.25 14.375 11.25C12.6491 11.25 11.25 12.6491 11.25 14.375C11.25 16.1009 12.6491 17.5 14.375 17.5C16.1009 17.5 17.5 16.1009 17.5 14.375Z"
          stroke={isActive ? "#ffff" : "#737373"}
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
        <path
          d="M8.75 14.375C8.75 12.6491 7.35089 11.25 5.625 11.25C3.89911 11.25 2.5 12.6491 2.5 14.375C2.5 16.1009 3.89911 17.5 5.625 17.5C7.35089 17.5 8.75 16.1009 8.75 14.375Z"
          stroke={isActive ? "#ffff" : "#737373"}
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 2,
    Label: "Jobs",
    path: "/admin/jobs",
    icon: (isActive) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.875 5.625V4.375C6.875 3.33947 7.71447 2.5 8.75 2.5H11.25C12.2855 2.5 13.125 3.33947 13.125 4.375V5.625M10 11.25V13.75M2.5 10C2.5 7.87868 2.5 6.81802 3.15901 6.15901C3.81802 5.5 4.87868 5.5 7 5.5H13C15.1213 5.5 16.182 5.5 16.841 6.15901C17.5 6.81802 17.5 7.87868 17.5 10V12.5C17.5 14.6213 17.5 15.682 16.841 16.341C16.182 17 15.1213 17 13 17H7C4.87868 17 3.81802 17 3.15901 16.341C2.5 15.682 2.5 14.6213 2.5 12.5V10Z"
          stroke={isActive ? "#ffff" : "#737373"}
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 3,
    Label: "Users",
    path: "/admin/users",
    icon: (isActive) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.5 8.75C9.57107 8.75 11.25 7.07107 11.25 5C11.25 2.92893 9.57107 1.25 7.5 1.25C5.42893 1.25 3.75 2.92893 3.75 5C3.75 7.07107 5.42893 8.75 7.5 8.75Z"
          stroke={isActive ? "#ffff" : "#737373"}
          strokeWidth="1.25"
        />
        <path
          d="M13.125 1.875C14.2975 2.35937 15.1562 3.4525 15.1562 4.73438C15.1562 6.01625 14.2975 7.10938 13.125 7.59375"
          stroke={isActive ? "#ffff" : "#737373"}
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <path
          d="M2.5 15.2812C2.5 13.2613 4.14413 11.6172 6.16406 11.6172H8.83594C10.8559 11.6172 12.5 13.2613 12.5 15.2812C12.5 16.2912 11.6788 17.1125 10.6688 17.1125H4.33125C3.32125 17.1125 2.5 16.2912 2.5 15.2812Z"
          stroke={isActive ? "#ffff" : "#737373"}
          strokeWidth="1.25"
        />
        <path
          d="M13.75 11.875C15.5087 12.0875 16.875 13.5875 16.875 15.4V15.7812C16.875 16.4437 16.3375 16.9812 15.675 16.9812H15"
          stroke={isActive ? "#ffff" : "#737373"}
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 4,
    Label: "Applications",
    path: "/admin/applications",
    icon: (isActive) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.25 5.625V14.375C16.25 15.4105 15.4105 16.25 14.375 16.25H5.625C4.58947 16.25 3.75 15.4105 3.75 14.375V5.625C3.75 4.58947 4.58947 3.75 5.625 3.75H14.375C15.4105 3.75 16.25 4.58947 16.25 5.625Z"
          stroke={isActive ? "#ffff" : "#737373"}
          strokeWidth="1.25"
        />
        <path
          d="M7.5 8.75H12.5"
          stroke={isActive ? "#ffff" : "#737373"}
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <path
          d="M7.5 11.25H12.5"
          stroke={isActive ? "#ffff" : "#737373"}
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 5,
    Label: "Categories",
    path: "/admin/categories",
    icon: (isActive) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.5 5.625C2.5 4.58947 3.33947 3.75 4.375 3.75H6.875C7.91053 3.75 8.75 4.58947 8.75 5.625V8.125C8.75 9.16053 7.91053 10 6.875 10H4.375C3.33947 10 2.5 9.16053 2.5 8.125V5.625Z"
          stroke={isActive ? "#ffff" : "#737373"}
          strokeWidth="1.25"
        />
        <path
          d="M11.25 5.625C11.25 4.58947 12.0895 3.75 13.125 3.75H15.625C16.6605 3.75 17.5 4.58947 17.5 5.625V8.125C17.5 9.16053 16.6605 10 15.625 10H13.125C12.0895 10 11.25 9.16053 11.25 8.125V5.625Z"
          stroke={isActive ? "#ffff" : "#737373"}
          strokeWidth="1.25"
        />
        <path
          d="M2.5 14.375C2.5 13.3395 3.33947 12.5 4.375 12.5H6.875C7.91053 12.5 8.75 13.3395 8.75 14.375V16.875C8.75 17.9105 7.91053 18.75 6.875 18.75H4.375C3.33947 18.75 2.5 17.9105 2.5 16.875V14.375Z"
          stroke={isActive ? "#ffff" : "#737373"}
          strokeWidth="1.25"
        />
        <path
          d="M11.25 14.375C11.25 13.3395 12.0895 12.5 13.125 12.5H15.625C16.6605 12.5 17.5 13.3395 17.5 14.375V16.875C17.5 17.9105 16.6605 18.75 15.625 18.75H13.125C12.0895 18.75 11.25 17.9105 11.25 16.875V14.375Z"
          stroke={isActive ? "#ffff" : "#737373"}
          strokeWidth="1.25"
        />
      </svg>
    ),
  },
];
