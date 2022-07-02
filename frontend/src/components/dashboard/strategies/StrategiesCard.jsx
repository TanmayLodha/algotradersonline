import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { UserContext } from "../../../UserContext";
import { createFile } from "./createFile";

const StrategiesCard = ({ props, toggle, strategy }) => {
  const { user } = useContext(UserContext);
  const current = JSON.parse(user);
  const handleYesCred = () => {
    createFile(props, current);
    toggle();
  };
  const handleNoCred = () => {
    strategy(props);
    toggle();
  };
  return (
    <>
      <Card
        sx={{
          width: "20vw",
          // height: "15vw",
          m: 1,
          boxShadow: "0px 0px 10px 5px rgba(0,0,0,0.1)",
          transition: " all .15s ease-in-out",
          borderRadius: 3,
        }}>
        <CardContent>
          <Typography
            variant="h1"
            sx={{ fontSize: "2rem", fontWeight: 500, m: 1 }}>
            {props.id}
          </Typography>

          <Typography
            variant="h1"
            sx={{ fontSize: "1.5rem", fontWeight: 600, m: 1 }}>
            {props.name}
          </Typography>
        </CardContent>
        <CardActions>
          {current.data.isCredential ? (
            <Button variant="contained" sx={{ m: 1 }} onClick={handleYesCred}>
              Execute
            </Button>
          ) : (
            <Button variant="contained" sx={{ m: 1 }} onClick={handleNoCred}>
              Execute
            </Button>
          )}
        </CardActions>
      </Card>
    </>
  );
};

export default StrategiesCard;
