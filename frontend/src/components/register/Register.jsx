import React, { useState } from "react";
import "./register.scss";
import { TextField, Button, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Snackbar } from "@mui/material";
import { Step, Stepper, StepLabel } from "@mui/material";

const Register = () => {
  const [page, setPage] = useState(1);
  const [passerror, setPasserror] = useState(false);
  const [emailerror, setEmailerror] = useState(false);
  const [open, setOpen] = useState(false); //snackbar
  const [msg, setMsg] = useState(""); //alert messagge
  const [succ, setSucc] = useState(false); //snackbar success
  const [activeStep, setActiveStep] = useState(0);

  const msglist = ["Fields cannot be empty", "Invalid Fields"];
  const steps = ["Personal Details", "Aliceblue Details"];

  const emailRegex = /\S+@\S+\.\S+/;

  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    demat: "",
    c_password: "",
  });

  const validatePassword = (e) => {
    setUser({ ...user, c_password: e.target.value });
    if (e.target.value !== user.password) {
      setPasserror(true);
    } else {
      setPasserror(false);
    }
  };

  const validateEmail = (e) => {
    setUser({ ...user, email: e.target.value });
    const email = e.target.value;
    if (emailRegex.test(email)) {
      setEmailerror(false);
    } else {
      setEmailerror(true);
    }
  };

  const snackBarClose = () => {
    setOpen(false);
    setSucc(false);
  };

  const goNext = () => {
    if (
      user.username === "" ||
      user.email === "" ||
      user.name === "" ||
      user.password === ""
    ) {
      setMsg(msglist[0]);
      setOpen(true);
      return;
    } else if (passerror || emailerror) {
      setMsg(msglist[1]);
      setOpen(true);
      return;
    } else {
      setSucc(true);
      console.log(user);
      setPage((page) => page + 1);
      setActiveStep(activeStep + 1);
    }
  };

  const navigate = useNavigate();

  const create = (e) => {
    e.preventDefault();
    const credentials = {
      username: user.username,
      password: user.password,
      email: user.email,
    };
    console.log(credentials);
    fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.token !== undefined) {
          console.log(data);
          navigate("/login");
        }
      })
      .catch((error) => {
        // setMsg(error);
        // setOpen(true);
        console.error(error);
      });
  };

  return (
    <div className="main-register">
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={snackBarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert severity="error" variant="filled">
          {msg}
        </Alert>
      </Snackbar>

      <Snackbar
        open={succ}
        autoHideDuration={5000}
        onClose={snackBarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert severity="success" variant="filled">
          Saved
        </Alert>
      </Snackbar>
      <div className="box">
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div className="head">
          <h2>Register</h2>
        </div>
        {page === 1 && (
          <div className="page1">
            <TextField
              name="username"
              required
              label="Username"
              className="field"
              autoComplete="off"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <div className="email">
              <TextField
                name="email"
                required
                label="Email Address"
                className="field mail"
                autoComplete="off"
                value={user.email}
                onChange={validateEmail}
              />
              {emailerror && <ErrorIcon className="error" />}
              {user.email && !emailerror && (
                <CheckCircleIcon className="success" />
              )}
            </div>

            <TextField
              name="password"
              required
              label="Password"
              type="password"
              className="field"
              autoComplete="off"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <div className="c_pass">
              <TextField
                name="confirm_password"
                required
                label="Confirm Password"
                type="password"
                className="field cp"
                autoComplete="off"
                value={user.c_password}
                onChange={validatePassword}
              />
              {passerror && <ErrorIcon className="error" />}
              {user.c_password && !passerror && (
                <CheckCircleIcon className="success" />
              )}
            </div>

            <div className="submit">
              <Button
                type="submit"
                variant="contained"
                className="submit-button"
                onClick={goNext}>
                Continue
              </Button>
              <Link to="/login" className="register-text">
                {"Have an account? Login"}
              </Link>
            </div>
          </div>
        )}

        {page === 2 && (
          <div className="page2">
            <p className="demat-text">Enter your Alice Blue Demat ID.</p>
            <TextField
              required
              id="demat-id"
              label="Demat account"
              name="demat"
              className="demat"
              autoComplete="off"
            />
            <Button
              className="submit-button"
              type="submit"
              variant="contained"
              onClick={create}>
              Submit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
