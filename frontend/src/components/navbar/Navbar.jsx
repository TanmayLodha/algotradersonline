import React from "react";
import "./navbar.scss";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <div className="left">
        <Link to="/">
          <h1>algoTrade.</h1>
        </Link>
      </div>
      <div className="right">
        <Link to="/login">
          <Button className="btn" variant="contained">
            Login
          </Button>
        </Link>
        <Link to="/register">
          <Button className="btn" variant="outlined">
            Register
          </Button>
        </Link>
      </div>
    </>
  );
}
