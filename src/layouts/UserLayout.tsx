import SideMenu from "@/components/SideMenu/SideMenu";
import TopBar from "@/components/TopBar/TopBar";
import { AppDispatch } from "@/store";
import { fetchUser } from "@/store/slices/userSlice";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { IconBaseProps } from "react-icons";
import { useDispatch } from "react-redux";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();

  useEffect(() => {
    dispatch(fetchUser());
  }, [pathname]);

  return (
    <div className="flex h-screen flex-col">
      <TopBar
        title={""}
        icon={function (props: IconBaseProps): JSX.Element {
          throw new Error("Function not implemented.");
        }}
      />
      <div className="flex flex-1">
        <SideMenu />
        <main className="bg-slate-50 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default UserLayout;
