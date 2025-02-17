import CheckInDetail from "@/containers/admin/checkin/CheckInDetail";
import CheckInEdit from "@/containers/admin/checkin/CheckInEdit";
import PackageDetail from "@/containers/admin/packages/PackageDetail";
import AdminLayout from "@/layouts/AdminLayout";

const AdminCheckinEdit = () => {
  return (
    <AdminLayout>
      <div className="flex flex-col justify-center items-center py-20">
        <h2 className="text-center text-4xl py-10 ">顧客情報</h2>
        <div className="w-[80%]">
          <CheckInEdit />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCheckinEdit;
