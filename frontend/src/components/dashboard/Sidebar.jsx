import React, { useState } from "react";
import CandlestickChartOutlinedIcon from "@mui/icons-material/CandlestickChartOutlined";
import TimelineIcon from "@mui/icons-material/Timeline";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import DataThresholdingIcon from "@mui/icons-material/DataThresholding";
import { Link } from "react-router-dom";
import { Typography, Tabs, Tab, Box, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";

const LinkTabs = styled((props) => (
  <Tabs
    variant="fullWidth"
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "none",
  },
  "& .MuiTabs-indicatorSpan": {
    display: "none",
  },
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
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  margin: 5,
  borderRadius: 10,
  marginBottom: 20,
  padding: 35,
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  "&.Mui-selected": {
    backgroundColor: "rgb(104,115,250)",
    color: "#fff",
    transition: "all .15s ease-in-out",
  },
  "&.Mui-focusVisible": {
    display: "block",
  },
}));

function Sidebar({ handleMiniOpen, handleMiniClose }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [mini, setMini] = useState(true);
  const handleOpen = () => {
    setMini(false);
    handleMiniOpen();
  };
  const handleClose = () => {
    setMini(true);
    handleMiniClose();
  };

  return (
    <Box
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      sx={{
        height: "100vh",
        backgroundColor: "background.default",
        transition: " all .15s ease-in-out",
        position: "fixed",
        width: "9vw",
        ...(mini === false && {
          width: "20vw",
          boxShadow: "1px 0px 20px 10px rgba(0,0,0,0.1)",
        }),
      }}>
      {mini ? (
        <>
          <Typography
            variant="h1"
            sx={{
              fontSize: "1.4rem",
              fontWeight: 600,
              ml: 1,
              pt: 3,
              color: "text.secondary",
              transition: "all .15s ease-in-out",
            }}>
            algoTrade.
          </Typography>
          <Divider sx={{ borderBottomWidth: 1, m: 1 }} />
          <LinkTabs
            value={value}
            onChange={handleChange}
            orientation="vertical">
            <LinkTab
              pathname="portfolio"
              icon={<TimelineIcon sx={{ fontSize: "40px" }} />}
            />
            <LinkTab
              pathname="strategies"
              icon={<CandlestickChartOutlinedIcon sx={{ fontSize: "40px" }} />}
            />
            <LinkTab
              pathname="paperTrade"
              icon={<ReceiptOutlinedIcon sx={{ fontSize: "40px" }} />}
            />
            <LinkTab
              pathname="optionChain"
              icon={<DataThresholdingIcon sx={{ fontSize: "40px" }} />}
            />
          </LinkTabs>
        </>
      ) : (
        <>
          <Typography
            variant="h1"
            sx={{
              fontSize: "2rem",
              fontWeight: 600,
              ml: 10,
              pt: 3,
              color: "text.secondary",
              transition: "all .15s ease-in-out",
            }}>
            algoTrade.
          </Typography>
          <Divider sx={{ borderBottomWidth: 1, m: 1 }} />

          <LinkTabs
            value={value}
            onChange={handleChange}
            orientation="vertical">
            <LinkTab
              label="Portfolio"
              pathname="portfolio"
              icon={<TimelineIcon sx={{ fontSize: "40px" }} />}
            />
            <LinkTab
              label="Strategies"
              pathname="strategies"
              icon={<CandlestickChartOutlinedIcon sx={{ fontSize: "40px" }} />}
            />
            <LinkTab
              label="Papertrade"
              pathname="paperTrade"
              icon={<ReceiptOutlinedIcon sx={{ fontSize: "40px" }} />}
            />
            <LinkTab
              label="Option Chain"
              pathname="optionChain"
              icon={<DataThresholdingIcon sx={{ fontSize: "40px" }} />}
            />
          </LinkTabs>
        </>
      )}
    </Box>
  );
}

export default Sidebar;
