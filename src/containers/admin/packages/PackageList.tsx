"use client";

import Buttons from "@/components/Common/Buttons";
import SearchBar from "@/components/Common/SearchBar";
import PackageTable from "@/containers/admin/packages/sub/PackageTable";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PackageData } from "@/data/package/package";
import { getPackageList } from "@/services/packagesService";
const PackageList = () => {
  const [packageData, setPackageData] = useState<PackageData[]>([]);
  const router = useRouter();

  // APIからパッケージデータを取得 (API에서 패키지 데이터를 가져오기)
  useEffect(() => {
    const fetchPackages = async () => {
      const data = await getPackageList(); // ✅ 서비스 함수 호출
      setPackageData(data);
    };
    fetchPackages();
  }, []);

  return (
    <div className="space-y-4 border border-gray-300 p-4 rounded-lg p-6">
      <div className="flex items-center gap-4 mb-6">
        <SearchBar
          onSearch={(value) => console.log("検索語:", value)}
          onFilterChange={(value) => console.log("フィルター値:", value)}
          isCreatePage={true}
        />
        <div className="mt-auto">
          <Buttons
            onSearchClick={() => console.log("検索する。")}
            isSearchVisible={true}
          />
        </div>
      </div>

      <div className="ml-auto">
        <Link href="/admin/packages/create" passHref>
          <Buttons
            onCreateClick={() => router.push("/admin/packages/create")}
            isCreatePage={true}
            title="新規登録"
          />
        </Link>
      </div>

      <div>
        <PackageTable packages={packageData} />
      </div>
    </div>
  );
};

export default PackageList;
