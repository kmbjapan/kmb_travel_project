"use client";

// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"; // ここでuserスライスをインポートします

// 日本語: Reduxストアを作成し、各スライスのリデューサーを登録
// 한국어: Redux 스토어를 생성하고, 각 슬라이스의 리듀서를 등록합니다
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// 日本語: ルート状態の型をエクスポート
// 한국어: 루트 상태 타입을 내보냅니다
export type RootState = ReturnType<typeof store.getState>;

// 日本語: ディスパッチの型をエクスポート
// 한국어: 디스패치 타입을 내보냅니다
export type AppDispatch = typeof store.dispatch;
