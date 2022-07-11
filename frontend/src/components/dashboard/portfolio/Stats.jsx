import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Stats = ({ data }) => {
  let maxTrade =
    data.length === 0
      ? 0
      : data.reduce((a, b) => (a.net_pl > b.net_pl ? a : b));

  let total =
    data.length === 0 ? 0 : data.reduce((total, obj) => obj.net_pl + total, 0);

  return (
    <Grid container>
      <Grid item xs={6}>
        <Card
          sx={{
            mt: 1,
            ml: 1,
            p: 1,
            borderRadius: 3,
            height: "250px",
            boxShadow: "0px 0px 10px 5px rgba(0,0,0,0.1)",
            transition: " all .15s ease-in-out",
          }}>
          <CardContent>
            <Typography varient="subtitle" sx={{ fontWeight: 600 }}>
              Total Equity
            </Typography>
            {data.length === 0 ? (
              <Typography
                varient="subtitle"
                sx={{ fontWeight: 500, fontSize: "1rem", mt: 2 }}>
                No Trades made in this duration
              </Typography>
            ) : (
              <>
                <Typography
                  varient="subtitle"
                  sx={{ fontWeight: 600, fontSize: "3rem", mt: 1 }}>
                  ₹
                  {(total + data.length * 100000).toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}
                </Typography>
                {total >= 0 ? (
                  <Typography
                    varient="subtitle"
                    sx={{
                      fontWeight: 600,
                      fontSize: "3rem",
                      color: "green",
                      display: "flex",
                      alignItems: "center",
                    }}>
                    <ArrowDropUpIcon sx={{ fontSize: "5rem" }} />₹
                    {total.toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                    })}
                  </Typography>
                ) : (
                  <Typography
                    varient="subtitle"
                    sx={{
                      fontWeight: 600,
                      fontSize: "3rem",
                      color: "red",
                      display: "flex",
                      alignItems: "center",
                    }}>
                    <ArrowDropDownIcon sx={{ fontSize: "5rem" }} />₹
                    {total.toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                    })}
                  </Typography>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card
          sx={{
            mt: 1,
            ml: 1,
            p: 1,
            borderRadius: 3,
            height: "250px",
            boxShadow: "0px 0px 10px 5px rgba(0,0,0,0.1)",
            transition: " all .15s ease-in-out",
          }}>
          <CardContent>
            <Typography varient="subtitle" sx={{ fontWeight: 600 }}>
              Most profitale trade in this duration
            </Typography>
            {data.length === 0 ? (
              <Typography
                varient="subtitle"
                sx={{ fontWeight: 500, fontSize: "1rem", mt: 2 }}>
                No Trades made in this duration
              </Typography>
            ) : (
              <>
                <Typography
                  varient="subtitle"
                  sx={{ fontWeight: 600, fontSize: "3rem", mt: 2 }}>
                  ₹
                  {maxTrade.net_pl.toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}
                </Typography>
                <Typography
                  varient="subtitle"
                  sx={{ fontWeight: 500, fontSize: "1.2rem" }}>
                  {maxTrade.name} on {maxTrade.date}
                </Typography>
              </>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Stats;
