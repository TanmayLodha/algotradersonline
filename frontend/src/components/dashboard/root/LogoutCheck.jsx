import React, { useContext } from "react";
import { UserContext } from "../../../UserContext";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { BaseURL } from "../../../BaseURL";

const LogoutCheck = ({ close, toggle }) => {
  const { user, setUser } = useContext(UserContext);
  const current = JSON.parse(user);
  const navigate = useNavigate();
  const handlelogout = () => {
    fetch(BaseURL + "api/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${current.data.token}`,
      },
    })
      .then((response) => {
        if (response.ok === true) return response.json();
        else {
          throw new Error();
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

    localStorage.clear();
    setUser(null);
    navigate("", { replace: true });
    close();
  };
  return (
    <Card sx={{ width: "25%", borderRadius: 3 }}>
      <CardContent>
        <Typography
          variant="h1"
          sx={{ fontSize: "2rem", fontWeight: 500, p: 2, textAlign: "center" }}>
          Are you sure you want to logout?
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button sx={{ m: 2 }} variant="contained" onClick={handlelogout}>
          Yes
        </Button>
        <Button sx={{ m: 2 }} variant="outlined" onClick={() => toggle()}>
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
};

export default LogoutCheck;
