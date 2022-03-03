import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import API from "../API";
import { isAuthenticated } from "../Auth/Helper";
import Base from "../Core/Base";
import { getOne, updateQuiz } from "./Helper/adminapicall";
const { token, user } = isAuthenticated();

const UpdateQuiz = () => {
  const [Values, setValues] = useState({
    title: "",
    description: "",
    photo: "",
    loading: false,
    error: "",
    createdQuiz: "",
    getaredirect: false,
    formData: new FormData(),
  });

  const { quizId } = useParams();

  useEffect(() => {
    getOne(quizId).then((res) => {
      if (res.error) {
        alert(res.error);
      } else {
        setValues({
          ...Values,
          title: res.title,
          description: res.description,
        });
      }
    });
  }, []);

  const history = useHistory();
  const { title, description, photo, loading, getaredirect, formData } = Values;

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...Values, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...Values, error: "", loading: true });

    updateQuiz(user._id, quizId, token, formData).then((data) => {
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
        });
        history.goBack();
      }
    });
  };

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-md btn-dark mb-3" to="/admin/manage/quiz/">
        Back
      </Link>
    </div>
  );

  const quizForm = () => (
    <form>
      <div className="form-group">
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange("title")}
          value={title}
          autoFocus
          name="title"
          required
          placeholder="For Ex. React Quiz"
        />
        <textarea
          type="text"
          className="form-control my-3"
          onChange={handleChange("description")}
          value={description}
          autoFocus
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

  return (
    <Base
      title="Edit Quiz"
      className="container bg-purple p-5 mb-4"
      description={`Update Your ${title} Quiz Here...`}
    >
      {goBack()}
      <div className="row bg-white rounded p-4">
        <img
          className="card-img-top"
          src={`${API}/quiz/photo/${quizId}`}
          alt={title}
          style={{
            width: "150px",
            height: "150px",
            margin: "auto",
          }}
        />
        <div className="col-md-8 offset-md-2 mb-4">{quizForm()}</div>
      </div>
    </Base>
  );
};

export default UpdateQuiz;
