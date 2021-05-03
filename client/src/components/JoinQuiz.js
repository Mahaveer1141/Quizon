import { useState, useEffect } from "react";
import Navbar from "./Navbar";

function JoinQuiz() {
  const [key, setKey] = useState("");

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
            <input
              className="take-info"
              required="true"
              type="text"
              name="key"
              placeholder="Key"
              onChange={(e) => setKey(e.target.value)}
            />
          </div>
          <a href={"/quiz/" + key} className="btn btn-success">
            Join
          </a>
        </div>
      </div>
    </div>
  );
}

export default JoinQuiz;
