import React from "react";
import { Tabs, Tab } from "@mui/material";
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
  fontWeight: 600,
  "&.Mui-selected": {
    transition: "all .15s ease-in-out",
  },
  "&.Mui-focusVisible": {},
}));

function BoxThree({
  achievedData,
  activeData,
  pendingData,
  value,
  handleChange,
  total,
}) {
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
        <Route path="active" element={<Active activeData={activeData} />} />
        <Route path="pending" element={<Pending pendingData={pendingData} />} />
        <Route
          path="history"
          element={<History achievedData={achievedData} total={total} />}
        />
        <Route path="*" element={<Navigate to="active" />} />
      </Routes>
    </>
  );
}

export default BoxThree;
