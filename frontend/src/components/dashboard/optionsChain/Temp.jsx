import React from "react";
import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
// import { AtomSpinner } from "react-epic-spinners";
import { styled } from "@mui/material";

const updateMoney = (value) => {
  //https://stackoverflow.com/questions/16037165/displaying-a-number-in-indian-format-using-javascript
  let x = value;
  x = x.toString();
  var afterPoint = "";
  if (x.indexOf(".") > 0) afterPoint = x.substring(x.indexOf("."), x.length);
  x = Math.floor(x);
  x = x.toString();
  var lastThree = x.substring(x.length - 3);
  var otherNumbers = x.substring(0, x.length - 3);
  if (otherNumbers !== "") lastThree = "," + lastThree;
  var res =
    otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
  return res;
};

function OptionsTable({ data, ltp, filter }) {
  const theme = useTheme();
  let interval;
  if (data !== null) {
    interval = data[1].strikePrice - data[0].strikePrice;
  }
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
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={6}>
          <Typography
            variant="h1"
            sx={{ fontSize: "1.2rem", fontWeight: 600, textAlign: "center" }}>
            CALLS
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography
            variant="h1"
            sx={{ fontSize: "1.2rem", fontWeight: 600, textAlign: "center" }}>
            PUTS
          </Typography>
        </Grid>
      </Grid>

      <TableContainer sx={{ width: "100%", mt: 2, pl: 2, pr: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <HeadTableCell align="center">
                <Typography variant="subtitle">OI</Typography>
              </HeadTableCell>

              <HeadTableCell align="center">
                <Typography variant="subtitle">CHNG IN OI</Typography>
              </HeadTableCell>

              <HeadTableCell align="center">
                <Typography variant="subtitle">VOL</Typography>
              </HeadTableCell>

              {filter.iv && (
                <HeadTableCell align="center">
                  <Typography variant="subtitle">IV</Typography>
                </HeadTableCell>
              )}

              {filter.price && (
                <HeadTableCell align="center">
                  <Typography variant="subtitle">LTP</Typography>
                </HeadTableCell>
              )}
              {filter.pChange && (
                <HeadTableCell align="center">
                  <Typography variant="subtitle">% CHNG</Typography>
                </HeadTableCell>
              )}

              {filter.bidAsk && (
                <>
                  <HeadTableCell align="center">
                    <Typography variant="subtitle">BID QTY.</Typography>
                  </HeadTableCell>
                  <HeadTableCell align="center">
                    <Typography variant="subtitle">BID PRICE</Typography>
                  </HeadTableCell>
                  <HeadTableCell align="center">
                    <Typography variant="subtitle">ASK PRICE</Typography>
                  </HeadTableCell>
                  <HeadTableCell align="center">
                    <Typography variant="subtitle">ASK QTY.</Typography>
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
                    theme.palette.mode === "dark" ? "brown" : "yellow",

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
                    <Typography variant="subtitle">BID QTY.</Typography>
                  </HeadTableCell>
                  <HeadTableCell align="center">
                    <Typography variant="subtitle">BID PRICE</Typography>
                  </HeadTableCell>
                  <HeadTableCell align="center">
                    <Typography variant="subtitle">ASK PRICE</Typography>
                  </HeadTableCell>
                  <HeadTableCell align="center">
                    <Typography variant="subtitle">ASK QTY.</Typography>
                  </HeadTableCell>
                </>
              )}
              {filter.pChange && (
                <HeadTableCell align="center">
                  <Typography variant="subtitle">% CHNG</Typography>
                </HeadTableCell>
              )}

              {filter.price && (
                <HeadTableCell align="center">
                  <Typography variant="subtitle">LTP</Typography>
                </HeadTableCell>
              )}
              {filter.iv && (
                <HeadTableCell align="center">
                  <Typography variant="subtitle">IV</Typography>
                </HeadTableCell>
              )}

              <HeadTableCell align="center">
                <Typography variant="subtitle">VOL</Typography>
              </HeadTableCell>

              <HeadTableCell align="center">
                <Typography variant="subtitle">CHNG IN OI</Typography>
              </HeadTableCell>
              <HeadTableCell align="center">
                <Typography variant="subtitle">OI</Typography>
              </HeadTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row, id) => {
                <MyRow />;
                return Math.abs(ltp - row.strikePrice) < interval * 10 ? (
                  <MyRow
                    row={row}
                    ltp={ltp}
                    filter={filter}
                    id={id}
                    theme={theme}
                    interval={interval}
                  />
                ) : null;
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

const MyRow = ({ row, ltp, filter, id, theme, interval }) => {
  const StyledTableCell = styled(TableCell)(
    ({ theme, row, ltp, interval, ce }) => ({
      backgroundColor:
        Math.abs(ltp - row.strikePrice) < interval / 2
          ? theme.palette.mode === "dark"
            ? "brown"
            : "yellow"
          : (
              ce === 1
                ? ltp - row.strikePrice > interval
                : ltp - row.strikePrice < interval
            )
          ? "#ccccd3"
          : "background.paper",
      borderWidth: 0.1,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderColor:
        theme.palette.mode === "dark" ? "text.primary" : "rgba(0, 0, 0, 0.2)",
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
        align="center">
        {row.CE.openInterest === 0
          ? "-"
          : updateMoney(row.CE.openInterest * 25)}
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
        }}
        align="center">
        {row.CE.changeinOpenInterest === 0
          ? "-"
          : row.CE.changeinOpenInterest.toFixed(2)}
      </StyledTableCell>

      <StyledTableCell
        align="center"
        row={row}
        ltp={ltp}
        ce={1}
        interval={interval}>
        {row.CE.totalTradedVolume === 0
          ? "-"
          : updateMoney(row.CE.totalTradedVolume * 25)}
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
          backgroundColor: theme.palette.mode === "dark" ? "brown" : "yellow",
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
        interval={interval}
        align="center">
        {row.PE.totalTradedVolume === 0
          ? "-"
          : updateMoney(row.PE.totalTradedVolume * 25)}
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
        }}
        align="center">
        {row.PE.changeinOpenInterest === 0
          ? "-"
          : row.PE.changeinOpenInterest.toFixed(2)}
      </StyledTableCell>
      <StyledTableCell
        row={row}
        ltp={ltp}
        ce={0}
        interval={interval}
        align="center">
        {row.PE.openInterest === 0
          ? "-"
          : updateMoney(row.PE.openInterest * 25)}
      </StyledTableCell>
    </TableRow>
  );
};
export default OptionsTable;
