import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../Auth/Helper";
import Base from "../Core/Base";
import { getQuizzes, deleteQuiz } from "./Helper/adminapicall";
import animation from "../animw.gif";

const { token, user } = isAuthenticated();

const ManageQuiz = () => {
  const [Quizzes, setQuizzes] = useState([]);
  const [showAnim, setshowAnim] = useState(true);
  useEffect(() => {
    getQuizzes().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setQuizzes(data);
        setshowAnim(false);
      }
    });
  }, []);
  const quizTable = () => {
    var count = 0;
    return (
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Quiz Name</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {Quizzes.map((data) => {
            count++;
            return (
              <tr key={data._id}>
                <th scope="row">{count}</th>
                <td>{data.title}</td>
                <td>{data.description}</td>
                <td>
                  <Link
                    to={`/admin/edit/quiz/${data._id}`}
                    className="btn btn-success"
                  >
                    Update
                  </Link>
                  {"   "}
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deleteQuiz(user._id, data._id, token).then((res) => {
                        if (res.error) {
                          alert(res.error);
                        } else {
                          alert(res.message);
                          window.location.reload();
                        }
                      });
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
          <td
            style={{
              display: showAnim ? "" : "none",
              margin: "100",
              marginBottom: "20",
              textAlign: "center",
            }}
            colSpan="4"
          >
            <img src={animation} alt="loading" width="80" height="80" />
          </td>
        </tbody>
      </table>
    );
  };
  return (
    <Base
      title="Manage Quiz"
      className="container bg-purple p-5 mb-4"
      description="Manage Your All Quizzes Here..."
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-white rounded p-4">
        <div className="col-md-8 offset-md-2 mb-4">{quizTable()}</div>
      </div>
    </Base>
  );
};

export default ManageQuiz;
