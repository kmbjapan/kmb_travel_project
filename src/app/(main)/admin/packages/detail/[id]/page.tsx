import PackageDetail from "@/containers/admin/packages/PackageDetail";
import AdminLayout from "@/layouts/AdminLayout";

const AdminPackagesDetail = () => {
  return (
    <AdminLayout>
      <div className="flex flex-col justify-center items-center py-20">
        <h2 className="text-center text-3xl  py-10">パッケージ詳細</h2>
        <div className="w-[90%]">
          <PackageDetail />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPackagesDetail;
