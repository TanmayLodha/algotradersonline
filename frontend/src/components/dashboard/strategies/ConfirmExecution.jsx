import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { execfile } from "./execFile";
import { UserContext } from "../../../UserContext";

const ConfirmExecution = ({ close, msg }) => {
  const { user } = useContext(UserContext);
  const current = JSON.parse(user);
  const handleEvent = () => {
    execfile(current);
    close();
    msg(true);
  };

  return (
    <Card
      sx={{
        width: "30vw",
        p: 1,
        borderRadius: 3,
        transition: " all .15s ease-in-out",
      }}>
      <CardContent>
        <Typography
          component="h1"
          sx={{
            fontSize: "2rem",
            fontWeight: 600,
            mb: 1,
            textAlign: "center",
          }}>
          Do you want to execute this strategy?
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained" onClick={handleEvent}>
          Execute
        </Button>
        <Button variant="outlined" onClick={() => close()}>
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
};

export default ConfirmExecution;
