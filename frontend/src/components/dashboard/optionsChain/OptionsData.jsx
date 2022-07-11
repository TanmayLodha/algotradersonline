import React, { useState, useEffect, useContext } from "react";
import { Card, Grid, Snackbar, Alert } from "@mui/material";
import OptionsSettings from "./OptionsSettings";
import OptionsTable from "./OptionsTable";
import CurrentDataCard from "./CurrentDataCard";
import { BaseURL } from "../../../BaseURL";
import { UserContext } from "../../../UserContext";

function OptionsData() {
  const { user } = useContext(UserContext);
  const cUser = JSON.parse(user);
  const [data, setData] = useState(null);
  const [expiryDates, setExpiryDates] = useState([]);
  const [ltp, setltp] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [current, setCurrent] = useState("");

  const [filter, setFilter] = useState({
    iv: true,
    price: true,
    pChange: true,
    bidAsk: false,
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = (val, stock, date) => {
    let request;
    setLoading(true);
    if (val === "") {
      setCurrent(stock);
      localStorage.setItem("currentItem", stock);
      request = { symbol: stock, date: date };
    } else {
      localStorage.setItem("currentItem", val);
      setCurrent(val);
      request = { symbol: val, date: date };
    }
    fetch(BaseURL + "api/options_data/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${cUser.data.token}`,
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
        setData(data[0]);
        setExpiryDates(data[1]);
        date === "" ? setCurrentDate(data[1][0]) : setCurrentDate(date);
        setltp(Math.round(data[2][0].ltp));
        setLoading(false);
        localStorage.setItem("data", JSON.stringify(data[0]));
        localStorage.setItem("expiry", JSON.stringify(data[1]));
        localStorage.setItem("ltp", Math.round(data[2][0].ltp));
      })
      .catch((error) => {
        setOpen(true);
        setLoading(false);
        console.log(error);
      });
  };
  const [local, setLocal] = useState(false);

  const localClose = () => {
    setLocal(false);
  };

  useEffect(() => {
    if (data === null && localStorage.getItem("data")) {
      setLocal(true);
      setData(JSON.parse(localStorage.getItem("data")));
      setExpiryDates(JSON.parse(localStorage.getItem("expiry")));
      setltp(localStorage.getItem("ltp"));
      setCurrent(localStorage.getItem("currentItem"));
    }
  }, [data]);

  const snackBarClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={snackBarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert severity="error" variant="filled">
          Internal Server Error. Please try again later!
        </Alert>
      </Snackbar>
      <Snackbar
        open={local}
        autoHideDuration={2000}
        onClose={localClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert severity="success" variant="filled">
          Data restored from your local storage.
        </Alert>
      </Snackbar>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={6}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0px 0px 10px 5px rgba(0,0,0,0.1)",
              transition: " all .15s ease-in-out",
              height: "325px",
              p: 2,
              ml: 3,
            }}>
            <OptionsSettings
              handleSubmit={handleSubmit}
              expiryDates={expiryDates}
              filter={filter}
              setFilter={setFilter}
              currentDate={currentDate}
              loading={loading}
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
              height: "325px",
              ml: 1,
            }}>
            <CurrentDataCard ltp={ltp} current={current} />
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
    </>
  );
}

export default OptionsData;
