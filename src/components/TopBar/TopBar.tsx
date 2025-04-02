"use client";

import TopNavList from "./NaviList/TopNavList";
import Logo from "./Logo/Logo";
import { IconType } from "react-icons";

interface TopBarProps {
  title: string;
  icon: IconType;
}

const TopBar: React.FC<TopBarProps> = ({ title, icon }) => {
  return (
    <div className="w-full bg-white-800 text-black flex items-center justify-between px-6 py-4 border-b border-gray-300">
      <Logo icon={icon} title={title} />
      <TopNavList></TopNavList>
    </div>
  );
};

export default TopBar;
