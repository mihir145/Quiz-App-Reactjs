import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Base from "../Core/Base";
import { getAllQuestions, getOne } from "./Helper/adminapicall";
import { isAuthenticated } from "../Auth/Helper";
import EditQuestionSingle from "./EditQuestionSingle";
const { token, user } = isAuthenticated();

const EditQuestions = () => {
  const { quizId } = useParams();
  const [Quiz, setQuiz] = useState({});
  const [loading, setLoading] = useState(true);
  const [isNoQuestion, setIsNoQuestion] = useState(false);
  const [questions, setQuestion] = useState([]);

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
          setQuestion(data);
        }
        setLoading(false);
      })
      .catch((err) => alert(err));
  }, []);
  return (
    <>
      <Base
        title={`Edit Questions`}
        description={`Edit All Questions of ${Quiz.title} Here...`}
      >
        <form>
          {questions.map((item, index) => (
            <EditQuestionSingle item={item} index={index} key={item._id} />
          ))}
        </form>
      </Base>
    </>
  );
};

export default EditQuestions;
