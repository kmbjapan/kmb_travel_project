import SideMenu from "@/components/SideMenu/SideMenu";
import TopBar from "@/components/TopBar/TopBar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen flex-col">
      <TopBar />
      <div className="flex flex-1">
        <SideMenu />
        <main className="bg-slate-50 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
