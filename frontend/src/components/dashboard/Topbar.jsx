import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { Logout } from "@mui/icons-material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { UserContext } from "../../UserContext";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";

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
  const current = JSON.parse(user);

  const navigate = useNavigate();

  const [anchor, setanchor] = useState(null);

  const handleOpen = (e) => {
    setanchor(e.currentTarget);
  };

  const handleClose = () => {
    setanchor(null);
  };

  const handleMenuClose = (e) => {
    setanchor(null);
  };

  const profile = () => {
    navigate("/profile");
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login", { replace: true });
  };
  return (
    <>
      {/* Bug in this code. Cannot put anchor below IconButton and use onMouseLeave event. */}
      <div className="drop">
        <IconButton
          onMouseOver={handleOpen}
          size="small"
          aria-controls="menu"
          aria-haspopup="true"
          className="profile">
          <h3>{current.data.username}</h3>
        </IconButton>
        <ArrowDropDownSharpIcon />
      </div>

      <Menu
        id="menu"
        anchorEl={anchor}
        open={Boolean(anchor)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleMenuClose}
        MenuListProps={{ onMouseLeave: handleClose }}>
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
