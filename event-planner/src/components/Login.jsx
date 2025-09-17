import NavBar from "../routes/Navbar";
import { useFormik } from "formik";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../CurrentUserContext";

export default function Login() {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(CurrentUserContext);

  const validate = (values) => {
    const errors = {};

    if (!values.userName) {
      errors.userName = "Required";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      setCurrentUser(values.userName);
      navigate("/");
    },
  });

  return (
    <>
      <NavBar />
      <div
        style={{
          display: "flex",
          alignItems: "center", // vertical centering
          minHeight: "80vh", // take most of the viewport height
          flexDirection: "column", // stack children vertically
        }}
      >
        <div>
          <h2>Log in</h2>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="userName">Username</label>
            <input
              id="userName"
              name="userName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.userName}
            />
            {formik.touched.userName && formik.errors.userName ? (
              <div>{formik.errors.userName}</div>
            ) : null}
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
            <button type="submit">Login</button>
          </form>
          <p>
            Don't have an account? <a href="/register">Register</a>
          </p>
        </div>
      </div>
    </>
  );
}
