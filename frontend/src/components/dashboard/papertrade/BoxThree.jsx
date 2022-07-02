import React, { useState, useEffect, useContext } from "react";
import { Tabs, Tab } from "@mui/material";
import { BaseURL } from "../../../BaseURL";
import { UserContext } from "../../../UserContext";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import Active from "./Active";
import History from "./History";
import Pending from "./Pending";
import { styled } from "@mui/material/styles";

const LinkTabs = styled((props) => (
  <Tabs
    variant="fullWidth"
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  // marginTop: 20,
});

const LinkTab = styled((props) => (
  <Tab
    disableRipple
    component={Link}
    to={props.pathname}
    icon={props.icon}
    {...props}
  />
))(({ theme }) => ({
  borderRadius: 3,
  color: "text.primary",
  marginBottom: 1,
  "&.Mui-selected": {
    transition: "all .15s ease-in-out",
  },
  "&.Mui-focusVisible": {},
}));

function BoxThree({ updateMoney }) {
  const { user } = useContext(UserContext);
  const current = JSON.parse(user);
  const [activeData, setActiveData] = useState([]);
  const [achievedData, setAchievedData] = useState([]);
  const [pendingData, setPendingData] = useState([]);

  console.log(activeData);
  console.log(achievedData);
  console.log(pendingData);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getActiveData = () => {
    const request = {
      username: current.data.username,
      isCompleted: false,
      isActive: true,
    };
    fetch(BaseURL + "api/get_trades/", {
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
      .then((activeData) => {
        setActiveData(activeData);
        updateMoney(100000 * activeData.length);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAchievedData = () => {
    const request = {
      username: current.data.username,
      isCompleted: true,
      isActive: true,
    };
    fetch(BaseURL + "api/get_trades/", {
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
        setAchievedData(data);
        // updateMoney(100000 * activeData.length);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getPendingData = () => {
    const request = {
      username: current.data.username,
      isCompleted: false,
      isActive: false,
    };
    fetch(BaseURL + "api/get_trades/", {
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
        setPendingData(data);
        // updateMoney(100000 * activeData.length);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Fetching activeData and achievedData every 5 secs
  useEffect(() => {
    getActiveData();
    getAchievedData();
    getPendingData();
    const interval = setInterval(() => {
      getActiveData();
      getAchievedData();
      getPendingData();
    }, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <LinkTabs value={value} onChange={handleChange}>
        <LinkTab
          pathname="active"
          label={"Active Positions (" + activeData.length + ")"}
        />
        <LinkTab
          pathname="pending"
          label={"Pending Orders (" + pendingData.length + ")"}
        />
        <LinkTab
          pathname="history"
          label={"Day's history (" + achievedData.length + ")"}
        />
      </LinkTabs>
      <Routes>
        <Route
          path="active"
          element={<Active activeData={activeData} updateMoney={updateMoney} />}
        />
        <Route
          path="pending"
          element={
            <Pending pendingData={pendingData} updateMoney={updateMoney} />
          }
        />
        <Route
          path="history"
          element={
            <History achievedData={achievedData} updateMoney={updateMoney} />
          }
        />
        <Route path="*" element={<Navigate to="active" />} />
      </Routes>
    </>
  );
}

export default BoxThree;
