"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  label: string;
  link: string;
  icon: React.ReactNode;
}

const TopNavItem: React.FC<NavItemProps> = ({ label, link, icon }) => {
  const pathname = usePathname();

  return (
    <Link
      href={link}
      className={`flex items-center p-4 font-medium hover:bg-gray-700 ${
        pathname === link ? "bg-gray-300 border-b-4 border-b-blue-500" : ""
      }`}
    >
      <div className="mr-2">{icon}</div>
      <div>{label}</div>
    </Link>
  );
};

export default TopNavItem;
