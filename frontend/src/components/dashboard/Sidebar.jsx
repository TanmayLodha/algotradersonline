import React, { useState } from "react";
import CandlestickChartIcon from "@mui/icons-material/CandlestickChart";
import TimelineIcon from "@mui/icons-material/Timeline";
import ReceiptIcon from "@mui/icons-material/Receipt";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

function Sidebar() {
  const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "rgb(114, 88, 223)",
      color: theme.palette.common.white,
      boxShadow: theme.shadows[1],
      fontSize: 25,
    },
  }));

  return (
    <div className="sidebar-s">
      <ul className="sidebarlist">
        <Link to="portfolio" className="sidebaricon">
          <CustomTooltip title="Portfolio" placement="right">
            <li>
              <TimelineIcon fontSize="large" />
            </li>
          </CustomTooltip>
        </Link>
        <Link className="sidebaricon" to="strategies">
          <CustomTooltip title="Strategies" placement="right">
            <li>
              <CandlestickChartIcon fontSize="large" />
            </li>
          </CustomTooltip>
        </Link>
        <Link to="paperTrade" className="sidebaricon">
          <CustomTooltip title="PaperTrade" placement="right">
            <li>
              <ReceiptIcon fontSize="large" />
            </li>
          </CustomTooltip>
        </Link>
      </ul>
    </div>
  );
}

export default Sidebar;
