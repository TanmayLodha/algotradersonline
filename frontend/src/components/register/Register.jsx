import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Alert,
  Snackbar,
  Grid,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Backdrop,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import TOC from "../landing/TOC";
import { BaseURL } from "../../BaseURL";

const Register = () => {
  const [passerror, setPasserror] = useState(false);
  const [emailerror, setEmailerror] = useState(false);
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false); //snackbar
  const [msg, setMsg] = useState(""); //alert messagge
  const [bopen, setBopen] = useState(false);

  const handleClose = () => {
    setBopen(false);
  };
  const handleToggle = () => {
    setBopen(!bopen);
  };

  const msglist = ["Fields cannot be empty", "Invalid Fields"];

  const emailRegex = /\S+@\S+\.\S+/;

  const [newuser, setNewuser] = useState({
    username: "",
    password: "",
    email: "",
    demat: "",
    c_password: "",
  });

  const validatePassword = (e) => {
    setNewuser({ ...newuser, c_password: e.target.value });
    if (e.target.value !== newuser.password) {
      setPasserror(true);
    } else {
      setPasserror(false);
    }
  };

  const validateEmail = (e) => {
    setNewuser({ ...newuser, email: e.target.value });
    const email = e.target.value;
    if (emailRegex.test(email)) {
      setEmailerror(false);
    } else {
      setEmailerror(true);
    }
  };

  const snackBarClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const create = (e) => {
    e.preventDefault();
    if (
      newuser.username === "" ||
      newuser.email === "" ||
      newuser.name === "" ||
      newuser.password === "" ||
      newuser.demat === ""
    ) {
      setMsg(msglist[0]);
      setOpen(true);
      return;
    } else if (checked === false) {
      setMsg("Please agree to our privacy & terms");
      setOpen(true);
      return;
    } else if (passerror || emailerror) {
      setMsg(msglist[1]);
      setOpen(true);
      return;
    }
    const credentials = {
      username: newuser.username,
      password: newuser.password,
      email: newuser.email,
      aliceBlueID: newuser.demat,
    };
    console.log(JSON.stringify(credentials));
    fetch(BaseURL + "api/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((json) => {
            if ("username" in json) {
              setMsg(json.username[0]);
              setOpen(true);
            } else {
              setMsg(json.aliceBlueID[0]);
              setOpen(true);
            }
            throw new Error("error");
          });
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data.data.token !== null) {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    document.title = "Register";
  }, []);

  return (
    <>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: "blur(4px)",
        }}
        open={bopen}
        onClick={handleClose}>
        <TOC />
      </Backdrop>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={snackBarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert severity="error" variant="filled">
          {msg}
        </Alert>
      </Snackbar>

      <Grid container sx={{ height: "100vh", color: "text.primary" }}>
        <Grid item xs={8} sx={{ bgcolor: "background.default" }}>
          <Box>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Typography
                variant="h1"
                sx={{ fontSize: "3rem", fontWeight: 600, mt: 1, ml: 3 }}>
                algoTrade.
              </Typography>
            </Link>
          </Box>
          <Box
            component="img"
            src="register.png"
            alt="register"
            sx={{
              // height: 685,
              // width: 633,
              pl: 20,
              pt: 10,
            }}
          />
        </Grid>
        <Grid item xs={4} sx={{ bgcolor: "background.paper" }}>
          <Box
            component="form"
            sx={{
              pt: 10,
              ml: 5,
              mr: 5,
              display: "flex",
              flexDirection: "column",
            }}>
            <Typography
              component="h1"
              sx={{ fontSize: "1.7rem", fontWeight: 600, mb: 1 }}>
              Adventure starts here 🚀
            </Typography>
            <Typography
              component="h1"
              sx={{ fontSize: "1rem", fontWeight: 500, mb: 3 }}>
              Make your trading rasier and effective
            </Typography>

            <TextField
              name="username"
              required
              label="Username"
              value={newuser.username}
              onChange={(e) =>
                setNewuser({ ...newuser, username: e.target.value })
              }
              inputProps={{
                autoComplete: "new-password",
                form: {
                  autoComplete: "off",
                },
              }}
              sx={{ mb: 1, mt: 1 }}
            />
            <TextField
              error={emailerror}
              name="email"
              required
              label="Email Address"
              autoComplete="off"
              value={newuser.email}
              onChange={validateEmail}
              inputProps={{
                autoComplete: "new-password",
                form: {
                  autoComplete: "off",
                },
              }}
              sx={{ mb: 1, mt: 1 }}
            />

            <TextField
              name="password"
              required
              label="Password"
              type="password"
              value={newuser.password}
              onChange={(e) =>
                setNewuser({ ...newuser, password: e.target.value })
              }
              inputProps={{
                autoComplete: "new-password",
                form: {
                  autoComplete: "off",
                },
              }}
              sx={{ mb: 1, mt: 1 }}
            />

            <TextField
              error={passerror}
              name="confirm_password"
              required
              label="Confirm Password"
              type="password"
              value={newuser.c_password}
              onChange={validatePassword}
              inputProps={{
                autoComplete: "new-password",
                form: {
                  autoComplete: "off",
                },
              }}
              sx={{ mb: 1, mt: 1 }}
            />

            <TextField
              required
              id="demat-id"
              label="AliceBlue ID"
              name="demat"
              className="field"
              autoComplete="off"
              value={newuser.demat}
              onChange={(e) =>
                setNewuser({ ...newuser, demat: e.target.value })
              }
              sx={{ mb: 1, mt: 1 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleCheck}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label={
                <Typography
                  variant="h1"
                  sx={{
                    display: "inline",
                    fontSize: "1rem",
                    fontWeight: 500,
                  }}>
                  I agree to &nbsp;
                  <Typography
                    variant="subtitle"
                    sx={{
                      display: "inline",
                      fontSize: "1rem",
                      fontWeight: 500,
                      color: "primary.main",
                    }}
                    onClick={handleToggle}>
                    privacy policy & terms
                  </Typography>
                </Typography>
              }
              sx={{ mb: 3 }}
            />

            <Button type="submit" variant="contained" onClick={create}>
              Sign up
            </Button>
            <Typography
              variant="h1"
              sx={{
                fontSize: "1rem",
                fontWeight: 500,
                m: 5,
              }}>
              Already have an account? &nbsp;
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "inherit" }}>
                <Typography
                  variant="subtitle"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: "primary.main",
                  }}>
                  Sign in insted
                </Typography>
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Register;
