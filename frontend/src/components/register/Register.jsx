import React, { useState } from "react";
import "./register.scss";
import { TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "react-toastify/dist/ReactToastify.css";
import "react-step-progress-bar/styles.css";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Register = () => {
  const [page, setPage] = useState(1);
  const [passerror, setPasserror] = useState(false);
  const [emailerror, setEmailerror] = useState(false);

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

  const goNext = () => {
    if (
      user.username === "" ||
      user.email === "" ||
      user.name === "" ||
      user.password === ""
    ) {
      alert("Fields empty");
    } else if (passerror || emailerror) alert("Invalid fields");
    else {
      console.log(user);
      setPage((page) => page + 1);
    }
  };

  const navigate = useNavigate();

  const create = () => {
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
          console.log(data.token);
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const sectionStyle = {
    backgroundImage: `url(/blob-register.svg)`,
  };

  return (
    <div className="main-register" style={sectionStyle}>
      <Link to="/">
        <ArrowBackIcon className="back-icon" />
      </Link>

      <div className="box">
        <div className="head">
          <h3>Register</h3>
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
            <DematDetails />
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

const DematDetails = () => {
  return (
    <TextField
      required
      id="demat-id"
      label="Demat account"
      name="demat"
      className="demat"
      autoComplete="off"
    />
  );
};

export default Register;
