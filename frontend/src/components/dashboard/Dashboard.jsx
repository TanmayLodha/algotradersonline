import React, { useEffect, useState, useContext } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import "./dashboard.scss";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Strategies from "./Strategies";
import PaperTrade from "./PaperTrade";
import Portfolio from "./Portfolio";

function Dashboard() {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  return (
    <div className="dashboard">
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

export default Dashboard;
