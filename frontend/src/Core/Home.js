import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Base from "./Base";
import { getQuizzes } from "../Admin/Helper/adminapicall";
import API from "../API";
import animation from "../animb.gif";
import { isAuthenticated } from "../Auth/Helper";
const { user } = isAuthenticated();

const Home = () => {
  const [quizzes, setquizzes] = useState([]);
  const [showAnim, setshowAnim] = useState(true);

  useEffect(() => {
    getQuizzes().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setquizzes(data);
        setshowAnim(false);
      }
    });
  }, []);

  return (
    <Base title="All Quizzes" description="All Quizzes are here">
      <div className="container">
        <div className="row text-center">
          {quizzes.map((quiz, index) => {
            return (
              <div
                className="col-md-3"
                style={{ marginBottom: 10 }}
                key={index}
              >
                <div
                  className="card bg-dark"
                  style={{
                    padding: 20,
                    border: "1px solid #ab55e7",
                    textAlign: "center",
                    maxHeight: "700px",
                    minHeight: "270px",
                  }}
                >
                  <img
                    className="card-img-top"
                    src={`${API}/quiz/photo/${quiz._id}`}
                    alt={quiz.title}
                    style={{
                      width: "100%",
                      height: "150px",
                      border: "1px solid #ab55e7",
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title teal">{quiz.title}</h5>
                    <p className="card-text">{quiz.description}</p>
                    <Link
                      className="btn btn-primary"
                      to={user ? `/quiz/${quiz._id}` : `/signin`}
                    >
                      Take {quiz.title}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
          <img
            src={animation}
            style={{ display: showAnim ? "" : "none", margin: "0px auto" }}
            alt="loading"
            width="120"
            height="120"
          />
        </div>
        {/* <>
          {quizzes && (
            
          )}
        </> */}
      </div>
    </Base>
  );
};

export default Home;
