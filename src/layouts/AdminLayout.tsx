//共同Components
import SideMenu from "@/components/SideMenu/SideMenu";
import TopBar from "@/components/TopBar/TopBar";
//Icon
import { FaUserTie } from "react-icons/fa";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen flex-col">
      <TopBar icon={FaUserTie} title="管理者モード　ADMIN" />
      <div className="flex flex-1">
        <SideMenu />
        <main className="bg-slate-50 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
