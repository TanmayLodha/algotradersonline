import React, { useState } from "react";
import "./register.scss";
import { Box } from "@mui/system";
import { TextField, Avatar, Typography, Button } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-step-progress-bar/styles.css";
import { ProgressBar, step } from "react-step-progress-bar";

function Register() {
  const [page, setPage] = useState(1);
  const [percent, setPercent] = useState(25);

  const goNext = () => {
    toast.success("Saved", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setPage((page) => page + 1);
    setPercent(100);
  };

  var sectionStyle = {
    backgroundImage: `url(/blob-register.svg)`,
  };

  return (
    <div className="main-register" style={sectionStyle}>
      <Link to="/" variant="body2">
        <ArrowBackIcon className="back-icon" />
      </Link>
      <div className="progress">
        <ProgressBar
          percent={percent}
          filledBackground="linear-gradient(to right, #408cff, #0066ff)"
          width="50%"
        />
      </div>

      <div className="register">
        <Box component="form" noValidate autoComplete="off" className="box">
          <div className="head">
            <Avatar sx={{ m: 1 }}>
              <PeopleAltIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
          </div>
          {page === 1 && (
            <>
              <UserDetails />
              <div className="submit">
                <Button
                  type="submit"
                  variant="contained"
                  className="submit-button"
                  onClick={goNext}>
                  Continue
                </Button>
                <Link to="/login" variant="body2" className="register-text">
                  {"Have an account? Login"}
                </Link>
              </div>
            </>
          )}
          {page === 2 && (
            <>
              <Typography component="h1" variant="h5" className="demat-text">
                Enter your Alice Blue Demat ID.
              </Typography>
              <DematDetails />
              <Button
                className="login-button"
                type="submit"
                variant="contained"
                className="submit-button">
                Submit
              </Button>
            </>
          )}
        </Box>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
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

const UserDetails = () => {
  return (
    <>
      <div className="name">
        <TextField
          name="firstName"
          required
          fullWidth
          id="firstName"
          label="First Name"
          autoFocus
          className="name-field"
        />
        <TextField
          required
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          className="name-field"
        />
      </div>

      <div className="contact">
        <TextField
          required
          id="email"
          label="Email Address"
          name="email"
          className="email"
        />

        <TextField
          required
          id="username"
          label="Username"
          name="username"
          className="username"
        />
      </div>

      <div className="password">
        <TextField
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          name="password"
          className="pass"
        />
        <TextField
          required
          id="outlined-password-input"
          label="Confirm Password"
          name="confirm_password"
          type="password"
          className="pass"
        />
      </div>
    </>
  );
};

const DematDetails = () => {
  return (
    <TextField
      required
      id="demat-id"
      label="Demat account"
      name="demat"
      className="demat"
    />
  );
};

export default Register;
