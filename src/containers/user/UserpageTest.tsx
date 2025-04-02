"use client";

import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Link from "next/link";
import { FaUserShield } from "react-icons/fa";
//User汎用適応
import { useSelector, UseSelector } from "react-redux";
import type { RootState } from "@/store";

const UserPageTest = () => {
  const { user, loading } = useSelector((state: RootState) => state.user);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const featuredDestinations = [
    {
      title: "湯布院",
      image:
        "https://travel.rakuten.com/contents/sites/contents/files/styles/max_1300x1300/public/2024-04/yufuin-onsen-guide_5.jpg?itok=yscuXltH",
      description: "天国ような温泉の観光地を見学しよう！",
      price: "29,000円",
    },
    {
      title: "日田",
      image:
        "https://trvis.r10s.com/d/strg/ctrl/26/fb6accb7b88163291a9689f0a0700d8ff91c4ec3.47.9.26.3.jpg",
      description: "かまど地獄で不思議な経験ができる！！",
      price: "89,000円",
    },
    {
      title: "熊本",
      image:
        "https://trvis.r10s.com/d/strg/ctrl/26/a58c5937bb26dcb2c1ade9ea3e4f954e5856cae5.47.9.26.3.jpg",
      description: "阿蘇山を見ながら忘れない思い出を作る。",
      price: "60,000円",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === featuredDestinations.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      {/* 条件門、勉強 */}
      {/* {user && user.role === "admin" && ( */}
      {user === null && (
        <Link
          href="/admin"
          className="flex items-center font-semibold border px-4 py-2 rounded-full shadow-sm text-white bg-gray-800 hover:bg-gray-700"
        >
          <FaUserShield className="size-5 mr-1" />
          管理者ページ
        </Link>
      )}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "500px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {featuredDestinations.map((dest, index) => (
          <Box
            key={index}
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              opacity: index === currentImageIndex ? 1 : 0,
              transition: "opacity 1s ease-in-out",
            }}
          >
            <img
              src={dest.image}
              alt={dest.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                color: "white",
              }}
            >
              <Box>
                <Typography variant="h2" sx={{ fontSize: "40px", mb: 2 }}>
                  {dest.title}
                </Typography>
                <Typography variant="h5" sx={{ mb: 4 }}>
                  {dest.description}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#1976d2",
                    "&:hover": { backgroundColor: "#1565c0" },
                    fontSize: "18px",
                    px: 4,
                    py: 1.5,
                  }}
                >
                  詳細を見る
                </Button>
              </Box>
            </Box>
          </Box>
        ))}

        <IconButton
          sx={{
            position: "absolute",
            left: 10,
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(255,255,255,0.7)",
            "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
          }}
          onClick={() =>
            setCurrentImageIndex((prev) =>
              prev === 0 ? featuredDestinations.length - 1 : prev - 1
            )
          }
        >
          <ChevronLeftIcon />
        </IconButton>

        <IconButton
          sx={{
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(255,255,255,0.7)",
            "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
          }}
          onClick={() =>
            setCurrentImageIndex((prev) =>
              prev === featuredDestinations.length - 1 ? 0 : prev + 1
            )
          }
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default UserPageTest;
