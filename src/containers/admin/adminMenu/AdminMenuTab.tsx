"use client";

import AutuModal from "@/components/Modal/AutuModal";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";

interface MenuItem {
  title: string;
  description?: string;
  route?: string;
}

const menuItems: (MenuItem & { bgColor: string; textColor: string })[] = [
  {
    title: "パッケージ管理",
    route: "/admin/packages",
    bgColor: "bg-blue-500",

    textColor: "text-white",
  },
  {
    title: "チェックイン管理",
    route: "/admin/checkin",
    bgColor: "bg-blue-500",
    textColor: "text-white",
  },
  {
    title: "スタッフ管理",
    route: "/admin/staff",
    bgColor: "bg-blue-500",
    textColor: "text-white",
  },
  {
    title: "ドライバー管理",
    route: "/admin/driver",
    bgColor: "bg-blue-500",
    textColor: "text-white",
  },
  {
    title: "アカウント登録",
    route: "/admin/create",
    bgColor: "bg-blue-500",
    textColor: "text-white",
  },
  {
    title: "全体通計",
    route: "/admin/count",
    bgColor: "bg-blue-500",
    textColor: "text-white",
  },
  {
    title: "予算",
    route: "/admin/count",
    bgColor: "bg-blue-500",
    textColor: "text-white",
  },
  {
    title: "基本設計",
    route: "/admin/count",
    bgColor: "bg-blue-500",
    textColor: "text-white",
  },
];

export default function AdminMenuTab() {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Grid container spacing={2} justifyContent="center" className="p-4 ">
        {menuItems.map((item, index) => (
          <Grid item key={index} xs={6} sm={4} md={3}>
            {item.route === "/admin/create" ? (
              <CardActionArea>
                <Card
                  className={`shadow-md ${item.bgColor}`}
                  style={{
                    aspectRatio: "1 / 1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => setOpen(true)}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      align="center"
                      gutterBottom
                      className={item.textColor}
                    >
                      {item.title}
                    </Typography>
                  </CardContent>
                </Card>
              </CardActionArea>
            ) : (
              <Link
                href={item.route ?? "/admin"}
                style={{ textDecoration: "none" }}
              >
                <CardActionArea>
                  <Card
                    className={`shadow-md ${item.bgColor}`}
                    style={{
                      aspectRatio: "1 / 1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        align="center"
                        gutterBottom
                        className={item.textColor}
                      >
                        {item.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </CardActionArea>
              </Link>
            )}
          </Grid>
        ))}
      </Grid>

      <AutuModal open={open} onClose={handleClose} />
    </Box>
  );
}
