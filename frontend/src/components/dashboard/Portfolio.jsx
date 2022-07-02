import {
  TableContainer,
  TableRow,
  TableCell,
  Table,
  TableHead,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

function Portfolio() {
  const [range, setRange] = useState(false);

  let now = new Date();
  const start = "09:15:00";
  const end = "15:30:00";

  if (now.getTime >= start && now.getTime <= end) {
    setRange(true);
  }

  return (
    <Card
      sx={{
        width: "89vw",
        mt: 2,
        ml: 1,
        p: 1,
        borderRadius: 3,
        boxShadow: "0px 0px 10px 5px rgba(0,0,0,0.1)",
        transition: " all .15s ease-in-out",
      }}>
      <CardContent>
        <Typography
          variant="h1"
          sx={{ fontSize: "2rem", fontWeight: 600, m: 1 }}>
          Today's Summary
        </Typography>
        {/* <Divider sx={{ borderBottomWidth: 1, m: 2 }} /> */}

        {range ? (
          <Typography
            variant="h1"
            sx={{
              fontSize: "1.5rem",
              fontWeight: 500,
              m: 2,
              textAlign: "center",
            }}>
            Summary will be available after market closes.
          </Typography>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Instrument</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Buy Price</TableCell>
                    <TableCell>Sell Price</TableCell>
                    <TableCell>P&L</TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
            <Typography
              variant="h1"
              sx={{
                fontSize: "1.5rem",
                fontWeight: 500,
                m: 2,
                textAlign: "center",
              }}>
              No trades were made today.
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default Portfolio;
