import React from "react";
import { Typography } from "@mui/material";
function BoxOne({ paperMoney }) {
  return (
    <>
      <Typography
        variant="subtitle"
        sx={{ fontSize: "0.9rem", fontWeight: 400 }}>
        Net Paper Account Value
      </Typography>
      <Typography
        variant="h1"
        sx={{ fontSize: "3rem", fontWeight: 600, mt: 2 }}>
        ₹ {paperMoney}
      </Typography>
    </>
  );
}

export default BoxOne;
