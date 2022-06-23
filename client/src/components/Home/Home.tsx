import React, { useEffect, useState } from "react";
import Feature from "./Feature";
import About from "./About";
import Navbar from "../Navbar/Navbar";

import "./Home.scss";

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Feature />
      <About />
    </div>
  );
};

export default Home;
