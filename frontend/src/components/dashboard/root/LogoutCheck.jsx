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

const LogoutCheck = ({ close, toggle }) => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handlelogout = () => {
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
