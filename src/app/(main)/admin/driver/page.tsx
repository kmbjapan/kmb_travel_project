import DriverList from "@/containers/admin/driver/DriverList";
import PackageDetail from "@/containers/admin/packages/PackageDetail";
import AdminLayout from "@/layouts/AdminLayout";

const AdminDriverList = () => {
  return (
    <AdminLayout>
      <div className="flex flex-col justify-center py-20">
        <h2 className="text-center text-4xl font-bold">DriverList</h2>
        <div>
          <DriverList />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDriverList;
