import {
  Card,
  CardContent,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import { BaseURL } from "../../../BaseURL";
import { UserContext } from "../../../UserContext";
import UserDataGrid from "./UserDataGrid";
import Stats from "./Stats";

function Portfolio() {
  const { user } = useContext(UserContext);
  const current = JSON.parse(user);
  const [data, setData] = useState([]);
  const [delta, setDelta] = useState(0);

  let date = new Date();

  const getData = (delta = 0) => {
    const request = {
      delta: delta,
    };
    fetch(BaseURL + "api/get_summary/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${current.data.token}`,
      },
      body: JSON.stringify(request),
    })
      .then((response) => {
        if (response.ok === true) return response.json();
        else {
          throw new Error();
        }
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Fetch today's data
  useEffect(
    () => getData(),
    // eslint-disable-next-line
    []
  );

  const handleDeltaChange = (event) => {
    setDelta(event.target.value);
    getData(event.target.value);
  };

  return (
    <Grid container>
      <Grid item xs={4}>
        <Card
          sx={{
            mt: 1,
            ml: 3,
            p: 1,
            borderRadius: 3,
            height: "250px",
            boxShadow: "0px 0px 10px 5px rgba(0,0,0,0.1)",
            transition: " all .15s ease-in-out",
          }}>
          <CardContent>
            <Typography
              variant="h1"
              sx={{ fontSize: "2rem", fontWeight: 600, m: 1 }}>
              Investment Summary
            </Typography>
            <FormControl sx={{ m: 1, mt: 5, minWidth: 200 }}>
              <InputLabel id="demo-simple-select-label" sx={{ zIndex: 0 }}>
                Select Duration
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={delta}
                label="Select Duration"
                onChange={handleDeltaChange}>
                <MenuItem value={0}>Today</MenuItem>
                <MenuItem value={date.getDay() === 0 ? 1 : date.getDay()}>
                  This Week
                </MenuItem>
                <MenuItem value={date.getDate()}>This Month</MenuItem>
                <MenuItem
                  value={
                    Math.floor(
                      (date - new Date(date.getFullYear(), 0, 0)) /
                        (1000 * 60 * 60 * 24)
                    ) - 1
                  }>
                  This Year
                </MenuItem>
                <MenuItem value={-1}>All time</MenuItem>
              </Select>
            </FormControl>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={8}>
        <Stats data={data} />
      </Grid>
      <Grid item xs={12}>
        <UserDataGrid data={data} />
      </Grid>
    </Grid>
  );
}

export default Portfolio;
