import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import { getAllQuestions, getOne } from "../Admin/Helper/adminapicall";
import Base from "../Core/Base";
import { isAuthenticated } from "../Auth/Helper/index";
import Question from "./Question";
import API from "../API";
import animation from "../animb.gif";
import { getActivities, saveActivity } from "./helper";
import { Fragment } from "react";
import GivenQuiz from "./GivenQuiz";

const Quizzes = () => {
  const { quizId } = useParams();
  const { user, token } = isAuthenticated();

  const [questions, setQuestion] = useState([]);
  const [quiz, setQuiz] = useState("");
  const [currIndex, setCurrIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [finalScore, setFinalScore] = useState("");
  const [isNoQuestion, setIsNoQuestion] = useState(false);
  const [isGiven, setIsGiven] = useState(false);
  const [activity, setActivity] = useState({
    user: user._id,
    quiz: quizId,
    questions: [],
  });

  const countOccurrences = (arr, val) =>
    arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

  useEffect(() => {
    getActivities(user._id, token)
      .then((res) => {
        console.log(" Response Activities:", res);
        let isFound = false;
        let result = res;
        for (let i = 0; i < result.length; i++) {
          console.log(result[i], quiz);
          if (result[i].quiz == quizId) {
            isFound = true;
            break;
          }
        }

        if (isFound) {
          setIsGiven(true);
        }
      })
      .catch((err) => console.log(err));
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
          setQuestion(data);
          setAnswers({
            selectedIndex: new Array(data.length).fill(-1),
            correctIndex: new Array(data.length).fill(-1),
          });
          setActivity({
            ...activity,
            questions: new Array(data.length).fill({}),
          });
        }
        setLoading(false);
      })
      .catch((err) => alert(err));
  }, []);

  return (
    <>
      <Base title={quiz?.title} description={quiz?.description}>
        {loading ? (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={animation}
                style={{ margin: "0px auto" }}
                alt="loading"
                width="120"
                height="120"
              />
            </div>
          </>
        ) : (
          <Fragment>
            {isGiven ? (
              <GivenQuiz quizId={quizId} />
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    marginTop: "-100px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={`${API}/quiz/photo/${quiz._id}`}
                    alt={quiz.description}
                    style={{ width: 200, height: 200 }}
                  />
                </div>

                <>
                  {isNoQuestion ? (
                    <h3>No Questions in this quiz!!</h3>
                  ) : (
                    <div style={{ padding: 30 }}>
                      {finalScore && (
                        <div className="alert alert-success text-center">
                          <h5>
                            <i className="fa fa-check-circle-o"></i>{" "}
                            {finalScore}
                          </h5>
                        </div>
                      )}
                      <Question
                        question={questions[currIndex]}
                        index={currIndex}
                        sendToParent={setAnswers}
                        answers={answers}
                        setFinalScore={setFinalScore}
                        setActivity={setActivity}
                        activity={activity}
                      />
                      {/* <p>{JSON.stringify(activity)}</p> */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <button
                          className="page-btn"
                          disabled={currIndex == 0}
                          onClick={() => setCurrIndex((prev) => prev - 1)}
                        >
                          previous
                        </button>
                        <button
                          className="page-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currIndex !== questions.length - 1) {
                              setCurrIndex((prev) => prev + 1);
                            } else {
                              if (answers.selectedIndex.includes(-1))
                                alert(
                                  countOccurrences(answers.selectedIndex, -1) +
                                    " questions remaining!"
                                );
                              else {
                                // alert(JSON.stringify(questions));
                                answers.selectedIndex.forEach((item, index) => {
                                  const { correctIndex } = answers;

                                  if (
                                    item ===
                                    parseInt(questions[index].correct_index)
                                  ) {
                                    correctIndex[index] = 1;
                                    setAnswers({
                                      ...answers,
                                      correctIndex: correctIndex,
                                    });
                                  } else {
                                    correctIndex[index] = 0;
                                  }
                                });

                                setFinalScore(
                                  `Your Final Score ${countOccurrences(
                                    answers.correctIndex,
                                    1
                                  )} Out of ${answers.correctIndex.length} !! `
                                );
                                alert(JSON.stringify(activity));
                                saveActivity(user._id, quizId, token, activity)
                                  .then((data) => {
                                    alert(JSON.stringify(data));
                                  })
                                  .catch((err) => alert(err));
                              }
                            }
                          }}
                        >
                          {currIndex == questions.length - 1
                            ? "submit"
                            : "next"}
                        </button>
                      </div>
                    </div>
                  )}
                </>
              </>
            )}
          </Fragment>
        )}
      </Base>
    </>
  );
};

export default Quizzes;
