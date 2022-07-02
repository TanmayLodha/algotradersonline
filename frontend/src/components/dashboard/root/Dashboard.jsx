import React, { useEffect, useState, useContext } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import Strategies from "../strategies/Strategies";
import PaperTrade from "../papertrade/PaperTrade";
import Portfolio from "../Portfolio";
import { UserContext } from "../../../UserContext";
import Profile from "../Profile";
import AliceInputs from "../strategies/AliceInputs";
import ConfirmExecution from "../strategies/ConfirmExecution";
import SuccessCard from "./SuccessCard";
import LogoutCheck from "./LogoutCheck";

import { Box, Backdrop, Drawer } from "@mui/material";

function Dashboard() {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  const { user, setUser } = useContext(UserContext);
  const current = JSON.parse(user);

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
    localStorage.removeItem("user");
    setUser(null);
    navigate("", { replace: true });
  };

  //Expandable SideBar
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

  return (
    <>
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
        <Profile />
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
        <Box
          sx={{
            pt: 0,
            pr: 0.5,
            position: "fixed",
            height: "100vh",
            width: "8vw",
            zIndex: 1,
            bgcolor: "background.default",
            ...(mini === false && {
              width: "17vw",
              boxShadow: "1px 0px 20px 10px rgba(0,0,0,0.1)",
              transition: " all .15s ease-in-out",
            }),
            transition: " all .15s ease-in-out",
          }}>
          <Sidebar
            handleMiniOpen={handleMiniOpen}
            handleMiniClose={handleMiniClose}
          />
        </Box>

        <Box
          sx={{
            pt: 0,
            pr: 0.5,
            position: "fixed",
            left: "9vw",
            height: "100vh",
            width: "92vw",
            overflow: "scroll",
          }}>
          <Topbar toggle={handleToggle} drawer={openDrawer} />
          <Box component="section">
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

              <Route path="*" element={<Navigate to="portfolio" />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;
