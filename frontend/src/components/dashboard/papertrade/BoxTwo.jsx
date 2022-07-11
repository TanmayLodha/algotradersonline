import React, { useState, useContext } from "react";
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
import { StrategiesContext } from "../../../StrategiesContext";

function BoxTwo({ submit, setSubmit, current }) {
  const { strategies } = useContext(StrategiesContext);

  const [open, setOpen] = useState(false);
  const snackBarClose = () => {
    setOpen(false);
  };

  const [strat, setStrat] = useState({ id: "" });
  const handleChange = (event) => {
    setStrat({ id: event.target.value });
  };

  const handleSubmit = () => {
    createFile(strat, current);
    setTimeout(execPaperTrade, 3000, current, setOpen);
    setSubmit(!submit);
  };

  const handleStop = () => {
    fetch(BaseURL + "api/stop_trades/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${current.data.token}`,
      },
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
  fetch(BaseURL + "api/paper_trade/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${current.data.token}`,
    },
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
