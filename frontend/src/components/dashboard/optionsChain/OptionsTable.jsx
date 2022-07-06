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
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material";
// import { AtomSpinner } from "react-epic-spinners";

function OptionsTable({ data, ltp, filter }) {
  const theme = useTheme();

  // for sizing of calls and puts row
  let cnt = 0;
  for (const key of Object.keys(filter)) {
    if (filter[key] === true) cnt += 1;
  }
  const size = { 0: 3, 1: 4, 2: 5, 3: 6, 4: 10 };

  let interval;
  if (data !== null) {
    interval = data[1].strikePrice - data[0].strikePrice;
  }

  data =
    data &&
    data.filter((row) => {
      return Math.abs(ltp - row.strikePrice) < interval * 10;
    });

  let temp = data && data.slice();
  let arr = new Array(10);

  let sp = 0;
  sp = Math.ceil(ltp / interval) * interval;

  console.log(sp);

  //Call Side max and 2nd Max
  data && temp.sort((a, b) => b.CE.openInterest - a.CE.openInterest);
  arr[0] = data && [temp[0].CE.openInterest, temp[1].CE.openInterest];
  data &&
    temp.sort((a, b) => b.CE.changeinOpenInterest - a.CE.changeinOpenInterest);
  arr[1] = data && [
    temp[0].CE.changeinOpenInterest,
    temp[1].CE.changeinOpenInterest,
  ];
  data && temp.sort((a, b) => b.CE.totalTradedVolume - a.CE.totalTradedVolume);
  arr[2] = data && [temp[0].CE.totalTradedVolume, temp[1].CE.totalTradedVolume];

  //Puts Side Max and 2nd Max
  data && temp.sort((a, b) => b.PE.openInterest - a.PE.openInterest);
  arr[3] = data && [temp[0].PE.openInterest, temp[1].PE.openInterest];
  data &&
    temp.sort((a, b) => b.PE.changeinOpenInterest - a.PE.changeinOpenInterest);
  arr[4] = data && [
    temp[0].PE.changeinOpenInterest,
    temp[1].PE.changeinOpenInterest,
  ];
  data && temp.sort((a, b) => b.PE.totalTradedVolume - a.PE.totalTradedVolume);
  arr[5] = data && [temp[0].PE.totalTradedVolume, temp[1].PE.totalTradedVolume];

  const HeadTableCell = styled(TableCell)(() => ({
    borderWidth: 0.1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor:
      theme.palette.mode === "dark" ? "text.primary" : "rgba(0, 0, 0, 0.2)",
    borderStyle: "solid",
  }));
  return (
    <>
      <TableContainer sx={{ width: "100%", mt: 2, pl: 2, pr: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell
                colSpan={
                  cnt === 4
                    ? size[cnt]
                    : filter.bidAsk
                    ? size[cnt] + 3
                    : size[cnt]
                }
                align="center"
                sx={{ backgroundColor: "green " }}>
                <Typography
                  variant="subtitle"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "600",
                    color: "white",
                  }}>
                  CALLS
                </Typography>
              </TableCell>
              <TableCell
                colSpan={1}
                align="center"
                sx={{
                  backgroundColor:
                    theme.palette.mode === "dark" ? "rgb(68,65,42)" : "#FFB6C1",
                }}></TableCell>
              <TableCell
                colSpan={
                  cnt === 4
                    ? size[cnt]
                    : filter.bidAsk
                    ? size[cnt] + 3
                    : size[cnt]
                }
                align="center"
                sx={{ backgroundColor: "red " }}>
                <Typography
                  variant="subtitle"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "600",
                    color: "white",
                  }}>
                  PUTS
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <HeadTableCell align="center">
                <Typography
                  variant="subtitle"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "600",
                  }}>
                  OI
                </Typography>
              </HeadTableCell>

              <HeadTableCell align="center">
                <Typography
                  variant="subtitle"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "600",
                  }}>
                  CHNG IN OI
                </Typography>
              </HeadTableCell>

              <HeadTableCell align="center">
                <Typography
                  variant="subtitle"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "600",
                  }}>
                  VOL
                </Typography>
              </HeadTableCell>

              {filter.iv && (
                <HeadTableCell align="center">
                  <Typography
                    variant="subtitle"
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "600",
                    }}>
                    IV
                  </Typography>
                </HeadTableCell>
              )}

              {filter.price && (
                <HeadTableCell align="center">
                  <Typography
                    variant="subtitle"
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "600",
                    }}>
                    LTP
                  </Typography>
                </HeadTableCell>
              )}
              {filter.pChange && (
                <HeadTableCell align="center">
                  <Typography
                    variant="subtitle"
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "600",
                    }}>
                    % CHNG
                  </Typography>
                </HeadTableCell>
              )}

              {filter.bidAsk && (
                <>
                  <HeadTableCell align="center">
                    <Typography
                      variant="subtitle"
                      sx={{
                        fontSize: "1rem",
                        fontWeight: "600",
                      }}>
                      BID QTY.
                    </Typography>
                  </HeadTableCell>
                  <HeadTableCell align="center">
                    <Typography
                      variant="subtitle"
                      sx={{
                        fontSize: "1rem",
                        fontWeight: "600",
                      }}>
                      BID PRICE
                    </Typography>
                  </HeadTableCell>
                  <HeadTableCell align="center">
                    <Typography
                      variant="subtitle"
                      sx={{
                        fontSize: "1rem",
                        fontWeight: "600",
                      }}>
                      ASK PRICE
                    </Typography>
                  </HeadTableCell>
                  <HeadTableCell align="center">
                    <Typography
                      variant="subtitle"
                      sx={{
                        fontSize: "1rem",
                        fontWeight: "600",
                      }}>
                      ASK QTY.
                    </Typography>
                  </HeadTableCell>
                </>
              )}

              <TableCell
                align="center"
                sx={{
                  borderWidth: 0.1,
                  borderRightWidth: 1,
                  borderBottomWidth: 1,
                  backgroundColor:
                    theme.palette.mode === "dark" ? "rgb(68,65,42)" : "#FFB6C1",

                  borderColor:
                    theme.palette.mode === "dark"
                      ? "text.primary"
                      : "rgba(0, 0, 0, 0.2)",
                  borderStyle: "solid",
                }}>
                <Typography
                  variant="subtitle"
                  sx={{ fontSize: "1rem", fontWeight: 600 }}>
                  STRIKE PRICE
                </Typography>
              </TableCell>
              {filter.bidAsk && (
                <>
                  <HeadTableCell align="center">
                    <Typography
                      variant="subtitle"
                      sx={{
                        fontSize: "1rem",
                        fontWeight: "600",
                      }}>
                      BID QTY.
                    </Typography>
                  </HeadTableCell>
                  <HeadTableCell align="center">
                    <Typography
                      variant="subtitle"
                      sx={{
                        fontSize: "1rem",
                        fontWeight: "600",
                      }}>
                      BID PRICE
                    </Typography>
                  </HeadTableCell>
                  <HeadTableCell align="center">
                    <Typography
                      variant="subtitle"
                      sx={{
                        fontSize: "1rem",
                        fontWeight: "600",
                      }}>
                      ASK PRICE
                    </Typography>
                  </HeadTableCell>
                  <HeadTableCell align="center">
                    <Typography
                      variant="subtitle"
                      sx={{
                        fontSize: "1rem",
                        fontWeight: "600",
                      }}>
                      ASK QTY.
                    </Typography>
                  </HeadTableCell>
                </>
              )}
              {filter.pChange && (
                <HeadTableCell align="center">
                  <Typography
                    variant="subtitle"
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "600",
                    }}>
                    % CHNG
                  </Typography>
                </HeadTableCell>
              )}

              {filter.price && (
                <HeadTableCell align="center">
                  <Typography
                    variant="subtitle"
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "600",
                    }}>
                    LTP
                  </Typography>
                </HeadTableCell>
              )}
              {filter.iv && (
                <HeadTableCell align="center">
                  <Typography
                    variant="subtitle"
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "600",
                    }}>
                    IV
                  </Typography>
                </HeadTableCell>
              )}

              <HeadTableCell align="center">
                <Typography
                  variant="subtitle"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "600",
                  }}>
                  VOL
                </Typography>
              </HeadTableCell>

              <HeadTableCell align="center">
                <Typography
                  variant="subtitle"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "600",
                  }}>
                  CHNG IN OI
                </Typography>
              </HeadTableCell>
              <HeadTableCell align="center">
                <Typography
                  variant="subtitle"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "600",
                  }}>
                  OI
                </Typography>
              </HeadTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row, id) => {
                return (
                  <MyRow
                    key={id}
                    row={row}
                    ltp={ltp}
                    filter={filter}
                    id={id}
                    arr={arr}
                    sp={sp}
                    theme={theme}
                    interval={interval}
                  />
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

const MyRow = ({ row, ltp, filter, id, theme, interval, arr, sp }) => {
  const StyledTableCell = styled(TableCell)(
    ({ theme, row, ltp, interval, ce }) => ({
      backgroundColor:
        row.strikePrice === sp
          ? theme.palette.mode === "dark"
            ? "rgb(68,65,42)"
            : "#FFB6C1"
          : (ce === 1 ? sp > row.strikePrice : sp < row.strikePrice)
          ? theme.palette.mode === "dark"
            ? "#270082"
            : "#B5DEFF"
          : "background.paper",
      borderWidth: 0.1,
      fontWeight: Math.abs(ltp - row.strikePrice) < interval / 2 ? "600" : null,
      borderColor:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,1)"
          : "rgba(0,0,0,0.2)",
      borderStyle: "solid",
    })
  );

  return (
    <TableRow key={id}>
      <StyledTableCell
        row={row}
        ltp={ltp}
        interval={interval}
        ce={1}
        sx={{
          backgroundColor:
            row.CE.openInterest === arr[0][0]
              ? "#FFD700"
              : row.CE.openInterest === arr[0][1]
              ? "#C0C0C0"
              : null,
        }}
        align="center">
        {row.CE.openInterest === 0 ? "-" : row.CE.openInterest * 25}
      </StyledTableCell>
      <StyledTableCell
        row={row}
        ltp={ltp}
        ce={1}
        interval={interval}
        sx={{
          color:
            row.CE.changeinOpenInterest === 0
              ? "text.primary"
              : row.CE.changeinOpenInterest > 0
              ? "green"
              : "red",
          backgroundColor:
            row.CE.changeinOpenInterest === arr[1][0]
              ? "#FFD700"
              : row.CE.changeinOpenInterest === arr[1][1]
              ? "#C0C0C0"
              : null,
        }}
        align="center">
        {row.CE.changeinOpenInterest === 0
          ? "-"
          : row.CE.changeinOpenInterest.toFixed(2) * 25}
      </StyledTableCell>

      <StyledTableCell
        align="center"
        row={row}
        ltp={ltp}
        ce={1}
        sx={{
          backgroundColor:
            row.CE.totalTradedVolume === arr[2][0]
              ? "#FFD700"
              : row.CE.totalTradedVolume === arr[2][1]
              ? "#C0C0C0"
              : null,
        }}
        interval={interval}>
        {row.CE.totalTradedVolume === 0 ? "-" : row.CE.totalTradedVolume * 25}
      </StyledTableCell>

      {filter.iv && (
        <StyledTableCell
          row={row}
          ltp={ltp}
          ce={1}
          interval={interval}
          align="center">
          {row.CE.impliedVolatility === 0 ? "-" : row.CE.impliedVolatility}
        </StyledTableCell>
      )}
      {filter.price && (
        <StyledTableCell
          row={row}
          ltp={ltp}
          ce={1}
          interval={interval}
          align="center">
          {row.CE.lastPrice === 0 ? "-" : row.CE.lastPrice}
        </StyledTableCell>
      )}

      {filter.pChange && (
        <StyledTableCell
          row={row}
          ltp={ltp}
          ce={1}
          interval={interval}
          sx={{
            color:
              row.CE.change === 0
                ? "text.primary"
                : row.CE.change > 0
                ? "green"
                : "red",
          }}
          align="center">
          {row.CE.change === 0 ? "-" : row.CE.change.toFixed(2)}
        </StyledTableCell>
      )}
      {filter.bidAsk && (
        <>
          <StyledTableCell
            row={row}
            ltp={ltp}
            ce={1}
            interval={interval}
            align="center">
            {row.CE.bidQty === 0 ? "-" : row.CE.bidQty}
          </StyledTableCell>
          <StyledTableCell
            row={row}
            ltp={ltp}
            ce={1}
            interval={interval}
            align="center">
            {row.CE.bidprice === 0 ? "-" : row.CE.bidprice}
          </StyledTableCell>
          <StyledTableCell
            row={row}
            ltp={ltp}
            ce={1}
            interval={interval}
            align="center">
            {row.CE.askPrice === 0 ? "-" : row.CE.askPrice}
          </StyledTableCell>
          <StyledTableCell
            row={row}
            ltp={ltp}
            ce={1}
            interval={interval}
            align="center">
            {row.CE.askQty === 0 ? "-" : row.CE.askQty}
          </StyledTableCell>
        </>
      )}
      <TableCell
        align="center"
        sx={{
          backgroundColor:
            theme.palette.mode === "dark" ? "rgb(68,65,42)" : "#FFB6C1",
          borderWidth: 0,
          borderRightWidth: 1,
          borderBottomWidth: 1,
          fontWeight: 600,
          borderColor:
            theme.palette.mode === "dark"
              ? "text.primary"
              : "rgba(0, 0, 0, 0.2)",
          borderStyle: "solid",
        }}>
        {row.strikePrice}
      </TableCell>

      {filter.bidAsk && (
        <>
          <StyledTableCell
            row={row}
            ltp={ltp}
            ce={0}
            interval={interval}
            align="center">
            {row.PE.bidQty === 0 ? "-" : row.PE.bidQty}
          </StyledTableCell>
          <StyledTableCell
            row={row}
            ltp={ltp}
            ce={0}
            interval={interval}
            align="center">
            {row.PE.bidprice === 0 ? "-" : row.PE.bidprice}
          </StyledTableCell>
          <StyledTableCell
            row={row}
            ltp={ltp}
            ce={0}
            interval={interval}
            align="center">
            {row.PE.askPrice === 0 ? "-" : row.PE.askPrice}
          </StyledTableCell>
          <StyledTableCell
            row={row}
            ltp={ltp}
            ce={0}
            interval={interval}
            align="center">
            {row.PE.askQty === 0 ? "-" : row.PE.askQty}
          </StyledTableCell>
        </>
      )}

      {filter.pChange && (
        <StyledTableCell
          row={row}
          ltp={ltp}
          ce={0}
          interval={interval}
          sx={{
            color:
              row.PE.change === 0
                ? "text.primary"
                : row.PE.change > 0
                ? "green"
                : "red",
          }}
          align="center">
          {row.PE.change === 0 ? "-" : row.PE.change.toFixed(2)}
        </StyledTableCell>
      )}
      {filter.price && (
        <StyledTableCell
          row={row}
          ltp={ltp}
          ce={0}
          interval={interval}
          align="center">
          {row.PE.lastPrice === 0 ? "-" : row.PE.lastPrice}
        </StyledTableCell>
      )}
      {filter.iv && (
        <StyledTableCell
          row={row}
          ltp={ltp}
          ce={0}
          interval={interval}
          align="center">
          {row.PE.impliedVolatility === 0 ? "-" : row.PE.impliedVolatility}
        </StyledTableCell>
      )}
      <StyledTableCell
        row={row}
        ltp={ltp}
        ce={0}
        sx={{
          backgroundColor:
            row.PE.totalTradedVolume === arr[5][0]
              ? "#FFD700"
              : row.PE.totalTradedVolume === arr[5][1]
              ? "#C0C0C0"
              : null,
        }}
        interval={interval}
        align="center">
        {row.PE.totalTradedVolume === 0 ? "-" : row.PE.totalTradedVolume * 25}
      </StyledTableCell>
      <StyledTableCell
        row={row}
        ltp={ltp}
        ce={0}
        interval={interval}
        sx={{
          color:
            row.PE.changeinOpenInterest === 0
              ? "text.primary"
              : row.PE.changeinOpenInterest > 0
              ? "green"
              : "red",
          backgroundColor:
            row.PE.changeinOpenInterest === arr[4][0]
              ? "#FFD700"
              : row.PE.changeinOpenInterest === arr[4][1]
              ? "#C0C0C0"
              : null,
        }}
        align="center">
        {row.PE.changeinOpenInterest === 0
          ? "-"
          : row.PE.changeinOpenInterest.toFixed(2) * 25}
      </StyledTableCell>
      <StyledTableCell
        row={row}
        ltp={ltp}
        ce={0}
        sx={{
          backgroundColor:
            row.PE.openInterest === arr[3][0]
              ? "#FFD700"
              : row.PE.openInterest === arr[3][1]
              ? "#C0C0C0"
              : null,
        }}
        interval={interval}
        align="center">
        {row.PE.openInterest === 0 ? "-" : row.PE.openInterest * 25}
      </StyledTableCell>
    </TableRow>
  );
};
export default OptionsTable;
