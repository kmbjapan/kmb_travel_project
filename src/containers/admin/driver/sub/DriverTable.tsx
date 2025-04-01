// "use client";

// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   Paper,
//   IconButton,
//   Tooltip,
//   CircularProgress,
//   Container,
//   Typography,
// } from "@mui/material";
// import {
//   Refresh as RefreshIcon,
//   Storage as StorageIcon,
// } from "@mui/icons-material";
// import { fetchDrives } from "@/data/driver/fetchDrives";
// import { Driver } from "@/data/driver/Driver";

// const DriverTable = () => {
//   const [drives, setDrives] = useState<Driver[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   useEffect(() => {
//     loadDrives();
//   }, []);

//   const loadDrives = async () => {
//     setLoading(true);
//     const data = await fetchDrives();
//     setDrives(data);
//     setLoading(false);
//   };

//   const handleChangePage = (_: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <Container className="py-8">
//       <div className="flex justify-between items-center mb-4">
//         <Typography variant="h4" className="font-bold text-gray-800">
//           Driverリスト
//         </Typography>
//         <Tooltip title="새로고침">
//           <IconButton
//             onClick={loadDrives}
//             className="text-blue-600 hover:bg-blue-50"
//           >
//             <RefreshIcon />
//           </IconButton>
//         </Tooltip>
//       </div>

//       {loading ? (
//         <div className="flex justify-center py-20">
//           <CircularProgress />
//         </div>
//       ) : (
//         <TableContainer component={Paper} className="shadow-md rounded-lg">
//           <Table>
//             <TableHead className="bg-gray-100">
//               <TableRow>
//                 <TableCell className="font-semibold">이름</TableCell>
//                 <TableCell className="font-semibold">회사</TableCell>
//                 <TableCell className="font-semibold">연락처</TableCell>
//                 <TableCell className="font-semibold">업데이트 날짜</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {drives
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((drive) => (
//                   <TableRow
//                     key={drive.driverId}
//                     className="hover:bg-gray-50 transition"
//                   >
//                     <TableCell className="flex items-center">
//                       {drive.driverName}
//                     </TableCell>
//                     <TableCell>{drive.companyName}</TableCell>
//                     <TableCell>{drive.phoneNumber}</TableCell>
//                     <TableCell>
//                       {new Date(drive.updatedAt).toLocaleDateString()}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       <TablePagination
//         rowsPerPageOptions={[5, 10, 25]}
//         component="div"
//         count={drives.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//         className="border-t mt-4"
//       />
//     </Container>
//   );
// };

// export default DriverTable;
