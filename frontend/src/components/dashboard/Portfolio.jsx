import {
  TableContainer,
  TableRow,
  TableCell,
  Table,
  TableHead,
} from "@mui/material";
import React from "react";
import "./portfolio.scss";

// const createData

function Portfolio() {
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
    </div>
  );
}

export default Portfolio;
