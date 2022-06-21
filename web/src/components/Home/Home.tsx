import React, { useEffect, useState } from "react";
import Feature from "./Feature";
import About from "./About";
import axios from "axios";

import "./Home.scss";
import { backendUrl } from "../../utills/constanst";

const Home: React.FC = () => {
  const [userData, setUserData] = useState();
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${backendUrl}/quizs/my_quiz`);
      setUserData(data);
    })();
  }, []);
  console.log(userData);

  return (
    <div>
      <Feature />
      <About />
    </div>
  );
};

export default Home;
