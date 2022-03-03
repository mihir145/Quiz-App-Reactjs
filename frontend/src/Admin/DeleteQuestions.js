import React, { useEffect, useState } from "react";
import { useParams, Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../Auth/Helper";
import Base from "../Core/Base";
import { deleteQuestion, getAllQuestions, getOne } from "./Helper/adminapicall";
import animation from "../animw.gif";

const DeleteQuestions = () => {
  const [Quiz, setQuiz] = useState({});
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [isNoQuestion, setIsNoQuestion] = useState();

  const { token, user } = isAuthenticated();
  const { quizId } = useParams();

  useEffect(() => {
    getOne(quizId).then((res) => {
      if (res.error) {
        alert(res.error);
      } else {
        setQuiz(res);
      }
    });

    getAllQuestions(user._id, quizId, token)
      .then((data) => {
        if (data.length === 0) setIsNoQuestion(true);
        else {
          setQuestions(data);
        }
        setLoading(false);
      })
      .catch((err) => alert(err));
  }, []);

  const questionsTable = () => {
    var count = 0;
    return (
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Question</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((data) => {
            count++;
            return (
              <tr key={data._id}>
                <th scope="row">{count}</th>
                <td>{data.question}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={(e) => {
                      e.preventDefault();
                      deleteQuestion(user._id, quizId, data._id, token)
                        .then((data) => {
                          alert(data);
                          window.location.reload();
                        })
                        .catch((err) => alert(err));
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
          <tr
            style={{
              display: loading ? "" : "none",
              margin: "100",
              marginBottom: "20",
              textAlign: "center",
            }}
          >
            <td colSpan="4">
              <img src={animation} alt="loading" width="80" height="80" />
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  return (
    <>
      <Base
        className="container bg-purple p-5 mb-4"
        title={`Delete Questions`}
        description={`Delete Questions of ${Quiz.title} Here...`}
      >
        <Link
          to="/admin/manage/questions/"
          className="btn btn-md btn-dark mb-3"
        >
          Back
        </Link>
        {isNoQuestion ? (
          <div className="text-center">
            <h4>No Questions in This quiz!</h4>
            <Link
              to={`/quiz/add/question/${Quiz._id}`}
              className="btn btn-md btn-dark mb-3"
            >
              add question from here
            </Link>
          </div>
        ) : (
          <div className="row bg-white rounded p-4">
            <div className="col-md-8 offset-md-2 mb-4">{questionsTable()}</div>
          </div>
        )}
      </Base>
    </>
  );
};

export default DeleteQuestions;
