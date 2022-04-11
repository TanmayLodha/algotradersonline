import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import "./papertrade.scss";

function PaperTrade() {
  const [val, setVal] = useState("");
  const histo = () => {
    const cred = { ticker: val };
    console.log(JSON.stringify(cred));
    fetch("http://127.0.0.1:8000/api/historical/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cred),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div className="main-p">
      <h1>PaperTrade</h1>
      <hr />
      <div className="paper">
        <TextField value={val} onChange={(e) => setVal(e.target.value)} />
        <Button onClick={histo}>Get data</Button>
      </div>
    </div>
  );
}

export default PaperTrade;
