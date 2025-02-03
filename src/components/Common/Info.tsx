import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Grid,
  Stack,
} from "@mui/material";
import Link from "next/link";

interface InfoProps {
  packageName: string;
  course: string;
  departureDate: string;
  maxParticipants: number;
  status: string;
  tourId: number;
}

const Info: React.FC<InfoProps> = ({
  packageName,
  course,
  departureDate,
  maxParticipants,
  status,
  tourId,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "出発":
        return "success";
      case "出発前":
        return "info";
      case "完了":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Card
      sx={{
        maxWidth: "1200px",
        width: "1200px",
        height: "",
        marginBottom: 3,
      }}
    >
      <CardContent>
        {/* Status and Date Section */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Box>
            <Typography color="text.secondary" variant="caption">
              状態
            </Typography>
            <Box sx={{ mt: 0.5 }}>
              <Chip
                label={status}
                color={getStatusColor(status) as any}
                size="small"
                sx={{ fontWeight: "medium" }}
              />
            </Box>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Typography color="text.secondary" variant="caption">
              出発予定
            </Typography>
            <Typography variant="body2" sx={{ mt: 0.5 }}>
              {departureDate}
            </Typography>
          </Box>
        </Box>

        <Stack spacing={2}>
          {/* Package Name */}
          <Box>
            <Typography color="text.secondary" variant="caption">
              パッケージ名
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5 }}>
              {packageName}
            </Typography>
          </Box>

          {/* Course */}
          <Box>
            <Typography color="text.secondary" variant="caption">
              コース
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5 }}>
              {course}
            </Typography>
          </Box>

          {/* Capacity Info */}
          <Box>
            <Typography color="text.secondary" variant="caption">
              最大定員
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5 }}>
              {maxParticipants}名
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            <Link href={`/admin/packages/detail/${tourId}`} passHref>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                sx={{ minWidth: 100 }}
              >
                詳細を見る
              </Button>
            </Link>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Info;
