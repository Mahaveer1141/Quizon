import "./MyQuiz.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

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
          {quizList.map((item: any) => (
            <div className="quiz-con">
              <div>id: {item._id}</div>
              <div>Quesion: {item.info.length}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MyQuiz;
