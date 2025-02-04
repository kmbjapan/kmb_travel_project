"use client";

//React
import { useState } from "react";
//Next.js
import { useParams } from "next/navigation";

//Components
import PackageInfoList from "@/containers/admin/packages/sub/PackageInfoList";

interface Tour {
  id: number;
  packageName: string;
  course: string;
  maxPeople: number;
  assignedPerson: string;
  departureDate: string;
  busDriver: string;
  busInfo1: string;
  busInfo2: string;
  tourDescription: string;
  status: string;
}

const PackageDetail = () => {
  //　臨時データ
  const [tours] = useState<Tour[]>([
    {
      id: 1,
      packageName: "キムツアー",
      course: "湯布院コース",
      maxPeople: 47,
      assignedPerson: "キム",
      departureDate: "2025-02-10",
      busDriver: "鈴木",
      busInfo1: "久留米つ250",
      busInfo2: "23-11",
      tourDescription: "テスト",
      status: "出発前",
    },
    {
      id: 2,
      packageName: "GOODツアー",
      course: "湯布院コース",
      maxPeople: 39,
      assignedPerson: "木村",
      departureDate: "2025-02-04",
      busDriver: "鈴木",
      busInfo1: "久留米つ250",
      busInfo2: "23-11",
      tourDescription: "テスト",
      status: "出発",
    },
    {
      id: 3,
      packageName: "キムラツアー",
      course: "湯布院コース",
      maxPeople: 42,
      assignedPerson: "キム",
      departureDate: "2025-02-03",
      busDriver: "鈴木",
      busInfo1: "久留米つ250",
      busInfo2: "23-11",
      tourDescription: "テスト",
      status: "完了",
    },
    {
      id: 4,
      packageName: "GOODツアー",
      course: "湯布院コース",
      maxPeople: 43,
      assignedPerson: "キム",
      departureDate: "2025-02-01",
      busDriver: "鈴木",
      busInfo1: "久留米つ250",
      busInfo2: "23-11",
      tourDescription: "テスト",
      status: "完了",
    },
  ]);

  // URL処理
  const { id } = useParams();

  if (!id) {
    return <div>パッケージのIDがないです。</div>;
  }
  const tour = tours.find((t) => t.id === Number(id));

  if (!tour) {
    return <div>パッケージを探せないです。</div>;
  }

  return (
    <div className="space-y-4 border border-gray-300 p-4 rounded-lg p-6 w-[1">
      <PackageInfoList
        packageName={tour.packageName}
        course={tour.course}
        maxPeople={tour.maxPeople}
        assignedPerson={tour.assignedPerson}
        departureDate={tour.departureDate}
        busDriver={tour.busDriver}
        busInfo1={tour.busInfo1}
        busInfo2={tour.busInfo2}
        tourDescription={tour.tourDescription}
        status={tour.status}
        tourId={tour.id}
      />
    </div>
  );
};

export default PackageDetail;
