// app/system/page.tsx
"use client";

import Link from "next/link";
import { Box, Typography, Button } from "@mui/material";
import AdminLayout from "@/layouts/AdminLayout";

export default function SystemPage() {
  return (
    <AdminLayout>
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          システム管理
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          以下の管理機能を選択してください。
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          <Link href="/admin/system/accounts">
            <Button variant="outlined" fullWidth>
              アカウント管理
            </Button>
          </Link>

          {/* 다른 설정 페이지 생기면 여기에 추가 */}
          {/* <Link href="/system/settings">...</Link> */}
        </Box>
      </Box>
    </AdminLayout>
  );
}
