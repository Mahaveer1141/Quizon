import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

import "./Quiz.scss";
import Navbar from "../Navbar/Navbar";

function Quiz() {
  const [questions, setQuestions] = useState<any>([]);
  const timer = 180;
  useEffect(() => {
    let url = `https://quizcon.herokuapp.com/quiz/${id}`;
    axios.get(url).then((res) => {
      setQuestions((prev: any) => {
        prev = res.data.info;
        return prev;
      });
    });
  }, []);

  let intialIndex = Number(window.localStorage.getItem("index") || 0);
  let intialScore = Number(window.localStorage.getItem("score") || 0);
  let intialCompleted = Number(window.localStorage.getItem("completed") || 0);
  let intialTime = Number(window.localStorage.getItem("countTimer") || timer);

  let [countTimer, setcountTimer] = useState(intialTime);
  const [completed, setCompleted] = useState(intialCompleted);
  const [score, setScore] = useState(intialScore);
  const [index, setIndex] = useState(intialIndex);
  useEffect(() => {
    window.localStorage.setItem("index", index.toString());
    window.localStorage.setItem("score", score.toString());
    window.localStorage.setItem("completed", completed.toString());
    window.localStorage.setItem("countTimer", countTimer.toString());
  }, [index, score, completed, countTimer]);

  useEffect(() => {
    setTimeout(() => {
      if (countTimer !== 0) {
        setcountTimer(countTimer - 1);
      } else {
        if (questions !== undefined && questions[0] !== undefined) {
          if (index !== questions.length - 1) {
            setIndex(index + 1);
            setcountTimer(timer);
          } else if (index === questions.length - 1) {
            setCompleted(completed + 1);
          }
        }
      }
    }, 1000);
  }, [countTimer]);

  let a = useParams();
  const [id, setId] = useState(a.id);

  const HandleClick = (clicked: any) => {
    setQuestions((prev: any) => {
      prev[index].ress = clicked;
      return prev;
    });

    if (clicked === questions[index].correctAns) {
      setScore(score + 1);
    }

    if (index !== questions.length - 1) {
      setIndex(index + 1);
      countTimer = timer;
      setcountTimer((prev) => (prev = countTimer));
    } else if (index === questions.length - 1) {
      setCompleted(completed + 1);
    }
  };

  const ScoreCard = () => {
    return (
      <div style={{ paddingBottom: "2rem" }}>
        <div className="con1">
          <div className="score">
            <h3>Your Score</h3>
            <h1>
              {score} / {questions.length}
            </h1>
          </div>
        </div>
        {questions.map((item: any) => (
          <div className="fuck">
            <h4 style={{ marginBottom: "1rem", marginLeft: "5%" }}>
              Question: {item.Question}
            </h4>
            <div className="cor-ans">Correct Answer: {item.correctAns}</div>
            {item.correctAns === item.ress ? (
              <div className="cor-ans">Your answer: {item.correctAns}</div>
            ) : (
              <div className="incor-ans">Your answer: {item.ress}</div>
            )}
          </div>
        ))}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <a href="/" className="btn btn-danger">
            Go to Home Page
          </a>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="con">
        <div className="main-area">
          {completed >= 1 ? (
            <>
              <ScoreCard />
            </>
          ) : (
            <>
              {questions !== undefined && questions[0] !== undefined ? (
                <>
                  <div className="timer-line">
                    <div className="timer-c">{countTimer}</div>
                  </div>

                  <div className="q-section">
                    <h2>{questions[index].Question}</h2>
                    <h5 className="q-count">
                      Question {index + 1}/
                      <span style={{ fontSize: "15px" }}>
                        {questions.length}
                      </span>
                    </h5>
                  </div>
                  <div className="ans-section">
                    <button
                      onClick={() => HandleClick(questions[index].optionA)}
                      className="btn click btn-lg btn-block"
                    >
                      {questions[index].optionA}
                    </button>
                    <button
                      onClick={() => HandleClick(questions[index].optionB)}
                      className="btn click btn-lg btn-block"
                    >
                      {questions[index].optionB}
                    </button>
                    <button
                      onClick={() => HandleClick(questions[index].optionC)}
                      className="btn click btn-lg btn-block"
                    >
                      {questions[index].optionC}
                    </button>
                    <button
                      onClick={() => HandleClick(questions[index].optionD)}
                      className="btn click btn-lg btn-block"
                    >
                      {questions[index].optionD}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h1 style={{ marginTop: "5rem", textAlign: "center" }}>
                    not valid key
                  </h1>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Quiz;

// [
//   {
//     que: "who is ceo of tesla",
//     options: [
//       { val: "Elon Musk", isCorrect: false },
//       { val: "Jeff Dean", isCorrect: false },
//       { val: "Bill gates", isCorrect: false },
//       { val: "No one", isCorrect: true },
//     ],
//     ans: "Elon Musk",
//     res: "No Response",
//   },
//   {
//     que: "what is format",
//     options: [
//       { val: "format", isCorrect: false },
//       { val: "format", isCorrect: false },
//       { val: "format", isCorrect: false },
//       { val: "format", isCorrect: true },
//     ],
//     ans: "1 se jyada baap ki aulad",
//     res: "No Response",
//   },
//   {
//     que: "what is that",
//     options: [
//       { val: "Somethinh", isCorrect: false },
//       { val: "Not Somethinh", isCorrect: false },
//       { val: "New", isCorrect: true },
//       { val: "None of the above", isCorrect: false },
//     ],
//     ans: "New",
//     res: "No Response",
//   },
//   {
//     que: "what is function",
//     options: [
//       { val: "Method", isCorrect: true },
//       { val: "No", isCorrect: false },
//       { val: "Dont know what to write", isCorrect: false },
//       { val: "Shut up", isCorrect: false },
//     ],
//     ans: "Method",
//     res: "No Response",
//   },
// ]
