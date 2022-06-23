import { useEffect, useState } from "react";

import "./CreateQuiz.scss";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { backendUrl } from "../../utills/constanst";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";

const CreateQuiz = () => {
  const navigate = useNavigate();
  const demoQuizQuestion = {
    Question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAns: "",
  };

  const intialList = JSON.parse(
    sessionStorage.getItem("quizList") || JSON.stringify([demoQuizQuestion])
  );

  const [inputList, setInputList] = useState<any>(intialList);
  const [errors, setErrors] = useState<any>();
  const [isSubmitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [key, setKey] = useState("");

  useEffect(() => {
    sessionStorage.setItem("quizList", JSON.stringify(inputList));
  }, [inputList]);

  // handle input change
  const handleInputChange = (e: any, index: any) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index: any) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, demoQuizQuestion]);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const sendList = {
      info: inputList,
      time: 180,
    };
    const { data } = await axios.post(
      `${backendUrl}/quizs/create_quiz`,
      sendList
    );
    setKey(data._id);
    if (data.errors) setErrors(data.errors);
    else {
      sessionStorage.removeItem("quizList");
      setShowSuccess(true);
      window.scroll({
        top: 1000,
        behavior: "smooth",
      });
    }
    setSubmitting(false);
  };

  return (
    <>
      <Navbar />
      <div className="upper">
        <div className="main-div">
          <div className="q-box1">
            {errors ? (
              <div className="d-flex justify-content-center">
                <div className="error">enter details correctly</div>
              </div>
            ) : null}

            <p style={{ fontWeight: "bold", color: "#c7c7c7" }}>
              Default Time alloted to per question is 180 seconds or 3 minutes
            </p>
          </div>
          {inputList.map((item: any, index: number) => (
            <div key={index}>
              <div className="q-box">
                <input
                  className="take-info"
                  name="Question"
                  value={item.Question}
                  onChange={(e) => handleInputChange(e, index)}
                  placeholder="Enter question"
                />
                <input
                  className="take-info"
                  name="optionA"
                  value={item.optionA}
                  onChange={(e) => handleInputChange(e, index)}
                  placeholder="Option A"
                />
                <input
                  className="take-info"
                  name="optionB"
                  value={item.optionB}
                  onChange={(e) => handleInputChange(e, index)}
                  placeholder="Option B"
                />
                <input
                  className="take-info"
                  name="optionC"
                  value={item.optionC}
                  onChange={(e) => handleInputChange(e, index)}
                  placeholder="Option C"
                />
                <input
                  className="take-info"
                  name="optionD"
                  value={item.optionD}
                  onChange={(e) => handleInputChange(e, index)}
                  placeholder="Option D"
                />
                <input
                  className="take-info"
                  name="correctAns"
                  value={item.correctAns}
                  onChange={(e) => handleInputChange(e, index)}
                  placeholder="Correct Answer"
                />
                {inputList.length > 1 ? (
                  <button
                    onClick={() => handleRemoveClick(index)}
                    className="btn btn-danger"
                  >
                    Remove
                  </button>
                ) : null}
                <button
                  onClick={handleAddClick}
                  style={{ marginTop: "1rem", float: "right" }}
                  className="btn btn-primary"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={handleSubmit}
            style={{ marginTop: "1rem" }}
            className="btn btn-success"
          >
            {isSubmitting ? <Loader /> : <>Submit</>}
          </button>
          {showSuccess ? (
            <div className="success-message mt-4">
              <div className="s-c mm">Quiz is created successfully</div>
              <div className="s-c">copy the key to access the quiz</div>
              <div className="s-c">
                <strong>key: {key}</strong>
              </div>
              <div className="s-c mb-3">
                create more quiz:
                <button
                  onClick={() => window.location.reload()}
                  className="ml-4 btn btn-primary"
                >
                  Create Quiz
                </button>
              </div>
              <button
                onClick={() => navigate("/join_quiz")}
                className="btn btn-secondary"
              >
                Join Quiz
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default CreateQuiz;
