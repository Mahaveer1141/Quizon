import { useState, useEffect } from "react";
import "./CreateQuiz.css";
import axios from "axios";
import { Alert, Button } from "react-bootstrap";
import Navbar from "../Navbar/Navbar";

const QuizForm = () => {
  let intialList = JSON.parse(window.localStorage.getItem("list") || "") || [
    {
      Question: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctAns: "",
    },
  ];
  const [inputList, setInputList] = useState(intialList);
  const [totalInfo, setTotalInfo] = useState({});
  const [error, setError] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [key, setKey] = useState("");

  useEffect(() => {
    window.localStorage.setItem("list", JSON.stringify(inputList));
  }, []);

  useEffect(() => {
    console.log(totalInfo);
    axios
      .post("https://quizcon.herokuapp.com/create_quiz", totalInfo, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.errors) {
          setError(res.data.errors);
        } else {
          let k = res.data.Quizs[res.data.Quizs.length - 1]._id;
          setKey(k);

          setRedirect(true);
        }
      });
  }, [totalInfo]);

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
    setInputList([
      ...inputList,
      {
        Question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctAns: "",
      },
    ]);
  };

  const onSubmit = () => {
    let a = {
      time: 180,
      info: inputList,
    };
    setTotalInfo(a);
  };

  function AlertDismissibleFail() {
    const [show, setShow] = useState(true);

    if (show) {
      return (
        <>
          {error.length > 0 ? (
            <div style={{ margin: "5% 9% 0 9%" }}>
              <Alert
                variant="danger"
                onClose={() => setShow(false)}
                dismissible
              >
                {error.map((item) => (
                  <div>{item}</div>
                ))}
              </Alert>
            </div>
          ) : null}
        </>
      );
    } else {
      setError([]);
    }
    return null;
  }

  function AlertDismissibleSuccess() {
    const [show, setShow] = useState(true);

    if (show) {
      return (
        <>
          <div style={{ margin: "5% 9% 0 9%" }}>
            <Alert variant="success" onClose={() => setShow(false)} dismissible>
              Quiz Added succusefully.
            </Alert>
          </div>
        </>
      );
    }
    return null;
  }

  const AfterSuccessAdd = () => {
    return (
      <div className="upper">
        <div className="main-div">
          <AlertDismissibleSuccess />
          <h5 style={{ color: "white" }}>Use below key to access quiz</h5>
          <h4 style={{ color: "white" }}>{key}</h4>
          <div
            style={{ padding: "1rem" }}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <a
              href="/"
              style={{ marginBottom: "1rem" }}
              className="btn btn-danger"
            >
              Go to home Page
            </a>
            <a href="/create_quiz" className="btn btn-primary">
              Create more quiz
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      {!redirect ? (
        <div className="upper">
          <div className="main-div">
            <AlertDismissibleFail />
            <div className="q-box1">
              <p style={{ fontWeight: "bold", color: "#c7c7c7" }}>
                Default Time alloted to per question is 180 seconds
              </p>
            </div>

            {inputList.map((x: any, i: any) => (
              <div>
                <div className="q-box">
                  <input
                    className="take-info"
                    name="Question"
                    value={x.Question}
                    onChange={(e) => handleInputChange(e, i)}
                    placeholder="Enter question"
                  />
                  <input
                    className="take-info"
                    name="optionA"
                    value={x.optionA}
                    onChange={(e) => handleInputChange(e, i)}
                    placeholder="Option A"
                  />
                  <input
                    className="take-info"
                    name="optionB"
                    value={x.optionB}
                    onChange={(e) => handleInputChange(e, i)}
                    placeholder="Option B"
                  />
                  <input
                    className="take-info"
                    name="optionC"
                    value={x.optionC}
                    onChange={(e) => handleInputChange(e, i)}
                    placeholder="Option C"
                  />
                  <input
                    className="take-info"
                    name="optionD"
                    value={x.optionD}
                    onChange={(e) => handleInputChange(e, i)}
                    placeholder="Option D"
                  />
                  <input
                    className="take-info"
                    name="correctAns"
                    value={x.correctAns}
                    onChange={(e) => handleInputChange(e, i)}
                    placeholder="Correct Ans"
                  />

                  {inputList.length !== 1 && (
                    <button
                      onClick={() => handleRemoveClick(i)}
                      className="btn btn-danger"
                    >
                      Remove
                    </button>
                  )}
                  {inputList.length - 1 === i && (
                    <button
                      onClick={handleAddClick}
                      style={{ marginTop: "1rem", float: "right" }}
                      className="btn btn-primary"
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button
              onClick={onSubmit}
              style={{ marginTop: "1rem" }}
              className="btn btn-success"
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <AfterSuccessAdd />
      )}
    </>
  );
};

export default QuizForm;
