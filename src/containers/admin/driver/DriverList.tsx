"use client";
//Next.jsとReact
import { useEffect, useState } from "react";
// Sub Container
// 共同Components
import Buttons from "@/components/Common/Buttons";
// Components
import SearchBar from "@/components/Common/SearchBar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DriverTable from "./sub/DriverTable";

const DriverList = () => {
  const router = useRouter();

  return (
    <div className="space-y-4 border border-gray-300 p-4 rounded-lg p-6 ">
      {/* <div className="flex items-center gap-4 mb-6">
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
        <Link href="/admin/driver/create" passHref>
          <Buttons
            onCreateClick={() => router.push("/admin/driver/create")}
            isCreatePage={true}
            title="新規登録"
          />
        </Link>
      </div> */}
      <div>
        <DriverTable></DriverTable>
      </div>
    </div>
  );
};

export default DriverList;
