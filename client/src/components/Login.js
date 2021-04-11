import "../App.css";
import { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import axios from "axios";
import { Redirect, useHistory } from "react-router";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const [error, setError] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();

  useEffect(() => {
    axios.post("http://localhost:5000/login", user).then((res) => {
      if (res.data.errors) {
        setError(res.data.errors);
      } else {
        window.localStorage.setItem("token", res.data.accessToken);
        window.localStorage.setItem(
          "CurrentUser",
          JSON.stringify(res.data.user)
        );
        window.localStorage.setItem("isAuth", true);
        setRedirect(true);
        setTimeout(() => {
          history.push("/");
        }, 1000);
      }
    });
  }, [user]);

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
                {error.map((item) => item)}
              </Alert>
            </div>
          ) : null}
        </>
      );
    }
    return null;
  }

  function AlertDismissibleSuccess() {
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
                Login successfully.
              </Alert>
            </div>
          ) : null}
        </>
      );
    }
    return null;
  }

  const handleSubmit = (e) => {
    const validateUser = {
      username: name,
      password: password,
    };
    setUser(validateUser);
    e.preventDefault();
  };

  return (
    <div>
      <div className="bg-overlay1 d-flex flex-column justify-content-center align-items-center">
        <div className="login-box">
          <AlertDismissibleFail />
          <AlertDismissibleSuccess />
          <div className="form-div">
            <form onSubmit={handleSubmit}>
              <label style={{ fontSize: "2rem", fontWeight: "bolder" }}>
                Login
              </label>
              <div className="input-con">
                <input
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
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
                  required="true"
                  className="input-text"
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div class="input-con">
                <input
                  style={{ width: "85%" }}
                  className="btn btn-success"
                  type="submit"
                  placeholder="Password"
                  value="Login"
                />
              </div>
            </form>
            <p style={{ fontSize: "1rem" }}>
              Don't have an account?{" "}
              <span>
                <a href="/register">Register</a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
