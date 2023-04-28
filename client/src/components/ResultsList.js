import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const ResultsTable = () => {
  const practiceResults = [
    {
      id: 1,
      date: "2021-10-01",
      practiceType: "Sight Reading",
      duration: "30 minutes",
      accuracy: 90,
    },
    {
      id: 2,
      date: "2021-10-02",
      practiceType: "Sight Reading",
      duration: "30 minutes",
      accuracy: 90,
    },
    {
      id: 3,
      date: "2021-10-03",
      practiceType: "Sight Reading",
      duration: "30 minutes",
      accuracy: 90,
    },
    {
      id: 4,
      date: "2021-10-04",
      practiceType: "Sight Reading",
      duration: "30 minutes",
      accuracy: 90,
    },
    {
      id: 5,
      date: "2021-10-05",
      practiceType: "Sight Reading",
      duration: "30 minutes",
      accuracy: 90,
    },
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Practice Type</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Accuracy</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {practiceResults.map((result) => (
            <TableRow key={result.id}>
              <TableCell>{result.date}</TableCell>
              <TableCell>{result.practiceType}</TableCell>
              <TableCell>{result.duration}</TableCell>
              <TableCell>{result.accuracy}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ResultsTable;
