"use client";

import AdminHome from "@/containers/admin/AdminHome";
import AdminLayout from "@/layouts/AdminLayout";

const AdminPage = () => {
  return (
    <AdminLayout>
      <div className="flex flex-col justify-center py-20">
        <h2 className="text-center text-3xl ">管理一覧</h2>
      </div>
      <div className=" ">
        <AdminHome />
      </div>
    </AdminLayout>
  );
};

export default AdminPage;
