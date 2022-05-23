import { Card, CardActions, CardContent, Snackbar, Alert } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./stratergies.scss";
import Skeleton from "@mui/material/Skeleton";
import StrategiesCard from "./StrategiesCard";

function Strategies() {
  const [strategies, setStrategies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");

  const snackBarClose = () => {
    setOpen(false);
  };

  const message = () => {
    setMsg("Server is not responding. Please try again later");
    setOpen(true);
  };

  useEffect(() => {
    fetch("http://172.22.2.67:8000/api/strategies/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        setStrategies(data);
        console.log(strategies);
        setLoading(true);
      })
      .catch((error) => {
        setTimeout(message, 10000);
      });
  }, [loading]);

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={snackBarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert severity="error" variant="filled">
          {msg}
        </Alert>
      </Snackbar>
      <div className="main-s">
        <h1>Strategies</h1>
        <hr />
        {loading ? (
          <div className="stratergy">
            {strategies.map((data, i) => {
              return <StrategiesCard props={data} key={i} />;
            })}
          </div>
        ) : (
          <Card className="strat-card">
            <CardContent>
              <div className="name">
                <Skeleton animation="wave" height={80} width="100%" />
                <Skeleton animation="wave" height={40} width="100%" />
              </div>
            </CardContent>
            <CardActions>
              <Skeleton
                className="in-btn"
                animation="wave"
                height={50}
                width="30%"
              />
            </CardActions>
          </Card>
        )}
      </div>
    </>
  );
}

export default Strategies;
