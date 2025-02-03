"use client";
//Next.js
import { useState } from "react";
import { useParams } from "next/navigation";

//Components
import Info from "@/components/Common/Info";

interface Tour {
  id: number;
  packageName: string;
  course: string;
  maxParticipants: number;
  departureDate: string;
  status: string;
}

const PackageDetail = () => {
  //　臨時データ
  const [tours] = useState<Tour[]>([
    {
      id: 1,
      packageName: "キムツアー",
      course: "湯布院コース",
      maxParticipants: 47,
      departureDate: "2025-02-01",
      status: "完了",
    },
    {
      id: 2,
      packageName: "GOODツアー",
      course: "湯布院コース",
      maxParticipants: 47,
      departureDate: "2025-02-03",
      status: "出発",
    },
    {
      id: 3,
      packageName: "キムラツアー",
      course: "湯布院コース",
      maxParticipants: 43,
      departureDate: "2025-03-10",
      status: "出発前",
    },
    {
      id: 4,
      packageName: "GOODツアー",
      course: "湯布院コース",
      maxParticipants: 47,
      departureDate: "2025-03-15",
      status: "出発前",
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
    <div className="flex flex-col justify-center py-20">
      <Info
        packageName={tour.packageName}
        course={tour.course}
        departureDate={tour.departureDate}
        maxParticipants={tour.maxParticipants}
        status={tour.status}
        tourId={tour.id}
      />
    </div>
  );
};

export default PackageDetail;
