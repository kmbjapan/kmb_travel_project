import { ClassNames } from "@emotion/react";
import TopNavItem from "./NavItem/TopNavItem";
import { FaUserShield, FaRegBuilding } from "react-icons/fa";

const TopNavList = () => {
  const navItems = [
    {
      id: 1,
      label: "Home",
      link: "/",
      icon: <FaRegBuilding className="size-5" />,
    },
    {
      id: 2,
      label: "Admin",
      link: "/admin",
      icon: <FaUserShield className="size-5" />,
    },
  ];

  return (
    <div className="flex space-x-6">
      {navItems.map((item) => (
        <TopNavItem
          key={item.id}
          label={item.label}
          link={item.link}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

export default TopNavList;
