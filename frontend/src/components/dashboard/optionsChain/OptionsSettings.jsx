import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { SCRIPT_LIST } from "./scriptList";

function OptionsSettings({
  handleSubmit,
  expiryDates,
  filter,
  setFilter,
  ltp,
  data,
}) {
  const [val, setVal] = useState("");
  const [date, setDate] = useState("");
  const [stock, setStock] = useState("");
  useEffect(() => {
    setDate(expiryDates.length === 0 ? "" : expiryDates[0]);
  }, [expiryDates]);

  const handleValChange = (event) => {
    setStock("");
    setDate("");
    setVal(event.target.value);
  };
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleStockChange = (event) => {
    setVal("");
    setDate("");
    setStock(event.target.value);
  };

  return (
    <>
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
            mt: 2,
            flexWrap: "wrap",
          }}>
          <FormControl sx={{ m: 1, minWidth: 150 }}>
            <InputLabel id="demo-simple-select-label" sx={{ zIndex: 0 }}>
              Select Index
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={val}
              label="Select Index"
              onChange={handleValChange}>
              <MenuItem value={"BANKNIFTY"}>BANKNIFTY</MenuItem>
              <MenuItem value={"NIFTY"}>NIFTY</MenuItem>
            </Select>
          </FormControl>

          <Typography
            variant="subtitle"
            sx={{ fontSize: "1.3rem", fontWeight: 400, mr: 2, ml: 2 }}>
            OR
          </Typography>

          <FormControl sx={{ m: 1, minWidth: 150 }}>
            <InputLabel id="demo-simple-select-label" sx={{ zIndex: 0 }}>
              Select Stock
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={stock}
              label="Select Stock"
              onChange={handleStockChange}>
              {SCRIPT_LIST.map((value, id) => {
                return (
                  <MenuItem value={value} key={id}>
                    {value}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <FormControl
            sx={{ m: 1, minWidth: 200 }}
            disabled={expiryDates.length === 0 ? true : false}>
            <InputLabel id="demo-simple-select-label" sx={{ zIndex: 0 }}>
              Select Expiry Date
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={date}
              label="Select Expiry Date"
              onChange={handleDateChange}>
              {expiryDates.map((value, id) => {
                return (
                  <MenuItem value={value} key={id}>
                    {value}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Button
            disabled={val !== "" || stock !== "" ? false : true}
            type="submit"
            variant="contained"
            sx={{
              ml: 2,
              height: "50px",
            }}
            onClick={() => handleSubmit(val, stock, date)}>
            Fetch
          </Button>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography
            variant="subtitle"
            sx={{ fontSize: "0.9rem", fontWeight: 200, ml: 2 }}>
            Filters
          </Typography>
          <Box sx={{ m: 1 }}>
            <Button
              type="submit"
              variant={filter.iv === true ? "contained" : "outlined"}
              sx={{
                m: 1,
              }}
              onClick={() => setFilter({ ...filter, iv: !filter.iv })}>
              IV
            </Button>

            <Button
              type="submit"
              variant={filter.pChange === true ? "contained" : "outlined"}
              sx={{
                m: 1,
              }}
              onClick={() =>
                setFilter({ ...filter, pChange: !filter.pChange })
              }>
              % Change
            </Button>
            <Button
              type="submit"
              variant={filter.price === true ? "contained" : "outlined"}
              sx={{
                m: 1,
              }}
              onClick={() => setFilter({ ...filter, price: !filter.price })}>
              LTP
            </Button>
            <Button
              type="submit"
              variant={filter.bidAsk === true ? "contained" : "outlined"}
              sx={{
                m: 1,
              }}
              onClick={() => setFilter({ ...filter, bidAsk: !filter.bidAsk })}>
              Bid/ASK
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default OptionsSettings;
