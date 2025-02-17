"use client";
import axios from "axios";

import Buttons from "@/components/Common/Buttons";
import SearchBar from "@/components/Common/SearchBar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CheckInTable from "./sub/CheckInTable";
import InputBox from "@/components/Common/InputBox"; // 불필요한 import는 제거

interface CheckInData {
  checkinId: number;
  guestName: string;
  guestPhone: string;
  guestCount: number;
  guestEmail: string;
  specialRequests: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  packageName: string;
  departureDate: string;
  staffName: string;
}

interface CheckInListProps {
  id?: string;
}

const CheckInList: React.FC<CheckInListProps> = ({ id }) => {
  const [checkinData, setCheckinData] = useState<CheckInData[]>([]);
  const router = useRouter();

  useEffect(() => {
    const url = id
      ? `http://localhost:8080/api/checkin?packageId=${id}`
      : "http://localhost:8080/api/checkin";

    fetch(url)
      .then((res) => res.json())
      .then((data) => setCheckinData(data))
      .catch((err) => console.error("fetching 에러:", err));
  }, [id]);

  const packageInfo =
    id && checkinData.length > 0
      ? {
          packageName: checkinData[0].packageName,
          departureDate: checkinData[0].departureDate,
          staffName: checkinData[0].staffName,
        }
      : null;

  return (
    <div className="space-y-4 border border-gray-300 p-6 rounded-lg">
      {id ? (
        <div className="flex items-center gap-4 mb-6">
          <div className="grid grid-cols-2 gap-1">
            <InputBox
              label="パッケージ名"
              value={packageInfo?.packageName ?? ""}
            />
            <InputBox
              label="出発予定"
              value={packageInfo?.departureDate ?? ""}
            ></InputBox>
            <InputBox
              label="担当者"
              value={packageInfo?.staffName ?? ""}
            ></InputBox>
            <SearchBar
              label="顧客名"
              onSearch={(value) => console.log("検索語:", value)}
              onFilterChange={(value) => console.log("フィルター値:", value)}
              isCreatePage={true}
            />
          </div>
          <div className="mt-auto">
            <Buttons
              onSearchClick={() => console.log("検索する。")}
              isSearchVisible={true}
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4 mb-6">
          <div className="grid grid-cols-2 gap-1">
            <InputBox label="パッケージ名 " />
            <InputBox label="出発予定" />
            <InputBox label="担当者" />
            <SearchBar
              label="顧客名"
              onSearch={(value) => console.log("検索語:", value)}
              onFilterChange={(value) => console.log("フィルター値:", value)}
              isCreatePage={true}
            />
          </div>
          <div className="mt-auto">
            <Buttons
              onSearchClick={() => console.log("検索する。")}
              isSearchVisible={true}
            />
          </div>
        </div>
      )}

      <div>
        <CheckInTable checkinList={checkinData} />
      </div>
      <div className="mt-5">
        <Buttons
          onCreateClick={() =>
            router.push(
              id ? `/admin/checkin/create/${id}` : "/admin/checkin/create"
            )
          }
          isCreatePage={true}
          title="新規顧客登録する"
        />
      </div>
    </div>
  );
};

export default CheckInList;
