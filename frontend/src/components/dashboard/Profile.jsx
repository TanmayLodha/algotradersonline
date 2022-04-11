import { Avatar, Button } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../UserContext";
import "./profile.scss";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [change, setChange] = useState(false);
  const current = JSON.parse(user);

  useEffect(() => {
    document.title = "Profile";
  }, []);

  var sectionStyle = {
    backgroundImage: `url(/circle-scatter.svg)`,
  };

  return (
    <div className="profile" style={sectionStyle}>
      <div className="above">
        <h1>algoTrade.</h1>
      </div>
      <div className="bottom">
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
              disabled={change ? true : false}
              className="in-btn"
              onClick={() => {
                navigate("portfolio", { replace: true });
              }}>
              Go to dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
