import React, { useState } from "react";
import Base from "../Core/Base";
import { Redirect, Link } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../Auth/Helper";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, success, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

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
            Logged in successfully!
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

  const loadingMessage = () => {
    return (
      loading && (
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
            <div className="alert alert-info">
              <h2>Loading......</h2>
            </div>
          </div>
        </div>
      )
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({ ...values, didRedirect: true });
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard/" />;
      } else {
        return <Redirect to="/user/dashboard/" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const signinForm = () => {
    return (
      <div className="row" style={{ width: "auto" }}>
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                onChange={handlerChange("email")}
                type="email"
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                onChange={handlerChange("password")}
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
    <Base title="Signin Form" description="Signin Here to get access">
      {errorMessage()}
      {successMessage()}
      {loadingMessage()}
      {performRedirect()}
      {signinForm()}
    </Base>
  );
};

export default Signin;
