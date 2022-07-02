import {
  Button,
  Card,
  CardContent,
  Snackbar,
  TextField,
  Alert,
  Typography,
  CardActions,
} from "@mui/material";

import React, { useState, useContext } from "react";
import { UserContext } from "../../../UserContext";
import { createFile } from "./createFile";
import { execfile } from "./execFile";
import { BaseURL } from "../../../BaseURL";

// Tesey user globally. Send a response from backend yo update
// isCredential value

const AliceInputs = ({ close, strategy, succ }) => {
  const { user } = useContext(UserContext);
  const current = JSON.parse(user);
  const [details, setDetails] = useState({
    password: "",
    twoFA: "",
    apikey: "",
    apisecret: "",
  });

  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");

  const msglist = ["Fields cannot be empty", "Server error"];

  const snackBarClose = () => {
    setOpen(false);
  };

  const handleEvent = (e) => {
    e.preventDefault();
    if (
      details.password === "" ||
      details.twoFA === "" ||
      details.apikey === "" ||
      details.apisecret === ""
    ) {
      setMsg(msglist[0]);
      setOpen(true);
      return;
    }

    // POST user credentials to the database
    const credentials = {
      userName: current.data.username,
      twoFA: details.twoFA,
      api_key: details.apikey,
      api_secret: details.apisecret,
      password: details.password,
    };

    createFile(strategy, current);
    execfile(current);
    setTimeout(5000); //Check this timeout
    close();
    succ(true);

    fetch(BaseURL + "api/postCred/", {
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
        createFile(strategy, current);
        execfile(current);
        setTimeout(5000); //Check this timeout
        close();
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

      <Card
        sx={{
          width: "50vw",
          p: 2,
          borderRadius: 3,
          transition: " all .15s ease-in-out",
        }}>
        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            component="h1"
            sx={{ fontSize: "1.7rem", fontWeight: 600, mb: 1 }}>
            Please enter your Aliceblue details
          </Typography>
          <TextField
            required
            label="Password"
            type="password"
            name="password"
            value={details.password}
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
            sx={{ mt: 1, mb: 1 }}
          />
          <TextField
            required
            label="twoFA"
            type="password"
            name="twofa"
            value={details.twoFA}
            onChange={(e) => setDetails({ ...details, twoFA: e.target.value })}
            sx={{ mt: 1, mb: 1 }}
          />
          <TextField
            required
            label="api_key"
            type="text"
            name="key"
            value={details.apikey}
            onChange={(e) => setDetails({ ...details, apikey: e.target.value })}
            sx={{ mt: 1, mb: 1 }}
          />
          <TextField
            required
            label="api_secret"
            type="password"
            name="secret"
            value={details.apisecret}
            onChange={(e) =>
              setDetails({ ...details, apisecret: e.target.value })
            }
            sx={{ mt: 1, mb: 1 }}
          />
          <Typography
            variant="h1"
            sx={{
              fontSize: "1rem",
              fontWeight: 500,
              mt: 1,
            }}>
            To generate appID and api secret, login to your aliceblue developers
            console and create an app. You can do this by clicking on&nbsp;
            <Typography
              sx={{
                cursor: "pointer",
                display: "inline",
                fontSize: "1rem",
                fontWeight: 600,
                color: "primary.main",
                mt: 1,
              }}
              onClick={() =>
                window.open(
                  "https://develop-api.aliceblueonline.com/",
                  "_blank",
                  "noreferrer"
                )
              }>
              this
            </Typography>
            &nbsp;link. These details are required so we can directly execute
            orders to your account.
          </Typography>

          <Typography
            variant="h1"
            sx={{
              fontSize: "1rem",
              fontWeight: 600,
              mt: 3,
            }}>
            Don't worry! Your details are encrypted on our database 🔒
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            onClick={handleEvent}
            variant="contained"
            sx={{ width: "100px" }}>
            Submit
          </Button>
          <Button
            onClick={() => close()}
            variant="outlined"
            sx={{ width: "100px" }}>
            Cancel
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default AliceInputs;
