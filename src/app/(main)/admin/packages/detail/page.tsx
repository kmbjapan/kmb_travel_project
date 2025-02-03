import PackageDetail from "@/containers/admin/packages/PackageDetail";
import AdminLayout from "@/layouts/AdminLayout";

const AdminPackagesDetail = () => {
  return (
    <AdminLayout>
      <div className="flex flex-col justify-center py-20">
        <h2 className="text-center text-4xl font-bold">detail</h2>
        <div className="w-[80%]">
          <PackageDetail />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPackagesDetail;
