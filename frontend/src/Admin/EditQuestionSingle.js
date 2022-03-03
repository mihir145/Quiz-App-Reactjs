import React from "react";
import { useState } from "react";
import { isAuthenticated } from "../Auth/Helper";
import { updateQuestion } from "./Helper/adminapicall";

const EditQuestionSingle = ({ item, index }) => {
  const [question, setQuestion] = useState({
    error: "",
    _id: item._id,
    quiz: item.quiz,
    question: item.question,
    correct_index: item.correct_index,
    options: item.options,
    success: "",
  });

  const { user, token } = isAuthenticated();

  return (
    <div className="jumbotron form-group">
      {question.error && (
        <div className="alert alert-danger">
          <h5>{question.error}</h5>
        </div>
      )}
      {question.success && (
        <div className="alert alert-success">
          <h5>{question.success}</h5>
        </div>
      )}
      <span className="text-dark">{`Q${index + 1}`}</span>
      <textarea
        type="text"
        className="form-control my-3"
        value={question.question}
        onChange={(e) => {
          setQuestion({
            ...question,
            error: "",
            success: "",
            question: e.target.value,
          });
        }}
        required
        placeholder="Write your Question Here..."
      ></textarea>

      <div className="form-group">
        <input
          type="radio"
          name={`ansewer_${item._id}`}
          onChange={(e) => {
            setQuestion({
              ...question,
              error: "",
              success: "",
              correct_index: 0,
            });
          }}
          checked={parseInt(question.correct_index) === 0}
        />{" "}
        <input
          type="text"
          value={question.options[0]}
          onChange={(e) => {
            const { options } = question;
            options[0] = e.target.value;
            setQuestion({
              ...question,
              error: "",
              success: "",
              options: options,
            });
          }}
        />
      </div>

      <div className="form-group">
        <input
          type="radio"
          name={`ansewer_${item._id}`}
          onChange={(e) => {
            setQuestion({
              ...question,
              error: "",
              success: "",
              correct_index: 1,
            });
          }}
          checked={parseInt(question.correct_index) === 1}
        />{" "}
        <input
          type="text"
          value={question.options[1]}
          onChange={(e) => {
            const { options } = question;
            options[1] = e.target.value;
            setQuestion({
              ...question,
              error: "",
              success: "",
              options: options,
            });
          }}
        />
      </div>
      <div className="form-group">
        <input
          type="radio"
          name={`ansewer_${item._id}`}
          onChange={(e) => {
            setQuestion({
              ...question,
              error: "",
              success: "",
              correct_index: 2,
            });
          }}
          checked={parseInt(question.correct_index) === 2}
        />{" "}
        <input
          type="text"
          value={question.options[2]}
          onChange={(e) => {
            const { options } = question;
            options[2] = e.target.value;
            setQuestion({
              ...question,
              error: "",
              success: "",
              options: options,
            });
          }}
        />
      </div>
      <div className="form-group">
        <input
          type="radio"
          name={`ansewer_${item._id}`}
          onChange={(e) => {
            setQuestion({
              ...question,
              error: "",
              success: "",
              correct_index: 3,
            });
          }}
          checked={parseInt(question.correct_index) === 3}
        />{" "}
        <input
          type="text"
          value={question.options[3]}
          onChange={(e) => {
            const { options } = question;
            options[3] = e.target.value;
            setQuestion({
              ...question,
              error: "",
              success: "",
              options: options,
            });
          }}
        />
      </div>
      <div>
        <button
          className="btn btn-success"
          onClick={(e) => {
            e.preventDefault();
            updateQuestion(user._id, item.quiz, item._id, token, question).then(
              (data) => {
                if (data.error) {
                  setQuestion({ ...question, error: data.error });
                } else {
                  setQuestion({ ...question, success: data.message });
                }
              }
            );
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default EditQuestionSingle;
