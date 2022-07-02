import React from "react";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { BaseURL } from "../../../BaseURL";

const SuccessCard = ({ msg, current }) => {
  const handleEvent = () => {
    console.log("stop");
    const request = { username: current.data.username };
    fetch(BaseURL + "api/stop/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
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
    msg(false);
  };
  return (
    <Card sx={{ width: "35%", borderRadius: 3, p: 1 }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: "2rem",
            fontWeight: 600,
            textAlign: "center",
            mb: 3,
          }}>
          Congrats!
        </Typography>

        <PublishedWithChangesIcon color="success" sx={{ fontSize: 100 }} />

        <Typography
          variant="h1"
          sx={{
            fontSize: "1.2rem",
            fontWeight: 500,
            mt: 4,
            textAlign: "center",
          }}>
          Strategy is being executed. Please check your aliceblue portal for
          entries.
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={handleEvent}
          sx={{ m: 2, width: "100%" }}
          variant="contained">
          Stop Execution
        </Button>
      </CardActions>
    </Card>
  );
};

export default SuccessCard;
