// app/Providers.tsx (파일명/경로는 자유롭게 설정)

"use client"; // ✅ 클라이언트 컴포넌트 선언

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";

// (日) ReduxのProviderを返(かえ)すクライアントコンポーネント
// (韓) Redux Provider를 반환하는 클라이언트 컴포넌트
export default function Providers({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
