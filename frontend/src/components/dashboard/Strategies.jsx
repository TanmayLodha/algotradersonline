import { Button, Card, CardActions, CardContent } from "@mui/material";
import { Pagination } from "@mui/material";
import React, { useState, useContext } from "react";
import "./stratergies.scss";
import fake from "./fakedata.json";
import { UserContext } from "../../UserContext";

function Strategies() {
  const [page, setPage] = useState(1);

  return (
    <div className="main-s">
      <h1>Strategies</h1>
      <hr />
      <div className="stratergy">
        {fake.map((data, i) => {
          return <StrategiesCard props={data} key={i} />;
        })}
      </div>
      <h1>{page}</h1>
      <Pagination
        count={10}
        color="secondary"
        size="large"
        showFirstButton={true}
        showLastButton={true}
        onChange={(event, value) => setPage(value)}
      />
    </div>
  );
}

const StrategiesCard = ({ props }) => {
  return (
    <Card className="strat-card">
      <CardContent>
        <div className="name">
          <h5>{props.title}</h5>
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
