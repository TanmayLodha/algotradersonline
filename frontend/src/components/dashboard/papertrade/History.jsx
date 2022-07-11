import React from "react";
import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  TableFooter,
} from "@mui/material";

function History({ achievedData, total }) {
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
                      Start Time
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="subtitle"
                      sx={{ fontSize: "1rem", fontWeight: 600 }}>
                      End Time
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
                    <TableCell>{row.start_time}</TableCell>
                    <TableCell>{row.end_time}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell>{row.buy_price}</TableCell>
                    <TableCell>{row.sell_price}</TableCell>
                    <TableCell
                      sx={{ color: row.net_pl >= 0 ? "green" : "red" }}>
                      {row.net_pl.toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                        style: "currency",
                        currency: "INR",
                      })}
                    </TableCell>
                    <TableCell>
                      {row.net_charges.toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                        style: "currency",
                        currency: "INR",
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

              <TableFooter>
                <TableRow>
                  <TableCell colSpan={5} />
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
                    {achievedData.length !== 0
                      ? total.toLocaleString("en-IN", {
                          maximumFractionDigits: 2,
                          style: "currency",
                          currency: "INR",
                        })
                      : 0}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
}

export default History;
