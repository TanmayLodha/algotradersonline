import React, { useState, useContext, useEffect } from "react";
import "./landing.scss";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import { Button } from "@mui/material";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import Register from "../register/Register";
import Login from "../login/Login";
import { UserContext } from "../../UserContext";

function Landing(props) {
  const [navbar, setNavbar] = useState(false);

  useEffect(() => {
    const changeBackground = () => {
      if (window.scrollY > 40) {
        setNavbar(true);
      } else {
        setNavbar(false);
      }
    };

    window.addEventListener("scroll", changeBackground);

    return () => window.removeEventListener("scroll", changeBackground);
  }, [navbar]);

  var sectionStyle = {
    backgroundImage: `url(/circle-scatter.svg)`,
  };

  return (
    <div className="landing" style={sectionStyle}>
      <div className={navbar ? "nav active" : "nav"}>
        <Navbar />
      </div>
      <div className="content">
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
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
        <Link to="login" className="explore">
          <Button className="btn explore-btn" variant="contained">
            Explore Strategies
          </Button>
        </Link>
        <p className="supported">Suppoted Partners:</p>
        <img src="aliceblue.png" alt="" />
      </div>
    </div>
  );
};

// const About = () => {
//   return (
//     <div className="about">
//       <div className="image">
//         <img src="home-image.png" />
//       </div>
//       <div className="stufff">
//         <p>
//           Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut soluta
//           qui vero molestiae, reiciendis ipsum modi, a beatae illum nulla
//           aliquid ipsa explicabo nihil consequatur repellendus hic quam?
//           Dolorum, quibusdam!
//         </p>
//       </div>
//     </div>
//   );
// };

export default Landing;
