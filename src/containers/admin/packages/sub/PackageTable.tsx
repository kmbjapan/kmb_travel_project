"use client"; // use client

//Mui
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  ButtonGroup,
  Button,
} from "@mui/material";

//Next.js
import Link from "next/link";

interface Tour {
  id: number;
  packageName: string;
  course: string;
  maxParticipants: number;
  departureDate: string;
  status: string;
}

interface TourTableProps {
  tours: Tour[];
}

const PackageTable = ({ tours }: TourTableProps) => {
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
    <TableContainer component={Paper} variant="outlined">
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>番号</TableCell>
            <TableCell>パッケージ名</TableCell>
            <TableCell>コース</TableCell>
            <TableCell>最大定員</TableCell>
            <TableCell>出発予定</TableCell>
            <TableCell>状態</TableCell>
            <TableCell>管理</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tours.map((tour) => (
            <TableRow key={tour.id} hover>
              <TableCell>{tour.id}</TableCell>

              <TableCell sx={{ color: "primary.main", cursor: "pointer" }}>
                <Link href={`/admin/packages/detail/${tour.id}`} passHref>
                  {tour.packageName}
                </Link>
              </TableCell>

              <TableCell>{tour.course}</TableCell>
              <TableCell>{tour.maxParticipants}名</TableCell>
              <TableCell>{tour.departureDate}</TableCell>
              <TableCell>
                <Chip
                  label={tour.status}
                  color={getStatusColor(tour.status) as any}
                  size="small"
                />
              </TableCell>

              <TableCell>
                <ButtonGroup size="small">
                  <Link href={`/admin/checkin/detail/${tour.id}`} passHref>
                    <Button size="small" color="primary">
                      チェックイン
                    </Button>
                  </Link>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PackageTable;
