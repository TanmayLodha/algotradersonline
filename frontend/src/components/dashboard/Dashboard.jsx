import React, { useEffect, useState, useContext } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "./dashboard.scss";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Strategies from "./Strategies";
import PaperTrade from "./PaperTrade";
import Portfolio from "./Portfolio";
import { UserContext } from "../../UserContext";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}

function Dashboard() {
  const { user, setUser } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  //Welcome Message check
  const { state } = useLocation();

  //security Issue check local.storage
  const current = JSON.parse(user);

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login", { replace: true });
  };

  //Autologout Check again
  useEffect(() => {
    if (Date.parse(current.data.expiry) - Date.now() <= 0) {
      logout();
    }
  });

  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  useEffect(() => {
    setOpen(true);
  }, []);

  const snackBarClose = () => {
    setOpen(false);
  };

  return (
    <div className="dashboard">
      {state && (
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={snackBarClose}
          TransitionComponent={SlideTransition}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}>
          <Alert severity="success" variant="filled">
            {"Welcome " + current.data.username}
          </Alert>
        </Snackbar>
      )}

      <div className="left">
        <Sidebar />
      </div>

      <div className="right-s">
        <Topbar />
        <div className="content">
          <Routes>
            <Route path="strategies" element={<Strategies />} />
            <Route path="paperTrade" element={<PaperTrade />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="*" element={<Navigate to="portfolio" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

Dashboard.defaultProps = {
  value: false,
};

export default Dashboard;
