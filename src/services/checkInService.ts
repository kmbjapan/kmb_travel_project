// src/services/checkInService.ts
// チェックイン機能の関数-共同化
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
    console.error("Update Fail:", error);
    throw error;
  }
};
