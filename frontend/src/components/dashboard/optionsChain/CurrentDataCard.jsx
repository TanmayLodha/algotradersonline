import React from "react";
import { Box, Typography } from "@mui/material";
function CurrentDataCard({ ltp, data }) {
  return (
    <Box>
      <Typography
        variant="subtitle"
        sx={{ fontSize: "0.9rem", fontWeight: 400 }}>
        Current Data
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: 1,
        }}>
        <Typography varient="h1" sx={{ fontSize: "1.8rem", fontWeight: "500" }}>
          {data && data[0].CE.underlying}
        </Typography>
        <Typography varient="h1" sx={{ fontSize: "6rem", fontWeight: "600" }}>
          {data && ltp}
        </Typography>
      </Box>
    </Box>
  );
}

export default CurrentDataCard;
