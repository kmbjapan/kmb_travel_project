import PackageEdit from "@/containers/admin/packages/PackageEdit";
import AdminLayout from "@/layouts/AdminLayout";

const AdminPackagesEdit = () => {
  return (
    <AdminLayout>
      <div className="flex flex-col justify-center py-20">
        <h2 className="text-center text-3xl ">パッケージ修正する。</h2>
        <PackageEdit />
      </div>
    </AdminLayout>
  );
};

export default AdminPackagesEdit;
