import React, { useState } from "react";
import { createQuiz } from "./Helper/adminapicall";
import Base from "../Core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../Auth/Helper";
const { token, user } = isAuthenticated();

const CreateQuiz = () => {
  const [Values, setValues] = useState({
    title: "",
    description: "",
    photo: "",
    loading: false,
    error: "",
    createdQuiz: "",
    formData: new FormData(),
  });

  const { title, description, photo, loading, getaredirect, formData } = Values;

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...Values, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...Values, error: "", loading: true });
    createQuiz(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...Values, error: data.error });
      } else {
        setValues({
          title: "",
          description: "",
          photo: "",
          loading: false,
          error: "",
          createdQuiz: data.title,
          formData: new FormData(),
        });
      }
    });
  };

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );

  const errMsg = () =>
    Values.error && <div className="alert alert-danger">{Values.error}</div>;

  const successMsg = () =>
    Values.createdQuiz && (
      <div className="alert alert-success">
        {Values.createdQuiz} Quiz is created!
      </div>
    );
  const quizForm = () => {
    return (
      <form>
        {errMsg()}
        {successMsg()}
        <div className="form-group">
          <h4>Enter the Quiz Name</h4>
          <input
            type="text"
            className="form-control my-3"
            onChange={handleChange("title")}
            value={title}
            name="title"
            autoFocus
            placeholder="For Ex. React Quiz"
          />
          <textarea
            type="text"
            className="form-control my-3"
            onChange={handleChange("description")}
            value={description}
            name="description"
            placeholder="Description"
          ></textarea>
          <input
            type="file"
            onChange={handleChange("photo")}
            name="photo"
            className="form-control"
          />
          <br />
          <button className="btn btn-block btn-success" onClick={onSubmit}>
            Create
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="Create Quiz"
      className="container bg-purple p-5 mb-4"
      description="Create All Quizzes Here..."
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-white rounded p-4">
        <div className="col-md-8 offset-md-2 mb-4">{quizForm()}</div>
      </div>
    </Base>
  );
};

export default CreateQuiz;
