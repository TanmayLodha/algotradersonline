import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import StrategiesCard from "./StrategiesCard";
import { BaseURL } from "../../../BaseURL";

function Strategies({ toggle, strategy }) {
  const [strategies, setStrategies] = useState([]);

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

  return (
    <>
      <Box
        component="main"
        sx={{
          width: "89vw",
          ml: 1,
          p: 1,
          display: "flex",
        }}>
        {strategies.map((data, i) => {
          return (
            <StrategiesCard
              props={data}
              key={i}
              toggle={toggle}
              strategy={strategy}
            />
          );
        })}
      </Box>
    </>
  );
}

export default Strategies;
