import PackageCreate from "@/containers/admin/packages/PackageCreate";
import AdminLayout from "@/layouts/AdminLayout";

const AdminPackagesNew = () => {
  return (
    <AdminLayout>
      <div className="flex flex-col justify-center py-20">
        <h2 className="text-center text-4xl font-bold">パッケージ登録する。</h2>
        <PackageCreate></PackageCreate>
      </div>
    </AdminLayout>
  );
};

export default AdminPackagesNew;
