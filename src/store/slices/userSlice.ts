import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// 인터페이스 정의 :
interface User {
  email: string;
  role: string;
}
//  유저 데이터 구조 정의
interface UserState {
  user: User | null;
  loading: boolean;
}
// 초기 상태 정의
const initialState: UserState = {
  user: null,
  loading: false,
};

// 유저정보 가져오는 비동기 함수 >?
export const fetchUser = createAsyncThunk<User | null>(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      // 로컬스트리지에 저장된 JWT 토큰 생성

      if (!token) {
        return null;
      }

      const response = await fetch("http://localhost:8080/api/auth/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Fetch failed");
      }
      const data: User = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(null);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // 로그아웃 액션
    logout(state) {
      state.user = null; //유저 정보 제거
      localStorage.removeItem("token"); // 토큰 로컬 삭제
    },
  },
  extraReducers: (builder) => {
    // fetchUser의 라이프사이클(pending/fulfilled/rejected)을 처리
    builder
      // API요청 시작 > 서버에 요청 보내는거 > 스태이트 로딩을 트루로 전환
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        // 서버에서 유저 정보 받아왔을때 (성공의 의미?) > 응답받은 유저를 스태이트유저에 저장 > 로딩 끝으로 마무리
        fetchUser.fulfilled,
        (state, action: PayloadAction<User | null>) => {
          state.user = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchUser.rejected, (state) => {
        // 서버에서 요청 실패했을때 (토큰만료 서버 문제 등등)
        // 유저정보 널 주고 로딩 끝
        state.user = null;
        state.loading = false;
      });
  },
});

// 로그아웃
export const { logout } = userSlice.actions;

export default userSlice.reducer;
