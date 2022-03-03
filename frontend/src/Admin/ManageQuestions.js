import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../Auth/Helper";
import Base from "../Core/Base";
import { getQuizzes } from "./Helper/adminapicall";
import animation from "../animw.gif";

const { token, user } = isAuthenticated();

const ManageQuestions = () => {
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
                    to={`/quiz/edit/questions/${data._id}`}
                    className="btn btn-success"
                  >
                    Edit
                  </Link>
                  {"   "}
                  <Link
                    to={`/quiz/delete/questions/${data._id}`}
                    className="btn btn-success"
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            );
          })}
          <tr
            style={{
              display: showAnim ? "" : "none",
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
    <Base
      title="Manage Questions in Quiz"
      className="container bg-purple p-5 mb-4"
      description="Manage All Questions of Quizzes Here..."
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Back
      </Link>
      <div className="row bg-white rounded p-2" style={{ overflow: "auto" }}>
        <div className="col-md-8 offset-md-2 mb-4">{quizTable()}</div>
      </div>
    </Base>
  );
};

export default ManageQuestions;
