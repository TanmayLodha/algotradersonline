import { Button, Card, CardActions, CardContent } from "@mui/material";
import { Pagination } from "@mui/material";
import React, { useState, useContext } from "react";
import "./stratergies.scss";
import fake from "./fakedata.json";
import { UserContext } from "../../UserContext";

function Strategies() {
  return (
    <div className="main-s">
      <h1>Strategies</h1>
      <hr />
      <div className="stratergy">
        {fake.map((data, i) => {
          return <StrategiesCard props={data} key={i} />;
        })}
      </div>
    </div>
  );
}

const StrategiesCard = ({ props }) => {
  return (
    <Card className="strat-card">
      <CardContent>
        <div className="name">
          <h4>{props.title}</h4>
          <p>P&L: {props.price}</p>
        </div>
        <p>{props.category}</p>
      </CardContent>
      <CardActions>
        <Button className="in-btn">Execute</Button>
      </CardActions>
    </Card>
  );
};

export default Strategies;

// Name, past performance, execute button
