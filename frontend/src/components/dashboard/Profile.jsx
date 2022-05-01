import { Avatar, Button } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../UserContext";
import "./profile.scss";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";

function Profile() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const current = JSON.parse(user);

  useEffect(() => {
    document.title = "Profile";
  }, []);

  return (
    <>
      <Backdrop
        sx={{
          color: "#fff",
          backdropFilter: "blur(5px)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={true}>
        <div className="profile">
          <div className="card">
            <h2>Profile</h2>
            <hr />
            <div className="ava">
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  bgcolor: "rgb(239, 237, 255)",
                  color: "rgb(114, 88, 223)",
                  fontSize: 35,
                }}>
                {current.data.username[0].toUpperCase()}
              </Avatar>
            </div>

            <div className="data">
              <h4> Username</h4>
              <h3>{current.data.username}</h3>
            </div>

            <div className="data">
              <h4>AliceBlueID</h4>
              <h3>{current.data.aliceBlueID}</h3>
            </div>

            <div className="data">
              <h4>Email</h4>
              <h3>{current.data.email}</h3>
            </div>
            <div className="button">
              <Button
                className="in-btn"
                onClick={() => {
                  navigate("portfolio", { replace: true });
                }}>
                Go to dashboard
              </Button>
            </div>
          </div>
        </div>
      </Backdrop>
    </>
  );
}

export default Profile;
