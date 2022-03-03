import React, { useState } from "react";
import { Fragment } from "react";
import "./Questions.css";

const Question = ({
  question,
  index,
  answers,
  sendToParent,
  setFinalScore,
  activity,
  setActivity,
}) => {
  const { selectedIndex } = answers;
  const handleOptionsChange = (iq, isa) => (e) => {
    setFinalScore("");
    selectedIndex[iq] = isa;
    const { questions } = activity;
    sendToParent({ ...answers, selectedIndex: selectedIndex });

    questions[iq] = {
      questionId: question._id,
      question: question.question,
      options: question.options,
      answerIndex: isa,
      correct_index: parseInt(question.correct_index),
    };
    // setActivity({ ...activity, questions: questions });
    // setActivity({ ...activity });
  };

  return (
    <div
      className="row"
      style={{
        padding: 20,
        backgroundColor: "#ab55e7",
        marginBottom: 10,
      }}
    >
      <div className="col-md-6">
        <p>
          Q{`${index + 1}`}. {question.question}
        </p>
      </div>
      <div className="col-md-6">
        <div className="jumbotron" style={{ padding: 10 }}>
          {question.options.map((op, opindex) => {
            return (
              <Fragment key={opindex}>
                <input
                  type="radio"
                  name={`${question._id}`}
                  id={`${question.question}q${opindex}`}
                  hidden
                  onChange={handleOptionsChange(index, opindex)}
                  checked={opindex == selectedIndex[index]}
                />
                <label
                  className="question-option"
                  htmlFor={`${question.question}q${opindex}`}
                >
                  <span>{op}</span>
                </label>
                <br />
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Question;
