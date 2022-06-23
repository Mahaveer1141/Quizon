import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../../utills/constanst";
import Loader from "../Loader/Loader";
import Navbar from "../Navbar/Navbar";

function JoinQuiz() {
  const navigate = useNavigate();
  const [key, setKey] = useState("1");
  const [quiz, setQuiz] = useState<any>();
  const [isLoading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const { data } = await axios.get(`${backendUrl}/quizs/quiz/${key}`);
    setLoading(false);
    setQuiz(data);
    if (!data.errors) {
      navigate(`/quiz/${key}`);
    }
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
            {quiz?.errors ? (
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
            {isLoading ? <Loader /> : <>Join</>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinQuiz;
