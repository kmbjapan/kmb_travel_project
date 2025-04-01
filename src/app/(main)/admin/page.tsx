"use client";

import AlertWindow from "@/components/Common/AlertWindow";
import AdminHome from "@/containers/admin/AdminHome";
import AdminLayout from "@/layouts/AdminLayout";

// redux
import type { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const AdminPage = () => {
  const router = useRouter();
  const hasAlerted = useRef(false);
  const allowedRoles = ["MASTER", "ADMIN", "GUIDE"];

  const [alertOpen, setAlertOpen] = useState(false);
  const { user, loading } = useSelector((state: RootState) => state.user);

  const handleAlertClose = () => {
    setAlertOpen(false);

    router.push("/login");
  };

  useEffect(() => {
    // 유저 로딩 끝났고, 유저 없거나 권한 없는 경우
    const userRole = user?.role?.toUpperCase() ?? "";
    const isAllowed = allowedRoles.includes(userRole);

    if (!loading && (!user || !isAllowed) && !hasAlerted.current) {
      console.log("접근 거부된 역할:", user?.role);
      setAlertOpen(true);
      hasAlerted.current = true;
    }
  }, [user, loading]);

  const userRole = user?.role?.toUpperCase() ?? "";
  const isAllowed = allowedRoles.includes(userRole);

  if (!user || !isAllowed) {
    return (
      <>
        <AlertWindow
          open={alertOpen}
          onClose={handleAlertClose}
          title="Access Denied"
          message="あなたは、管理者ではありません。"
        />
      </>
    );
  }

  return (
    <AdminLayout>
      <div className="flex flex-col justify-center py-20">
        <h2 className="text-center text-3xl ">管理者メニュー</h2>
      </div>
      <div>
        <AdminHome />
      </div>
    </AdminLayout>
  );
};

export default AdminPage;
