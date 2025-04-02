export interface PackageData {
  packageId: number;
  packageName: string;
  busNumber1: string;
  busNumber2: string;
  status: number;
  departureDate: string;
  totalSeats: number;
  courseName: string;
  driverName: string;
  staffName: string;
  packageCode?: string;
  createdAt: string;
  updatedAt: string;
  currentSeats: number;
}

export interface ReferenceData {
  drivers: Array<{ driverId: number; driverName: string }>;
  staffs: Array<{ staffId: number; staffName: string }>;
  courses: Array<{ courseId: number; courseName: string }>;
}
