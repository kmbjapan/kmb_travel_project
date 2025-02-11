import CheckInList from "@/containers/admin/checkin/CheckInList";
import AdminLayout from "@/layouts/AdminLayout";

const AdminCheckin = () => {
  return (
    <AdminLayout>
      <div className="flex flex-col justify-center items-center py-20">
        <h2 className="text-center text-3xl py-10">チェックインリスト</h2>
        <div className="w-[90%]">
          <CheckInList />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCheckin;
