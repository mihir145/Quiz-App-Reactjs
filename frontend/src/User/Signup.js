import React, { useState } from "react";
import Base from "../Core/Base";
import { signup } from "../Auth/Helper/index";
import { Link } from "react-router-dom";

const Signup = () => {
  const [values, setValues] = useState({
    email: "",
    name: "",
    password: "",
    error: "",
    success: false,
  });
  const { email, name, password, error, success } = values;

  const handlerChange = (name) => (event) => {
    setValues({
      ...values,
      error: false,
      [name]: event.target.value,
    });
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New Account was created successfully. Please{" "}
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            success: false,
          });
        } else {
          setValues({
            ...values,
            name: "",
            password: "",
            email: "",
            error: "",
            success: true,
          });
        }
      })
      .catch((err) => console.log("err"));
  };
  const SignupForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                className="form-control"
                onChange={handlerChange("name")}
                value={name}
                type="text"
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                onChange={handlerChange("email")}
                value={email}
                type="email"
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                onChange={handlerChange("password")}
                value={password}
                type="password"
              />
            </div>
            <button className="btn btn-success btn-block" onClick={onSubmit}>
              Submit
            </button>
            <p className="text-white text-center">{JSON.stringify(values)}</p>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign up page" description="A Page for user to signup!">
      {successMessage()}
      {errorMessage()}
      {SignupForm()}
    </Base>
  );
};

export default Signup;
