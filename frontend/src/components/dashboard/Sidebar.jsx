import React, { useState } from "react";
import CandlestickChartOutlinedIcon from "@mui/icons-material/CandlestickChartOutlined";
import TimelineIcon from "@mui/icons-material/Timeline";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
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
  marginTop: 20,
  opacity: 1,
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
  // fontWeight: theme.typography.fontWeightRegular,
  // fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),

  borderRadius: "0px 35px 35px 0px",
  color: "text.primary",
  marginBottom: 30,
  "&.Mui-selected": {
    backgroundColor: "#874cf7",
    padding: 35,
    color: "#fff",
    transition: "all .15s ease-in-out",
  },
  "&.Mui-focusVisible": {},
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
        position: "fixed",
        height: "100vh",
        width: "8vw",
        ...(mini === false && {
          width: "17vw",
          transition: " all .15s ease-in-out",
        }),
        transition: " all .15s ease-in-out",
      }}>
      {mini ? (
        <>
          <Typography
            variant="h1"
            sx={{
              fontSize: "1.5rem",
              fontWeight: 600,
              ml: 1.5,
              pt: 3,
              color: "text.secondary",
            }}>
            algoTrade.
          </Typography>
          <Divider sx={{ borderBottomWidth: 1, mt: 3, ml: 1 }} />
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
          </LinkTabs>
        </>
      ) : (
        <>
          <Typography
            variant="h1"
            sx={{
              fontSize: "2rem",
              fontWeight: 600,
              ml: 6,
              pt: 3,
              color: "text.secondary",
            }}>
            algoTrade.
          </Typography>
          <Divider sx={{ borderBottomWidth: 1, m: 2 }} />

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
          </LinkTabs>
        </>
      )}
    </Box>
  );
}

export default Sidebar;
