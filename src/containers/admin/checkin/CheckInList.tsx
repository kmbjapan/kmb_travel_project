"use client";

import Buttons from "@/components/Common/Buttons";
//Components
import SearchBar from "@/components/Common/SearchBar";
import Link from "next/link";
import { useRouter } from "next/navigation";
//Next.js
import { useState } from "react";
import CheckInTable from "./sub/CheckInTable";
import { Input } from "postcss";
import InputBox from "@/components/Common/InputBox";

const CheckInList = () => {
  const [pacageDate, setPackageDate] = useState([]);
  const router = useRouter();

  //   チェックインリストAPI
  //   useEffect(() => {
  //     fetch("http://localhost:8080/api/packages")
  //       .then((res) => res.json())
  //       .then((data) => setPackageDate(data))
  //       .catch((err) => console.error("fetchingエラー Packages :", err));
  //   }, []);

  //   // 検索機能の実装するところ
  //   const handleSearch = (value: string) => {
  //     console.log("検索語:", value);
  //   };

  //   // Fillter
  //   const handleFilterChange = (value: string) => {
  //     console.log("Fillter:", value);
  //   };

  return (
    <div className="space-y-4 border border-gray-300 p-4 rounded-lg p-6 ">
      <div className="flex items-center gap-4 mb-6">
        <div className="grid grid-cols-2 gap-1">
          <InputBox label="パッケージ名 " />
          <InputBox label="出発予定" />
          <InputBox label="担当者" />
          <SearchBar
            onSearch={(value) => console.log("検索語:", value)}
            onFilterChange={(value) => console.log("フィルター値:", value)}
            isCreatePage={true}
          />
        </div>

        <div className="mt-7">
          <Buttons
            onSearchClick={() => console.log("検索する。")}
            isSearchVisible={true}
          />
        </div>
      </div>

      {/* bottom要素 */}
      <div>
        <CheckInTable />
        <div className="ml-auto ">
          <Link href="/admin/checkin/create" passHref>
            <Buttons
              onCreateClick={() => router.push("/admin/checkin/create")}
              isCreatePage={true}
              title="新規顧客登録する"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckInList;
