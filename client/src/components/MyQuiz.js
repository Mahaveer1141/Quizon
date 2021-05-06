import "./MyQuiz.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

function MyQuiz() {
  const [quizList, setquizList] = useState([]);
  useEffect(() => {
    axios
      .get("https://quizcon.herokuapp.com/my_quiz")
      .then((res) => {
        console.log(res.data);
        setquizList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="main-con">
        <div className="box">
          <h2 style={{ color: "white", marginBottom: "1rem" }}>
            My Quizes ({quizList.length})
          </h2>
          {quizList.map((item) => (
            <div className="quiz-con">
              <div>id: {item._id}</div>
              <div>Quesion: {item.info.length}</div>
              <a
                style={{ marginTop: "5px", marginBottom: "3px" }}
                className="btn btn-primary btn-sm "
              >
                Edit Quiz
              </a>
              <a
                style={{ marginTop: "5px", marginBottom: "3px" }}
                className="btn btn-danger btn-sm "
              >
                Delete Quiz
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MyQuiz;
