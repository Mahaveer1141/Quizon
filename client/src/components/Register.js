import "../App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Alert, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [user, setUser] = useState({});
  const [error, setError] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();

  useEffect(() => {
    axios.post("https://quizcon.herokuapp.com/register", user).then((res) => {
      if (res.data.errors) {
        setError(res.data.errors);
      } else {
        setRedirect(true);
        setTimeout(() => {
          history.push("/login");
        }, 3000);
      }
    });
  }, [user]);

  const handleSubmit = (e) => {
    const newUser = {
      username: name,
      password: password,
      confirmPass: confirmPass,
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
                {error.map((item) => item)}
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

  function AlertSuccess() {
    const [show, setShow] = useState(true);

    if (show) {
      return (
        <>
          {redirect ? (
            <div style={{ margin: "5% 9% 0 9%" }}>
              <Alert
                variant="success"
                onClose={() => setShow(false)}
                dismissible
              >
                Registered successfully. You are been redirected to Login page.
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
      <Navbar />
      <div>
        <div className="bg-overlay1 d-flex flex-column justify-content-center align-items-center">
          <div className="login-box">
            <AlertSuccess />
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
                  <a href="/login">Login</a>
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
