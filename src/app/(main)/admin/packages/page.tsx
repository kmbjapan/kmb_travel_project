import PackageDetail from "@/containers/admin/packages/PackageDetail";
import PackageList from "@/containers/admin/packages/PackageList";
import AdminLayout from "@/layouts/AdminLayout";

const AdminPackages = () => {
  return (
    <AdminLayout>
      <div className="flex flex-col justify-center items-center py-20">
        <h2 className="text-center text-3xl py-10">パッケージ管理</h2>
        <div className="w-[90%]">
          <PackageList />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPackages;
