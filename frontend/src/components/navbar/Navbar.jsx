import React from "react";
import "./navbar.scss";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function Navbar() {
  return (
    <>
      <div className="left">
        <Link to="/">
          <h1>algoTrade.</h1>
        </Link>
      </div>
      <div className="right">
        <Button className="btn lightmode-btn" variant="outlined">
          <LightModeIcon />
        </Button>

        <Link to="/login">
          <Button className="btn login-btn" variant="contained">
            Login
          </Button>
        </Link>
        <Link to="/register">
          <Button className="btn register-btn" variant="outlined">
            Register
          </Button>
        </Link>
      </div>
    </>
  );
}
