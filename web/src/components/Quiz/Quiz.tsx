import { useEffect } from "react";
import { useSelector } from "react-redux";

import "./Quiz.scss";
import Navbar from "../Navbar/Navbar";
import { AppDispatch, RootState } from "../../utills/types";
import { useDispatch } from "react-redux";
import { getQuizById, setQuestion } from "../../redux/quizSlice";
import { useParams } from "react-router-dom";
import CenterLoader from "../CenterLoader/CenterLoader";
import ScoreCard from "./ScoreCard";
import {
  setCompleted,
  setCountTimer,
  setIndex,
  setScore,
} from "../../redux/quizManagerSlice";

function Quiz() {
  const timer = 180;
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getQuizById(id!));
  }, []);
  const { id } = useParams();
  const { quiz, status } = useSelector((state: RootState) => state.quiz);
  const questions = quiz;

  let { completed, countTimer, index } = useSelector(
    (state: RootState) => state.quizManage
  );

  useEffect(() => {
    setTimeout(() => {
      if (countTimer !== 0) {
        dispatch(setCountTimer(countTimer - 1));
      } else {
        if (index !== questions.length - 1) {
          dispatch(setIndex());
          dispatch(setCountTimer(timer));
        } else if (index === questions.length - 1) {
          dispatch(setCompleted());
        }
      }
    }, 1000);
  }, [countTimer]);

  const HandleClick = (clicked: any) => {
    dispatch(setQuestion({ index, clicked }));

    if (clicked === questions[index].correctAns) {
      dispatch(setScore());
    }
    if (index !== questions.length - 1) {
      dispatch(setIndex());
      countTimer = timer;
      dispatch(setCountTimer(timer));
    } else if (index === questions.length - 1) {
      dispatch(setCompleted());
    }
  };

  if (status !== "success") {
    return <CenterLoader />;
  }

  return (
    <>
      <Navbar />
      <div className="con">
        <div className="main-area">
          {completed ? (
            <>
              <ScoreCard />
            </>
          ) : (
            <>
              <div className="timer-line">
                <div className="timer-c">{countTimer}</div>
              </div>

              <div className="q-section">
                <h2>{questions[index].Question}</h2>
                <h5 className="q-count">
                  Question {index + 1}/
                  <span style={{ fontSize: "15px" }}>{questions.length}</span>
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
          )}
        </div>
      </div>
    </>
  );
}

export default Quiz;
