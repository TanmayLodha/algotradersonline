import React, { useState, useEffect, useContext } from "react";
import { Card, Grid } from "@mui/material";
import BoxOne from "./BoxOne";
import BoxTwo from "./BoxTwo";
import BoxThree from "./BoxThree";
import { BaseURL } from "../../../BaseURL";
import { UserContext } from "../../../UserContext";

function PaperTrade() {
  const { user } = useContext(UserContext);
  const current = JSON.parse(user);
  const [submit, setSubmit] = useState(false);
  const [activeData, setActiveData] = useState([]);
  const [achievedData, setAchievedData] = useState([]);
  const [pendingData, setPendingData] = useState([]);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getData = () => {
    fetch(BaseURL + "api/get_trades/", {
      method: "GET",
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
        setActiveData(
          data.filter((a) => {
            return a.isActive === true && a.isCompleted === false;
          })
        );
        setPendingData(
          data.filter((a) => {
            return a.isActive === false;
          })
        );

        setAchievedData(
          data.filter((a) => {
            return a.isCompleted === true;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let total =
    achievedData.length !== 0
      ? achievedData.reduce((total, obj) => obj.net_pl + total, 0)
      : 0;

  useEffect(() => {
    getData();
    const interval = setInterval(() => {
      getData();
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={6}>
          <Card
            sx={{
              p: 2,
              ml: 3,
              borderRadius: 3,
              boxShadow: "0px 0px 10px 5px rgba(0,0,0,0.1)",
              transition: " all .15s ease-in-out",
            }}>
            <BoxOne achievedData={achievedData} total={total} />
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card
            sx={{
              p: 2,
              borderRadius: 3,
              boxShadow: "0px 0px 10px 5px rgba(0,0,0,0.1)",
              transition: " all .15s ease-in-out",
            }}>
            <BoxTwo submit={submit} setSubmit={setSubmit} current={current} />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card
            sx={{
              p: 2,
              ml: 3,
              borderRadius: 3,
              boxShadow: "0px 0px 10px 5px rgba(0,0,0,0.1)",
              transition: " all .15s ease-in-out",
            }}>
            <BoxThree
              submit={submit}
              pendingData={pendingData}
              activeData={activeData}
              achievedData={achievedData}
              value={value}
              handleChange={handleChange}
              total={total}
            />
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default PaperTrade;
