import "./Quiz.css";
import { useState, useEffect } from "react";

function Quiz() {
  let intialIndex = Number(window.localStorage.getItem("index") || 0);
  let intialScore = Number(window.localStorage.getItem("score") || 0);
  let intialCompleted = Number(window.localStorage.getItem("completed") || 0);
  let intialTime = Number(window.localStorage.getItem("countTimer") || 10);

  let [countTimer, setcountTimer] = useState(intialTime);
  const [completed, setCompleted] = useState(intialCompleted);
  const [score, setScore] = useState(intialScore);
  const [index, setIndex] = useState(intialIndex);
  useEffect(() => {
    window.localStorage.setItem("index", index);
    window.localStorage.setItem("score", score);
    window.localStorage.setItem("completed", completed);
    window.localStorage.setItem("countTimer", countTimer);
    return () => {
      window.localStorage.clear();
    };
  }, [index, score, completed, countTimer]);

  window.onbeforeunload = function (e) {
    window.onunload = function () {
      window.localStorage.clear();
    };
    return undefined;
  };

  const [questions, setQuestions] = useState([
    {
      que: "who is ceo of tesla",
      options: [
        { val: "Elon Musk", isCorrect: false },
        { val: "Jeff Dean", isCorrect: false },
        { val: "Bill gates", isCorrect: false },
        { val: "No one", isCorrect: true },
      ],
      ans: "Elon Musk",
      res: "No Response",
    },
    {
      que: "what is format",
      options: [
        { val: "format", isCorrect: false },
        { val: "format", isCorrect: false },
        { val: "format", isCorrect: false },
        { val: "format", isCorrect: true },
      ],
      ans: "1 se jyada baap ki aulad",
      res: "No Response",
    },
    {
      que: "what is that",
      options: [
        { val: "Somethinh", isCorrect: false },
        { val: "Not Somethinh", isCorrect: false },
        { val: "New", isCorrect: true },
        { val: "None of the above", isCorrect: false },
      ],
      ans: "New",
      res: "No Response",
    },
    {
      que: "what is function",
      options: [
        { val: "Method", isCorrect: true },
        { val: "No", isCorrect: false },
        { val: "Dont know what to write", isCorrect: false },
        { val: "Shut up", isCorrect: false },
      ],
      ans: "Method",
      res: "No Response",
    },
  ]);

  useEffect(() => {
    setTimeout(() => {
      if (countTimer !== 0) {
        setcountTimer(countTimer - 1);
      } else {
        if (index !== questions.length - 1) {
          setIndex(index + 1);
          setcountTimer(10);
        } else if (index === questions.length - 1) {
          setCompleted(completed + 1);
        }
      }
    }, 1000);
  }, [countTimer]);

  const HandleClick = (clicked) => {
    setQuestions((prev) => {
      prev[index].res = clicked[1];
      return prev;
    });

    if (clicked[0]) {
      setScore(score + 1);
    }

    if (index !== questions.length - 1) {
      setIndex(index + 1);
      countTimer = 10;
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
        {questions.map((item) => (
          <div className="fuck">
            <h4 style={{ marginBottom: "1rem", marginLeft: "5%" }}>
              Question: {item.que}
            </h4>
            <div className="cor-ans">Correct Answer: {item.ans}</div>
            {item.ans === item.res ? (
              <div className="cor-ans">Your answer: {item.res}</div>
            ) : (
              <div className="incor-ans">Your answer: {item.res}</div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="con">
      <div className="main-area">
        {completed >= 1 ? (
          <ScoreCard />
        ) : (
          <>
            <div className="timer-line">
              <div className="timer-c">{countTimer}</div>
            </div>
            <div className="q-section">
              <h2>{questions[index].que}</h2>
              <h5 className="q-count">
                Question {index + 1}/
                <span style={{ fontSize: "15px" }}>{questions.length}</span>
              </h5>
            </div>
            <div className="ans-section">
              {questions[index].options.map((item) => (
                <button
                  onClick={() => HandleClick([item.isCorrect, item.val])}
                  className="btn click btn-lg btn-block"
                >
                  {item.val}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Quiz;
