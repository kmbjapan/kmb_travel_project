"use client";

import { createContext, useContext, useEffect, useState } from "react";

// 유저 정보 타입
interface User {
  email: string;
  role: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  fetchUser: () => void; // 유저 정보 갱신 함수
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ 유저 정보 가져오기
  const fetchUser = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    fetch("http://localhost:8080/api/auth/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUser(); // 앱이 실행될 때 유저 정보 가져오기
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

// ✅ 유저 정보 가져오는 커스텀 훅
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
