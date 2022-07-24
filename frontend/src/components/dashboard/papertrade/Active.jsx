import React, { useContext } from "react";
import { BaseURL } from "../../../BaseURL";
import { UserContext } from "../../../UserContext";
import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button,
} from "@mui/material";

function MyTable({ activeData }) {
  const { user } = useContext(UserContext);
  const current = JSON.parse(user);

  const handleSqaureoff = (name) => {
    const request = {
      name: name,
    };
    fetch(BaseURL + "api/manual_stop/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${current.data.token}`,
      },
      body: JSON.stringify(request),
    })
      .then((response) => {
        if (response.ok === true) return response.json();
        else {
          throw new Error();
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
                  <TableCell>
                    <Typography
                      variant="subtitle"
                      sx={{ fontSize: "1rem", fontWeight: 600 }}>
                      Manual Square off
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
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => handleSqaureoff(row.name)}>
                        SQUARE OFF
                      </Button>
                    </TableCell>
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
