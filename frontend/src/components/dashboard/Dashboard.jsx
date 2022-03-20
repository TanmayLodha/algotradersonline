import React, { useContext } from "react";
import { Button } from "@mui/material";

import "./dashboard.scss";
import { useNavigate } from "react-router-dom";

function Dashboard({ removeUser }) {
  const navigate = useNavigate();

  const logout = () => {
    removeUser();
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <Button
        type="submit"
        variant="contained"
        className="field in-btn"
        onClick={logout}>
        Logout
      </Button>
    </div>
  );
}

export default Dashboard;
