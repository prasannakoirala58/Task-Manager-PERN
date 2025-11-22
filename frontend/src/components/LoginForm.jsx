import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import validateManyFields from "../validations";
import Input from "./utils/Input";
import Loader from "./utils/Loader";
import { postLoginData } from "../redux/actions/authActions";

const LoginForm = ({ redirectUrl }) => {
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.authReducer);
  const { loading, isLoggedIn } = authState;

  useEffect(() => {
    if (isLoggedIn) {
      navigate(redirectUrl || "/");
    }
  }, [isLoggedIn, navigate, redirectUrl]);

  // 📌 Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 📌 Submit login
  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateManyFields("login", formData);
    setFormErrors({});

    if (errors.length > 0) {
      setFormErrors(
        errors.reduce((acc, ob) => ({ ...acc, [ob.field]: ob.err }), {})
      );
      return;
    }

    // 🚀 Dispatch Redux login
    dispatch(postLoginData(formData.email, formData.password));
  };

  // 📌 Display field-specific error
  const fieldError = (field) => (
    <p
      className={`mt-1 text-pink-600 text-sm ${
        formErrors[field] ? "block" : "hidden"
      }`}
    >
      <i className="mr-2 fa-solid fa-circle-exclamation"></i>
      {formErrors[field]}
    </p>
  );

  return (
    <form className="m-auto my-16 max-w-[500px] bg-white p-8 border-2 shadow-md rounded-md">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className="text-center mb-4">Welcome user, please login here</h2>

          {/* EMAIL */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="after:content-['*'] after:ml-0.5 after:text-red-500"
            >
              Email
            </label>
            <Input
              type="text"
              name="email"
              id="email"
              value={formData.email}
              placeholder="youremail@domain.com"
              onChange={handleChange}
            />
            {fieldError("email")}
          </div>

          {/* PASSWORD */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="after:content-['*'] after:ml-0.5 after:text-red-500"
            >
              Password
            </label>
            <Input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              placeholder="Your password.."
              onChange={handleChange}
            />
            {fieldError("password")}
          </div>

          {/* SUBMIT */}
          <button
            className="bg-primary text-white px-4 py-2 font-medium hover:bg-primary-dark"
            onClick={handleSubmit}
          >
            Submit
          </button>

          <div className="pt-4">
            <Link to="/signup" className="text-blue-400">
              Don't have an account? Signup here
            </Link>
          </div>
        </>
      )}
    </form>
  );
};

export default LoginForm;
