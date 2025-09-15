import NavBar from "../routes/Navbar";
import { useFormik } from "formik";
import { useContext } from "react";
import { CurrentUserContext } from "../CurrentUserContext";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const navigate = useNavigate();
  const {setCurrentUser} = useContext(CurrentUserContext);

  const validate = (values) => {
    const errors = {};

    if (!values.fullName) {
      errors.fullName = "Required";
    } else if (!/^[A-Za-z]+(?: [A-Za-z]+)+$/i.test(values.fullName)) {
      //only alphabet characters, must include a space
      errors.fullName =
        "Incorrect Name format: Must use at least 2 words made of stricly letters only";
    }

    if (!values.userName) {
      errors.userName = "Required";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email) //Tests for correct email format
    ) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else if (!/[A-Z]/.test(values.password)) {
      errors.password = "Password must include at least one capital letter";
    } else if (!/[0-9]/.test(values.password)) {
      errors.password = "Password must include at least one number";
    } else if (!/[^\w]/.test(values.password)) {
      errors.password = "Password must include a symbol";
    } else if (!/[a-z]/.test(values.password)) {
      errors.password = "Password must include at least one lowercase letter";
    }

    if (values.confirmPw != values.password) {
      errors.confirmPw = "Passwords must match";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      userName: "",
      email: "",
      password: "",
      confirmPw: "",
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
    <div style={{maxWidth: 600}}>
      <h2>Register</h2>
      <form className='form-container' onSubmit={formik.handleSubmit}>
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.fullName}
        />
        {formik.touched.fullName && formik.errors.fullName ? <div>{formik.errors.fullName}</div> : null}
        <label htmlFor="userName">Username</label>
        <input
          id="userName"
          name="userName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.userName}
        />
        {formik.touched.userName && formik.errors.userName ? <div>{formik.errors.userName}</div> : null}
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
        <label htmlFor="confirmPw">Confirm Password</label>
        <input
          id="confirmPw"
          name="confirmPw"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPw}
        />
        {formik.touched.confirmPw && formik.errors.confirmPw ? <div>{formik.errors.confirmPw}</div> : null}
        <button type="submit" disabled={!formik.dirty}>Login</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
    </>
  );
}
