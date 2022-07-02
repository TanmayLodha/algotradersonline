import React, { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import {
  Tooltip,
  Box,
  Typography,
  Grid,
  IconButton,
  Backdrop,
} from "@mui/material";
import TOC from "./TOC";

function Footer() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    <Box component="footer" sx={{ display: "flex", mt: 2 }}>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: "blur(4px)",
        }}
        open={open}
        onClick={handleClose}>
        <TOC />
      </Backdrop>
      <Grid container>
        <Grid item xs={6}>
          <Box component="section">
            <Typography variant="h3" sx={{ fontSize: "2rem", fontWeight: 600 }}>
              algoTrade.
            </Typography>
            <Typography variant="subtitle1" sx={{ fontSize: "1rem" }}>
              Automate your trade with us
            </Typography>

            <Box sx={{ display: "flex" }}>
              <Typography
                variant="subtitle2"
                sx={{
                  mt: 10,
                  mr: 1,
                  mb: 2,
                  cursor: "pointer",
                  color: "primary.main",
                }}
                onClick={handleToggle}>
                Terms and Conditions
              </Typography>
              <Typography variant="subtitle2" sx={{ mt: 10, ml: 1, mb: 2 }}>
                &copy; All rights reserved
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
            component="section"
            sx={{ display: "flex", justifyContent: "end" }}>
            <Tooltip title="Mail" placement="top">
              <IconButton
                sx={{ color: "primary.main" }}
                onClick={() =>
                  window.open("mailto:system.administrator@lnmiit.ac.in")
                }>
                <EmailIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Address" placement="top">
              <IconButton
                sx={{ color: "primary.main" }}
                onClick={() =>
                  window.open(
                    "https://www.google.com/maps/dir//The+LNM+Institute+of+Information+Technology,+Rupa+ki+Nangal,+Post-Sumel,+Via-Jamdoli+Jaipur-302031,,+Goner+Rd,+Dher+Ki+Dhani,+Jaipur,+Rajasthan+303012/@26.8972824,75.8696902,13z/data=!4m9!4m8!1m0!1m5!1m1!1s0x396db71d58ddb54d:0xe64f31eae498f069!2m2!1d75.8941993!2d26.8572442!3e0",
                    "_blank",
                    "noreferrer"
                  )
                }>
                <LocationOnIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Footer;
