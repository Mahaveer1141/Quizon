import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import JoinQuiz from "./JoinQuiz/JoinQuiz";
import CreateQuiz from "./CreateQuiz/CreateQuiz";
import Login from "./Login/Login";
import Register from "./Register/Register";
import MyQuiz from "./MyQuiz/MyQuiz";
import Quiz from "./Quiz/Quiz";
import Navbar from "./Navbar/Navbar";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join_quiz" element={<JoinQuiz />} />
        <Route path="/create_quiz" element={<CreateQuiz />} />
        <Route path="/my_quiz" element={<MyQuiz />} />
        <Route path="/quiz/:id" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
