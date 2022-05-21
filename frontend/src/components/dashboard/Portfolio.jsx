import {
  TableContainer,
  TableRow,
  TableCell,
  Table,
  TableHead,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./portfolio.scss";

function Portfolio() {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  const [range, setRange] = useState(false);
  let now = new Date();
  const start = "09:15:00";
  const end = "15:30:00";

  if (now.getTime >= start && now.getTime <= end) {
    setRange(true);
  }

  return (
    <div className="portfolio">
      <h1>Today's Summary</h1>
      <hr />

      <div className="trades">
        <h3>Trades</h3>

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
      </div>
      {range ? (
        <h2>Summary will be available after market closes.</h2>
      ) : (
        <h2>No trades made today.</h2>
      )}
    </div>
  );
}

export default Portfolio;
