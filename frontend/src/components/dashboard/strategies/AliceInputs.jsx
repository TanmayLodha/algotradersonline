import {
  Button,
  Card,
  CardContent,
  Snackbar,
  TextField,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import ConfirmExecution from "./ConfirmExecution";
import "./stratergies.scss";

const AliceInputs = (props) => {
  const [password, setPassword] = useState("");
  const [twoFA, setTwoFA] = useState("");
  const [apikey, setApikey] = useState("");
  const [apisecret, setApisecret] = useState("");
  console.log(props.userData.data.username);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [confirm, setConfirm] = useState(false);

  const msglist = ["Fields cannot be empty", "Server error"];
  const snackBarClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    props.backdropFunction();
  };

  const handleEvent = (e) => {
    e.preventDefault();
    if (password === "" || twoFA === "" || apikey === "" || apisecret === "") {
      setMsg(msglist[0]);
      setOpen(true);
      return;
    }

    // POST user credentials to the database
    const credentials = {
      userName: props.userData.data.username,
      twoFA: twoFA,
      api_key: apikey,
      api_secret: apisecret,
      password: password,
    };
    fetch("http://172.22.2.67:8000/api/postCred/", {
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
        createFile();
      })
      .catch((error) => {
        setMsg(msglist[1]);
        setOpen(true);
      });
  };

  const createFile = () => {
    // Update the unique user file with credentials and appned the strategy
    const request = { username: props.userData.data.username };

    fetch(`http://172.22.2.67:8000/api/strategies/${props.strategyid}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    })
      .then((response) => {
        if (response.ok === true) return response.json();
        else {
          throw new Error();
        }
      })
      .then((data) => {
        console.log(data);
        setTimeout(5000); //Check this timeout
        execfile();
        props.backdropFunction();
        props.successFunction();
      })
      .catch((error) => {
        setMsg(msglist[1]);
        setOpen(true);
      });
  };

  const execfile = () => {
    // Execute File

    const request = { username: props.userData.data.username };
    fetch("http://172.22.2.67:8000/api/execute/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    })
      .then((response) => {
        if (response.ok === true) return response.json();
        else {
          throw new Error();
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
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
      {confirm ? (
        <ConfirmExecution />
      ) : (
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
                type="text"
                name="key"
                value={apikey}
                onChange={(e) => setApikey(e.target.value)}
                className="field"
              />
              <TextField
                required
                label="api_secret"
                type="password"
                name="secret"
                value={apisecret}
                onChange={(e) => setApisecret(e.target.value)}
                className="field"
              />
              <p className="maintext">
                To generate api key and api secret, login to your aliceblue
                developers console and create an app. You can do this by
                clicking on&nbsp;
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
      )}
    </>
  );
};

export default AliceInputs;
