import React, { useState } from "react";
import { Card, Grid } from "@mui/material";
import OptionsSettings from "./OptionsSettings";
import OptionsTable from "./OptionsTable";
import CurrentDataCard from "./CurrentDataCard";
import { BaseURL } from "../../../BaseURL";

function OptionsData() {
  const [data, setData] = useState(null);
  const [expiryDates, setExpiryDates] = useState([]);
  const [ltp, setltp] = useState([]);
  const [filter, setFilter] = useState({
    iv: true,
    price: true,
    pChange: true,
    bidAsk: false,
  });

  const handleSubmit = (val, stock, date) => {
    let request;
    if (val === "") {
      request = { symbol: stock, date: date };
    } else {
      request = { symbol: val, date: date };
    }
    fetch(BaseURL + "api/options_data/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    })
      .then((response) => {
        if (response.ok === true) return response.json();
        else {
          throw new Error();
        }
      })
      .then((data) => {
        setData(data[0]);
        console.log(data[0]);
        setExpiryDates(data[1]);
        setltp(Math.round(data[2][0].ltp));
        setltp(Math.round(data[2][0].ltp));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      <Grid item xs={6}>
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: "0px 0px 10px 5px rgba(0,0,0,0.1)",
            transition: " all .15s ease-in-out",
            p: 2,
            ml: 3,
          }}>
          <OptionsSettings
            handleSubmit={handleSubmit}
            expiryDates={expiryDates}
            filter={filter}
            setFilter={setFilter}
          />
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: "0px 0px 10px 5px rgba(0,0,0,0.1)",
            transition: " all .15s ease-in-out",
            p: 2,
            ml: 1,
          }}>
          <CurrentDataCard ltp={ltp} data={data} />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: "0px 0px 10px 5px rgba(0,0,0,0.1)",
            transition: " all .15s ease-in-out",
            p: 2,
            mb: 3,
            ml: 3,
          }}>
          <OptionsTable data={data} ltp={ltp} filter={filter} />
        </Card>
      </Grid>
    </Grid>
  );
}

export default OptionsData;
