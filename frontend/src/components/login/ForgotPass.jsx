import React, { useState } from "react";
import { Box } from "@mui/system";
import {
  TextField,
  Typography,
  Button,
  Alert,
  Snackbar,
  Grid,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";

function ForgotPass() {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false); //snackbar
  // eslint-disable-next-line
  const [msg, setMsg] = useState(""); //alert messagge
  // msg: Email sent

  const snackBarClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={snackBarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert severity="success" variant="filled">
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
            src="forgotPass.png"
            alt="stocks"
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
              Forgot Password? 🔒
            </Typography>
            <Typography
              component="h1"
              sx={{ fontSize: "1rem", fontWeight: 500, mb: 3 }}>
              Enter your username and we will send you instructions to reset
              your password.
            </Typography>

            <TextField
              required
              label="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2, mt: 1 }}
            />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Send Reset Link
            </Button>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}>
              <Button variant="text" sx={{ mt: 5 }}>
                <ArrowBackIosIcon />
                <Typography
                  component="h1"
                  sx={{ fontSize: "1.2rem", fontWeight: 500 }}>
                  Login
                </Typography>
              </Button>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default ForgotPass;
