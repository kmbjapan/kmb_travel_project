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
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const UserPageTest = () => {
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

      <Container
        sx={{
          py: 12,
          textAlign: "center",
          backgroundColor: "#f5f5f5",
          borderRadius: "10px",
        }}
      >
        <Typography variant="h4" sx={{ textAlign: "center", mb: 6 }}>
          人気旅行パッケージ
        </Typography>
        <Grid container spacing={4}>
          {featuredDestinations.map((dest, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  boxShadow: 3,
                  borderRadius: "10px",
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                <CardMedia
                  component="img"
                  height="220"
                  image={dest.image}
                  alt={dest.title}
                  sx={{ objectFit: "cover" }} // ✅ 카드 이미지 크기 통일
                />
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1, textAlign: "center" }}>
                    {dest.title}
                  </Typography>
                  <Typography
                    sx={{ color: "text.secondary", mb: 2, textAlign: "center" }}
                  >
                    {dest.description}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "primary.main",
                      textAlign: "center",
                    }}
                  >
                    {dest.price}から
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      mt: 3,
                      width: "100%",
                      fontSize: "16px", // ✅ 버튼 크기 통일
                    }}
                  >
                    予約する
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container
        sx={{
          py: 10,
          textAlign: "center",
          backgroundColor: "#f5f5f5",
          borderRadius: "10px",
          marginTop: "100px",
        }}
      >
        <Typography variant="h4" sx={{ mb: 4 }}>
          会社情報
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ boxShadow: 3, borderRadius: "10px" }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  会社名
                </Typography>
                <Typography color="text.secondary">
                  株式会社 旅行プロジェクト
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ boxShadow: 3, borderRadius: "10px" }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  住所
                </Typography>
                <Typography color="text.secondary">
                  東京都渋谷区○○-○○
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ boxShadow: 3, borderRadius: "10px" }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  連絡先
                </Typography>
                <Typography color="text.secondary">
                  電話: 03-1234-5678
                </Typography>
                <Typography color="text.secondary">
                  メール: contact@travel.co.jp
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default UserPageTest;
