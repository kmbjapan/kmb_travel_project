// src/services/checkInService.ts
import axios from "axios";

export const updateCheckInStatus = async (
  checkinId: number,
  newStatus: number
) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/checkin/${checkinId}/status`,
      { status: newStatus },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.error("업데이트 실패:", error);
    throw error;
  }
};
