import React from "react";
import { Box, Typography } from "@mui/material";
function CurrentDataCard({ ltp, data }) {
  return (
    <Box sx={{ height: "195px", display: "flex" }}>
      <Typography varient="h1" sx={{ fontSize: "1.5rem", fontWeight: "500" }}>
        {data[0].CE.underlying}
      </Typography>
      <Typography
        varient="h1"
        sx={{ fontSize: "1.5rem", fontWeight: "600", ml: 3 }}>
        {ltp}
      </Typography>
    </Box>
  );
}

export default CurrentDataCard;
