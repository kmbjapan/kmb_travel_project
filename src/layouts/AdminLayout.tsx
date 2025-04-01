"use client";

//共同Components
import SideMenu from "@/components/SideMenu/SideMenu";
import TopBar from "@/components/TopBar/TopBar";
// Icon
import { FaUserTie } from "react-icons/fa";
// React
import { useEffect } from "react";
// Reduce
import { fetchUser } from "@/store/slices/userSlice";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  // User情報useEffect
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className="flex h-screen flex-col">
      <TopBar icon={FaUserTie} title="管理者モード" />
      <div className="flex flex-1">
        <SideMenu />
        <main className="bg-slate-50 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
