import React from "react";
import { Box, Typography } from "@mui/material";
function CurrentDataCard({ ltp, current }) {
  return (
    <Box>
      <Typography
        variant="subtitle"
        sx={{ fontSize: "0.9rem", fontWeight: 400 }}>
        Current LTP
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: 1,
        }}>
        <Typography varient="h1" sx={{ fontSize: "1.8rem", fontWeight: "500" }}>
          {current}
        </Typography>
        <Typography varient="h1" sx={{ fontSize: "6rem", fontWeight: "600" }}>
          {ltp.toLocaleString("en-IN", {
            maximumFractionDigits: 0,
            style: "currency",
            currency: "INR",
          })}
        </Typography>
      </Box>
    </Box>
  );
}

export default CurrentDataCard;
