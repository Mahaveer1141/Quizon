import { useState, useEffect } from "react";
import "./QuizForm.css";
import { useHistory } from "react-router-dom";

const QuizForm = () => {
  let intialList = JSON.parse(window.localStorage.getItem("list")) || [
    {
      Question: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctAns: "",
    },
  ];

  let intialTime = Number(window.localStorage.getItem("time") || 1);

  const [inputList, setInputList] = useState(intialList);
  const [time, setTime] = useState(intialTime);

  useEffect(() => {
    window.localStorage.setItem("list", JSON.stringify(inputList));
    window.localStorage.setItem("time", time);
  });

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
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

  const history = useHistory();
  const onSubmit = () => {
    let a = {
      time: time,
      info: inputList,
    };
    // setTimeout(() => {
    //   history.push("/");
    // }, 1000);
    // console.log("hello");
  };

  return (
    <>
      <div className="upper">
        <div className="main-div">
          <h3 style={{ color: "white" }}>Your id: 45q532</h3>
          <div className="q-box1">
            <div>
              <label style={{ fontWeight: "bold" }}>
                Enter time alloted to per question in seconds
              </label>
              <input
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="take-info1"
                name="Question"
                placeholder="Enter time"
              />
            </div>
          </div>

          {inputList.map((x, i) => (
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
    </>
  );
};

export default QuizForm;
