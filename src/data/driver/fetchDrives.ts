"use client";

import { Driver } from "./Driver";

export const fetchDrives = async (): Promise<Driver[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          driverId: 1,
          driverName: "YAMADA",
          companyName: "天領バス",
          phoneNumber: "080-1234-4567",
          email: "ex@yahoo.jp",
          createdAt: "2025-02-19",
          updatedAt: "2025-02-20",
        },
        {
          driverId: 2,
          driverName: "TANAKA",
          companyName: "天領バス",
          phoneNumber: "080-2222-4567",
          email: "aaa@tenryo.jp",
          createdAt: "2025-02-19",
          updatedAt: "2025-02-20",
        },
        {
          driverId: 3,
          driverName: "KEIGO",
          companyName: "スバルバス",
          phoneNumber: "080-4242-3333",
          email: "bc@subaru.jp",
          createdAt: "2025-02-19",
          updatedAt: "2025-02-20",
        },
      ]);
    }, 500);
  });
};
