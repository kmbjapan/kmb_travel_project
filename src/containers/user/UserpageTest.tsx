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
      description: "かまど地獄で不思議な経験ができるができる！！",
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
      {/* Hero Section with Carousel */}
      <Box sx={{ position: "relative", height: "400px", overflow: "hidden" }}>
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
            <img src={dest.image} alt={dest.title} />
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box sx={{ textAlign: "center", color: "white" }}>
                <Typography
                  variant="h2"
                  sx={{ fontSize: "40px", fontWeight: "bold", mb: 4 }}
                >
                  {dest.title}
                </Typography>
                <Typography variant="h5" sx={{ mb: 6 }}>
                  {dest.description}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#1976d2",
                    "&:hover": { backgroundColor: "#1565c0" },
                  }}
                >
                  詳細見る
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
        <IconButton
          sx={{
            position: "absolute",
            left: 4,
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "white",
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
            right: 4,
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "white",
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

      {/* Featured Packages */}
      <Container sx={{ py: 16 }}>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", mb: 12, fontWeight: "bold" }}
        >
          流行旅行パッケージ
        </Typography>
        <Grid container spacing={4}>
          {featuredDestinations.map((dest, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  transform: "scale(1)",
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={dest.image}
                  alt={dest.title}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                    {dest.title}
                  </Typography>
                  <Typography sx={{ color: "text.secondary", mb: 4 }}>
                    {dest.description}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ color: "primary.main", fontWeight: "bold" }}
                  >
                    {dest.price}から
                  </Typography>
                  <Button variant="outlined" sx={{ mt: 4, width: "100%" }}>
                    予約する
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default UserPageTest;
