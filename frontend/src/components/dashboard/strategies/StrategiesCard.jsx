import { Button, Card, CardActions, CardContent } from "@mui/material";
import React, { useContext, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import { UserContext } from "../../../UserContext";
import AliceInputs from "./AliceInputs";
import ConfirmExecution from "./ConfirmExecution";
import "./stratergies.scss";

const StrategiesCard = ({ props }) => {
  const [id, setId] = useState(props.id);
  const { user, setUser } = useContext(UserContext);
  const current = JSON.parse(user);

  const [backdrop, setBackdrop] = useState(false);
  const [msg, setMsg] = useState(false);

  const handleBDClose = () => {
    setBackdrop(false);
  };
  const handleBackdrop = () => {
    setBackdrop(!backdrop);
  };

  const handleMsgClose = () => {
    setMsg(false);
  };
  const handleMsg = () => {
    setMsg(!msg);
  };

  return (
    <>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={backdrop}>
        {current.data.isCredential ? (
          <ConfirmExecution
            backdropFunction={handleBDClose}
            successFunction={handleMsg}
            userData={current}
            strategyid={id}
          />
        ) : (
          <AliceInputs
            backdropFunction={handleBDClose}
            successFunction={handleMsg}
            userData={current}
            strategyid={id}
          />
        )}
      </Backdrop>

      {/* Success Backdrop */}
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={msg}>
        <Card className="succ-card">
          <CardContent>
            <h1>Congrats!</h1>
            <div className="icon">
              <PublishedWithChangesIcon color="success" sx={{ fontSize: 90 }} />
            </div>
            <p>
              Strategy is being executed. Please check your aliceblue portal for
              entries.
            </p>
          </CardContent>
          <div className="btns">
            <Button className="in-btn" onClick={handleMsgClose}>
              Stop Execution
            </Button>
          </div>
        </Card>
      </Backdrop>
      <Card className="strat-card">
        <CardContent>
          <div className="name">
            <h1>{props.id}</h1>

            <h3>{props.name}</h3>
          </div>
        </CardContent>
        <CardActions>
          <Button className="in-btn" onClick={handleBackdrop}>
            Execute
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default StrategiesCard;
