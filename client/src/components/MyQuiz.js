import "./MyQuiz.css";
import { useState, useEffect } from "react";
import axios from "axios";

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
    <div className="main-con">
      <h2 style={{ color: "white" }}>My Quizes ({quizList.length})</h2>

      {quizList.map((item) => (
        <div className="quiz-con">
          <div>
            <div>
              id: <span className="span">{item._id}</span>
            </div>
            <div>
              Question: <span className="span">{item.info.length}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyQuiz;
