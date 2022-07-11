import React, { useState } from "react";
import { Typography } from "@mui/material";
import { useEffect } from "react";
function BoxOne({ achievedData, total }) {
  const [paperMoney, setPaperMoney] = useState(0);
  useEffect(() => {
    setPaperMoney(
      (achievedData.length * 100000 + total).toLocaleString("en-IN", {
        maximumFractionDigits: 2,
        style: "currency",
        currency: "INR",
      })
    );
  }, [paperMoney, total, achievedData]);
  return (
    <>
      <Typography
        variant="subtitle"
        sx={{ fontSize: "0.9rem", fontWeight: 400 }}>
        Paper Account Value
      </Typography>
      <Typography
        variant="h1"
        sx={{ fontSize: "3rem", fontWeight: 600, mt: 2 }}>
        {paperMoney}
      </Typography>
    </>
  );
}

export default BoxOne;
