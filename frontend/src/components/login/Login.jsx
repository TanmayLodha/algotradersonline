import React, { useState, useContext } from "react";
import "./login.scss";
import { Box } from "@mui/system";
import { TextField, Avatar, Typography, Button, Alert } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { Snackbar } from "@mui/material";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false); //snackbar
  const [msg, setMsg] = useState(""); //alert messagge
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext); //global context

  const msglist = [
    "Fields cannot be empty",
    "Invalid Login! Try again",
    "Unable to connect. Please check your internet connection!",
  ];

  const snackBarClose = () => {
    setOpen(false);
  };

  const login = (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setMsg(msglist[0]);
      setOpen(true);
      return;
    }
    const credentials = { username: username, password: password };
    fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    })
      .then((response) => {
        const rejectResponse = {
          data: {
            token: null,
          },
        };
        if (response.ok === true) return response.json();
        else {
          setMsg(msglist[1]);
          setOpen(true);
          return rejectResponse;
        }
      })
      .then((data) => {
        console.log(data);
        if (data.data.token !== null) {
          setUser(JSON.stringify(data));
          navigate("/dashboard", { replace: true });
        }
      })
      .catch((error) => {
        setMsg(msglist[2]);
        setOpen(true);
      });
  };

  return (
    <div className="main">
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={snackBarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert severity="error" variant="filled">
          {msg}
        </Alert>
      </Snackbar>
      <div className="login">
        <Box component="form" noValidate autoComplete="off" className="box">
          <div className="form">
            <div className="head">
              <Avatar sx={{ m: 1 }}>
                <LockOutlined />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
            </div>
            <TextField
              required
              id="outlined-required"
              label="Username"
              className="field"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              required
              id="outlined-password-input"
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="field"
            />
            <Button
              type="submit"
              variant="contained"
              className="field in-btn"
              onClick={login}>
              Sign In
            </Button>
            <Link to="/register" variant="body2" className="register-text">
              {"Don't have an account? Register"}
            </Link>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default Login;
