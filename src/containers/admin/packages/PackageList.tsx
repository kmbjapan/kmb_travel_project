import Link from "next/link";

const PackageList = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">パッケージリスト</h2>
      <div className="space-y-4">
        <div className="border p-4 rounded-lg shadow-sm hover:bg-gray-50">
          <Link
            href={`/admin/packages/new`}
            className="text-blue-600 hover:text-blue-800"
          >
            パッケージ登録する。
          </Link>
        </div>
        <div className="border p-4 rounded-lg shadow-sm hover:bg-gray-50">
          <Link
            href={`/admin/packages/edit`}
            className="text-blue-600 hover:text-blue-800"
          >
            パッケージ修正する。
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PackageList;
