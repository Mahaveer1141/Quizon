import "./Register.scss";
import { Formik, Form } from "formik";
import InputField from "../InputField/InputField";
import Loader from "../Loader/Loader";
import axios from "axios";
import { backendUrl } from "../../utills/constanst";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <div className="bg-overlay1 d-flex flex-column justify-content-center align-items-center">
          <div className="register-box">
            <div className="form-div">
              <Formik
                initialValues={{
                  username: "",
                  password: "",
                  confirmPassword: "",
                }}
                onSubmit={async (values, { setErrors, setSubmitting }) => {
                  setSubmitting(true);
                  const { data } = await axios.post(
                    `${backendUrl}/auth/register`,
                    values
                  );
                  if (data.errors) {
                    if (data.errors.message.includes("username"))
                      setErrors({ username: data.errors.message });
                    if (data.errors.message.includes("password"))
                      setErrors({ password: data.errors.message });
                    if (data.errors.message.includes("Confirm Password"))
                      setErrors({ confirmPassword: data.errors.message });
                  } else navigate("/login");
                  setSubmitting(false);
                }}
              >
                {({ errors, isSubmitting, values, handleChange }) => (
                  <Form>
                    <label style={{ fontSize: "2rem", fontWeight: "bolder" }}>
                      Register
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
                      required
                      type="password"
                      placeholder="Password"
                      error={errors.password}
                    />
                    <InputField
                      handleChange={handleChange}
                      value={values.confirmPassword}
                      name="confirmPassword"
                      required
                      type="password"
                      placeholder="Confirm Password"
                      error={errors.confirmPassword}
                    />
                    <div className="button-con">
                      <button
                        disabled={isSubmitting}
                        className="btn btn-success btn-submit"
                        type="submit"
                        placeholder="Password"
                        value="Register"
                      >
                        {isSubmitting ? <Loader /> : <>Register</>}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
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
