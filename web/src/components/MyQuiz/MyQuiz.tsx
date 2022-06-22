import { useSelector } from "react-redux";

import "./MyQuiz.scss";
import Navbar from "../Navbar/Navbar";
import { RootState } from "../../utills/types";
import CenterLoader from "../CenterLoader/CenterLoader";

function MyQuiz() {
  const { Quizs } = useSelector((state: RootState) => state.user.me);
  if (Quizs === undefined) {
    return <CenterLoader />;
  }
  const quizList = Quizs;

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
