import React, { useContext } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import { ColorModeContext } from "../../ColorModeContext";
import { useTheme } from "@mui/material/styles";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { UserContext } from "../../UserContext";

function Topbar({ toggle, drawer }) {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const { user } = useContext(UserContext);
  const current = JSON.parse(user);
  const handleProfile = (e) => {
    drawer();
  };
  return (
    <>
      <Box
        component="nav"
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          p: 1,
        }}>
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
            "&:hover": {
              backgroundColor: "primary.main",
              color: "#ffff",
            },
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
    </>
  );
}

export default Topbar;
