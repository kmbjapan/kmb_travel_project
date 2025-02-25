export interface CheckInData {
  checkinId: number;
  guestName: string;
  guestPhone: string;
  guestCount: number;
  guestEmail: string;
  specialRequests: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  departureDate: string | null;
  packageName: string;
  staffName: string;
  packageId: number;
}
