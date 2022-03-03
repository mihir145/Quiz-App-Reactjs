import React from "react";
import Base from "../Core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../Auth/Helper/index";

const AdminPanel = () => {
  const { user } = isAuthenticated();

  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/quiz/">Create Quiz</Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/manage/quiz/">Manage Quiz</Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/quiz/add-questions/">Add Questions</Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/manage/questions/">Manage Questions</Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">Admin Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span
              className="badge badge-success mr-2"
              style={{ backgroundColor: "#ab55e7" }}
            >
              Email:{" "}
            </span>{" "}
            {user.email}
          </li>
          <li className="list-group-item">
            <span
              className="badge badge-success mr-2"
              style={{ backgroundColor: "#ab55e7" }}
            >
              Name:
            </span>{" "}
            {user.name}
          </li>
          <li className="list-group-item">
            <span
              className="badge badge-success mr-2"
              style={{ backgroundColor: "#ab55e7" }}
            >
              Role:
            </span>{" "}
            User
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="Welcome To Admin Area"
      description="Manage All of your Quiz here.."
      className="container p-4 mb-5"
    >
      <div className="row" style={{ background: "#ab55e7", padding: 10 }}>
        <div className="col-md-3">{adminLeftSide()}</div>
        <div className="col-md-9">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminPanel;
