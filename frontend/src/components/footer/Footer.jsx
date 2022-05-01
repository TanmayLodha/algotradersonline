import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

import "./footer.scss";
import { Link } from "react-router-dom";

function Footer() {
  const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "rgb(114, 88, 223)",
      color: theme.palette.common.white,
      boxShadow: theme.shadows[1],
      fontSize: 15,
    },
  }));

  return (
    <div className="footer">
      <div className="left">
        <h1>algoTrade.</h1>
        <p>Automate your trade with us</p>

        <div className="legal">
          <Link to="terms" className="a">
            Terms and Conditions
          </Link>

          <p> &copy; All rights reserved</p>
        </div>
      </div>
      <div className="right">
        <div className="email">
          <CustomTooltip title="Mail" placement="top">
            <a href="mailto:19ucc131@lnmiit.ac.in">
              <EmailIcon />
            </a>
          </CustomTooltip>
        </div>

        <div className="address">
          <CustomTooltip title="Address" placement="top">
            <a
              href="https://www.google.com/maps/dir//The+LNM+Institute+of+Information+Technology,+Rupa+ki+Nangal,+Post-Sumel,+Via-Jamdoli+Jaipur-302031,,+Goner+Rd,+Dher+Ki+Dhani,+Jaipur,+Rajasthan+303012/@26.8972824,75.8696902,13z/data=!4m9!4m8!1m0!1m5!1m1!1s0x396db71d58ddb54d:0xe64f31eae498f069!2m2!1d75.8941993!2d26.8572442!3e0"
              target="_blank">
              <LocationOnIcon />
            </a>
          </CustomTooltip>
        </div>
      </div>
    </div>
  );
}

export default Footer;
