import React, { useState, useEffect, useContext } from "react";
import {
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { BaseURL } from "../../../BaseURL";
import { createFile } from "../strategies/createFile";
import { UserContext } from "../../../UserContext";

function BoxTwo() {
  const [strategies, setStrategies] = useState([]);
  // dropdown states
  const [strat, setStrat] = React.useState({ id: "" });
  const handleChange = (event) => {
    setStrat({ id: event.target.value });
  };

  const { user } = useContext(UserContext);
  const current = JSON.parse(user);
  const [submit, setSubmit] = useState(false);

  const handleSubmit = () => {
    createFile(strat, current);
    setTimeout(execPaperTrade, 3000, current, setOpen);
    setSubmit(!submit);
  };

  // useEffect(() => {
  //   const u = JSON.parse(localStorage.getItem("submit"));
  //   const v = JSON.parse(localStorage.getItem("strat"));
  //   setSubmit(u);
  //   setStrat(v);
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("submit", submit);
  //   localStorage.setItem("strat", JSON.stringify(strat));
  // }, [submit, strat]);

  const handleStop = () => {
    const request = { username: current.data.username };
    fetch(BaseURL + "api/stop_trades/", {
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
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    setSubmit(!submit);
  };

  useEffect(() => {
    fetch(BaseURL + "api/strategies/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        setStrategies(data);
      })
      .catch((error) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [open, setOpen] = useState(false);
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
        <Alert severity="success" variant="filled">
          Papertrade has started. Please be patient for entries!
        </Alert>
      </Snackbar>
      <Box>
        <Typography
          variant="subtitle"
          sx={{ fontSize: "0.9rem", fontWeight: 400 }}>
          Settings
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 2,
          }}>
          <FormControl disabled={submit}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Strategy
            </InputLabel>
            <Select
              defaultValue={""}
              sx={{ minWidth: 120 }}
              labelid="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={strat.id}
              label="Strategy"
              autoWidth
              onChange={handleChange}>
              {strategies.map((data, i) => {
                return (
                  <MenuItem value={data.id} key={i}>
                    {data.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Typography
            variant="subtitle"
            sx={{ fontSize: "1rem", fontWeight: 400, ml: 2 }}>
            <ArrowForwardIcon />
          </Typography>
          {/* <TextField
            disabled={submit}
            required
            label="Amount you want to spend"
            type="text"
            name="Money"
            value={current.money}
            onChange={(e) => setCurrent({ ...current, money: e.target.value })}
            sx={{ ml: 2, width: 250 }}
          />
          <Typography
            variant="subtitle"
            sx={{ fontSize: "1rem", fontWeight: 400, ml: 2 }}>
            <ArrowForwardIcon />
          </Typography> */}
          {!submit ? (
            <Button
              type="submit"
              variant="contained"
              sx={{ ml: 2, height: 55 }}
              onClick={handleSubmit}>
              Execute
            </Button>
          ) : (
            <Button
              type="submit"
              variant="contained"
              sx={{
                ml: 2,
                height: 55,
                backgroundColor: "red",
                "&:hover": {
                  backgroundColor: "#FF2E2E",
                  color: "#ffff",
                },
              }}
              onClick={handleStop}>
              Stop Execution
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
}

const execPaperTrade = (current, setOpen) => {
  const request = { username: current.data.username };
  fetch(BaseURL + "api/paper_trade/", {
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
      setOpen(true);
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default BoxTwo;
