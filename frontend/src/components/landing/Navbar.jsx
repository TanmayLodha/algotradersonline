import React, { useContext } from "react";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext } from "../../ColorModeContext";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";

export default function Navbar() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <>
      <Box
        component="nav"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "70px",
        }}>
        <Box>
          <Typography variant="h1" sx={{ fontSize: "3rem", fontWeight: 600 }}>
            algoTrade.
          </Typography>
        </Box>
        <Box>
          <IconButton
            sx={{ m: 1 }}
            onClick={colorMode.toggleColorMode}
            color="inherit">
            {theme.palette.mode === "dark" ? (
              <DarkModeIcon />
            ) : (
              <LightModeIcon />
            )}
          </IconButton>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button sx={{ m: 2, textDecoration: "none" }} variant="contained">
              Login
            </Button>
          </Link>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <Button sx={{ m: 2 }} variant="outlined" color="secondary">
              Register
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}
