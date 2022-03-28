import { Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import "./profile.scss";
import { useNavigate } from "react-router-dom";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function Profile() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [change, setChange] = useState(false);

  const temp_user = {
    username: "nitishgupta",
    email: "nitishkgupta@gmail.com",
    aliceblue: "123456",
  };

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
          <h3>Profile</h3>
          <div className="contents">
            <TextField
              disabled
              label="Username"
              defaultValue={temp_user.username}
              className="user"
            />
            <TextField
              disabled
              label="Aliceblue"
              defaultValue={temp_user.aliceblue}
              className="user"
            />
            <TextField
              disabled
              label="email"
              defaultValue={temp_user.email}
              className="user"
            />

            {change && <ChangePassword />}
          </div>

          <div className="buttons">
            <Button
              disabled={change ? true : false}
              className="in-btn"
              onClick={() => {
                navigate("portfolio", { replace: true });
              }}>
              Go to dashboard
            </Button>
            <Button className="in-btn" onClick={() => setChange(!change)}>
              {change ? "Save" : "Change Password"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const ChangePassword = () => {
  const [passerror, setPasserror] = useState(false);
  const [password, setPassword] = useState("");
  const [c_password, setCPassword] = useState("");

  const validatePassword = (e) => {
    setCPassword(e.target.value);
    if (e.target.value !== password) {
      setPasserror(true);
    } else {
      setPasserror(false);
    }
  };
  return (
    <div className="pass">
      <TextField
        name="password"
        required
        label="Password"
        type="password"
        className="user"
        autoComplete="off"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        name="confirm_password"
        required
        label="Confirm Password"
        type="password"
        className="user"
        autoComplete="off"
        value={c_password}
        onChange={validatePassword}
      />
      {passerror && <ErrorIcon className="error" />}
      {c_password && !passerror && <CheckCircleIcon className="success" />}
    </div>
  );
};

export default Profile;
