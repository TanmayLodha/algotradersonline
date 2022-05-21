import {
  Button,
  Card,
  CardActions,
  CardContent,
  Snackbar,
  TextField,
  Alert,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import "./stratergies.scss";
import Skeleton from "@mui/material/Skeleton";
import Backdrop from "@mui/material/Backdrop";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import { Link } from "react-router-dom";

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

  const [backdrop, setBackdrop] = useState(false);
  const [msg, setMsg] = useState(false);

  const handleBDClose = () => {
    setBackdrop(false);
  };
  const handleBackdrop = () => {
    setBackdrop(!backdrop);
  };

  const handleMsgClose = () => {
    setMsg(false);
  };
  const handleMsg = () => {
    setMsg(!msg);
  };

  return (
    <>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={backdrop}>
        <AliceInputs
          backdropFunction={handleBDClose}
          successFunction={handleMsg}
        />
      </Backdrop>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={msg}>
        <Card className="succ-card">
          <CardContent>
            <h1>Congrats!</h1>
            <div className="icon">
              <PublishedWithChangesIcon color="success" sx={{ fontSize: 90 }} />
            </div>
            <p>
              Strategy is being executed. Please check your aliceblue portal for
              entries.
            </p>
          </CardContent>
          <div className="btns">
            <Button className="in-btn" onClick={handleMsgClose}>
              Stop Execution
            </Button>
          </div>
        </Card>
      </Backdrop>
      <Card className="strat-card">
        <CardContent>
          <div className="name">
            <h3>{props.name}</h3>
            <p>Past Performance: 10</p>
          </div>
        </CardContent>
        <CardActions>
          <Button className="in-btn" onClick={handleBackdrop}>
            Execute
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

const AliceInputs = (props) => {
  const [password, setPassword] = useState("");
  const [twoFA, setTwoFA] = useState("");
  const [apikey, setApikey] = useState("");
  const [apisecret, setApisecret] = useState("");

  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");

  const msglist = [
    "Field cannot be empty",
    "Invalid Password! Account cannot be connected",
  ];
  const snackBarClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    props.backdropFunction();
  };

  const handleEvent = (e) => {
    e.preventDefault();
    if (password === "") {
      setMsg(msglist[0]);
      setOpen(true);
      return;
    }
    const credentials = { password: password };
    fetch("http://172.22.2.67:8000/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    })
      .then((response) => {
        if (response.ok === true) return response.json();
        else {
          throw new Error();
        }
      })
      .then((data) => {
        console.log(data);
        props.backdropFunction();
        props.successFunction();
      })
      .catch((error) => {
        setMsg(msglist[1]);
        setOpen(true);
      });
  };

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
      <Card className="pass-card">
        <CardContent>
          <div className="fileds">
            <h3>Please enter your Aliceblue password</h3>
            <TextField
              required
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="field"
            />
            <TextField
              required
              label="twoFA"
              type="password"
              name="twofa"
              value={twoFA}
              onChange={(e) => setTwoFA(e.target.value)}
              className="field"
            />
            <TextField
              required
              label="api_key"
              type="password"
              name="key"
              value={apikey}
              onChange={(e) => setApikey(e.target.value)}
              className="field"
            />
            <TextField
              required
              label="api_secret"
              type="text"
              name="secret"
              value={apisecret}
              onChange={(e) => setApisecret(e.target.value)}
              className="field"
            />
            <p className="maintext">
              To generate api key and api secret, login to your aliceblue
              developers console and create an app. You can do this by clicking
              on&nbsp;
              <a
                href="https://develop-api.aliceblueonline.com/"
                target="_blank"
                className="link">
                <strong>this</strong>
              </a>
              &nbsp;link.
            </p>

            <p className="sidetext">
              These details are required so we can directly execute orders to
              your account.
            </p>
          </div>
        </CardContent>
        <div className="btns">
          <Button className="in-btn" onClick={handleEvent}>
            Submit
          </Button>
          <Button className="in-btn" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </Card>
    </>
  );
};

export default Strategies;
