import React, { useState } from "react";
import "./landing.scss";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function Landing(props) {
  const [auth, setAuth] = useState(false);
  return (
    <div className="landing">
      <div className="nav">
        <Navbar />
      </div>
      <div className="content">
        <Content />
      </div>
      <div className="foot">
        <Footer />
      </div>
    </div>
  );
}

const Home = () => {
  return (
    <div className="home">
      <div className="section">
        <h2>Automate your trade with our algorithms</h2>
        <p>
          Dive fearlessly into the world of trading with our end-to-end trading
          algos, empowering both amateurs and experts
        </p>
        <Button className="btn explore-btn" variant="contained">
          <Link to="/#" className="explore">
            Explore Strategies
          </Link>
        </Button>
        <p className="supported">Suppoted Partners:</p>
        <img src="aliceblue.png" alt="" />
      </div>
      <div className="image">
        <img src="home-image.png" />
      </div>
    </div>
  );
};

const Content = () => {
  return (
    <>
      <Home />
      <div className="wave">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none">
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="shape-fill"></path>
        </svg>
      </div>
    </>
  );
};

export default Landing;
