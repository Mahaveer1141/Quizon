import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getQuizById } from "../../redux/quizSlice";
import { AppDispatch, RootState } from "../../utills/types";
import Loader from "../Loader/Loader";
import Navbar from "../Navbar/Navbar";

function JoinQuiz() {
  const dispath: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [key, setKey] = useState("");

  const { quiz, status } = useSelector((state: RootState) => state.quiz);
  if (!quiz.errors && status === "success") {
    navigate(`/quiz/${key}`);
  }
  const handleClick = () => {
    dispath(getQuizById(key));
  };

  return (
    <div>
      <Navbar />
      <div className="upper">
        <div className="main-div">
          <h1 style={{ color: "white" }}>Join Quiz</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <label style={{ color: "white" }}>Enter key to join quiz</label>
            {quiz.errors ? (
              <div className="d-flex justify-content-center">
                <div className="error">{quiz.errors.message}</div>
              </div>
            ) : null}
            <input
              className="take-info"
              required
              type="text"
              name="key"
              placeholder="Key"
              onChange={(e) => setKey(e.target.value)}
            />
          </div>
          <div onClick={handleClick} className="btn btn-success">
            {status === "loading" ? <Loader /> : <>Join</>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinQuiz;
