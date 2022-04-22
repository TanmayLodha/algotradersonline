import { Button, Card, CardActions, CardContent } from "@mui/material";
import { Pagination } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import "./stratergies.scss";
import fake from "./fakedata.json";
import { UserContext } from "../../UserContext";

function Strategies() {
  const [strategies, setStrategies] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/strategies/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setStrategies(data);
      });
  }, []);

  return (
    <div className="main-s">
      <h1>Strategies</h1>
      <hr />
      <div className="stratergy">
        {strategies.map((data, i) => {
          return <StrategiesCard props={data} key={i} />;
        })}
      </div>
    </div>
  );
}

const StrategiesCard = ({ props }) => {
  const execute = () => {
    fetch(`http://127.0.0.1:8000/api/strategies/${props.id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <Card className="strat-card">
      <CardContent>
        <div className="name">
          <h3>{props.name}</h3>
          <p>Past Performance: 10</p>
        </div>
      </CardContent>
      <CardActions>
        <Button className="in-btn" onClick={execute}>
          Execute
        </Button>
      </CardActions>
    </Card>
  );
};

export default Strategies;
