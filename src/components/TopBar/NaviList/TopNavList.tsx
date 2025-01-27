import TopNavItem from "./NavItem/TopNavItem";
import { FaHome, FaSearch, FaBell } from "react-icons/fa";

const TopNavList = () => {
  const navItems = [
    { id: 1, label: "Home", link: "/", icon: <FaHome className="size-5" /> },
    { id: 2, label: "Search", link: "/search", icon: <FaSearch className="size-5" /> },
    { id: 3, label: "Notifications", link: "/notifications", icon: <FaBell className="size-5" /> },
  ];

  return (
    <div className="flex space-x-6">
      {navItems.map((item) => (
        <TopNavItem key={item.id} label={item.label} link={item.link} icon={item.icon} />
      ))}
    </div>
  );
};

export default TopNavList;
