// Components
import NavItem from "./NavItem/NavItem";
// Icons
import { DiAptana } from "react-icons/di";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "@/store"; // store 타입 정의

interface NavItemType {
  id: number;
  label: string;
  link: string;
  icon: React.ReactNode;
  requiresAdmin?: boolean; // 🔐 관리자 권한 전용 메뉴 구분
}

const NavList = () => {
  const userRole = useSelector((state: RootState) => state.user.user?.role);

  const isAdmin = userRole?.toUpperCase() === "ADMIN"; // 대소문자 구분 제거

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
      link: "/admin/driver",
      icon: <DiAptana className="size-5" />,
    },
    {
      id: 5,
      label: "システム管理",
      link: "/admin/system",
      icon: <DiAptana className="size-5" />,
      requiresAdmin: true, // 🔐 관리자만 접근 가능
    },
  ];

  // 🔍 관리자만 볼 수 있는 메뉴 필터링
  const filteredNavList = navList.filter(
    (item) => !item.requiresAdmin || isAdmin
  );

  return (
    <div className="mt-24">
      {filteredNavList.map((item) => (
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
