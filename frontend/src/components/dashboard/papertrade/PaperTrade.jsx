import React, { useState } from "react";
import { Box, Card } from "@mui/material";
import BoxOne from "./BoxOne";
import BoxTwo from "./BoxTwo";
import BoxThree from "./BoxThree";

function PaperTrade() {
  const [paperMoney, setPaperMoney] = useState(0);

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
      otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
      lastThree +
      afterPoint;
    setPaperMoney(res);
  };

  return (
    <Box
      component="main"
      sx={{
        pt: 3,
        pr: 3,
        display: "flex",
        flexDirection: "column",
      }}>
      <Box sx={{ display: "flex" }}>
        <Card
          sx={{
            width: "29vw",
            height: "12vw",
            ml: 1,
            p: 2,
            borderRadius: 3,
            boxShadow: "0px 0px 10px 5px rgba(0,0,0,0.1)",
            transition: " all .15s ease-in-out",
          }}>
          <BoxOne paperMoney={paperMoney} />
        </Card>
        <Card
          sx={{
            width: "60vw",
            height: "12vw",
            ml: 2,
            p: 2,

            borderRadius: 3,
            boxShadow: "0px 0px 10px 5px rgba(0,0,0,0.1)",
            transition: " all .15s ease-in-out",
          }}>
          <BoxTwo />
        </Card>
      </Box>
      <Card
        sx={{
          mt: 2,
          ml: 1,
          p: 2,
          borderRadius: 3,
          boxShadow: "0px 0px 10px 5px rgba(0,0,0,0.1)",
          transition: " all .15s ease-in-out",
        }}>
        <BoxThree updateMoney={updateMoney} />
      </Card>
    </Box>
  );
}

export default PaperTrade;
