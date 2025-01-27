// Components
import NavItem from "./NavItem/NavItem";
// Icons
import { FaRegCheckSquare, FaRegClock, FaTasks } from "react-icons/fa";
import { DiAptana } from "react-icons/di";

interface NavItemType {
  id: number;
  label: string;
  link: string;
  icon: React.ReactNode;
}

const NavList = () => {
  const navList: NavItemType[] = [
    {
      id: 1,
      label: "パッケージ管理",
      link: "/admin/packages",
      icon: <DiAptana className="size-5" />,
    },
    {
      id: 2,
      label: "チェックインリスト管理",
      link: "/admin/checkin",
      icon: <DiAptana className="size-5" />,
    },
    {
      id: 3,
      label: "スタッフリスト管理",
      link: "/admin/staff",
      icon: <DiAptana className="size-5" />,
    },
    {
      id: 4,
      label: "バスドライバー管理",
      link: "/admin/drivers",
      icon: <DiAptana className="size-5" />,
    },
  ];

  return (
    <div className="mt-24">
      {navList.map((item) => (
        <NavItem
          key={item.id}
          label={item.label}
          link={item.link}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

export default NavList;
