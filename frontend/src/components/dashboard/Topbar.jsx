import React, { useContext, useState, useEffect } from "react";
import { Box, IconButton, Typography, Tabs, Tab, Drawer } from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import { ColorModeContext } from "../../ColorModeContext";
import { useTheme } from "@mui/material/styles";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MenuIcon from "@mui/icons-material/Menu";
import CandlestickChartOutlinedIcon from "@mui/icons-material/CandlestickChartOutlined";
import TimelineIcon from "@mui/icons-material/Timeline";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import DataThresholdingIcon from "@mui/icons-material/DataThresholding";
import { UserContext } from "../../UserContext";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

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
  transition: " all .15s ease-in-out",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  "&.Mui-selected": {
    backgroundColor: "rgb(104,115,250)",
    color: "#fff",
  },
  "&.Mui-focusVisible": {
    display: "block",
  },
}));

function Topbar({ toggle, drawer }) {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const [isDesktop, setDesktop] = useState(window.innerWidth <= 1200);

  const updateMedia = () => {
    setDesktop(window.innerWidth <= 1200);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setMenu(false);
  };

  const { user } = useContext(UserContext);
  const current = JSON.parse(user);

  const handleProfile = (e) => {
    drawer();
  };

  const [menu, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu(true);
  };

  const toggleDrawer = (event) => {
    setMenu(false);
  };

  return (
    <>
      <Drawer
        anchor="left"
        open={menu}
        onClose={toggleDrawer}
        sx={{
          backdropFilter: "blur(4px)",
          transition: " all 5s ease-in-out",
        }}>
        <Box>
          <LinkTabs
            value={value}
            onChange={handleChange}
            orientation="vertical"
            sx={{
              pt: 2,
              width: "30vw",
              transition: " all .15s ease-in-out",
            }}>
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
        </Box>
      </Drawer>

      <Box
        component="nav"
        sx={{
          display: "flex",
          justifyContent: isDesktop ? "space-between" : "end",
          alignItems: "center",
          p: 1,
        }}>
        {isDesktop ? (
          <>
            <IconButton
              size="large"
              onClick={toggleMenu}
              sx={{
                width: 50,
                height: 50,
                ml: 2,
              }}>
              <MenuIcon
                sx={{
                  fontSize: "30px",
                  transition: " all .15s ease-in-out",
                }}
              />
            </IconButton>
            <Typography
              variant="h1"
              sx={{
                fontSize: "1.6rem",
                fontWeight: 600,
              }}>
              algoTrade.
            </Typography>
          </>
        ) : null}

        <Box>
          <IconButton
            sx={{ width: 50, height: 50 }}
            size="large"
            onClick={colorMode.toggleColorMode}
            color="inherit">
            {theme.palette.mode === "dark" ? (
              <DarkModeIcon sx={{ fontSize: "30px" }} />
            ) : (
              <LightModeIcon sx={{ fontSize: "30px" }} />
            )}
          </IconButton>
          <IconButton
            sx={{
              ml: 2,
              mr: 2,
              borderRadius: 2,
            }}
            onClick={handleProfile}>
            <Typography
              variant="h1"
              sx={{
                fontSize: "1.6rem",
                fontWeight: 600,
                textAlign: "center",
              }}>
              {current.data.username}
            </Typography>
          </IconButton>
          <IconButton
            sx={{ p: 1, mr: 2, width: 50, height: 50 }}
            size="large"
            onClick={() => toggle()}>
            <Logout sx={{ fontSize: "30px" }} />
          </IconButton>
        </Box>
      </Box>
    </>
  );
}

export default Topbar;
