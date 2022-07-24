import { Box } from "@mui/material";
import React, { useContext } from "react";
import StrategiesCard from "./StrategiesCard";
import { StrategiesContext } from "../../../StrategiesContext";

function Strategies({ toggle, strategy }) {
  const { strategies } = useContext(StrategiesContext);
  console.log(strategies);

  return (
    <>
      <Box
        component="main"
        sx={{
          ml: 1,
          p: 1,
          display: "flex",
          flexWrap: "wrap",
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
