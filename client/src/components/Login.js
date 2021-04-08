import "../App.css";

function Login() {
  return (
    <div>
      <div className="bg-overlay1 d-flex flex-column justify-content-center align-items-center">
        <div className="login-box">
          <div className="form-div">
            <form>
              <label style={{ fontSize: "2rem", fontWeight: "bolder" }}>
                Login
              </label>
              <div class="input-con">
                <input
                  required="true"
                  className="input-text"
                  type="text"
                  placeholder="Username"
                />
              </div>
              <div class="input-con">
                <input
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
