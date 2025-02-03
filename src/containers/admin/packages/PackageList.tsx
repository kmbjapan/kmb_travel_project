"use client";

//Components
import SearchBar from "@/components/Common/SearchBar";
import PackageTable from "@/containers/admin/packages/sub/PackageTable";

//Next.js
import { useState } from "react";

const PackageList = () => {
  interface Tour {
    id: number;
    packageName: string;
    course: string;
    maxParticipants: number;
    departureDate: string;
    status: string;
  }

  const [tours, setTours] = useState<Tour[]>([
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
      <div>
        <SearchBar
          onSearch={(value) => console.log("検索語:", value)}
          onFilterChange={(value) => console.log("フィルター値:", value)}
        />
      </div>
      <div>
        <PackageTable tours={tours} />
      </div>
    </div>
  );
};

export default PackageList;

// tailwind sx
