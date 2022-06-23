import { useSelector } from "react-redux";
import { persistor } from "../../redux/store";
import { RootState } from "../../utills/types";
import "./Quiz.scss";

const ScoreCard = () => {
  const { score } = useSelector((state: RootState) => state.quizManage);
  const questions = useSelector((state: RootState) => state.quiz.quiz);

  const handleClick = () => {
    persistor.purge();
  };

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
      {questions.map((item: any, key: number) => (
        <div key={key} className="fuck">
          <h4 style={{ marginBottom: "1rem", marginLeft: "5%" }}>
            Question: {item.Question}
          </h4>
          <div className="cor-ans">Correct Answer: {item.correctAns}</div>
          {item.correctAns === item.ress ? (
            <div className="cor-ans">Your answer: {item.correctAns}</div>
          ) : (
            <div className="incor-ans">Your answer: {item.response}</div>
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
        <div className="d-flex flex-column">
          <a
            onClick={handleClick}
            href="/join_quiz"
            className="btn btn-primary mb-3"
          >
            Play more Quiz
          </a>
          <a onClick={handleClick} href="/" className="btn btn-secondary">
            Go to Home Page
          </a>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
