import React, { useState } from "react";
import "./register.scss";
import { TextField, Button, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";

const Register = () => {
  const [passerror, setPasserror] = useState(false);
  const [emailerror, setEmailerror] = useState(false);
  const [open, setOpen] = useState(false); //snackbar
  const [msg, setMsg] = useState(""); //alert messagge
  const [succ, setSucc] = useState(false); //snackbar success

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
    setSucc(false);
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
    fetch("http://172.22.2.67:8000/api/register/", {
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

  var sectionStyle = {
    backgroundImage: `url(/layered-waves.svg)`,
  };

  return (
    <div className="main-register" style={sectionStyle}>
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
        <div className="head">
          <h2>Register</h2>
        </div>

        <TextField
          name="username"
          required
          label="Username"
          className="field"
          value={newuser.username}
          onChange={(e) => setNewuser({ ...newuser, username: e.target.value })}
          inputProps={{
            autoComplete: "new-password",
            form: {
              autoComplete: "off",
            },
          }}
        />
        <TextField
          error={emailerror}
          name="email"
          required
          label="Email Address"
          className="field"
          autoComplete="off"
          value={newuser.email}
          onChange={validateEmail}
        />

        <TextField
          name="password"
          required
          label="Password"
          type="password"
          className="field"
          value={newuser.password}
          onChange={(e) => setNewuser({ ...newuser, password: e.target.value })}
          inputProps={{
            autoComplete: "new-password",
            form: {
              autoComplete: "off",
            },
          }}
        />

        <TextField
          error={passerror}
          name="confirm_password"
          required
          label="Confirm Password"
          type="password"
          className="field"
          autoComplete="off"
          value={newuser.c_password}
          onChange={validatePassword}
        />

        <TextField
          required
          id="demat-id"
          label="AliceBlue ID"
          name="demat"
          className="field"
          autoComplete="off"
          value={newuser.demat}
          onChange={(e) => setNewuser({ ...newuser, demat: e.target.value })}
        />
        <Button
          className="submit-button"
          type="submit"
          variant="contained"
          onClick={create}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Register;
