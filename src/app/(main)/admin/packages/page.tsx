import PackageDetail from "@/containers/admin/packages/PackageDetail";
import PackageList from "@/containers/admin/packages/PackageList";
import AdminLayout from "@/layouts/AdminLayout";

const AdminPackages = () => {
  return (
    <AdminLayout>
      <div className="flex flex-col justify-center py-20">
        <h2 className="text-center text-4xl font-bold">パッケージ管理</h2>
        <PackageList />
        {/* <PackageDetail /> */}
      </div>
    </AdminLayout>
  );
};

export default AdminPackages;
