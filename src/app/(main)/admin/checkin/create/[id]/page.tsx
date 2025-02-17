import CheckinCreate from "@/containers/admin/checkin/CheckInCreate";
import AdminLayout from "@/layouts/AdminLayout";

const AdminCheckinCreateID = () => {
  return (
    <AdminLayout>
      <div className="flex flex-col justify-center py-20">
        <h2 className="text-center text-4xl font-bold">顧客登録</h2>
        <div>
          <CheckinCreate />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCheckinCreateID;
