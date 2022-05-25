import "./Login.scss";
import { Formik, Form } from "formik";
import InputField from "../InputField/InputField";
import Loader from "../Loader/Loader";
import axios from "axios";
import { backendUrl } from "../../utills/constanst";
import { setAccessToken, setRefreshToken } from "../../utills/utils";

function Login() {
  return (
    <div>
      <div className="bg-overlay1 d-flex flex-column justify-content-center align-items-center">
        <div className="login-box">
          <div className="form-div">
            <Formik
              initialValues={{
                username: "",
                password: "",
              }}
              onSubmit={async (values, { setErrors, setSubmitting }) => {
                setSubmitting(true);
                const { data } = await axios.post(
                  `${backendUrl}/auth/login`,
                  values
                );
                console.log(data);
                if (data.errors) {
                  if (data.errors.message.includes("username"))
                    setErrors({ username: data.errors.message });
                  if (data.errors.message.includes("password"))
                    setErrors({ password: data.errors.message });
                } else {
                  setAccessToken(data.accessToken);
                  setRefreshToken(data.refreshToken);
                }
                setSubmitting(false);
              }}
            >
              {({ isSubmitting, values, errors, handleChange }) => (
                <Form>
                  <label style={{ fontSize: "2rem", fontWeight: "bolder" }}>
                    Login
                  </label>
                  <InputField
                    handleChange={handleChange}
                    value={values.username}
                    name="username"
                    placeholder="Username"
                    type="text"
                    required
                    error={errors.username}
                  />
                  <InputField
                    handleChange={handleChange}
                    value={values.password}
                    name="password"
                    placeholder="Password"
                    type="password"
                    required
                    error={errors.password}
                  />

                  <div className="button-con">
                    <button
                      disabled={isSubmitting}
                      className="btn btn-success btn-submit"
                      type="submit"
                      placeholder="Password"
                      value="Register"
                    >
                      {isSubmitting ? <Loader /> : <>Login</>}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
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
