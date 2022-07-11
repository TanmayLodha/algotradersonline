import React from "react";

import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from "@mui/material";

function MyTable({ activeData }) {
  return (
    <>
      {activeData.length === 0 ? (
        <Typography
          variant="h1"
          sx={{
            fontSize: "1.3rem",
            fontWeight: 600,
            m: 4,
            textAlign: "center",
          }}>
          Stocks given by the selected strategy will be shown here.
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
                      Signal
                    </Typography>
                  </TableCell>
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
                      Gross P/L
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activeData.map((row, id) => (
                  <TableRow key={row.id}>
                    {row.signal === "BUY" ? (
                      <>
                        <TableCell sx={{ color: "green" }}>
                          {row.signal}
                        </TableCell>
                        <TableCell>{row.start_time}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.quantity}</TableCell>
                        <TableCell>{row.buy_price}</TableCell>
                        <TableCell>{row.ltp}</TableCell>
                        <TableCell
                          sx={{
                            color:
                              row.ltp - row.buy_price >= 0 ? "green" : "red",
                          }}>
                          {((row.ltp - row.buy_price) * row.quantity).toFixed(
                            2
                          )}
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell sx={{ color: "red" }}>
                          {row.signal}
                        </TableCell>
                        <TableCell>{row.start_time}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.quantity}</TableCell>
                        <TableCell>{row.ltp}</TableCell>
                        <TableCell>{row.sell_price}</TableCell>
                        <TableCell
                          sx={{
                            color:
                              row.sell_price - row.ltp >= 0 ? "green" : "red",
                          }}>
                          {((row.sell_price - row.ltp) * row.quantity).toFixed(
                            2
                          )}
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
}

export default MyTable;
