import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import JoinQuiz from "./JoinQuiz/JoinQuiz";
import CreateQuiz from "./CreateQuiz/CreateQuiz";
import Login from "./Login/Login";
import Register from "./Register/Register";
import MyQuiz from "./MyQuiz/MyQuiz";
import Quiz from "./Quiz/Quiz";
import ProtectedRoute from "./ProtectedRoutes";
import BackwardProtectedRoute from "./BackwardProtectedRoutes";
import HomeWrapper from "./HomeWrapper";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeWrapper />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/join_quiz" element={<JoinQuiz />} />
          <Route path="/create_quiz" element={<CreateQuiz />} />
          <Route path="/my_quiz" element={<MyQuiz />} />
          <Route path="/quiz/:id" element={<Quiz />} />
        </Route>
        <Route element={<BackwardProtectedRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
