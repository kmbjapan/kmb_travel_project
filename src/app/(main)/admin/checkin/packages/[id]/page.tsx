"use client";

import CheckInList from "@/containers/admin/checkin/CheckInList";
import AdminLayout from "@/layouts/AdminLayout";
import { useParams } from "next/navigation";

const AdminCheckinPackageList = () => {
  const { id } = useParams();
  const packageId = Array.isArray(id) ? id[0] : id;

  return (
    <AdminLayout>
      <div className="flex flex-col justify-center items-center py-20">
        <h2 className="text-center text-3xl py-10">
          パッケージのチェックインリスト
        </h2>
        <div className="w-[90%]">
          <CheckInList id={packageId} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCheckinPackageList;
