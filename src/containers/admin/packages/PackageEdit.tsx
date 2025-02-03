"use client";
// React
import React, { useEffect, useState } from "react";
// Next.js
import { useParams } from "next/navigation";

// Components
import PackageForm from "./sub/PackageForm";

const PackageEdit = () => {
  const [initialData, setInitialData] = useState<any>(null);
  // <any>はgenericというTypeScript文法である。どんなデータを取り込める、nullは初期値であります。

  // useState<any>(null): initialData의 타입은 **any**이고, 초기 값은 null입니다.
  // any 타입을 사용하면 이 상태 변수는 어떤 타입의 데이터든 저장할 수 있습니다.
  // initialData: 상태 변수, 초기값은 null
  // setInitialData: initialData 값을 업데이트하는 함수

  // 臨時データ
  const tours = [
    {
      id: 1,
      packageName: "キムツアー",
      assignedPerson: "キム",
      maxPeople: "47",
      course: "湯布院コース",
      maxParticipants: 47,
      departureDate: new Date("2025-02-01"),
      busDriver: "北原",
      busInfo1: "西鉄バス",
      busInfo2: "福岡25 ゆ12-34",
      status: "完了",
      tourDescription: "テスト記録でございます。",
    },
    {
      id: 2,
      packageName: "GOODツアー",
      assignedPerson: "キム",
      maxPeople: "48",
      course: "湯布院コース",
      maxParticipants: 47,
      departureDate: new Date("2025-02-03"),
      busDriver: "北原",
      busInfo1: "西鉄バス",
      busInfo2: "福岡25 ゆ12-34",
      status: "出発",
      tourDescription: "テスト記録でございます。",
    },
    {
      id: 3,
      packageName: "キムラツアー",
      assignedPerson: "キム",
      maxPeople: "47",
      course: "湯布院コース",
      maxParticipants: 43,
      departureDate: new Date("2025-03-10"),
      busDriver: "北原",
      busInfo1: "西鉄バス",
      busInfo2: "福岡25 ゆ12-34",
      status: "出発前",
      tourDescription: "テスト記録でございます。",
    },
    {
      id: 4,
      packageName: "GOODツアー",
      assignedPerson: "キム",
      maxPeople: "47",
      course: "湯布院コース",
      maxParticipants: 47,
      departureDate: new Date("2025-03-15"),
      busDriver: "北原",
      busInfo1: "西鉄バス",
      busInfo2: "福岡25 ゆ12-34",
      status: "出発前",
      tourDescription: "テスト記録でございます。",
    },
  ];

  const { id } = useParams();

  useEffect(() => {
    if (id && typeof id === "string") {
      const packageData = tours.find((tour) => tour.id === parseInt(id));
      if (packageData) {
        setInitialData(packageData);
      } else {
        console.error("Tour not found");
      }
    }
  }, [id]); // `id`が変更している時に関数が更新されている。

  const handleUpdate = async (data: any) => {
    console.log("修正する:", data);
    // TODO: API(PUT)呼び出し
  };

  if (!initialData) {
    return <p className="text-center">データを読み込み中...</p>;
  }

  return <PackageForm initialData={initialData} />;
};

export default PackageEdit;
