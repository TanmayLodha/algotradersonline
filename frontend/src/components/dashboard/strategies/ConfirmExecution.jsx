import { Button, Card, CardContent } from "@mui/material";
import React from "react";

import "./stratergies.scss";

const ConfirmExecution = (props) => {
  const handleEvent = () => {
    const request = { username: props.userData.data.username };

    // Write unique file
    fetch(`http://172.22.2.67:8000/api/strategies/${props.strategyid}`, {
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
        setTimeout(5000); //Check this timeout
        execfile();
        props.backdropFunction();
        props.successFunction();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const execfile = () => {
    // Execute File

    const request = { username: props.userData.data.username };
    fetch("http://172.22.2.67:8000/api/execute/", {
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
  };

  const handleCancel = () => {
    props.backdropFunction();
  };

  return (
    <Card className="pass-card">
      <CardContent>
        <h3>Do you want to execute this strategy? </h3>
      </CardContent>
      <div className="btns">
        <Button className="in-btn" onClick={handleEvent}>
          Execute
        </Button>
        <Button className="in-btn" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </Card>
  );
};

export default ConfirmExecution;
