import React, { useEffect } from "react";
import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from "@mui/material";

function History({ achievedData, updateMoney }) {
  var [netPL, totalCharges, total] = updateTable(achievedData);
  useEffect(() => {
    updateMoney((achievedData.length * 100000 + total).toFixed(2));
  }, [total, achievedData.length, updateMoney]);
  return (
    <>
      {achievedData.length === 0 ? (
        <Typography
          variant="h1"
          sx={{
            fontSize: "1.3rem",
            fontWeight: 600,
            m: 4,
            textAlign: "center",
          }}>
          Stocks executed will be shown here.
        </Typography>
      ) : (
        <>
          <TableContainer sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography
                      variant="subtitle"
                      sx={{ fontSize: "1rem", fontWeight: 600 }}>
                      Time
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="subtitle"
                      sx={{ fontSize: "1rem", fontWeight: 600 }}>
                      Script
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="subtitle"
                      sx={{ fontSize: "1rem", fontWeight: 600 }}>
                      Quantity
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="subtitle"
                      sx={{ fontSize: "1rem", fontWeight: 600 }}>
                      Buy Price
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="subtitle"
                      sx={{ fontSize: "1rem", fontWeight: 600 }}>
                      Sell Price
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="subtitle"
                      sx={{ fontSize: "1rem", fontWeight: 600 }}>
                      Net P/L
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="subtitle"
                      sx={{ fontSize: "1rem", fontWeight: 600 }}>
                      Total Charges
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {achievedData.map((row, id) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.time}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell>{row.buy_price}</TableCell>
                    <TableCell>{row.sell_price}</TableCell>
                    {netPL[id] < 0 ? (
                      <TableCell
                        sx={{
                          color: "red",
                          fontSize: "1rem",
                          fontWeight: 600,
                        }}>
                        {netPL[id].toFixed(2)}
                      </TableCell>
                    ) : (
                      <TableCell
                        sx={{
                          color: "green",
                          fontSize: "1rem",
                          fontWeight: 600,
                        }}>
                        {netPL[id].toFixed(2)}
                      </TableCell>
                    )}
                    <TableCell>{totalCharges[id].toFixed(2)}</TableCell>
                  </TableRow>
                ))}
                <TableRow hover>
                  <TableCell colSpan={4} />
                  <TableCell>
                    <Typography
                      variant="subtitle"
                      sx={{ fontSize: "1.2rem", fontWeight: 600 }}>
                      Total
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "1.2rem", fontWeight: 600 }}
                    colSpan={2}>
                    ₹ {total.toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
}

const updateTable = (activeData) => {
  var turnover = 0;
  var stt = 0;
  const turnoverArr = activeData.map((row) => {
    turnover = (row.buy_price + row.sell_price) * row.quantity;
    return turnover;
  });

  const sttprice = activeData.map((row) => {
    stt = row.sell_price * row.quantity * 0.00025;
    return stt;
  });
  const brokerage = turnoverArr.map((item) => Math.min(item * 0.0001, 40));
  const tranCharges = turnoverArr.map((item) => item * 0.0000325);
  const sebiCharges = turnoverArr.map((item) => item * 0.000002);
  const stampDuty = turnoverArr.map((item) => item * 0.0001);
  const serviceTax = brokerage.map(
    (item, id) => (item + tranCharges[id]) * 0.15
  );

  var totalcharge = 0;
  const totalCharges = brokerage.map((item, id) => {
    totalcharge =
      item +
      tranCharges[id] +
      sebiCharges[id] +
      stampDuty[id] +
      serviceTax[id] +
      sttprice[id];
    return totalcharge;
  });

  var total = 0;
  var stockNetpl = 0;
  const netPL = activeData.map((row, id) => {
    if (row.signal === "BUY") {
      total +=
        (row.sell_price - row.buy_price) * row.quantity - totalCharges[id];
      stockNetpl =
        (row.sell_price - row.buy_price) * row.quantity - totalCharges[id];
    } else {
      total +=
        (row.sell_price - row.buy_price) * row.quantity - totalCharges[id];
      stockNetpl =
        (row.sell_price - row.buy_price) * row.quantity - totalCharges[id];
    }

    return stockNetpl;
  });

  return [netPL, totalCharges, total];
};

export default History;
