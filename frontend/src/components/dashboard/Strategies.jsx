import { Button, Card, CardActions, CardContent } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import "./stratergies.scss";
import Skeleton from "@mui/material/Skeleton";
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";
import { UserContext } from "../../UserContext";

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

  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);

  const snackBarClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
    // setId(props.id);
    execute();
  };
  console.log(id);
  return (
    <>
      <Snackbar
        open={open}
        onClose={snackBarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert severity="success" variant="filled">
          Strategy is being executed. Check your AliceBlue portal for entries.
        </Alert>
      </Snackbar>
      <Card className="strat-card">
        <CardContent>
          <div className="name">
            <h3>{props.name}</h3>
            <p>Past Performance: 10</p>
          </div>
        </CardContent>
        <CardActions>
          <Button className="in-btn" onClick={handleOpen}>
            Execute
          </Button>
          {open && (
            <Button className="in-btn stop" onClick={snackBarClose}>
              STOP
            </Button>
          )}
        </CardActions>
      </Card>
    </>
  );
};

export default Strategies;
