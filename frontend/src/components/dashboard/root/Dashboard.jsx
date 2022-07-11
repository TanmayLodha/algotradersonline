import React, { useEffect, useState, useContext, useMemo } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import Strategies from "../strategies/Strategies";
import PaperTrade from "../papertrade/PaperTrade";
import Portfolio from "../portfolio/Portfolio";
import { UserContext } from "../../../UserContext";
import Profile from "../Profile";
import AliceInputs from "../strategies/AliceInputs";
import ConfirmExecution from "../strategies/ConfirmExecution";
import SuccessCard from "./SuccessCard";
import LogoutCheck from "./LogoutCheck";
import { StrategiesContext } from "../../../StrategiesContext";
import { Box, Backdrop, Drawer, Grid } from "@mui/material";
import OptionsData from "../optionsChain/OptionsData";
import { BaseURL } from "../../../BaseURL";

function Dashboard() {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  const { user, setUser } = useContext(UserContext);
  const current = JSON.parse(user);
  const img = `https://avatars.dicebear.com/api/avataaars/${current.data.username}.svg`;
  // Logour Backdrop
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  //AliceInputs BackDrop
  const [ailceInp, setAliceInp] = useState(false);
  const handleAliceBD = () => {
    setAliceInp(false);
  };
  const handleAliceToggle = () => {
    setAliceInp(!ailceInp);
  };

  //security Issue check local.storage
  const navigate = useNavigate();
  const logout = () => {
    fetch(BaseURL + "api/logout/", {
      method: "POST",
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
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

    localStorage.clear();
    setUser(null);
    navigate("", { replace: true });
  };

  //Expandable SideBar
  // eslint-disable-next-line
  const [mini, setMini] = useState(true);
  const handleMiniOpen = () => {
    setMini(false);
  };
  const handleMiniClose = () => {
    setMini(true);
  };

  //Strategy props
  const [strategy, setStrategy] = useState(null);

  const handleStrategy = (value) => {
    setStrategy(value);
  };
  const [succmsg, setSuccMsg] = useState(false);

  // Profile Drawer
  const [drawer, setDrawer] = useState(false);

  const openDrawer = () => {
    setDrawer(true);
  };

  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawer(false);
  };

  // Autologout
  useEffect(() => {
    if (Date.parse(current.data.expiry) - Date.now() <= 0) {
      logout();
      window.location.reload();
    }
  });

  const [isTablet, setTablet] = useState(window.innerWidth <= 1200);

  const updateMedia = () => {
    setTablet(window.innerWidth <= 1200);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  //Fetch Strategies
  const [strategies, setStrategies] = useState(null);

  useEffect(() => {
    fetch(BaseURL + "api/strategies/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${current.data.token}`,
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        setStrategies(data);
      })
      .catch((error) => {});
    // eslint-disable-next-line
  }, []);

  const providerValue = useMemo(() => ({ strategies }), [strategies]);

  return (
    <>
      <StrategiesContext.Provider value={providerValue}>
        {/* Logout Backdrop */}
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backdropFilter: "blur(4px)",
            transition: " all .15s ease-in-out",
          }}
          open={open}>
          <LogoutCheck close={handleClose} toggle={handleToggle} />
        </Backdrop>

        {/* Create and Execute File backdrop */}
        <Backdrop
          sx={{
            color: "#fff",

            zIndex: (theme) => theme.zIndex.drawer + 1,
            backdropFilter: "blur(4px)",
            transition: " all .15s ease-in-out",
          }}
          open={ailceInp}>
          {current.data.isCredential ? (
            <ConfirmExecution close={handleAliceBD} msg={setSuccMsg} />
          ) : (
            <AliceInputs
              close={handleAliceBD}
              strategy={strategy}
              succ={setSuccMsg}
            />
          )}
        </Backdrop>

        {/* Success Backdrop */}
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backdropFilter: "blur(4px)",
            transition: " all .15s ease-in-out",
          }}
          open={succmsg}>
          <SuccessCard msg={setSuccMsg} current={current} />
        </Backdrop>

        {/* Profile Drawer */}
        <Drawer
          anchor="right"
          open={drawer}
          onClose={toggleDrawer}
          sx={{
            backdropFilter: "blur(4px)",
            transition: " all .15s ease-in-out",
          }}>
          <Profile img={img} />
        </Drawer>

        {/* main box */}
        <Box
          component="main"
          sx={{
            display: "flex",
            height: "100vh",
            bgcolor: "background.default",
            color: "text.primary",
            transition: " all .15s ease-in-out",
          }}>
          <Grid container>
            {!isTablet ? (
              <Grid item xs={1}>
                <Box
                  sx={{
                    zIndex: 1,
                    transition: " all .15s ease-in-out",
                    position: "fixed",
                  }}>
                  <Sidebar
                    handleMiniOpen={handleMiniOpen}
                    handleMiniClose={handleMiniClose}
                  />
                </Box>
              </Grid>
            ) : null}

            <Grid item xs={isTablet ? 12 : 11}>
              <Topbar toggle={handleToggle} drawer={openDrawer} />
              <Box
                component="section"
                sx={{ pr: 2, bgcolor: "background.default" }}>
                <Routes>
                  <Route
                    path="strategies"
                    element={
                      <Strategies
                        toggle={handleAliceToggle}
                        strategy={handleStrategy}
                      />
                    }
                  />
                  <Route path="paperTrade/*" element={<PaperTrade />} />
                  <Route path="portfolio" element={<Portfolio />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="optionChain" element={<OptionsData />} />
                  <Route path="*" element={<Navigate to="portfolio" />} />
                </Routes>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </StrategiesContext.Provider>
    </>
  );
}

export default Dashboard;
