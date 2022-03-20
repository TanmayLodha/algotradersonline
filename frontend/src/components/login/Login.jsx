import React, { useState } from "react";
import "./login.scss";
import { Box } from "@mui/system";
import { TextField, Avatar, Typography, Button, Alert } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login({ authenticate }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const login = (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      toast.warn("Cannot be empty", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    const credentials = { username: username, password: password };
    console.log(credentials);
    fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.token !== undefined) {
          authenticate();
          navigate("/dashboard", { replace: true });
          console.log(data.token);
        } else {
          toast.error("Invalid login. Try agian!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return;
        }
      })
      .catch((error) => {
        toast.error(
          "Unable to connect. Please check your internet connection!",
          {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        console.error(error);
      });
  };

  var sectionStyle = {
    backgroundImage: `url(/blob.svg)`,
  };

  return (
    <div className="main" style={sectionStyle}>
      <Link to="/" variant="body2">
        <ArrowBackIcon className="backicon" />
      </Link>

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
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Login;
