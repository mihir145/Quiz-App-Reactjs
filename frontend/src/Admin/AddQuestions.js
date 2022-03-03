import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Base from "../Core/Base";
import { addQuestion, getOne } from "./Helper/adminapicall";
import { isAuthenticated } from "../Auth/Helper";
const { token, user } = isAuthenticated();

const AddQuestions = () => {
  const { quizId } = useParams();
  const [Quiz, setQuiz] = useState({});
  const [Question, setQuestion] = useState({
    error: false,
    question: "",
    options: ["", "", "", ""],
    correct_index: -1,
    loading: false,
    success: false,
  });

  useEffect(() => {
    getOne(quizId).then((res) => {
      if (res.error) {
        alert(res.error);
      } else {
        setQuiz(res);
      }
    });
  }, []);

  const { correct_index, options, question } = Question;

  const handleAnswer = (index) => (e) => {
    setQuestion({
      ...Question,
      correct_index: index,
      error: false,
      success: false,
    });
  };

  const handleOption = (index) => (e) => {
    let temp = Question.options;
    temp[index] = e.target.value;
    setQuestion({ ...Question, options: temp, error: false, success: false });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setQuestion({ ...Question, error: false, loading: true });
    addQuestion(user._id, quizId, token, {
      correct_index,
      options,
      question,
      quiz: quizId,
    }).then((data) => {
      // alert(JSON.stringify(data))
      if (data.error) {
        setQuestion({
          ...Question,
          error: data.error,
          loading: false,
        });
      } else {
        setQuestion({
          error: "",
          question: "",
          options: [],
          correct_index: -1,
          loading: false,
          success: true,
        });
      }
    });
  };

  const questionForm = () => {
    return (
      <form>
        <div className="form-group">
          <textarea
            type="text"
            className="form-control my-3"
            autoFocus
            value={Question.question}
            onChange={(e) => {
              setQuestion({ ...Question, question: e.target.value });
            }}
            required
            placeholder="Write your Question Here..."
          ></textarea>

          <div className="form-group">
            <input type="radio" name="true_ans" onChange={handleAnswer(0)} />{" "}
            <input
              type="text"
              value={Question.options[0]}
              onChange={handleOption(0)}
            />
          </div>

          <div className="form-group">
            <input type="radio" name="true_ans" onChange={handleAnswer(1)} />{" "}
            <input
              type="text"
              value={Question.options[1]}
              onChange={handleOption(1)}
            />
          </div>
          <div className="form-group">
            <input type="radio" name="true_ans" onChange={handleAnswer(2)} />{" "}
            <input
              type="text"
              value={Question.options[2]}
              onChange={handleOption(2)}
            />
          </div>
          <div className="form-group">
            <input type="radio" name="true_ans" onChange={handleAnswer(3)} />{" "}
            <input
              type="text"
              value={Question.options[3]}
              onChange={handleOption(3)}
            />
          </div>
          <div>
            <button className="btn btn-success" onClick={onSubmit}>
              Add
            </button>
            <p style={{ color: "black" }}>{JSON.stringify(Question)}</p>
          </div>
        </div>
      </form>
    );
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success"
        style={{ display: Question.success ? "" : "none" }}
      >
        Question Added successfully!
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: Question.error ? "" : "none" }}
      >
        {Question.error}
      </div>
    );
  };

  const loadingMessage = () => {
    return (
      Question.loading && <div className="alert alert-info">Loading......</div>
    );
  };

  return (
    <Base title={Quiz.title} description={Quiz.description}>
      <div className="col-md-8 offset-md-2 bg-white mb-4 p-3">
        {loadingMessage()}
        {errorMessage()}
        {successMessage()}
        {questionForm()}
      </div>
      {/* <button
        className="btn btn-success"
        onClick={() => {
          setquestCount(questCount + 1);
        }}
      >
        Add More
      </button> */}
    </Base>
  );
};

export default AddQuestions;
