import React, { useEffect } from "react";
import Footer from "./Footer";
import Home from "./Home";
import Navbar from "./Navbar";
import { Divider, Container } from "@mui/material";
function Landing() {
  useEffect(() => {
    document.title = "algoTrade";
  }, []);
  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
          transition: " all .15s ease-in-out",
        }}>
        <Navbar />
        <Home />
        <Divider sx={{ borderBottomWidth: 1 }} />
        <Footer />
      </Container>
    </>
  );
}

export default Landing;
