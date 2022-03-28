import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { UserContext } from "../../UserContext";

function Topbar() {
  return (
    <div className="topbar">
      <div className="l">
        <h1>algoTrade.</h1>
      </div>

      <div className="r">
        <Dropdown />
      </div>
    </div>
  );
}

const Dropdown = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [anchor, setanchor] = useState(null);

  const handleOpen = (e) => {
    setanchor(e.currentTarget);
  };

  const handleMenuClose = (e) => {
    setanchor(null);
  };

  const profile = () => {
    navigate("/profile");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };
  return (
    <>
      <IconButton
        onClick={handleOpen}
        size="small"
        aria-controls="menu"
        aria-haspopup="true"
        className="profile">
        <Avatar sx={{ width: 40, height: 40 }} />
      </IconButton>
      <Menu
        id="menu"
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={handleMenuClose}>
        <MenuItem onClick={profile} sx={{ color: "rgb(114, 88, 223)" }}>
          <ListItemIcon>
            <ManageAccountsIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={logout} sx={{ color: "rgb(114, 88, 223)" }}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default Topbar;
