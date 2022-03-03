import React, { Fragment, useEffect, useState } from "react";
import { isAuthenticated } from "../Auth/Helper";
import { getActivity } from "./helper";
import "./GivenQuiz.css";
const { user, token } = isAuthenticated();

const GivenQuiz = ({ quizId }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getActivity(user._id, quizId, token)
      .then((res) => {
        console.log("GivenQuiz :", res);
        if (res.error) {
          alert(res.error);
        } else {
          setQuestions(res.questions);
          console.log(res.questions);
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Fragment>
      <div className="activity-container">
        {
          /* {questions.map((item) => {
          return <h4 key={item.questionId}>{item.questionId}</h4>;

        })} */

          JSON.stringify(questions)
        }
      </div>
    </Fragment>
  );
};

export default GivenQuiz;
