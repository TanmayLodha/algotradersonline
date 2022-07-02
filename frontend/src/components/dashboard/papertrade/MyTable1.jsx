import React, { useEffect, useState } from "react";
import { BaseURL } from "../../../BaseURL";
import { Typography } from "@mui/material";

function compare(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

function MyTable({ data, updateMoney }) {
  data.sort(compare);
  const [ltp, setLtp] = useState(Array(data.length).fill({ ltp: 0 }));
  console.log(ltp);

  const getLTP = async () => {
    const arr = data.map((item) => item.name);
    console.log(arr);
    const request = { instrument: arr };
    const response = await fetch(BaseURL + "api/get_ltp/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    }).then((response) => {
      if (response.ok === true) return response.json();
      else {
        throw new Error();
      }
    });
    setLtp(response);
  };

  // LTP is updated every second
  useEffect(() => {
    getLTP();
    const interval = setInterval(() => {
      getLTP();
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      {ltp.map((row, id) => (
        <Typography key={id}>{row.name}</Typography>
      ))}
    </>
  );
}

export default MyTable;
