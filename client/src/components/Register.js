import "../App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Alert, Button } from "react-bootstrap";
import { Redirect, useHistory } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [user, setUser] = useState({});
  const [error, setError] = useState([]);

  useEffect(() => {
    console.log("rendered");
    console.log(user);
  }, [user]);

  const handleSubmit = (e) => {
    if (password != confirmPass) {
      setError([...error, "Password and Confirm password doesn't match"]);
    }
    const newUser = {
      username: name,
      password: password,
    };
    setUser(newUser);
    e.preventDefault();
  };

  function AlertDismissibleExample() {
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
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                {error.map((item) => (
                  <p>{item}</p>
                ))}
              </Alert>
            </div>
          ) : null}
        </>
      );
    }
    return null;
  }

  return (
    <div>
      <div>
        <div className="bg-overlay1 d-flex flex-column justify-content-center align-items-center">
          <div className="login-box">
            <AlertDismissibleExample />
            <div className="form-div">
              <form onSubmit={handleSubmit}>
                <label style={{ fontSize: "2rem", fontWeight: "bolder" }}>
                  Register
                </label>
                <div class="input-con">
                  <input
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                    name="Name"
                    required="true"
                    className="input-text"
                    type="text"
                    placeholder="Username"
                  />
                </div>
                <div class="input-con">
                  <input
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                    name="Password"
                    required="true"
                    className="input-text"
                    type="password"
                    placeholder="Password"
                  />
                </div>
                <div class="input-con">
                  <input
                    onChange={(event) => {
                      setConfirmPass(event.target.value);
                    }}
                    name="Confirm Password"
                    required="true"
                    className="input-text"
                    type="password"
                    placeholder="Confirm Password"
                  />
                </div>
                <div class="input-con">
                  <input
                    style={{ width: "85%" }}
                    className="btn btn-success"
                    type="submit"
                    placeholder="Password"
                    value="Register"
                  />
                </div>
              </form>
              <p style={{ fontSize: "1rem" }}>
                Already have and account?{" "}
                <span>
                  <a href="/register">Login</a>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
