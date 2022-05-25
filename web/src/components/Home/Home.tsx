import React from "react";
import Feature from "./Feature";
import About from "./About";

import "./Home.scss";

const Home: React.FC = () => {
  return (
    <div>
      <Feature />
      <About />
    </div>
  );
};

export default Home;
