"use client";

import Buttons from "@/components/Common/Buttons";
//Components
import SearchBar from "@/components/Common/SearchBar";
import PackageTable from "@/containers/admin/packages/sub/PackageTable";
import Link from "next/link";
import { useRouter } from "next/navigation";

//Next.js
import { useEffect, useState } from "react";

const PackageList = () => {
  const [pacageDate, setPackageDate] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:8080/api/packages")
      .then((res) => res.json())
      .then((data) => setPackageDate(data))
      .catch((err) => console.error("fetchingエラー Packages :", err));
  }, []);

  // 検索機能の実装するところ
  const handleSearch = (value: string) => {
    console.log("検索語:", value);
  };

  // Fillter
  const handleFilterChange = (value: string) => {
    console.log("Fillter:", value);
  };

  return (
    <div className="space-y-4 border border-gray-300 p-4 rounded-lg p-6 ">
      <div className="flex items-center gap-4 mb-6">
        <SearchBar
          onSearch={(value) => console.log("検索語:", value)}
          onFilterChange={(value) => console.log("フィルター値:", value)}
          isCreatePage={true}
        />
        <div className="mb-5">
          <Buttons
            onSearchClick={() => console.log("検索する。")}
            isSearchVisible={true}
          />
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
      </div>

      <div>
        <PackageTable packages={pacageDate} />
      </div>
    </div>
  );
};

export default PackageList;

// tailwind sx
