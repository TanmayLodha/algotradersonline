import React, { useState, useContext, useEffect } from "react";
import { Box } from "@mui/system";
import {
  TextField,
  Typography,
  Button,
  Alert,
  Snackbar,
  Grid,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { BaseURL } from "../../BaseURL";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false); //snackbar
  const [msg, setMsg] = useState(""); //alert messagge
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); //global context

  useEffect(() => {
    document.title = "Login";
  }, []);

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
    fetch(BaseURL + "api/login/", {
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
        if (data.data.token !== null) {
          setUser(JSON.stringify(data));
          navigate("/dashboard/portfolio", {
            replace: true,
            state: { firstLogin: true },
          });
        }
      })
      .catch((error) => {
        setMsg(msglist[2]);
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
            src="Mlogin.png"
            alt="login"
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
              pt: 20,
              ml: 5,
              mr: 5,
              display: "flex",
              flexDirection: "column",
            }}>
            <Typography
              component="h1"
              sx={{ fontSize: "1.7rem", fontWeight: 600, mb: 1 }}>
              Welcome to algoTrade! 👋🏻
            </Typography>
            <Typography
              component="h1"
              sx={{ fontSize: "1rem", fontWeight: 500, mb: 3 }}>
              Please sign-in to your account
            </Typography>

            <TextField
              required
              label="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ mb: 2, mt: 1 }}
            />
            <TextField
              required
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Link
              to="/forgot-password"
              style={{ textDecoration: "none", color: "inherit" }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: "primary.main",
                }}>
                Forgot Password?
              </Typography>
            </Link>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 5 }}
              onClick={login}>
              Login
            </Button>
            <Typography
              variant="h1"
              sx={{
                fontSize: "1rem",
                fontWeight: 500,
                m: 5,
              }}>
              New on our platform? &nbsp;
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "inherit" }}>
                <Typography
                  variant="subtitle"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: "primary.main",
                  }}>
                  Create an account
                </Typography>
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Login;
